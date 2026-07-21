import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filters = ['Rating 4.0+', 'Under 30 min', 'Pure Veg', 'Offers'];
  
  // Dummy data
  const results = [
    { id: 1, name: 'Spicy Chicken Burger', type: 'Food', price: '$8.99', restaurant: 'Burger King' },
    { id: 2, name: 'Margherita Pizza', type: 'Food', price: '$12.99', restaurant: 'Pizza Hut' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4 bg-white shadow-sm z-10">
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-4">
          <Text className="text-gray-400 mr-2">🔍</Text>
          <TextInput
            className="flex-1 text-base text-gray-900"
            placeholder="Search for restaurants, cuisines, or dishes"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text className="text-gray-400 font-bold">✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
          {filters.map((filter, index) => (
            <TouchableOpacity key={index} className="border border-gray-300 px-4 py-2 rounded-full mr-2 bg-white">
              <Text className="text-gray-700">{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <Text className="text-lg font-bold text-gray-900 mb-4">
          {searchQuery ? 'Search Results' : 'Recent Searches'}
        </Text>
        
        <View className="space-y-4">
          {results.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-row"
              onPress={() => {
                 // Will navigate to food or restaurant detail later
              }}
            >
              <View className="w-20 h-20 bg-gray-200 rounded-lg mr-4" />
              <View className="flex-1 justify-center">
                <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
                <Text className="text-gray-500 mb-1">{item.restaurant}</Text>
                <Text className="text-red-500 font-bold">{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
