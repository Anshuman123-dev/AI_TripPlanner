// import React from 'react';
// import ActivityCard from './ActivityCard';

// const ItineraryDay = ({ day, details }) => {
//   return (
//     <div className="mb-8">
//       <h3 className="text-xl font-bold text-gray-800 capitalize">{day}</h3>
//       <p className="text-gray-600"><strong>Theme:</strong> {details.theme}</p>
//       <p className="text-gray-600 mb-4">
//         <strong>Best Time to Visit:</strong> {details.bestTimeToVisit}
//       </p>
//       <div className="space-y-6">
//         {details.activities.map((activity, idx) => (
//           <ActivityCard key={idx} activity={activity} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ItineraryDay;





import React from 'react';
import ActivityCard from './ActivityCard';

const ItineraryDay = ({ day, details }) => {
  return (
    <div className="mb-8 border rounded-lg overflow-hidden shadow-md">
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4">
        <h2 className="text-2xl font-bold text-white">{day}</h2>
      </div>
      
      <div className="p-4 bg-white">
        <div className="mb-4">
          <div className="flex flex-wrap gap-4">
            <div className="bg-orange-50 p-3 rounded-lg flex items-center">
              <span className="font-semibold mr-2 text-orange-700">Theme:</span> 
              <span className="text-orange-900">{details.theme}</span>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg flex items-center">
              <span className="font-semibold mr-2 text-orange-700">Best Time to Visit:</span> 
              <span className="text-orange-900">{details.bestTimeToVisit}</span>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-3 text-orange-800">Activities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {details.activities.map((activity, idx) => (
            <ActivityCard key={idx} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDay;