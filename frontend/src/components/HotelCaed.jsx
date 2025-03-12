import React from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { useState } from 'react';
import { useEffect } from 'react';

const HotelCard = ({ hotel }) => {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
      hotel && GetPlacePhoto();
    }, [hotel]);

    const GetPlacePhoto = async () => {
      const data = {
        textQuery: hotel.hotelName,
      };
      const result = await GetPlaceDetails(data).then((resp) => {
        console.log(resp.data.places[0].photos[3].name);

        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        );
        setPhotoUrl(PhotoUrl);
      });
    };



  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={photoUrl}
        alt={hotel.hotelName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{hotel.hotelName}</h3>
        <p className="text-gray-600">
          <strong>Address:</strong> {hotel.hotelAddress}
        </p>
        <p className="text-gray-600">
          <strong>Price:</strong> ₹{hotel.price}
        </p>
        <p className="text-gray-600">
          <strong>Rating:</strong> {hotel.rating} / 5
        </p>
        <p className="text-gray-500 mt-2">{hotel.description}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            hotel.hotelName + ',' + hotel.hotelAddress
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-200 inline-block mt-2 px-3 py-1 rounded"
        >
          Location in map
        </a>
      </div>
    </div>
  );
};

export default HotelCard;