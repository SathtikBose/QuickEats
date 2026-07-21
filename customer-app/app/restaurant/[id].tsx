import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Recommended');

  // Dummy data
  const restaurant = {
    name: 'Burger King',
    rating: 4.5,
    reviews: '1k+',
    time: '20-30 min',
    distance: '1.2 km',
  };

  const categories = ['Recommended', 'Combos', 'Burgers', 'Sides', 'Beverages'];
  
  const menuItems = [
    { id: 1, name: 'Whopper Combo', price: '$12.99', desc: 'Classic whopper with medium fries and drink', isVeg: false },
    { id: 2, name: 'Crispy Veg Burger', price: '$6.99', desc: 'Crispy veg patty with fresh lettuce', isVeg: true },
    { id: 3, name: 'French Fries', price: '$3.49', desc: 'Crispy golden fries', isVeg: true },
  ];

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
          <Text className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</Text>
          <View className="flex-row items-center flex-wrap mb-4">
            <Text className="text-gray-700 mr-4">⭐ {restaurant.rating} ({restaurant.reviews})</Text>
            <Text className="text-gray-700 mr-4">⏱ {restaurant.time}</Text>
            <Text className="text-gray-700">📍 {restaurant.distance}</Text>
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
          {menuItems.map((item) => (
            <View key={item.id} className="flex-row justify-between items-center border-b border-gray-100 pb-6">
              <View className="flex-1 pr-4">
                <View className="flex-row items-center mb-1">
                  <View className={`w-4 h-4 border ${item.isVeg ? 'border-green-500' : 'border-red-500'} items-center justify-center mr-2`}>
                    <View className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                  </View>
                  <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
                </View>
                <Text className="text-gray-900 font-bold mb-1">{item.price}</Text>
                <Text className="text-gray-500 text-sm">{item.desc}</Text>
              </View>
              
              <View className="items-center">
                <View className="w-24 h-24 bg-gray-200 rounded-xl mb-[-12px]" />
                <TouchableOpacity className="bg-white border border-red-500 px-6 py-2 rounded-lg shadow-sm">
                  <Text className="text-red-500 font-bold text-center">ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating View Cart Bar */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <TouchableOpacity 
          className="bg-red-500 p-4 rounded-xl flex-row justify-between items-center shadow-lg"
          onPress={() => router.push('/cart')}
        >
          <View>
            <Text className="text-white font-bold">2 items</Text>
            <Text className="text-white text-xs">Extra charges may apply</Text>
          </View>
          <Text className="text-white font-bold text-lg">View Cart ➔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
