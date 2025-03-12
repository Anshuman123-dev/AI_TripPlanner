import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Adjust import path as needed

import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";


const ActivityCard = ({ activity }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    activity && GetPlacePhoto();
  }, [activity]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: activity.placeName,
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
        alt={activity.placeName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h4 className="text-lg font-bold text-gray-800">
          {activity.placeName}
        </h4>
        <p className="text-gray-500">{activity.placeDetails}</p>
        <p className="text-gray-600">
          <strong>Ticket Pricing:</strong> {activity.ticketPricing}
        </p>
        <p className="text-gray-600">
          <strong>Rating:</strong> {activity.rating} / 5
        </p>
        <p className="text-gray-600">
          <strong>Time to Travel:</strong> {activity.timeToTravel}
        </p>
        <Link
          to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            activity.placeName
          )}`}
          target="_blank"
        >
          <Button>Navigating</Button>
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
