// import React, { useState, useEffect } from 'react'
// import { Button } from '../ui/button'
// import { Link } from 'react-router-dom'
// import { Filter, MapPin, Clock, Calendar, Star, Loader2 } from 'lucide-react'
// import ActivityCard from '../tripDetails/ActivityCard'
// import { GetPlaceDetails } from '@/service/GlobalApi'
// import { PHOTO_REF_URL } from '@/service/GlobalApi'


// function Explore() {
//   const [activeFilter, setActiveFilter] = useState('All')
//   const [loading, setLoading] = useState(true)
//   const [trips, setTrips] = useState([])
//   const [featuredActivities, setFeaturedActivities] = useState([])
//   const [photoUrl, setPhotoUrl] = useState();
  
//   const categories = ['All', 'Beach', 'Mountain', 'City', 'Adventure', 'Cultural']

//   useEffect(() => {
//     // Simulating API fetch for trips
//     const fetchTrips = async () => {
//       setLoading(true)
//       // Replace this with your actual API call if available
//       setTimeout(() => {
//         setTrips(sampleTrips)
//         setLoading(false)
//       }, 1000)
//     }

//     // Fetch featured activities
//     const fetchFeaturedActivities = async () => {
//       try {
//         // Sample location queries for demonstration
//         const locations = [
//           { placeName: 'Eiffel Tower', placeDetails: 'Iconic Paris landmark', ticketPricing: '€25', rating: 4.7, timeToTravel: '2 hours' },
//           { placeName: 'Bali Beach Resort', placeDetails: 'Tropical paradise', ticketPricing: 'Free', rating: 4.9, timeToTravel: 'All day' },
//           { placeName: 'Mount Fuji', placeDetails: 'Japan\'s highest peak', ticketPricing: '¥1000', rating: 4.8, timeToTravel: '1 day' }
//         ]
        
//         setFeaturedActivities(locations)
//       } catch (error) {
//         console.error('Error fetching activities:', error)
//       }
//     }

//     fetchTrips()
//     fetchFeaturedActivities()
//   }, [])

//   // Sample trips data
//   const sampleTrips = [
//     {
//       id: 1,
//       title: "Weekend in Paris",
//       category: "City",
//       image: null, // Will be fetched from API
//       duration: "3 days",
//       season: "Spring",
//       rating: 4.9,
//       location: "Paris, France",
//       description: "Experience the romance and charm of the City of Lights with this perfectly crafted weekend itinerary."
//     },
//     {
//       id: 2,
//       title: "Bali Retreat",
//       category: "Beach",
//       image: null,
//       duration: "7 days",
//       season: "Summer",
//       rating: 4.7,
//       location: "Bali, Indonesia",
//       description: "Unwind on pristine beaches and immerse yourself in Balinese culture with this relaxing retreat."
//     },
//     {
//       id: 3,
//       title: "Swiss Alps Skiing",
//       category: "Mountain",
//       image: null,
//       duration: "5 days",
//       season: "Winter",
//       rating: 4.8,
//       location: "Zermatt, Switzerland",
//       description: "Hit the slopes and enjoy breathtaking mountain views in this winter wonderland getaway."
//     },
//     {
//       id: 4,
//       title: "Tokyo Discovery",
//       category: "Cultural",
//       image: null,
//       duration: "6 days",
//       season: "Fall",
//       rating: 4.9,
//       location: "Tokyo, Japan",
//       description: "Navigate the vibrant neighborhoods of Tokyo and experience Japanese traditions and modern innovations."
//     },
//     {
//       id: 5,
//       title: "Costa Rica Exploration",
//       category: "Adventure",
//       image: null,
//       duration: "8 days",
//       season: "Summer",
//       rating: 4.6,
//       location: "Costa Rica",
//       description: "Zip-line through rainforests, hike to waterfalls, and spot exotic wildlife in this adventure-packed trip."
//     },
//     {
//       id: 6,
//       title: "Greek Island Hopping",
//       category: "Beach",
//       image: null,
//       duration: "10 days",
//       season: "Summer",
//       rating: 4.8,
//       location: "Greek Islands",
//       description: "Discover the beauty of Santorini, Mykonos, and more in this Mediterranean island hopping adventure."
//     }
//   ]


  
  
