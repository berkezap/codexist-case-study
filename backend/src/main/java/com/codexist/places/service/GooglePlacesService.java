package com.codexist.places.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GooglePlacesService {

    private final RestTemplate restTemplate;
    
    @Value("${google.places.api.key}")
    private String apiKey;
    
    private static final String GOOGLE_PLACES_API_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

    public GooglePlacesService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String searchNearbyPlaces(Double latitude, Double longitude, Integer radius) {
        String location = latitude + "," + longitude;
        
        String url = UriComponentsBuilder.fromHttpUrl(GOOGLE_PLACES_API_URL)
                .queryParam("location", location)
                .queryParam("radius", radius)
                .queryParam("key", apiKey)
                .toUriString();

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }
}

