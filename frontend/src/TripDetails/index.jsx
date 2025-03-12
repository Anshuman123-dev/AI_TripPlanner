// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';

// const TripDetails = () => {
//   const { id } = useParams(); // Get trip ID from URL
//   const loc = useLocation(); // Get navigation state
//   const [tripData, setTripData] = useState(loc.state?.tripData || null); // Use state if available
//   const [loading, setLoading] = useState(!loc.state?.tripData); // Load if no state

//   // Fetch trip data from backend if not in navigation state
//   useEffect(() => {
//     if (!tripData) {
//       const fetchTripData = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/api/trips/${id}`);
//           setTripData(response.data);
//         } catch (error) {
//           console.error('Error fetching trip data:', error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchTripData();
//     } else {
//       setLoading(false); // Data already available from state
//     }
//   }, [id, tripData]);

//   // Display loading or error state
//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (!tripData) return <p className="text-center text-red-500">Trip not found</p>;

//   // Destructure trip data
//   const { noOfDays, itinerary } = tripData;
//   const { location, tripName, hotels, budget, travelers, itinerary: dailyItinerary, budgetTips } = itinerary;

//   return (
//     <div className="container mx-auto p-6 max-w-5xl">
//       {/* Trip Header */}
//       <h1 className="text-4xl font-bold text-gray-800 mb-6">{location}</h1>
//       <div className='flex gap-4'>
//         <div className='bg-gray-200 p-1 px-3 rounded-full '>📅 {noOfDays} Days</div>
//         <div className='bg-gray-200 p-1 px-3 rounded-full '>💸 {budget}</div>
//         <div className='bg-gray-200 p-1 px-3 rounded-full '>🥂{travelers}</div>
//       </div>

//       {/* Hotels Section */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hotels</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {hotels.map((hotel, index) => (
//             <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
//               <img
//                 src={hotel.hotelImageUrl}
//                 alt={hotel.hotelName}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-bold text-gray-800">{hotel.hotelName}</h3>
//                 <p className="text-gray-600"><strong>Address:</strong> {hotel.hotelAddress}</p>
//                 <p className="text-gray-600"><strong>Price:</strong> ₹{hotel.price}</p>
//                 <p className="text-gray-600"><strong>Rating:</strong> {hotel.rating} / 5</p>
//                 <p className="text-gray-500 mt-2">{hotel.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Day-wise Itinerary Section */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Day-wise Itinerary</h2>
//         {Object.entries(dailyItinerary).map(([day, details], index) => (
//           <div key={index} className="mb-8">
//             <h3 className="text-xl font-bold text-gray-800 capitalize">{day}</h3>
//             <p className="text-gray-600"><strong>Theme:</strong> {details.theme}</p>
//             <p className="text-gray-600 mb-4">
//               <strong>Best Time to Visit:</strong> {details.bestTimeToVisit}
//             </p>
//             <div className="space-y-6">
//               {details.activities.map((activity, idx) => (
//                 <div key={idx} className="bg-white shadow-md rounded-lg overflow-hidden">
//                   <img
//                     src={activity.placeImageUrl}
//                     alt={activity.placeName}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <h4 className="text-lg font-bold text-gray-800">{activity.placeName}</h4>
//                     <p className="text-gray-500">{activity.placeDetails}</p>
//                     <p className="text-gray-600"><strong>Ticket Pricing:</strong> {activity.ticketPricing}</p>
//                     <p className="text-gray-600"><strong>Rating:</strong> {activity.rating} / 5</p>
//                     <p className="text-gray-600"><strong>Time to Travel:</strong> {activity.timeToTravel}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Budget Tips Section */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Budget Tips</h2>
//         <ul className="list-disc pl-6 text-gray-600 space-y-2">
//           {budgetTips.map((tip, index) => (
//             <li key={index}>{tip}</li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default TripDetails;

// import React, { useState, useEffect } from "react";
// import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { GetPlaceDetails } from "@/service/GlobalApi";
// import HotelCard from "@/components/HotelCaed";
// import { PHOTO_REF_URL } from "@/service/GlobalApi";
// import ItineraryDay from "@/components/tripDetails/IteneraryDay";

// const TripDetails = () => {
//   const [photoUrl, setPhotoUrl] = useState();
//   const { id } = useParams(); // Get trip ID from URL
//   const loc = useLocation(); // Get navigation state
//   const navigate = useNavigate();
//   const [trip, setTrip] = useState(id === "new" ? loc.state?.trip : null); // Use state if new trip
//   const [loading, setLoading] = useState(id !== "new"); // Load if not new
//   const [isSaved, setIsSaved] = useState(id !== "new"); // Track if trip is saved

//   // Fetch trip data from backend if not in navigation state
//   useEffect(() => {
//     if (id !== "new" && !trip) {
//       setLoading(true);
//       const fetchTripData = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/api/trips/${id}`
//           );
//           setTrip(response.data);
//           setIsSaved(true);
//         } catch (error) {
//           console.error("Error fetching trip data:", error);
//           toast("Failed to fetch trip data");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchTripData();
//     } else if (id === "new" && trip) {
//       setIsSaved(false);
//     }
//   }, [id, trip]);

//   // Handle saving the trip to the database
//   const handleAddToFavourite = async () => {
//     if (isSaved) {
//       toast("Trip is already saved");
//       return;
//     }

//     setLoading(true);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) {
//         toast("Please sign in to save the trip");
//         return;
//       }

//       const response = await axios.post("http://localhost:5000/api/trips", {
//         userId: user._id,
//         location: trip.location,
//         noOfDays: trip.noOfDays,
//         budget: trip.budget,
//         travelType: trip.travelType,
//         itinerary: trip.itinerary,
//       });
//       const savedTrip = response.data;
//       toast("Trip saved successfully!");
//       navigate(`/trip/${savedTrip._id}`, { replace: true }); // Redirect with new ID
//     } catch (error) {
//       console.error("Error saving trip:", error);
//       toast("Failed to save trip");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Display loading or error state
//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (!trip) return <p className="text-center text-red-500">Trip not found</p>;

//   // Destructure trip data
//   const { location, noOfDays, budget, travelType, itinerary } = trip;
//   const { hotels, itinerary: dailyItinerary, budgetTips } = itinerary;

//   useEffect(() => {
//     trip && GetPlacePhoto();
//   }, [trip]);

//   const GetPlacePhoto = async () => {
//     const data = {
//       textQuery: location,
//     };
//     const result = await GetPlaceDetails(data).then((resp) => {
//       console.log(resp.data.places[0].photos[3].name);

//       const PhotoUrl = PHOTO_REF_URL.replace(
//         "{NAME}",
//         resp.data.places[0].photos[3].name
//       );
//       setPhotoUrl(PhotoUrl);
//     });
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-5xl">
//       {/* Trip Header */}
//       <img
//         src={photoUrl}
//         className="h-[340px] w-full object-cover rounded-xl"
//       />

//       <h1 className="text-4xl font-bold text-gray-800 mb-6">{location}</h1>
//       <div className="flex gap-4">
//         <div className="bg-gray-200 p-1 px-3 rounded-full">
//           📅 {noOfDays} Days
//         </div>
//         <div className="bg-gray-200 p-1 px-3 rounded-full">💸 {budget}</div>
//         <div className="bg-gray-200 p-1 px-3 rounded-full">🥂 {travelType}</div>
//       </div>

//       {/* Add to Favourite Button (only for new trips) */}
//       {!isSaved && (
//         <Button
//           onClick={handleAddToFavourite}
//           disabled={loading}
//           className="mt-4"
//         >
//           {loading ? "Saving..." : "Add to Favourite"}
//         </Button>
//       )}

//       {/* Hotels Section */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hotels</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {hotels.map((hotel, index) => (
//             <HotelCard key={index} hotel={hotel} />
//           ))}
//         </div>
//       </section>

//       {/* Day-wise Itinerary Section */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//           Day-wise Itinerary
//         </h2>
//         {Object.entries(dailyItinerary).map(([day, details], index) => (
//           <ItineraryDay key={index} day={day} details={details} />
//         ))}
//       </section>

//       {/* Budget Tips Section */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//           Budget Tips
//         </h2>
//         <ul className="list-disc pl-6 text-gray-600 space-y-2">
//           {budgetTips.map((tip, index) => (
//             <li key={index}>{tip}</li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default TripDetails;








import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import HotelCard from "@/components/HotelCaed";
import ItineraryDay from "@/components/tripDetails/IteneraryDay";

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
          const response = await axios.get(`http://localhost:5000/api/trips/${id}`);
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

      const response = await axios.post("http://localhost:5000/api/trips", {
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
  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!trip) return <p className="text-center text-red-500">Trip not found</p>;

  // Destructure trip data
  const { location, noOfDays, budget, travelType, itinerary } = trip;
  const { hotels, itinerary: dailyItinerary, budgetTips } = itinerary;

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {/* Trip Header */}
      <img
        src={photoUrl}
        className="h-[340px] w-full object-cover rounded-xl"
        alt="Trip location"
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-6">{location}</h1>
      <div className="flex gap-4">
        <div className="bg-gray-200 p-1 px-3 rounded-full">📅 {noOfDays} Days</div>
        <div className="bg-gray-200 p-1 px-3 rounded-full">💸 {budget}</div>
        <div className="bg-gray-200 p-1 px-3 rounded-full">🥂 {travelType}</div>
      </div>

      {/* Add to Favourite Button (only for new trips) */}
      {!isSaved && (
        <Button
          onClick={handleAddToFavourite}
          disabled={loading}
          className="mt-4"
        >
          {loading ? "Saving..." : "Add to Favourite"}
        </Button>
      )}

      {/* Hotels Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hotels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* Day-wise Itinerary Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Day-wise Itinerary
        </h2>
        {Object.entries(dailyItinerary).map(([day, details], index) => (
          <ItineraryDay key={index} day={day} details={details} />
        ))}
      </section>

      {/* Budget Tips Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Budget Tips
        </h2>
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