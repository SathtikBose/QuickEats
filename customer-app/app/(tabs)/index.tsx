import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const categories = ['Burger', 'Pizza', 'Sushi', 'Dessert'];
  const featuredRestaurants = [
    { id: 1, name: 'Burger King', rating: 4.5, time: '20-30 min' },
    { id: 2, name: 'Pizza Hut', rating: 4.2, time: '30-45 min' }
  ];

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
        <View className="space-y-4">
          {featuredRestaurants.map((restaurant) => (
            <TouchableOpacity key={restaurant.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-row">
              <View className="w-24 h-24 bg-gray-200 rounded-xl mr-4" />
              <View className="justify-center flex-1">
                <Text className="text-lg font-bold text-gray-900">{restaurant.name}</Text>
                <Text className="text-gray-500 mt-1">⭐ {restaurant.rating} • {restaurant.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
