import React from 'react';
import ActivityCard from './ActivityCard';

const ItineraryDay = ({ day, details }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-800 capitalize">{day}</h3>
      <p className="text-gray-600"><strong>Theme:</strong> {details.theme}</p>
      <p className="text-gray-600 mb-4">
        <strong>Best Time to Visit:</strong> {details.bestTimeToVisit}
      </p>
      <div className="space-y-6">
        {details.activities.map((activity, idx) => (
          <ActivityCard key={idx} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ItineraryDay;