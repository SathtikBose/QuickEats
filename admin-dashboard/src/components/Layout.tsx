import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Store, Tag, PieChart, LogOut } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Store, label: 'Restaurants', path: '/restaurants' },
    { icon: Tag, label: 'Promotions', path: '/promotions' },
    { icon: PieChart, label: 'Reports', path: '/reports' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-red-500 tracking-tight">QuickEats</h1>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Admin Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-red-50 text-red-500 font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-red-500' : 'text-gray-400'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link
            to="/login"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} className="text-gray-400" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <h2 className="text-lg font-bold text-gray-900">
            {navItems.find(i => i.path === location.pathname)?.label || 'Overview'}
          </h2>
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold">
            AD
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
