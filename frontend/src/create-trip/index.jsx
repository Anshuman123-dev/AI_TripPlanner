









import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { chatSession } from "@/service/AIModal";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
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
          .post(`${API_URL}/api/users`, userData)
          .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            setOpenDialog(false);
            OnGenerateTrip();
          })
          .catch((err) => {
            console.error("Error saving user to backend:", err);
            toast("Failed to save user");
          });
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        toast("Failed to fetch user profile");
      });
  };

  // Generate trip data and redirect without saving to DB
  const OnGenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setOpenDialog(true); // Prompt sign-in if no user
      return;
    }

    // Validate form inputs
    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.travelType
    ) {
      toast("Please fill all the fields");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData.location.label
    )
      .replace("{noOfDays}", formData.noOfDays)
      .replace("{budget}", formData.budget)
      .replace("{travelType}", formData.travelType)
      .replace("{noOfDays}", formData.noOfDays);

    try {
      // Generate trip using AI
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const aiTripData = JSON.parse(result.response.text());

      // Structure trip data to match backend schema
      const trip = {
        location: formData.location.label,
        noOfDays: formData.noOfDays,
        budget: formData.budget,
        travelType: formData.travelType,
        itinerary: aiTripData,
      };

      // Redirect to TripDetails page with trip data in state
      navigate("/trip/new", { state: { trip } });
      toast("Trip generated successfully!");
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 shadow-sm mb-8">
        <h1 className="text-4xl font-bold text-orange-900">
          Plan Your Sunset Adventure 🌅
        </h1>
        <p className="mt-3 text-orange-700 text-xl font-light">
          Tell us what you're looking for, and we'll craft the perfect itinerary
          just for you.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="space-y-10">

          {/* Destination Input */}
          <div className="transition-all duration-300 hover:bg-gray-50 p-4 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600 mr-3">1</span>
            Where to? 🗺️
            </h2>
            <div className="ml-11">

            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
                placeholder: "Search for a destination...",
                styles: {
                  control: (provided) => ({
                    ...provided,
                    borderRadius: '0.5rem',
                    padding: '0.25rem',
                    borderColor: '#e2e8f0',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#cbd5e1'
                    }
                  }),
                  menu: (provided) => ({
                    ...provided,
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  })
                }
              }}
              />
              </div>
          </div>

          {/* Number of Days Input */}
          <div className="transition-all duration-300 hover:bg-gray-50 p-4 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600 mr-3">2</span>
              How many days? 📅
            </h2>
            <div className="ml-11">
              <Input
                placeholder="Enter number of days"
                type="number"
                min="1"
                max="30"
                className="rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                onChange={(e) => handleInputChange('noOfDays', e.target.value)}
              />
            </div>
          </div>

          {/* Budget Selection */}
          <div className="transition-all duration-300 hover:bg-gray-50 p-4 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600 mr-3">3</span>
              What's your budget? 💰
            </h2>
            <div className="ml-11">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SelectBudgetOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange('budget', item.title)}
                    className={`p-5 cursor-pointer rounded-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                      formData.budget === item.title 
                        ? 'shadow-md border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-5xl text-center mb-3">{item.icon}</div>
                    <h3 className="font-bold text-lg text-center text-gray-800">{item.title}</h3>
                    <p className="text-sm text-center text-gray-500 mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Travel Type Selection */}
          <div className="transition-all duration-300 hover:bg-gray-50 p-4 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600 mr-3">4</span>
              Who are you traveling with? 👪
            </h2>
            <div className="ml-11">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SelectTravelsList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange('travelType', item.people)}
                    className={`p-5 cursor-pointer rounded-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                      formData.travelType === item.people 
                        ? 'shadow-md border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-5xl text-center mb-3">{item.icon}</div>
                    <h3 className="font-bold text-lg text-center text-gray-800">{item.title}</h3>
                    <p className="text-sm text-center text-gray-500 mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Generate Trip Button */}
        <div className="mt-12 flex justify-center">
          <Button 
            onClick={OnGenerateTrip} 
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-md transition-all duration-300 hover:shadow-lg flex items-center gap-2"
          >
            {loading ? 
              "Crafting your adventure..." : 
              "Create My Adventure 🧳"
            }
          </Button>
        </div>
      </div>

      {/* Sign-In Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to the app with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
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