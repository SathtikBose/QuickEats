import { Users, Store, ShoppingBag, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Revenue', value: '$45,231', increase: '+12.5%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Active Users', value: '1,204', increase: '+5.2%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Restaurants', value: '48', increase: '+2.1%', icon: Store, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Orders Today', value: '156', increase: '+18.4%', icon: ShoppingBag, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
