import React from 'react';

interface LocationMapProps {
  lat: number | string;
  lng: number | string;
  height?: number | string;
  zoom?: number;
  className?: string;
  title?: string;
}

/**
 * LocationMap
 * Shows a static Google Maps iframe centered at the given coordinates.
 * @param lat Latitude
 * @param lng Longitude
 * @param height Height of the map (default: 250)
 * @param zoom Zoom level (default: 15)
 * @param className Optional className for the wrapper div
 */
const LocationMap: React.FC<LocationMapProps> = ({
  lat,
  lng,
  height = 300,
  zoom = 15,
  className = '',
  title = 'Location Map',
}) => {
  if (!lat || !lng) return null;
  return (
    <div className={`rounded overflow-hidden border ${className}`}>
      <iframe
        title={title}
        width="100%"
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
      />
    </div>
  );
};

export default LocationMap;
