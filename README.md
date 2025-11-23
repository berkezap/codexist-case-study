# Google Places Nearby Search

Full-stack application for searching nearby places using Google Places API with database caching.

## Project Structure

```
├── backend/       # Java Spring Boot REST API (port 8070)
├── frontend/      # React web application
└── README.md
```

## Features

- Search nearby places by latitude, longitude, and radius
- Display results on Google Maps with markers
- Cache API responses in database (same request returns from DB)
- REST API on port 8070
- Modern responsive UI

## Tech Stack

**Backend:**
- Java 8+
- Spring Boot 2.7.18
- H2 Database (embedded)
- Google Places API

**Frontend:**
- React 18
- Google Maps JavaScript API
- Axios

## Setup

### Prerequisites

- Java 8
- Maven
- Node.js 14+
- Google Cloud API key (Places API + Maps JavaScript API)

### Backend Setup

```bash
cd backend
export GOOGLE_PLACES_API_KEY=your_api_key
mvn spring-boot:run
```

Backend runs on http://localhost:8070

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
echo "REACT_APP_BACKEND_URL=http://localhost:8070" > .env
echo "REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key" >> .env

npm start
```

Frontend runs on http://localhost:3000

## Deployment

### Live Application

- **Frontend:** [https://codexist-case-study.vercel.app/](https://codexist-case-study.vercel.app/)
- **Backend API:** [https://codexist-case-study-g2by.onrender.com](https://codexist-case-study-g2by.onrender.com)
- **API Endpoint:** `GET /api/places/nearby?latitude=X&longitude=Y&radius=Z`

### GitHub Repository

- **Source Code:** [https://github.com/berkezap/codexist-case-study](https://github.com/berkezap/codexist-case-study)
- **Commits:** 7 commits (work-process documented)

### Deployment Platforms

- **Backend:** Render (Docker)
- **Frontend:** Vercel

## API Documentation

### GET /api/places/nearby

Search nearby places using Google Places API.

**Query Parameters:**
- `latitude` (required): Decimal number (-90 to 90)
- `longitude` (required): Decimal number (-180 to 180)
- `radius` (required): Integer in meters

**Example:**
```
GET /api/places/nearby?latitude=41.0082&longitude=28.9784&radius=1000
```

**Response:** JSON format (Google Places API response)

## How It Works

1. User enters coordinates and radius in frontend
2. Frontend sends request to backend API
3. Backend checks if same request exists in database
   - If exists: Returns cached response
   - If not: Calls Google Places API → Saves to DB → Returns response
4. Frontend displays results on map and in list

