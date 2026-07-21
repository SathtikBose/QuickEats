import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // Stub
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6 justify-center">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-900 mb-2">Restaurant Portal</Text>
        <Text className="text-gray-500">Sign in to manage your orders and menu.</Text>
      </View>

      <View className="space-y-4 mb-6">
        <TextInput
          className="bg-gray-100 p-4 rounded-xl text-base"
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-xl text-base"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        className="w-full bg-red-500 py-4 rounded-xl mb-4"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-center font-bold text-lg">Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
