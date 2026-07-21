import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../src/store/cartStore';
import { api } from '../src/services/api';

export default function CartScreen() {
  const router = useRouter();
  const { items, incrementQuantity, decrementQuantity, getTotal, clearCart } = useCartStore();

  const itemTotal = getTotal();
  const deliveryFee = itemTotal > 0 ? 2.99 : 0;
  const tax = itemTotal * 0.05;
  const grandTotal = itemTotal + deliveryFee + tax;

  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart first.');
      return;
    }
    
    try {
      setIsCheckingOut(true);
      const restaurantId = items[0].restaurantId;
      
      const payload = {
        restaurantId,
        items,
        deliveryFee,
        tax
      };

      // Ensure api client is imported correctly below
      const response = await api.post('/orders', payload);
      
      if (response.data.success) {
        const { clientSecret, order } = response.data.data;
        // Mocking the Stripe flow for now until keys are provided
        Alert.alert(
          'Stripe Payment Mock', 
          `Payment Intent created with Secret: ${clientSecret.substring(0, 10)}...\nOrder: ${order.orderNumber}`,
          [
            { 
              text: 'Simulate Payment Success', 
              onPress: () => {
                clearCart();
                router.replace('/orders');
              }
            }
          ]
        );
      }
    } catch (error: any) {
      Alert.alert('Checkout Failed', error.response?.data?.message || error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

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
          
          {items.map((item) => (
            <View key={item._id} className="flex-row justify-between items-center mb-4">
              <View className="flex-1 flex-row items-center">
                <View className={`w-3 h-3 border ${item.isVeg ? 'border-green-500' : 'border-red-500'} items-center justify-center mr-3`}>
                  <View className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                </View>
                <Text className="font-bold text-gray-800 text-base">{item.name}</Text>
              </View>
              
              <View className="flex-row items-center">
                <View className="flex-row items-center bg-red-50 rounded-lg px-2 py-1 mr-4">
                  <TouchableOpacity onPress={() => decrementQuantity(item._id)}><Text className="text-red-500 font-bold px-2 text-lg">-</Text></TouchableOpacity>
                  <Text className="font-bold text-gray-800 px-2">{item.quantity}</Text>
                  <TouchableOpacity onPress={() => incrementQuantity(item._id)}><Text className="text-red-500 font-bold px-2 text-lg">+</Text></TouchableOpacity>
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
          className={`p-4 rounded-xl items-center shadow-lg ${isCheckingOut ? 'bg-red-400' : 'bg-red-500'}`}
          onPress={handleCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Proceed to Checkout</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
