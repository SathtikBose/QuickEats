import { Store, CheckCircle, XCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { ActivityIndicator } from 'react-native';

export default function RestaurantsPage() {
  const queryClient = useQueryClient();

  const { data: restaurantsData, isLoading } = useQuery({
    queryKey: ['admin-restaurants'],
    queryFn: async () => {
      const response = await api.get('/restaurants/admin/all');
      return response.data.data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, isApproved }: { id: string, isApproved: boolean }) => {
      await api.put(`/restaurants/${id}/status`, { isApproved });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-restaurants'] });
    }
  });

  const toggleApproval = (id: string, isApproved: boolean) => {
    updateStatusMutation.mutate({ id, isApproved });
  };

  const restaurants = restaurantsData || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Restaurant Approvals</h2>
          <p className="text-sm text-gray-500 mt-1">Review and approve new restaurant applications</p>
        </div>
      </div>

      {isLoading ? (
        <div className="p-10 flex justify-center"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant: any) => (
            <div key={restaurant._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-4">
                    <Store size={24} />
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    restaurant.isApproved ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                  }`}>
                    {restaurant.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900">{restaurant.restaurantName}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-1">{restaurant.address}</p>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-2">
                <div className="text-sm">
                  <span className="font-bold text-gray-900">{restaurant.averageRating > 0 ? `⭐ ${restaurant.averageRating}` : 'No rating'}</span>
                </div>
                
                {!restaurant.isApproved ? (
                  <div className="flex space-x-2">
                    <button 
                      className="text-green-500 bg-green-50 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm flex items-center"
                      onClick={() => toggleApproval(restaurant._id, true)}
                    >
                      <CheckCircle size={16} className="mr-1" /> Approve
                    </button>
                  </div>
                ) : (
                  <button 
                    className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    onClick={() => toggleApproval(restaurant._id, false)}
                  >
                    <XCircle size={16} className="mr-1" /> Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
