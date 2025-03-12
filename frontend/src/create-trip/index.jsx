// import React, { use } from 'react'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
// import { useState } from 'react'
// import { Input } from '@/components/ui/input';
// import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
// import { Button } from '@/components/ui/button';
// import { useEffect } from 'react';
// import { toast } from 'sonner';
// import { chatSession } from '@/service/AIModal';
// import { FcGoogle } from "react-icons/fc";

// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//   } from "@/components/ui/dialog"
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
  


// const CreateTrip = () => {
//     const [place, setPlace] = useState(null);
//     const [openDailog, setOpenDailog] = useState(false);
//     const[formData, setFormData] = useState({});
//     const handleInputChange = (name,value) => {
//         setFormData({
//             ...formData,
//             [name]:value
//         })
//     }

//     useEffect(()=>{
//         console.log(formData)
//     },[formData])

//     const login = useGoogleLogin({
//         onSuccess: (response) => GetUserProfile(response),
//         onError: (error) => console.log(error),
//     })

//     const OnGenerateTrip=async()=>{

//         const user = localStorage.getItem('user');

//         if(!user){
//             setOpenDailog(true);
//             return;
//         }

//         if(formData?.noOfDays>5 && !formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.travelType){
//             toast('Please fill all the fields')
//             return 
//         }
//         const FINAL_PROMPT = AI_PROMPT.replace('{location}',formData.location.label)
//         .replace('{noOfDays}',formData.noOfDays)
//         .replace('{budget}',formData.budget)
//         .replace('{travelType}',formData.travelType)
//         .replace('{noOfDays}',formData.noOfDays)
//         console.log(FINAL_PROMPT)

//         const result = await chatSession.sendMessage(FINAL_PROMPT)
//         console.log(result.response.text())
//     }

//     const GetUserProfile = (tokenInfo)=>{
//         axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,{

//             headers:{
//                 Authorization:`Bearer ${tokenInfo?.access_token}`,
//                 Accept:'Application/json'
//             }
//         }).then((res)=>{
//             console.log(res.data)
//             localStorage.setItem('user',JSON.stringify(res.data))
//             setOpenDailog(false)
//             OnGenerateTrip()
            
//         }).catch((err)=>{
//             console.log(err)
//         })
//     }


//   return (
//     <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
//         <h2 className='text-3xl font-bold'>Tell us your travel preferences 🏕️🌴</h2>
//         <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
        
//         <div className='mt-20'>
//             <div>
//                 <h2 className='text-xl my-3 font-medium'>What is destination of choice?
//                 </h2>
//                 <GooglePlacesAutocomplete
//                     apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//                     selectProps={{
//                             place,
//                             onChange:(v)=>{setPlace(v);
//                             handleInputChange('location',v)
//                             }
                        
//                         }
//                     }
//                 />
//             </div>

//             <div>
//                 <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?
//                 </h2>
//                 <Input placeholder='Enter number of days' type='number'
//                     onChange={(e)=>handleInputChange('noOfDays',e.target.value)} />
//             </div>

//             {/* <div>
//                 <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2
             
//             </div> */}
//             <div>
//             <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
//                 <div className='grid grid-cols-3 gap-5 mt-5'>
//                     {SelectBudgetOptions.map((item,index)=>(
//                             <div key={index} 
//                             onClick={(e)=>handleInputChange('budget',item.title)}
//                             className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formData.budget == item.title ? "shadow-lg border-black" : ""}`}>
//                                 <h2 className='text-4xl'>{item.icon}</h2>
//                                 <h2 className='font-bold text-lg'>{item.title}</h2>
//                                 <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//                             </div>
//                     ))}
//                 </div>
//             </div>
//             <div>
//                 <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
//                 <div className='grid grid-cols-3 gap-5 mt-5'>
//                     {SelectTravelsList.map((item,index)=>(
//                             <div key={index} 
//                             onClick={(e)=>handleInputChange('travelType',item.people)}
//                             className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formData.travelType  == item.people ? "shadow-lg border-black" : ""}`}>
//                                 <h2 className='text-4xl'>{item.icon}</h2>
//                                 <h2 className='font-bold text-lg'>{item.title}</h2>
//                                 <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//                             </div>
//                     ))}
//                 </div>
//             </div>
//         </div>

//         <div className='my-10 justify-end flex'>

//             <Button onClick={OnGenerateTrip} >Generate Trip</Button>
//         </div>

//         <Dialog open={openDailog}>
            
//             <DialogContent>
//                 <DialogHeader>
                
//                 <DialogDescription>
//                     <img src="/logo.svg"/>
//                     <h2 className='fond-bold text-lg mt-7'>Sign in with Google</h2>
//                     <p >Sing in to the app with google authentication security </p>
//                     <Button
//                     onClick={login} 
//                     className="w-full mt-5 flex gap-4 items-center">
                        
//                         <FcGoogle/> Sign In With Google </Button>
//                 </DialogDescription>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>


//     </div>
//   )
// }

// export default CreateTrip


// import React, { useState, useEffect } from 'react';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import { Input } from '@/components/ui/input';
// import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import { FcGoogle } from 'react-icons/fc';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
// } from '@/components/ui/dialog';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { chatSession } from '@/service/AIModal'; // Assuming this is your Gemini setup

// const CreateTrip = () => {
//   const [place, setPlace] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Handle input changes for form fields
//   const handleInputChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Log form data for debugging (optional)
//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

//   // Google OAuth login handler
//   const login = useGoogleLogin({
//     onSuccess: (response) => GetUserProfile(response),
//     onError: (error) => console.log(error),
//   });

//   // Fetch user profile from Google and save to backend
//   const GetUserProfile = (tokenInfo) => {
//     axios
//       .get(
//         `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenInfo?.access_token}`,
//             Accept: 'Application/json',
//           },
//         }
//       )
//       .then((res) => {
//         // Send user data to backend
//         const userData = {
//             googleId: res.data.id,  // Google returns 'id', your model expects 'googleId'
//             name: res.data.name,
//             email: res.data.email,
//             picture: res.data.picture
//           };
//         axios
//           .post('http://localhost:5000/api/users', userData)
//           .then((response) => {
//             localStorage.setItem('user', JSON.stringify(response.data));
//             setOpenDialog(false);
//             OnGenerateTrip(); // Generate trip after saving user
//           })
//           .catch((err) => {
//             console.error('Error saving user to backend:', err);
//             toast('Failed to save user');
//           });
//       })
//       .catch((err) => {
//         console.error('Error fetching user profile:', err);
//         toast('Failed to fetch user profile');
//       });
//   };

//   // Generate and save the trip
//   const OnGenerateTrip = async () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user) {
//       setOpenDialog(true); // Prompt sign-in if no user
//       return;
//     }

//     // Validate form inputs
//     if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.travelType) {
//       toast('Please fill all the fields');
//       return;
//     }

//     setLoading(true);
//     const FINAL_PROMPT = AI_PROMPT.replace('{location}', formData.location.label)
//       .replace('{noOfDays}', formData.noOfDays)
//       .replace('{budget}', formData.budget)
//       .replace('{travelType}', formData.travelType)
//       .replace('{noOfDays}', formData.noOfDays);

//     try {
//       // Generate trip using Gemini
//       const result = await chatSession.sendMessage(FINAL_PROMPT);
//       const tripData = JSON.parse(result.response.text()); // Parse Gemini response

//       // Save trip to backend
//       const response = await axios.post('http://localhost:5000/api/trips', {
//         userId: user._id,
//         location: formData.location.label,
//         noOfDays: formData.noOfDays,
//         budget: formData.budget,
//         travelType: formData.travelType,
//         itinerary: tripData,
//       });

//       console.log('Trip saved successfully:', response.data);
//       toast('Trip generated and saved successfully!');
//       // Optionally redirect or display itinerary
//     } catch (error) {
//       console.error('Error generating or saving trip:', error);
//       toast('Failed to generate or save trip');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
//       <h2 className="text-3xl font-bold">Tell us your travel preferences 🏕️🌴</h2>
//       <p className="mt-3 text-gray-500 text-xl">
//         Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
//       </p>

//       <div className="mt-20">
//         {/* Destination Input */}
//         <div>
//           <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
//           <GooglePlacesAutocomplete
//             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//             selectProps={{
//               place,
//               onChange: (v) => {
//                 setPlace(v);
//                 handleInputChange('location', v);
//               },
//             }}
//           />
//         </div>

