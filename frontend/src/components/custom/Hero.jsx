// import React from 'react'
// import { Button } from '../ui/button'
// import { Link } from 'react-router-dom'

// function Hero() {
//   return (
//     <div className='flex items-center mx-56 gap-9 flex-col'>
//       <h1 className='font-extrabold text-[60px] text-center mt-16'>
//         <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Iterneraries at your fingertips

//       </h1>
//       <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget. </p>
//       <Link to='/create-trip'>
//         <Button>Get Started</Button>
//       </Link>
//     </div>
//   )
// }

// export default Hero

import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Sparkles } from "lucide-react";
import parisImage from '../../assets/paris.jpg';
import baliImage from '../../assets/bali.jpg';
import tokyoImage from '../../assets/tokyo.jpg';
import newYorkImage from '../../assets/new-york.jpg'


function Hero() {


  const cityImages = {
    'Paris': parisImage,
    'Bali': baliImage,
    'Tokyo': tokyoImage,
    'New York': newYorkImage
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
          <span className="text-[#f56551] block mb-2">
            Discover Your Next Adventure with AI
          </span>
          <span className="text-gray-800">
            Personalized Itineraries at Your Fingertips
          </span>
        </h1>

        <p className="mx-auto mb-8 text-lg text-gray-500 max-w-2xl md:text-xl">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link to="/create-trip">
            <Button className="px-6 py-3 text-base font-medium transition-all bg-[#f56551] hover:bg-[#e54531] hover:scale-105 md:px-8 md:py-4 md:text-lg">
              Create Your Trip
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link to="/explore">
            <Button
              variant="outline"
              className="px-6 py-3 text-base font-medium border-2 hover:bg-gray-50 border-gray-300 hover:border-[#f56551] hover:text-[#f56551] md:px-8 md:py-4 md:text-lg"
            >
              Explore Itineraries
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 px-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-center gap-3 p-4">
            <div className="p-3 rounded-full bg-[#ffeae8]">
              <MapPin className="h-6 w-6 text-[#f56551]" />
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold text-gray-800">100+</p>
              <p className="text-gray-500">Popular Destinations</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4">
            <div className="p-3 rounded-full bg-[#ffeae8]">
              <Calendar className="h-6 w-6 text-[#f56551]" />
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold text-gray-800">5k+</p>
              <p className="text-gray-500">Trips Created</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4">
            <div className="p-3 rounded-full bg-[#ffeae8]">
              <Sparkles className="h-6 w-6 text-[#f56551]" />
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold text-gray-800">24/7</p>
              <p className="text-gray-500">AI Assistance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mt-12 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Destinations</h2>
          <Link
            to="/explore"
            className="text-[#f56551] hover:underline font-medium flex items-center"
          >
            See all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(cityImages).map(([city, imageSrc], index) => (
        <div key={index} className="relative rounded-lg overflow-hidden group cursor-pointer">
          <img
            src={imageSrc}
            alt={city}
            className="w-full h-32 md:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <span className="text-white font-medium p-3">{city}</span>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
}

export default Hero;
