import { View, Text, ScrollView, TouchableOpacity, Switch, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../src/services/api';
import { useAuthStore } from '../../src/store/authStore';

export default function MenuScreen() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: menuItems, isLoading } = useQuery({
    queryKey: ['restaurant-menu', user?.restaurantId],
    queryFn: async () => {
      // Assuming user has a restaurantId attached, otherwise we would fetch the restaurant by owner ID first.
      // For this demo, let's just hit the endpoint. If we need to get restaurant ID first:
      const resData = await api.get('/restaurants/owner/me');
      const restaurantId = resData.data.data._id;
      const response = await api.get(`/restaurants/${restaurantId}/menu`);
      return { restaurantId, items: response.data.data };
    },
    enabled: !!user
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ itemId, isAvailable, restaurantId }: { itemId: string, isAvailable: boolean, restaurantId: string }) => {
      // Assuming an endpoint exists to update menu item
      await api.put(`/restaurants/${restaurantId}/menu/${itemId}`, { isAvailable });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurant-menu'] });
    },
    onError: () => {
      Alert.alert('Error', 'Failed to update item availability');
    }
  });

  const toggleAvailability = (id: string, currentStatus: boolean, restaurantId: string) => {
    toggleMutation.mutate({ itemId: id, isAvailable: !currentStatus, restaurantId });
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
          {isLoading ? (
            <ActivityIndicator size="large" color="#ef4444" />
          ) : menuItems?.items.length === 0 ? (
            <Text className="text-center text-gray-500 mt-10">No items found in your menu.</Text>
          ) : (
            menuItems?.items.map((item: any) => (
              <View key={item._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
                  <Text className="text-gray-500 font-bold mt-1">${item.basePrice.toFixed(2)}</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className={`mr-2 font-bold ${item.isAvailable !== false ? 'text-green-500' : 'text-gray-400'}`}>
                    {item.isAvailable !== false ? 'Available' : 'Sold Out'}
                  </Text>
                  <Switch 
                    value={item.isAvailable !== false} 
                    onValueChange={() => toggleAvailability(item._id, item.isAvailable !== false, menuItems.restaurantId)}
                    trackColor={{ false: '#d1d5db', true: '#fca5a5' }}
                    thumbColor={item.isAvailable !== false ? '#ef4444' : '#f3f4f6'}
                    disabled={toggleMutation.isPending}
                  />
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
