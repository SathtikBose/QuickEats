import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../src/services/api';

export default function HomeScreen() {
  const router = useRouter();

  const categories = ['Burger', 'Pizza', 'Sushi', 'Dessert'];
  
  const { data: restaurantsData, isLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const response = await api.get('/restaurants');
      return response.data.data;
    }
  });

  const featuredRestaurants = restaurantsData || [];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} className="p-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-500">Delivering to</Text>
            <Text className="text-lg font-bold text-gray-900">123 Main Street ▾</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
            <Text className="text-xl">👤</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity 
          className="bg-white p-4 rounded-xl flex-row items-center shadow-sm mb-6"
          onPress={() => router.push('/(tabs)/search')}
        >
          <Text className="text-gray-400">🔍 Search for food or restaurants...</Text>
        </TouchableOpacity>

        {/* Categories */}
        <Text className="text-xl font-bold text-gray-900 mb-4">Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          {categories.map((cat, idx) => (
            <TouchableOpacity key={idx} className="bg-white px-6 py-3 rounded-full mr-3 shadow-sm border border-gray-100">
              <Text className="font-bold text-gray-800">{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Restaurants */}
        <Text className="text-xl font-bold text-gray-900 mb-4">Featured Restaurants</Text>
        
        {isLoading ? (
          <ActivityIndicator size="large" color="#ef4444" />
        ) : (
          <View className="space-y-4">
            {featuredRestaurants.map((restaurant: any) => (
              <TouchableOpacity 
                key={restaurant._id} 
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-row"
                onPress={() => router.push(`/restaurant/${restaurant._id}`)}
              >
                <View className="w-24 h-24 bg-gray-200 rounded-xl mr-4" />
                <View className="justify-center flex-1">
                  <Text className="text-lg font-bold text-gray-900">{restaurant.restaurantName}</Text>
                  <Text className="text-gray-500 mt-1">⭐ {restaurant.averageRating} • 30 mins</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
