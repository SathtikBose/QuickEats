import { Store, CheckCircle, XCircle } from 'lucide-react';

export default function RestaurantsPage() {
  const restaurants = [
    { id: 1, name: 'Burger King', owner: 'Jane Smith', status: 'Approved', rating: 4.5 },
    { id: 2, name: 'Pizza Hut', owner: 'Bob Wilson', status: 'Pending', rating: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Restaurant Approvals</h2>
          <p className="text-sm text-gray-500 mt-1">Review and approve new restaurant applications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-4">
                <Store size={24} />
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                restaurant.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
              }`}>
                {restaurant.status}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900">{restaurant.name}</h3>
            <p className="text-gray-500 text-sm mb-4">Owned by {restaurant.owner}</p>
            
            <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-2">
              <div className="text-sm">
                <span className="font-bold text-gray-900">{restaurant.rating > 0 ? `⭐ ${restaurant.rating}` : 'No rating'}</span>
              </div>
              
              {restaurant.status === 'Pending' ? (
                <div className="flex space-x-2">
                  <button className="text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100 transition-colors">
                    <XCircle size={18} />
                  </button>
                  <button className="text-green-500 bg-green-50 p-2 rounded-lg hover:bg-green-100 transition-colors">
                    <CheckCircle size={18} />
                  </button>
                </div>
              ) : (
                <button className="text-gray-400 hover:text-gray-900 text-sm font-medium transition-colors">
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
