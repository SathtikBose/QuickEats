import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../src/services/api';
import { useAuthStore } from '../../src/store/authStore';

export default function DashboardScreen() {
  const { user } = useAuthStore();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['restaurant-dashboard', user?.restaurantId],
    queryFn: async () => {
      // Again, get restaurant ID if not in user object
      const resData = await api.get('/restaurants/owner/me');
      const restaurant = resData.data.data;
      
      // Fetch orders to calculate stats
      const ordersRes = await api.get(`/orders/restaurant/${restaurant._id}`);
      const orders = ordersRes.data.data;

      // Calculate stats
      const today = new Date().toDateString();
      const todaysOrders = orders.filter((o: any) => new Date(o.createdAt).toDateString() === today);
      const totalRevenue = todaysOrders.reduce((sum: number, o: any) => sum + (o.status !== 'cancelled' ? o.totalAmount : 0), 0);
      const activeOrders = orders.filter((o: any) => o.status === 'pending' || o.status === 'preparing');

      return { restaurant, stats: { totalOrders: todaysOrders.length, totalRevenue, activeOrders } };
    },
    enabled: !!user
  });

  if (isLoading || !dashboardData) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#ef4444" />
      </SafeAreaView>
    );
  }

  const { restaurant, stats } = dashboardData;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Dashboard</Text>
            <Text className="text-gray-500">Welcome back, {restaurant.restaurantName}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2 border border-gray-100">
            <Text className="text-gray-500 mb-1">Today's Revenue</Text>
            <Text className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</Text>
          </View>
          <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2 border border-gray-100">
            <Text className="text-gray-500 mb-1">Total Orders</Text>
            <Text className="text-2xl font-bold text-gray-900">{stats.totalOrders}</Text>
          </View>
        </View>

        {/* Live Orders */}
        <Text className="text-xl font-bold text-gray-900 mb-4">Active Orders</Text>
        <View className="space-y-4">
          {stats.activeOrders.length === 0 ? (
            <Text className="text-gray-500">No active orders right now.</Text>
          ) : (
            stats.activeOrders.map((order: any) => (
              <View key={order._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <View className="flex-row justify-between mb-2">
                  <Text className="font-bold text-lg text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</Text>
                  <Text className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded font-bold">{order.status}</Text>
                </View>
                
                <View className="mb-4">
                  {order.items.map((item: any, idx: number) => (
                    <Text key={idx} className="text-gray-600">{item.quantity}x {item.menuItem?.name || 'Item'}</Text>
                  ))}
                </View>
                
                <View className="flex-row space-x-2">
                  <TouchableOpacity className="flex-1 bg-green-500 py-3 rounded-lg items-center">
                    <Text className="text-white font-bold">Manage in Orders Tab</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
