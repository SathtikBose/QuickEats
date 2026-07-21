import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Dashboard</Text>
            <Text className="text-gray-500">Welcome back, Burger King</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2 border border-gray-100">
            <Text className="text-gray-500 mb-1">Today's Revenue</Text>
            <Text className="text-2xl font-bold text-gray-900">$450.00</Text>
          </View>
          <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2 border border-gray-100">
            <Text className="text-gray-500 mb-1">Total Orders</Text>
            <Text className="text-2xl font-bold text-gray-900">24</Text>
          </View>
        </View>

        {/* Live Orders Stub */}
        <Text className="text-xl font-bold text-gray-900 mb-4">Active Orders</Text>
        <View className="space-y-4">
          {[1, 2].map((order) => (
            <View key={order} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <View className="flex-row justify-between mb-2">
                <Text className="font-bold text-lg text-gray-900">Order #100{order}</Text>
                <Text className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded font-bold">Preparing</Text>
              </View>
              <Text className="text-gray-600 mb-4">2x Whopper Combo, 1x Fries</Text>
              
              <View className="flex-row space-x-2">
                <TouchableOpacity className="flex-1 bg-green-500 py-3 rounded-lg items-center">
                  <Text className="text-white font-bold">Ready for Pickup</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
