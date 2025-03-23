// import React from 'react';
// import { GetPlaceDetails } from '@/service/GlobalApi';
// import { PHOTO_REF_URL } from '@/service/GlobalApi';
// import { useState } from 'react';
// import { useEffect } from 'react';

// const HotelCard = ({ hotel }) => {

    // const [photoUrl, setPhotoUrl] = useState();

    // useEffect(() => {
    //   hotel && GetPlacePhoto();
    // }, [hotel]);

    // const GetPlacePhoto = async () => {
    //   const data = {
    //     textQuery: hotel.hotelName,
    //   };
    //   const result = await GetPlaceDetails(data).then((resp) => {
    //     console.log(resp.data.places[0].photos[3].name);

    //     const PhotoUrl = PHOTO_REF_URL.replace(
    //       "{NAME}",
    //       resp.data.places[0].photos[3].name
    //     );
    //     setPhotoUrl(PhotoUrl);
    //   });
    // };



//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden">
//       <img
//         src={photoUrl}
//         alt={hotel.hotelName}
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <h3 className="text-xl font-bold text-gray-800">{hotel.hotelName}</h3>
//         <p className="text-gray-600">
//           <strong>Address:</strong> {hotel.hotelAddress}
//         </p>
//         <p className="text-gray-600">
//           <strong>Price:</strong> ₹{hotel.price}
//         </p>
//         <p className="text-gray-600">
//           <strong>Rating:</strong> {hotel.rating} / 5
//         </p>
//         <p className="text-gray-500 mt-2">{hotel.description}</p>
//         <a
//           href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//             hotel.hotelName + ',' + hotel.hotelAddress
//           )}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-gray-200 inline-block mt-2 px-3 py-1 rounded"
//         >
//           Location in map
//         </a>
//       </div>
//     </div>
//   );
// };

// export default HotelCard;



import React, { useState, useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

const HotelCard = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      setIsLoading(true);
      setImageError(false);
      const data = {
        textQuery: hotel.hotelName,
      };
      const result = await GetPlaceDetails(data);
      if (result.data.places && result.data.places[0]?.photos?.length) {
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          result.data.places[0].photos[3].name
        );
        setPhotoUrl(PhotoUrl);
      } else {
        setImageError(true);
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
      setImageError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Create hotel initials for fallback avatar
  const getHotelInitials = () => {
    if (!hotel.hotelName) return "H";
    const words = hotel.hotelName.split(" ");
    if (words.length === 1) return words[0].charAt(0);
    return words[0].charAt(0) + words[1].charAt(0);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative">
        {isLoading ? (
          <div className="w-full h-60 bg-orange-100 animate-pulse"></div>
        ) : imageError ? (
          <div className="w-full h-60 bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
              <span className="text-4xl font-bold text-orange-500">{getHotelInitials()}</span>
            </div>
          </div>
        ) : (
          <img
            src={photoUrl}
            alt={hotel.hotelName}
            className="w-full h-60 object-cover"
            onError={handleImageError}
          />
        )}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md flex items-center">
          <span className="text-orange-800 font-bold">{hotel.rating}</span>
          <span className="text-amber-500 ml-1">★</span>
        </div>
        {hotel.price && (
          <div className="absolute bottom-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-md shadow-md">
            <span className="font-bold">₹{hotel.price}</span>
            <span className="text-xs ml-1">/night</span>
          </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-orange-800">{hotel.hotelName}</h3>
          <div className="flex gap-1">
            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Hotel</span>
            {hotel.amenities?.includes("wifi") && (
              <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">WiFi</span>
            )}
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p className="text-orange-700 text-sm">{hotel.hotelAddress}</p>
          </div>
        </div>

        <div className="bg-orange-50 p-3 rounded-lg mb-4">
          <p className="text-orange-700 text-sm line-clamp-3">{hotel.description}</p>
          {hotel.description && hotel.description.length > 120 && (
            <button className="text-orange-600 text-xs mt-1 font-medium hover:underline">Read more</button>
          )}
        </div>

        <div className="mt-auto">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              hotel.hotelName + ',' + hotel.hotelAddress
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
            </svg>
            View on Map
          </a>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;