// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button"; // Adjust import path as needed

// import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";


// const ActivityCard = ({ activity }) => {
  // const [photoUrl, setPhotoUrl] = useState();

  // useEffect(() => {
  //   activity && GetPlacePhoto();
  // }, [activity]);

  // const GetPlacePhoto = async () => {
  //   const data = {
  //     textQuery: activity.placeName,
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
//         alt={activity.placeName}
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <h4 className="text-lg font-bold text-gray-800">
//           {activity.placeName}
//         </h4>
//         <p className="text-gray-500">{activity.placeDetails}</p>
//         <p className="text-gray-600">
//           <strong>Ticket Pricing:</strong> {activity.ticketPricing}
//         </p>
//         <p className="text-gray-600">
//           <strong>Rating:</strong> {activity.rating} / 5
//         </p>
//         <p className="text-gray-600">
//           <strong>Time to Travel:</strong> {activity.timeToTravel}
//         </p>
//         <Link
//           to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//             activity.placeName
//           )}`}
//           target="_blank"
//         >
//           <Button>Navigating</Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ActivityCard;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

const ActivityCard = ({ activity }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (activity) {
      GetPlacePhoto();
    }
  }, [activity]);

  const GetPlacePhoto = async () => {
    try {
      setIsLoading(true);
      
      const data = {
        textQuery: activity.placeName,
      };
      
      const result = await GetPlaceDetails(data);
      console.log("API response:", result.data);
console.log("Photos array:", result.data.places?.[0]?.photos);
console.log("Photo name:", result.data.places?.[0]?.photos?.[3]?.name);

if (result.data.places && 
  result.data.places[0]?.photos && 
  result.data.places[0].photos.length > 3) {
    const photoName = result.data.places[0].photos[3].name;
    const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
    console.log("Constructed URL:", PHOTO_REF_URL.replace("{NAME}", photoName));
    setPhotoUrl(photoUrl);
  } else {
    // Reset photoUrl if no image is available
    setPhotoUrl("");
  }
} catch (error) {
  console.error("Error fetching place photo:", error);
  setPhotoUrl("");
} finally {
  setIsLoading(false);
}
};

  const fallbackStyle = {
    backgroundImage: "url('/images/travel-background.jpg')", // Replace with your actual fallback image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  };

  // Overlay for text visibility on the fallback background
  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-orange-200 h-full flex flex-col">
      <div className="h-48 overflow-hidden relative">
        {isLoading ? (
          <div className="bg-orange-100 animate-pulse h-full w-full"></div>
        ) : photoUrl ? (
          <img
            src={photoUrl}
            alt={activity.placeName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div style={fallbackStyle} className="h-full w-full">
            <div style={overlayStyle}>
              <div className="text-center text-white px-4">
                <p className="font-semibold">{activity.placeName}</p>
                <p className="text-sm opacity-80">Explore this destination</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg mb-2 text-orange-800">{activity.placeName}</h3>
        <p className="text-orange-700 mb-3 text-sm">{activity.placeDetails}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-orange-50 p-2 rounded">
            <p className="text-xs font-medium text-orange-600">TICKET PRICE</p>
            <p className="font-medium text-orange-900">{activity.ticketPricing}</p>
          </div>
          <div className="bg-amber-50 p-2 rounded">
            <p className="text-xs font-medium text-orange-600">RATING</p>
            <div className="flex items-center">
              <span className="font-medium text-orange-900">{activity.rating}/5</span>
              <span className="text-amber-500 ml-1">★</span>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-100 p-2 rounded mb-4">
          <p className="text-xs font-medium text-orange-600">TIME TO TRAVEL</p>
          <p className="font-medium text-orange-900">{activity.timeToTravel}</p>
        </div>
      </div>
      
      <div className="px-4 pb-4">
          <Link
           to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
             activity.placeName
           )}`}
           target="_blank"
          >
           <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
          </svg>
          Navigate
        </Button>
         </Link>
      </div>
    </div>
  );
};

export default ActivityCard;