import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../src/services/api';
import { useAuthStore } from '../../src/store/authStore';

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState('New');
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['restaurant-orders', user?.restaurantId],
    queryFn: async () => {
      // Again, get restaurant ID if not in user object
      const resData = await api.get('/restaurants/owner/me');
      const restaurantId = resData.data.data._id;
      const response = await api.get(`/orders/restaurant/${restaurantId}`);
      return response.data.data;
    },
    enabled: !!user
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string, status: string }) => {
      await api.put(`/orders/${orderId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurant-orders'] });
    },
    onError: () => {
      Alert.alert('Error', 'Failed to update order status');
    }
  });

  const updateStatus = (orderId: string, newStatus: string) => {
    updateStatusMutation.mutate({ orderId, status: newStatus });
  };

  const orders = ordersData || [];

  const filteredOrders = orders.filter((order: any) => {
    if (activeTab === 'New') return order.status === 'pending';
    if (activeTab === 'Active') return order.status === 'preparing' || order.status === 'out_for_delivery';
    return order.status === 'delivered' || order.status === 'cancelled';
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4 bg-white border-b border-gray-100 shadow-sm">
        <Text className="text-xl font-bold text-gray-900 mb-4">Orders</Text>
        
        {/* Tabs */}
        <View className="flex-row bg-gray-100 p-1 rounded-lg">
          {['New', 'Active', 'History'].map((tab) => (
            <TouchableOpacity 
              key={tab} 
              className={`flex-1 py-2 rounded-md items-center ${activeTab === tab ? 'bg-white shadow-sm' : ''}`}
              onPress={() => setActiveTab(tab)}
            >
              <Text className={`font-bold ${activeTab === tab ? 'text-gray-900' : 'text-gray-500'}`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="space-y-4 pb-10">
          {isLoading ? (
            <ActivityIndicator size="large" color="#ef4444" mt-10 />
          ) : filteredOrders.length === 0 ? (
            <Text className="text-center text-gray-500 mt-10">No orders here.</Text>
          ) : (
            filteredOrders.map((order: any) => (
              <View key={order._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <View className="flex-row justify-between mb-2">
                  <Text className="font-bold text-lg text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</Text>
                  <Text className="text-gray-500">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
                
                {/* Render items cleanly */}
                <View className="mb-2">
                  {order.items.map((item: any, idx: number) => (
                     <Text key={idx} className="text-gray-600">{item.quantity}x {item.menuItem?.name || 'Item'}</Text>
                  ))}
                </View>
                
                <Text className="font-bold text-gray-900 mb-4">${order.totalAmount.toFixed(2)}</Text>
                
                {activeTab === 'New' && (
                  <View className="flex-row space-x-2">
                    <TouchableOpacity 
                      className="flex-1 bg-gray-200 py-3 rounded-lg items-center mr-2"
                      onPress={() => updateStatus(order._id, 'cancelled')}
                    >
                      <Text className="text-gray-700 font-bold">Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className="flex-1 bg-red-500 py-3 rounded-lg items-center ml-2"
                      onPress={() => updateStatus(order._id, 'preparing')}
                    >
                      <Text className="text-white font-bold">Accept</Text>
                    </TouchableOpacity>
                  </View>
                )}
                
                {activeTab === 'Active' && order.status === 'preparing' && (
                  <TouchableOpacity 
                    className="w-full bg-green-500 py-3 rounded-lg items-center"
                    onPress={() => updateStatus(order._id, 'out_for_delivery')}
                  >
                    <Text className="text-white font-bold">Mark Ready</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
