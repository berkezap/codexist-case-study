import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch, loading }) {
  const [latitude, setLatitude] = useState('41.0082');
  const [longitude, setLongitude] = useState('28.9784');
  const [radius, setRadius] = useState('1000');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!latitude || !longitude || !radius) {
      alert('Please fill all fields');
      return;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const rad = parseInt(radius);

    if (lat < -90 || lat > 90) {
      alert('Latitude must be between -90 and 90');
      return;
    }

    if (lng < -180 || lng > 180) {
      alert('Longitude must be between -180 and 180');
      return;
    }

    if (rad <= 0) {
      alert('Radius must be positive');
      return;
    }

    onSearch(latitude, longitude, radius);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="latitude">Latitude</label>
        <input
          type="number"
          id="latitude"
          step="any"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="e.g. 41.0082"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="longitude">Longitude</label>
        <input
          type="number"
          id="longitude"
          step="any"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="e.g. 28.9784"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="radius">Radius (meters)</label>
        <input
          type="number"
          id="radius"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          placeholder="e.g. 1000"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchForm;


