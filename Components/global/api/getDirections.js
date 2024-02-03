// DirectionsService.js
import axios from 'axios';

const DIRECTIONS_API_KEY = 'AIzaSyBa6wKAcoJEA5h_gzJBuIqU6UNKc1sXbQk';

export const getDirections = async (origin, destination, mode = 'driving') => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${DIRECTIONS_API_KEY}`
    );
    if (response.data.routes.length > 0) {
      const { legs, overview_polyline } = response.data.routes[0];
      const distance = legs[0].distance.text;
      const duration = legs[0].duration.text;
      const points = overview_polyline.points;
            
      return { distance, duration, points };
    } else {
      throw new Error('No routes found');
    }
  } catch (error) {
    console.error('Error fetching directions:', error.message);
    throw error;
  }
};
