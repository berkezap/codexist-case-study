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
                {place.types
                  .filter(type => !['point_of_interest', 'establishment', 'political'].includes(type))
                  .slice(0, 2)
                  .map(type => {
                    if (type === 'lodging') return 'Hotel';
                    if (type === 'tourist_attraction') return 'Tourist Spot';
                    return type.replace(/_/g, ' ');
                  })
                  .join(' • ')}
              </p>
            )}
            {place.business_status === 'OPERATIONAL' && (
              <span className="status operational">✓ Open</span>
            )}
            {place.business_status === 'CLOSED_TEMPORARILY' && (
              <span className="status closed_temporarily">🔒 Temporarily Closed</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsList;


