// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { toast } from 'sonner'
// import { Button } from '@/components/ui/button'
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'


// function MyTrips() {
//     const [trips, setTrips] = useState([])
//     const [loading, setLoading] = useState(true)
//     const navigate = useNavigate()

//     const [photoUrl, setPhotoUrl] = useState();

    
//     useEffect(() => {
//         const GetUserTrips = async () => {
//             const user = JSON.parse(localStorage.getItem('user'))
//             if (!user) {
//                 navigate('/')
//                 return
//             }
            
//             try {
//                 const response = await axios.get(
//                     `http://localhost:5000/api/trips/user/${user._id}`
//                 )
//                 setTrips(response.data)
//             } catch (error) {
//                 console.error('Error fetching trips:', error)
//                 toast.error(error.response?.data?.message || 'Failed to load trips')
//             } finally {
//                 setLoading(false)
//             }
//         }
        
//         GetUserTrips()
//     }, [navigate])
    
//     useEffect(() => {
//       trips && GetPlacePhoto();
//     }, [trips]);

//     const GetPlacePhoto = async () => {
//       const data = {
//         textQuery: trips.location,
//       };
//       const result = await GetPlaceDetails(data).then((resp) => {
//         console.log(resp.data.places[0].photos[3].name);

//         const PhotoUrl = PHOTO_REF_URL.replace(
//           "{NAME}",
//           resp.data.places[0].photos[3].name
//         );
//         setPhotoUrl(PhotoUrl);
//       });
//     };
//     return (
//         <div className="p-8 max-w-7xl mx-auto">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold">My Trips</h1>
//                 <Button onClick={() => navigate('/create-trip')}>
//                     Create New Trip
//                 </Button>
//             </div>

//             {loading ? (
//                 <div className="text-center py-8">Loading your trips...</div>
//             ) : trips.length === 0 ? (
//                 <div className="text-center text-gray-500 mt-10">
//                     No trips found. Start by creating your first trip!
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {trips.map((trip) => (
//                         <div 
//                             key={trip._id}
//                             className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
//                             onClick={() => navigate(`/trip/${trip._id}`)}
//                         >
//                             <div className="h-48 bg-gray-100 flex items-center justify-center">
//                                 {photoUrl ? (
//                                     <img 
//                                         src={photoUrl}
//                                         alt={trip.location}
//                                         className="w-full h-full object-cover"
//                                         loading="lazy"
//                                     />
//                                 ) : (
//                                     <div className="text-gray-400 text-sm">
//                                         Image not available
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="p-4">
//                                 <h3 className="text-xl font-semibold mb-2">
//                                     {trip.location}
//                                 </h3>
//                                 <div className="flex justify-between text-sm text-gray-600 mb-2">
//                                     <span>📅 {trip.noOfDays} days</span>
//                                     <span>💰 {trip.budget}</span>
//                                 </div>
//                                 <div className="text-sm text-gray-500">
//                                     🧳 {trip.travelType} trip
//                                 </div>
//                                 <div className="text-xs text-gray-400 mt-2">
//                                     Created: {new Date(trip.createdAt).toLocaleDateString()}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default MyTrips



import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'

function MyTrips() {
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(true)
    const [photoUrls, setPhotoUrls] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTripsAndPhotos = async () => {
            const user = JSON.parse(localStorage.getItem('user'))
            if (!user) {
                navigate('/')
                return
            }

            try {
                // Fetch user trips
                const tripsResponse = await axios.get(
                    `http://localhost:5000/api/trips/user/${user._id}`
                )
                const tripsData = tripsResponse.data
                setTrips(tripsData)

                // Fetch photos for all trips
                const photos = await Promise.all(
                    tripsData.map(async (trip) => {
                        try {
                            const placeResponse = await GetPlaceDetails({
                                textQuery: trip.location
                            })
                            
                            const firstPhoto = placeResponse.data.places?.[0]?.photos?.[0]
                            return {
                                tripId: trip._id,
                                url: firstPhoto 
                                    ? PHOTO_REF_URL.replace("{NAME}", firstPhoto.name)
                                    : null
                            }
                        } catch (error) {
                            console.error(`Photo fetch failed for ${trip.location}:`, error)
                            return {
                                tripId: trip._id,
                                url: null
                            }
                        }
                    })
                )

                // Convert array to object map
                const urlMap = photos.reduce((acc, curr) => {
                    acc[curr.tripId] = curr.url
                    return acc
                }, {})
                
                setPhotoUrls(urlMap)
                
            } catch (error) {
                console.error('Error loading trips:', error)
                toast.error(error.response?.data?.message || 'Failed to load trips')
            } finally {
                setLoading(false)
            }
        }

        fetchTripsAndPhotos()
    }, [navigate])

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Trips</h1>
                <Button onClick={() => navigate('/create-trip')}>
                    Create New Trip
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-8">
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                </div>
            ) : trips.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    No trips found. Start by creating your first trip!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip) => (
                        <div 
                            key={trip._id}
                            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                            onClick={() => navigate(`/trip/${trip._id}`)}
                        >
                            <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                                {photoUrls[trip._id] ? (
                                    <>
                                        <img 
                                            src={photoUrls[trip._id]}
                                            alt={trip.location}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = '/placeholder-image.jpg'
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center text-gray-400">
                                        <svg 
                                            className="w-12 h-12 mb-2"
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                            />
                                        </svg>
                                        <span className="text-sm">Image not available</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                    {trip.location}
                                </h3>
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span className="flex items-center gap-1">
                                        <svg 
                                            className="w-4 h-4"
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                            />
                                        </svg>
                                        {trip.noOfDays} days
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg 
                                            className="w-4 h-4"
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                                            />
                                        </svg>
                                        {trip.budget}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 flex items-center gap-1">
                                    <svg 
                                        className="w-4 h-4"
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                                        />
                                    </svg>
                                    {trip.travelType} trip
                                </div>
                                <div className="text-xs text-gray-400 mt-2">
                                    Created: {new Date(trip.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyTrips