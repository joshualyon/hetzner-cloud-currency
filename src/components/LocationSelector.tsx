import React from 'react';
import { MapPin } from 'lucide-react';
import { Location } from '../types';

interface Props {
  locations: Location[];
  selectedLocation: Location;
  onLocationChange: (location: Location) => void;
}

export function LocationSelector({ locations, selectedLocation, onLocationChange }: Props) {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <MapPin className="w-5 h-5 text-gray-600" />
      <select
        className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        value={selectedLocation.id}
        onChange={(e) => {
          const location = locations.find((loc) => loc.id === e.target.value);
          if (location) onLocationChange(location);
        }}
      >
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
}