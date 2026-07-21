import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-2xl font-bold text-gray-800">Home Screen</Text>
      <Text className="text-gray-500">Categories and Restaurants will appear here</Text>
    </SafeAreaView>
  );
}
