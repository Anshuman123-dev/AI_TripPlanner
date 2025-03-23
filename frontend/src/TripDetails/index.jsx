






import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import HotelCard from "@/components/HotelCaed";
import ItineraryDay from "@/components/tripDetails/IteneraryDay";
import { FiCalendar, FiDollarSign, FiUsers, FiHeart, FiHome, FiMap, FiTrendingUp } from "react-icons/fi";


const TripDetails = () => {
  const [photoUrl, setPhotoUrl] = useState();
  const { id } = useParams(); // Get trip ID from URL
  const loc = useLocation(); // Get navigation state
  const navigate = useNavigate();
  const [trip, setTrip] = useState(id === "new" ? loc.state?.trip : null); // Use state if new trip
  const [loading, setLoading] = useState(id !== "new"); // Load if not new
  const [isSaved, setIsSaved] = useState(id !== "new"); // Track if trip is saved

  // Fetch trip data from backend if not in navigation state
  useEffect(() => {
    if (id !== "new" && !trip) {
      setLoading(true);
      const fetchTripData = async () => {
        try {
          // Use environment variable for API URL instead of hardcoded localhost
          const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
          const response = await axios.get(`${API_URL}/api/trips/${id}`);
          setTrip(response.data);
          setIsSaved(true);
        } catch (error) {
          console.error("Error fetching trip data:", error);
          toast("Failed to fetch trip data");
        } finally {
          setLoading(false);
        }
      };
      fetchTripData();
    } else if (id === "new" && trip) {
      setIsSaved(false);
    }
  }, [id, trip]);

  // Fetch place photo when trip is available
  useEffect(() => {
    const fetchPhoto = async () => {
      if (trip) {
        try {
          const data = { textQuery: trip.location };
          const resp = await GetPlaceDetails(data);
          const photoName = resp.data.places[0].photos[3].name;
          const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
          setPhotoUrl(photoUrl);
        } catch (error) {
          console.error("Error fetching place photo:", error);
        }
      }
    };
    fetchPhoto();
  }, [trip]);

  // Handle saving the trip to the database
  const handleAddToFavourite = async () => {
    if (isSaved) {
      toast("Trip is already saved");
      return;
    }

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast("Please sign in to save the trip");
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      const response = await axios.post(`${API_URL}/api/trips`, {
        userId: user._id,
        location: trip.location,
        noOfDays: trip.noOfDays,
        budget: trip.budget,
        travelType: trip.travelType,
        itinerary: trip.itinerary,
      });
      const savedTrip = response.data;
      toast("Trip saved successfully!");
      navigate(`/trip/${savedTrip._id}`, { replace: true }); // Redirect with new ID
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Failed to save trip");
    } finally {
      setLoading(false);
    }
  };

  // Display loading or error state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-800 text-lg font-medium">Preparing your adventure...</p>
        </div>
      </div>
    );
  }
  
  if (!trip) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-orange-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-2xl text-red-500 mb-4">❌ Trip not found</p>
          <p className="text-gray-600 mb-6">We couldn't find the trip you're looking for.</p>
          <Button onClick={() => navigate('/trips')} className="bg-orange-500 hover:bg-orange-600">
            Browse All Trips
          </Button>
        </div>
      </div>
    );
  }

  // Destructure trip data
  const { location, noOfDays, budget, travelType, itinerary } = trip;
  const { hotels, itinerary: dailyItinerary, budgetTips } = itinerary;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-12">
      
      {/* Hero section with image overlay */}
      <div className="relative h-[50vh] mb-8">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src={photoUrl || "/placeholder-travel.jpg"}
          className="h-full w-full object-cover"
          alt={location}
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/70 to-transparent">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-5xl font-bold text-white mb-4">{location}</h1>
            <div className="flex flex-wrap gap-3">
              <div className="bg-orange-500/80 backdrop-blur-sm text-white py-2 px-4 rounded-full flex items-center">
                <FiCalendar className="mr-2" /> {noOfDays} Days
              </div>
              <div className="bg-orange-500/80 backdrop-blur-sm text-white py-2 px-4 rounded-full flex items-center">
                <FiDollarSign className="mr-2" /> {budget}
              </div>
              <div className="bg-orange-500/80 backdrop-blur-sm text-white py-2 px-4 rounded-full flex items-center">
                <FiUsers className="mr-2" /> {travelType}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Add to Favourite Button (only for new trips) */}
        {!isSaved && (
          <div className="mb-10 flex justify-center">
            <Button
              onClick={handleAddToFavourite}
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2"
            >
              <FiHeart className="text-xl" />
              {loading ? "Saving..." : "Save This Trip"}
            </Button>
          </div>
        )}

        {/* Hotels Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <FiHome className="text-2xl text-orange-500 mr-3" />
            <h2 className="text-3xl font-bold text-orange-800">Recommended Stays</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} />
              ))}
            </div>
          </div>
        </section>

        {/* Day-wise Itinerary Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <FiMap className="text-2xl text-orange-500 mr-3" />
            <h2 className="text-3xl font-bold text-orange-800">Your Daily Adventure</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            {Object.entries(dailyItinerary).map(([day, details], index) => (
              <div key={index} className={index > 0 ? "mt-8 pt-8 border-t border-orange-100" : ""}>
                <ItineraryDay day={day} details={details} />
              </div>
            ))}
          </div>
        </section>

        {/* Budget Tips Section */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <FiTrendingUp className="text-2xl text-orange-500 mr-3" />
            <h2 className="text-3xl font-bold text-orange-800">Money-Saving Tips</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <ul className="space-y-4">
              {budgetTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-orange-100 text-orange-600 font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TripDetails;