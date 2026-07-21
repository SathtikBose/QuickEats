import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function MenuScreen() {
  // Stub data
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Whopper Combo', price: 12.99, isAvailable: true },
    { id: 2, name: 'French Fries', price: 3.49, isAvailable: true },
    { id: 3, name: 'Vanilla Shake', price: 4.99, isAvailable: false },
  ]);

  const toggleAvailability = (id: number) => {
    setMenuItems(items => items.map(item => 
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row justify-between items-center p-4 bg-white border-b border-gray-100 shadow-sm">
        <Text className="text-xl font-bold text-gray-900">Menu Management</Text>
        <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-lg">
          <Text className="text-white font-bold">+ Add Item</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="space-y-4 pb-10">
          {menuItems.map((item) => (
            <View key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-row justify-between items-center">
              <View>
                <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
                <Text className="text-gray-500 font-bold mt-1">${item.price.toFixed(2)}</Text>
              </View>
              <View className="flex-row items-center">
                <Text className={`mr-2 font-bold ${item.isAvailable ? 'text-green-500' : 'text-gray-400'}`}>
                  {item.isAvailable ? 'Available' : 'Sold Out'}
                </Text>
                <Switch 
                  value={item.isAvailable} 
                  onValueChange={() => toggleAvailability(item.id)}
                  trackColor={{ false: '#d1d5db', true: '#fca5a5' }}
                  thumbColor={item.isAvailable ? '#ef4444' : '#f3f4f6'}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