//       useEffect(() => {
//         hotel && GetPlacePhoto();
//       }, [hotel]);
  
//       const GetPlacePhoto = async () => {
//         const data = {
//           textQuery: hotel.hotelName,
//         };
//         const result = await GetPlaceDetails(data).then((resp) => {
//           console.log(resp.data.places[0].photos[3].name);
  
//           const PhotoUrl = PHOTO_REF_URL.replace(
//             "{NAME}",
//             resp.data.places[0].photos[3].name
//           );
//           setPhotoUrl(PhotoUrl);
//         });
//       };
  
//   const filteredTrips = activeFilter === 'All' 
//     ? trips 
//     : trips.filter(trip => trip.category === activeFilter)
  
//   return (
//     <div className="py-16 px-4 bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-12">
//           <div>
//             <h2 className="text-3xl font-bold mb-2">Explore Popular Itineraries</h2>
//             <p className="text-gray-500">Discover expertly crafted itineraries for your next adventure</p>
//           </div>
          
//           <div className="mt-6 md:mt-0">
//             <Button className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 border">
//               <Filter className="h-4 w-4" />
//               Advanced Filters
//             </Button>
//           </div>
//         </div>
        
//         <div className="flex overflow-x-auto pb-4 mb-8 space-x-2 no-scrollbar">
//           {categories.map(category => (
//             <Button
//               key={category}
//               variant={activeFilter === category ? "default" : "outline"}
//               className={`px-6 py-2 rounded-full ${
//                 activeFilter === category 
//                   ? "bg-[#f56551] hover:bg-[#e54531] border-none" 
//                   : "border border-gray-300 hover:border-[#f56551] hover:text-[#f56551]"
//               }`}
//               onClick={() => setActiveFilter(category)}
//             >
//               {category}
//             </Button>
//           ))}
//         </div>
        
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <Loader2 className="h-8 w-8 text-[#f56551] animate-spin" />
//             <span className="ml-2 text-lg">Loading itineraries...</span>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredTrips.map(trip => (
//                 <div key={trip.id} className="rounded-lg overflow-hidden bg-white border border-gray-200 transition-all hover:shadow-lg">
//                   <div className="relative">
//                     {trip.image ? (
//                       <img src={trip.image} alt={trip.title} className="w-full h-48 object-cover" />
//                     ) : (
//                       <img src={`/api/placeholder/600/400?text=${encodeURIComponent(trip.title)}`} alt={trip.title} className="w-full h-48 object-cover" />
//                     )}
//                     <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100">
//                       <Heart className="h-5 w-5 text-gray-600 hover:text-[#f56551]" />
//                     </button>
//                     <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-medium">
//                       {trip.category}
//                     </div>
//                   </div>
                  
//                   <div className="p-5">
//                     <div className="flex items-center mb-2">
//                       <MapPin className="h-4 w-4 text-[#f56551] mr-1" />
//                       <span className="text-sm text-gray-600">{trip.location}</span>
//                     </div>
                    
//                     <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
//                     <p className="text-gray-600 text-sm mb-4">{trip.description}</p>
                    
//                     <div className="flex justify-between items-center mb-4">
//                       <div className="flex items-center">
//                         <Clock className="h-4 w-4 text-gray-500 mr-1" />
//                         <span className="text-sm text-gray-600">{trip.duration}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar className="h-4 w-4 text-gray-500 mr-1" />
//                         <span className="text-sm text-gray-600">{trip.season}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
//                         <span className="text-sm font-medium">{trip.rating}</span>
//                       </div>
//                     </div>
                    
