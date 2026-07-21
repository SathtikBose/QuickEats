import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MenuScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
      <Text className="text-2xl font-bold text-gray-900">Menu Management</Text>
      <Text className="text-gray-500 mt-2">Manage your food items here.</Text>
    </SafeAreaView>
  );
}
