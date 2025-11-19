import React from 'react';
import './ResultsList.css';

function ResultsList({ results }) {
  return (
    <div className="results-list">
      <h2>Found {results.length} places</h2>
      <div className="places-grid">
        {results.map((place, index) => (
          <div key={place.place_id || index} className="place-card">
            <h3>{place.name}</h3>
            <p className="address">{place.vicinity}</p>
            {place.rating && (
              <p className="rating">
                ⭐ {place.rating} ({place.user_ratings_total} reviews)
              </p>
            )}
            {place.types && (
              <p className="types">
                {place.types.slice(0, 3).join(', ')}
              </p>
            )}
            {place.business_status && (
              <span className={`status ${place.business_status.toLowerCase()}`}>
                {place.business_status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsList;


