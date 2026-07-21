import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../src/services/api';
import { useCartStore } from '../../src/store/cartStore';

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Recommended');
  const { items, addItem, getTotal, restaurantId } = useCartStore();

  const { data: restaurant, isLoading: loadingRest } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: async () => {
      const response = await api.get(`/restaurants/${id}`);
      return response.data.data;
    }
  });

  const { data: menuData, isLoading: loadingMenu } = useQuery({
    queryKey: ['menu', id],
    queryFn: async () => {
      const response = await api.get(`/restaurants/${id}/menu`);
      return response.data.data;
    }
  });

  // Dummy categories based on data
  const categories = ['Recommended', 'Combos', 'Burgers', 'Sides', 'Beverages'];
  const menuItems = menuData || [];

  if (loadingRest || loadingMenu) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#ef4444" />
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text>Restaurant not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Image Placeholder */}
      <View className="h-64 bg-gray-300 relative">
        <SafeAreaView className="absolute top-0 left-0 right-0 flex-row justify-between p-4 z-10">
          <TouchableOpacity 
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
            onPress={() => router.back()}
          >
            <Text className="text-xl font-bold">←</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
            <Text className="text-xl">❤️</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <ScrollView className="flex-1 -mt-6 bg-white rounded-t-3xl pt-6 px-4" showsVerticalScrollIndicator={false}>
        {/* Restaurant Info */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">{restaurant.restaurantName}</Text>
          <View className="flex-row items-center flex-wrap mb-4">
            <Text className="text-gray-700 mr-4">⭐ {restaurant.averageRating} ({restaurant.totalReviews})</Text>
            <Text className="text-gray-700 mr-4">⏱ 30 mins</Text>
          </View>
        </View>

        {/* Menu Categories Sticky Header Area (simulated) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 border-b border-gray-100 pb-2">
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              className={`mr-6 ${activeCategory === cat ? 'border-b-2 border-red-500 pb-2' : 'pb-2'}`}
              onPress={() => setActiveCategory(cat)}
            >
              <Text className={`font-bold ${activeCategory === cat ? 'text-red-500' : 'text-gray-500'}`}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Items */}
        <View className="space-y-6 pb-24">
          {menuItems.map((item: any) => {
            const cartItem = items.find(i => i._id === item._id);
            return (
              <View key={item._id} className="flex-row justify-between items-center border-b border-gray-100 pb-6">
                <View className="flex-1 pr-4">
                  <View className="flex-row items-center mb-1">
                    <View className={`w-4 h-4 border ${item.isVegetarian ? 'border-green-500' : 'border-red-500'} items-center justify-center mr-2`}>
                      <View className={`w-2 h-2 rounded-full ${item.isVegetarian ? 'bg-green-500' : 'bg-red-500'}`} />
                    </View>
                    <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
                  </View>
                  <Text className="text-gray-900 font-bold mb-1">${item.basePrice.toFixed(2)}</Text>
                  <Text className="text-gray-500 text-sm">{item.description}</Text>
                </View>
                
                <View className="items-center">
                  <View className="w-24 h-24 bg-gray-200 rounded-xl mb-[-12px]" />
                  <TouchableOpacity 
                    className="bg-white border border-red-500 px-6 py-2 rounded-lg shadow-sm"
                    onPress={() => {
                      try {
                        addItem({
                          _id: item._id,
                          name: item.name,
                          price: item.basePrice,
                          isVeg: item.isVegetarian,
                          restaurantId: id as string
                        });
                      } catch (error: any) {
                        alert(error.message);
                      }
                    }}
                  >
                    <Text className="text-red-500 font-bold text-center">
                      {cartItem ? `ADD (${cartItem.quantity})` : 'ADD'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating View Cart Bar */}
      {items.length > 0 && restaurantId === id && (
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
          <TouchableOpacity 
            className="bg-red-500 p-4 rounded-xl flex-row justify-between items-center shadow-lg"
            onPress={() => router.push('/cart')}
          >
            <View>
              <Text className="text-white font-bold">{items.reduce((sum: number, i: any) => sum + i.quantity, 0)} items | ${getTotal().toFixed(2)}</Text>
              <Text className="text-white text-xs">Extra charges may apply</Text>
            </View>
            <Text className="text-white font-bold text-lg">View Cart ➔</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
