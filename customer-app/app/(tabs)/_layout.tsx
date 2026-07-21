import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#ef4444' }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{ 
          title: 'Search',
        }} 
      />
      <Tabs.Screen 
        name="orders" 
        options={{ 
          title: 'Orders',
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
        }} 
      />
    </Tabs>
  );
}
