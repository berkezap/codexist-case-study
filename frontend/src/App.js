import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';
import MapView from './components/MapView';
import axios from 'axios';
import { LoadScript } from '@react-google-maps/api';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 
  (window.location.hostname === 'localhost' ? 'http://localhost:8070' : 'https://codexist-case-study-g2by.onrender.com');
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [searchLocation, setSearchLocation] = useState(null);

  const handleSearch = async (latitude, longitude, radius) => {
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.get(`${BACKEND_URL}/api/places/nearby`, {
        params: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          radius: parseInt(radius)
        }
      });

      const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      
      if (data.status === 'OK') {
        setResults(data.results || []);
        setSearchLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
      } else if (data.status === 'ZERO_RESULTS') {
        setError('No places found in this location. Try different coordinates or larger radius.');
      } else {
        setError(`API Error: ${data.status} - ${data.error_message || 'Unknown error'}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Nearby Places Search</h1>
        </header>
        <div className="container">
          <div className="error-message">
            Google Maps API key not found. Please set REACT_APP_GOOGLE_MAPS_API_KEY in .env file.
          </div>
        </div>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <div className="App">
        <header className="App-header">
          <h1>Nearby Places Search</h1>
        </header>
        
        <div className="container">
          <SearchForm onSearch={handleSearch} loading={loading} />
          
        {error && <div className="error-message">{error}</div>}
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <span>Searching nearby places...</span>
          </div>
        )}
          
          {results.length > 0 && (
            <div className="results-container">
              <MapView 
                center={searchLocation} 
                places={results}
              />
              <ResultsList results={results} />
            </div>
          )}
        </div>
        
        <footer className="footer">
          <p>Developed by Berke Özşap</p>
          <div>
            <a href="https://github.com/berkezap/codexist-case-study" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://github.com/berkezap" target="_blank" rel="noopener noreferrer">
              Profile
            </a>
          </div>
        </footer>
      </div>
    </LoadScript>
  );
}

export default App;
