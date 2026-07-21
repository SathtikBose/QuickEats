import { Request, Response } from 'express';
import { Restaurant, Food, Category } from '../models';

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find({ isApproved: true, isBlocked: false })
      .select('restaurantName cuisine coverImage logo deliveryRadius averageRating totalReviews isOpen')
      .sort({ averageRating: -1 });

    return res.status(200).json({
      success: true,
      message: 'Restaurants retrieved successfully',
      data: restaurants,
    });
  } catch (error) {
    console.error('getRestaurants Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getRestaurantDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant || !restaurant.isApproved || restaurant.isBlocked) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Restaurant details retrieved successfully',
      data: restaurant,
    });
  } catch (error) {
    console.error('getRestaurantDetails Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getRestaurantMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Fetch all foods for this restaurant, populate category details
    const foods = await Food.find({ restaurantId: id, isAvailable: true })
      .populate('categoryId', 'name slug sortOrder')
      .sort('categoryId'); // Sort by category reference

    return res.status(200).json({
      success: true,
      message: 'Menu retrieved successfully',
      data: foods,
    });
  } catch (error) {
    console.error('getRestaurantMenu Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateRestaurantStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(id, { isApproved }, { new: true });
    return res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
