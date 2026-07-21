import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState('New');

  const orders = [
    { id: '1001', items: '2x Whopper, 1x Coke', total: 28.50, status: 'New', time: '2 mins ago' },
    { id: '1002', items: '1x Crispy Veg Burger', total: 6.99, status: 'Preparing', time: '15 mins ago' },
    { id: '1003', items: '3x French Fries', total: 10.47, status: 'Completed', time: '1 hr ago' },
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'New') return order.status === 'New';
    if (activeTab === 'Active') return order.status === 'Preparing';
    return order.status === 'Completed';
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
          {filteredOrders.length === 0 ? (
            <Text className="text-center text-gray-500 mt-10">No orders here.</Text>
          ) : (
            filteredOrders.map((order) => (
              <View key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <View className="flex-row justify-between mb-2">
                  <Text className="font-bold text-lg text-gray-900">Order #{order.id}</Text>
                  <Text className="text-gray-500">{order.time}</Text>
                </View>
                <Text className="text-gray-600 mb-2">{order.items}</Text>
                <Text className="font-bold text-gray-900 mb-4">${order.total.toFixed(2)}</Text>
                
                {activeTab === 'New' && (
                  <View className="flex-row space-x-2">
                    <TouchableOpacity className="flex-1 bg-gray-200 py-3 rounded-lg items-center mr-2">
                      <Text className="text-gray-700 font-bold">Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-red-500 py-3 rounded-lg items-center ml-2">
                      <Text className="text-white font-bold">Accept</Text>
                    </TouchableOpacity>
                  </View>
                )}
                
                {activeTab === 'Active' && (
                  <TouchableOpacity className="w-full bg-green-500 py-3 rounded-lg items-center">
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
