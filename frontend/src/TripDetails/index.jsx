import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const TripDetails = () => {
  const { id } = useParams(); // Get trip ID from URL
  const location = useLocation(); // Get navigation state
  const [tripData, setTripData] = useState(location.state?.tripData || null); // Use state if available
  const [loading, setLoading] = useState(!location.state?.tripData); // Load if no state

  // Fetch trip data from backend if not in navigation state
  useEffect(() => {
    if (!tripData) {
      const fetchTripData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/trips/${id}`);
          setTripData(response.data);
        } catch (error) {
          console.error('Error fetching trip data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchTripData();
    } else {
      setLoading(false); // Data already available from state
    }
  }, [id, tripData]);

  // Display loading or error state
  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!tripData) return <p className="text-center text-red-500">Trip not found</p>;

  // Destructure trip data
  const { noOfDays, itinerary } = tripData;
  const { tripName, hotels, itinerary: dailyItinerary, budgetTips } = itinerary;

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {/* Trip Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{tripName}</h1>
      <p className="text-lg text-gray-600 mb-8">
        <strong>Number of Days:</strong> {noOfDays}
      </p>

      {/* Hotels Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hotels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={hotel.hotelImageUrl}
                alt={hotel.hotelName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{hotel.hotelName}</h3>
                <p className="text-gray-600"><strong>Address:</strong> {hotel.hotelAddress}</p>
                <p className="text-gray-600"><strong>Price:</strong> ₹{hotel.price}</p>
                <p className="text-gray-600"><strong>Rating:</strong> {hotel.rating} / 5</p>
                <p className="text-gray-500 mt-2">{hotel.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Day-wise Itinerary Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Day-wise Itinerary</h2>
        {Object.entries(dailyItinerary).map(([day, details], index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 capitalize">{day}</h3>
            <p className="text-gray-600"><strong>Theme:</strong> {details.theme}</p>
            <p className="text-gray-600 mb-4">
              <strong>Best Time to Visit:</strong> {details.bestTimeToVisit}
            </p>
            <div className="space-y-6">
              {details.activities.map((activity, idx) => (
                <div key={idx} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img
                    src={activity.placeImageUrl}
                    alt={activity.placeName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-800">{activity.placeName}</h4>
                    <p className="text-gray-500">{activity.placeDetails}</p>
                    <p className="text-gray-600"><strong>Ticket Pricing:</strong> {activity.ticketPricing}</p>
                    <p className="text-gray-600"><strong>Rating:</strong> {activity.rating} / 5</p>
                    <p className="text-gray-600"><strong>Time to Travel:</strong> {activity.timeToTravel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Budget Tips Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Budget Tips</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          {budgetTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TripDetails;