//         {/* Number of Days Input */}
//         <div>
//           <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
//           <Input
//             placeholder="Enter number of days"
//             type="number"
//             onChange={(e) => handleInputChange('noOfDays', e.target.value)}
//           />
//         </div>

//         {/* Budget Selection */}
//         <div>
//           <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
//           <div className="grid grid-cols-3 gap-5 mt-5">
//             {SelectBudgetOptions.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleInputChange('budget', item.title)}
//                 className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${
//                   formData.budget === item.title ? 'shadow-lg border-black' : ''
//                 }`}
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg">{item.title}</h2>
//                 <h2 className="text-sm text-gray-500">{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Travel Type Selection */}
//         <div>
//           <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with?</h2>
//           <div className="grid grid-cols-3 gap-5 mt-5">
//             {SelectTravelsList.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleInputChange('travelType', item.people)}
//                 className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${
//                   formData.travelType === item.people ? 'shadow-lg border-black' : ''
//                 }`}
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg">{item.title}</h2>
//                 <h2 className="text-sm text-gray-500">{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Generate Trip Button */}
//       <div className="my-10 justify-end flex">
//         <Button onClick={OnGenerateTrip} disabled={loading}>
//           {loading ? 'Generating...' : 'Generate Trip'}
//         </Button>
//       </div>

//       {/* Sign-In Dialog */}
//       <Dialog open={openDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogDescription>
//               <img src="/logo.svg" alt="Logo" />
//               <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
//               <p>Sign in to the app with Google authentication securely</p>
//               <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
//                 <FcGoogle /> Sign In With Google
//               </Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default CreateTrip;









import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { chatSession } from '@/service/AIModal';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle input changes for form fields
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Log form data for debugging (optional)
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // Google OAuth login handler
  const login = useGoogleLogin({
    onSuccess: (response) => GetUserProfile(response),
    onError: (error) => console.log(error),
  });

  // Fetch user profile from Google and save to backend
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'Application/json',
          },
        }
      )
      .then((res) => {
        const userData = {
          googleId: res.data.id,
          name: res.data.name,
          email: res.data.email,
          picture: res.data.picture,
        };
        axios
          .post('http://localhost:5000/api/users', userData)
          .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            setOpenDialog(false);
            OnGenerateTrip(); // Generate trip after saving user
          })
          .catch((err) => {
            console.error('Error saving user to backend:', err);
            toast('Failed to save user');
          });
      })
      .catch((err) => {
        console.error('Error fetching user profile:', err);
        toast('Failed to fetch user profile');
      });
  };

  // Generate and save the trip, then redirect
  const OnGenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setOpenDialog(true); // Prompt sign-in if no user
      return;
    }

    // Validate form inputs
    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.travelType) {
      toast('Please fill all the fields');
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace('{location}', formData.location.label)
      .replace('{noOfDays}', formData.noOfDays)
      .replace('{budget}', formData.budget)
      .replace('{travelType}', formData.travelType)
      .replace('{noOfDays}', formData.noOfDays);

    try {
      // Generate trip using Gemini
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripData = JSON.parse(result.response.text());

      // Save trip to backend
      const response = await axios.post('http://localhost:5000/api/trips', {
        userId: user._id,
        location: formData.location.label,
        noOfDays: formData.noOfDays,
        budget: formData.budget,
        travelType: formData.travelType,
        itinerary: tripData,
      });

      console.log('Trip saved successfully:', response.data);
      toast('Trip generated and saved successfully!');

      // Redirect to trip details page with trip data
      const savedTrip = response.data;
      navigate(`/trip/${savedTrip._id}`, { state: { tripData: savedTrip } });
    } catch (error) {
      console.error('Error generating or saving trip:', error);
      toast('Failed to generate or save trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="text-3xl font-bold">Tell us your travel preferences 🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
            }}
          />
        </div>

        {/* Number of Days Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input
            placeholder="Enter number of days"
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${
                  formData.budget === item.title ? 'shadow-lg border-black' : ''
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Type Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('travelType', item.people)}
                className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${
                  formData.travelType === item.people ? 'shadow-lg border-black' : ''
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className="my-10 justify-end flex">
        <Button onClick={OnGenerateTrip} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Trip'}
        </Button>
      </div>

      {/* Sign-In Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to the app with Google authentication securely</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;