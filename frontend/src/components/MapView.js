import React from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import './MapView.css';

const containerStyle = {
  width: '100%',
  height: '500px'
};

function MapView({ center, places }) {
  const [selectedPlace, setSelectedPlace] = React.useState(null);

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
          {/* Center marker (search location) */}
          <Marker
            position={center}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }}
          />

          {/* Place markers */}
          {places.map((place) => {
            const position = {
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng
            };

            return (
              <Marker
                key={place.place_id}
                position={position}
                onClick={() => setSelectedPlace(place)}
              />
            );
          })}

          {/* Info window for selected place */}
          {selectedPlace && (
            <InfoWindow
              position={{
                lat: selectedPlace.geometry.location.lat,
                lng: selectedPlace.geometry.location.lng
              }}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <h3>{selectedPlace.name}</h3>
                <p>{selectedPlace.vicinity}</p>
                {selectedPlace.rating && (
                  <p>⭐ {selectedPlace.rating}</p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
    </div>
  );
}

export default MapView;


