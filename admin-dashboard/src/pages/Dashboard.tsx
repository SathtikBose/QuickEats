import { Users, Store, ShoppingBag, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { ActivityIndicator } from 'react-native';

export default function Dashboard() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // In a real prod app, there would be a dedicated stats endpoint
      // For this demo, we can just aggregate from the list endpoints
      const [usersRes, restRes] = await Promise.all([
        api.get('/users'),
        api.get('/restaurants/admin/all')
      ]);
      
      const users = usersRes.data.data;
      const restaurants = restRes.data.data;
      
      return {
        totalUsers: users.length,
        totalRestaurants: restaurants.length,
        pendingRestaurants: restaurants.filter((r: any) => !r.isApproved).length
      };
    }
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center p-20">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const s = statsData || { totalUsers: 0, totalRestaurants: 0, pendingRestaurants: 0 };

  const stats = [
    { title: 'Active Users', value: s.totalUsers.toString(), icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Total Restaurants', value: s.totalRestaurants.toString(), icon: Store, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Pending Approvals', value: s.pendingRestaurants.toString(), icon: ShoppingBag, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded mr-2">
                  {stat.increase}
                </span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Stub */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Platform Activity</h3>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between pb-6 border-b border-gray-50 last:border-0 last:pb-0">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingBag size={18} className="text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">New Order #100{i} placed at Burger King</p>
                  <p className="text-sm text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <span className="font-bold text-gray-900">$24.50</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
