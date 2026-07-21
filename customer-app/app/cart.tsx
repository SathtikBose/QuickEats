import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
  const router = useRouter();

  const cartItems = [
    { id: 1, name: 'Whopper Combo', price: 12.99, quantity: 1, isVeg: false },
    { id: 3, name: 'French Fries', price: 3.49, quantity: 2, isVeg: true },
  ];

  const itemTotal = 19.97;
  const deliveryFee = 2.99;
  const tax = 1.50;
  const grandTotal = itemTotal + deliveryFee + tax;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center p-4 bg-white border-b border-gray-100 shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Text className="text-xl font-bold">←</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Cart Summary</Text>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <Text className="font-bold text-lg mb-4 text-gray-900">Your Items</Text>
          
          {cartItems.map((item) => (
            <View key={item.id} className="flex-row justify-between items-center mb-4">
              <View className="flex-1 flex-row items-center">
                <View className={`w-3 h-3 border ${item.isVeg ? 'border-green-500' : 'border-red-500'} items-center justify-center mr-3`}>
                  <View className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                </View>
                <Text className="font-bold text-gray-800 text-base">{item.name}</Text>
              </View>
              
              <View className="flex-row items-center">
                <View className="flex-row items-center bg-red-50 rounded-lg px-2 py-1 mr-4">
                  <TouchableOpacity><Text className="text-red-500 font-bold px-2 text-lg">-</Text></TouchableOpacity>
                  <Text className="font-bold text-gray-800 px-2">{item.quantity}</Text>
                  <TouchableOpacity><Text className="text-red-500 font-bold px-2 text-lg">+</Text></TouchableOpacity>
                </View>
                <Text className="font-bold text-gray-900 w-16 text-right">${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bill Details */}
        <View className="bg-white rounded-2xl p-4 mb-24 shadow-sm">
          <Text className="font-bold text-lg mb-4 text-gray-900">Bill Details</Text>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Item Total</Text>
            <Text className="text-gray-900 font-medium">${itemTotal.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Delivery Fee</Text>
            <Text className="text-gray-900 font-medium">${deliveryFee.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row justify-between mb-4 border-b border-gray-100 pb-4">
            <Text className="text-gray-600">Taxes & Charges</Text>
            <Text className="text-gray-900 font-medium">${tax.toFixed(2)}</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-lg text-gray-900">To Pay</Text>
            <Text className="font-bold text-xl text-gray-900">${grandTotal.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Bar */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <TouchableOpacity 
          className="bg-red-500 p-4 rounded-xl items-center shadow-lg"
          onPress={() => {
             // Navigate to checkout
             // router.push('/checkout')
          }}
        >
          <Text className="text-white font-bold text-lg">Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
