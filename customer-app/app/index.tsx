import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center p-6">
      <View className="items-center mb-10">
        <Text className="text-4xl font-bold text-red-500 mb-2">QuickEats</Text>
        <Text className="text-gray-500 text-center text-lg">
          Your favorite food, delivered fast.
        </Text>
      </View>

      <TouchableOpacity 
        className="w-full bg-red-500 py-4 rounded-xl mb-4"
        onPress={() => router.push('/(auth)/login')}
      >
        <Text className="text-white text-center font-bold text-lg">Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="w-full bg-red-100 py-4 rounded-xl"
        onPress={() => router.push('/(auth)/register')}
      >
        <Text className="text-red-500 text-center font-bold text-lg">Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