//                     <Link to={`/trip/${trip.id}`}>
//                       <Button className="w-full bg-[#f56551] hover:bg-[#e54531]">
//                         View Itinerary
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <div className="flex justify-center mt-12 mb-16">
//               <Button variant="outline" className="border-2 px-8 py-3 font-medium border-[#f56551] text-[#f56551] hover:bg-[#f56551] hover:text-white">
//                 Load More Itineraries
//               </Button>
//             </div>

//             <div className="mt-16">
//               <h2 className="text-3xl font-bold mb-8">Featured Activities</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {featuredActivities.map((activity, index) => (
//                   <ActivityCard key={index} activity={activity} />
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// // Add Heart icon as it was missing from imports
// const Heart = ({ className }) => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     width="24" 
//     height="24" 
//     viewBox="0 0 24 24" 
//     fill="none" 
//     stroke="currentColor" 
//     strokeWidth="2" 
//     strokeLinecap="round" 
//     strokeLinejoin="round" 
//     className={className}
//   >
//     <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
//   </svg>
// )

// export default Explore







import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Filter, MapPin, Clock, Calendar, Star, Loader2 } from 'lucide-react'
import ActivityCard from '../tripDetails/ActivityCard'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'

function Explore() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [trips, setTrips] = useState([])
  const [featuredActivities, setFeaturedActivities] = useState([])
  
  const categories = ['All', 'Beach', 'Mountain', 'City', 'Adventure', 'Cultural']

  useEffect(() => {
    // Fetch trips and update images
    const fetchTrips = async () => {
      setLoading(true)
      try {
        // First get the sample trips
        const initialTrips = [...sampleTrips];
        
        // Fetch photos for each trip
        const tripsWithPhotos = await Promise.all(
          initialTrips.map(async (trip) => {
            const photoUrl = await fetchPlacePhoto(trip.title);
            return {
              ...trip,
              image: photoUrl
            };
          })
        );
        
        setTrips(tripsWithPhotos);
      } catch (error) {
        console.error('Error fetching trip photos:', error);
        setTrips(sampleTrips); // Fallback to trips without photos
      } finally {
        setLoading(false);
      }
    }

    // Fetch featured activities
    const fetchFeaturedActivities = async () => {
      try {
        // Sample location queries for demonstration
        const locations = [
          { placeName: 'Eiffel Tower', placeDetails: 'Iconic Paris landmark', ticketPricing: '€25', rating: 4.7, timeToTravel: '2 hours' },
          { placeName: 'Bali Beach Resort', placeDetails: 'Tropical paradise', ticketPricing: 'Free', rating: 4.9, timeToTravel: 'All day' },
          { placeName: 'Mount Fuji', placeDetails: 'Japan\'s highest peak', ticketPricing: '¥1000', rating: 4.8, timeToTravel: '1 day' }
        ]
        
        // Fetch photos for each activity
        const activitiesWithPhotos = await Promise.all(
          locations.map(async (activity) => {
            const photoUrl = await fetchPlacePhoto(activity.placeName);
            return {
              ...activity,
              image: photoUrl
            };
          })
        );
        
        setFeaturedActivities(activitiesWithPhotos);
      } catch (error) {
        console.error('Error fetching activities:', error)
        setFeaturedActivities(locations); // Fallback to activities without photos
      }
    }

    fetchTrips()
    fetchFeaturedActivities()
  }, [])

  // Function to fetch place photo using the API
  const fetchPlacePhoto = async (placeName) => {
    try {
      const data = {
        textQuery: placeName,
      };
      
      const response = await GetPlaceDetails(data);
      
      if (response.data?.places?.[0]?.photos?.[0]?.name) {
        const photoName = response.data.places[0].photos[0].name;
        return PHOTO_REF_URL.replace("{NAME}", photoName);
      }
      
      return null; // Return null if no photo available
    } catch (error) {
      console.error(`Error fetching photo for ${placeName}:`, error);
      return null;
    }
  };

  // Sample trips data
  const sampleTrips = [
    {
      id: 1,
      title: "Weekend in Paris",
      category: "City",
      image: null, // Will be fetched from API
      duration: "3 days",
      season: "Spring",
      rating: 4.9,
      location: "Paris, France",
      description: "Experience the romance and charm of the City of Lights with this perfectly crafted weekend itinerary."
    },
    {
      id: 2,
      title: "Bali Retreat",
      category: "Beach",
      image: null,
      duration: "7 days",
      season: "Summer",
      rating: 4.7,
      location: "Bali, Indonesia",
      description: "Unwind on pristine beaches and immerse yourself in Balinese culture with this relaxing retreat."
    },
    {
      id: 3,
      title: "Swiss Alps Skiing",
      category: "Mountain",
      image: null,
      duration: "5 days",
      season: "Winter",
      rating: 4.8,
      location: "Zermatt, Switzerland",
      description: "Hit the slopes and enjoy breathtaking mountain views in this winter wonderland getaway."
    },
    {
      id: 4,
      title: "Tokyo Discovery",
      category: "Cultural",
      image: null,
      duration: "6 days",
      season: "Fall",
      rating: 4.9,
      location: "Tokyo, Japan",
      description: "Navigate the vibrant neighborhoods of Tokyo and experience Japanese traditions and modern innovations."
    },
    {
      id: 5,
      title: "Costa Rica Exploration",
      category: "Adventure",
      image: null,
      duration: "8 days",
      season: "Summer",
      rating: 4.6,
      location: "Costa Rica",
      description: "Zip-line through rainforests, hike to waterfalls, and spot exotic wildlife in this adventure-packed trip."
    },
    {
      id: 6,
      title: "Greek Island Hopping",
      category: "Beach",
      image: null,
      duration: "10 days",
      season: "Summer",
      rating: 4.8,
      location: "Greek Islands",
      description: "Discover the beauty of Santorini, Mykonos, and more in this Mediterranean island hopping adventure."
    }
  ]
  
  const filteredTrips = activeFilter === 'All' 
    ? trips 
    : trips.filter(trip => trip.category === activeFilter)
  
  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Explore Popular Itineraries</h2>
            <p className="text-gray-500">Discover expertly crafted itineraries for your next adventure</p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <Button className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 border">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-4 mb-8 space-x-2 no-scrollbar">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              className={`px-6 py-2 rounded-full ${
                activeFilter === category 
                  ? "bg-[#f56551] hover:bg-[#e54531] border-none" 
                  : "border border-gray-300 hover:border-[#f56551] hover:text-[#f56551]"
              }`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 text-[#f56551] animate-spin" />
            <span className="ml-2 text-lg">Loading itineraries...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map(trip => (
                <div key={trip.id} className="rounded-lg overflow-hidden bg-white border border-gray-200 transition-all hover:shadow-lg">
                  <div className="relative">
                    {trip.image ? (
                      <img src={trip.image} alt={trip.title} className="w-full h-48 object-cover" />
                    ) : (
                      <img src={`/api/placeholder/600/400?text=${encodeURIComponent(trip.title)}`} alt={trip.title} className="w-full h-48 object-cover" />
                    )}
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100">
                      <Heart className="h-5 w-5 text-gray-600 hover:text-[#f56551]" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-medium">
                      {trip.category}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-[#f56551] mr-1" />
                      <span className="text-sm text-gray-600">{trip.location}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{trip.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{trip.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{trip.season}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                        <span className="text-sm font-medium">{trip.rating}</span>
                      </div>
                    </div>
                    
                    <Link to={`/trip/${trip.id}`}>
                      <Button className="w-full bg-[#f56551] hover:bg-[#e54531]">
                        View Itinerary
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-12 mb-16">
              <Button variant="outline" className="border-2 px-8 py-3 font-medium border-[#f56551] text-[#f56551] hover:bg-[#f56551] hover:text-white">
                Load More Itineraries
              </Button>
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8">Featured Activities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredActivities.map((activity, index) => (
                  <ActivityCard key={index} activity={activity} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Add Heart icon as it was missing from imports
const Heart = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
)

export default Explore