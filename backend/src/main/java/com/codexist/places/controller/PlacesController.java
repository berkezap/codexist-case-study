package com.codexist.places.controller;

import com.codexist.places.entity.SearchCache;
import com.codexist.places.repository.SearchCacheRepository;
import com.codexist.places.service.GooglePlacesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/places")
public class PlacesController {

    private final GooglePlacesService googlePlacesService;
    private final SearchCacheRepository searchCacheRepository;

    public PlacesController(GooglePlacesService googlePlacesService, 
                           SearchCacheRepository searchCacheRepository) {
        this.googlePlacesService = googlePlacesService;
        this.searchCacheRepository = searchCacheRepository;
    }

    @GetMapping("/nearby")
    public ResponseEntity<String> getNearbyPlaces(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam Integer radius) {

        // Check if the same request exists in database
        Optional<SearchCache> cachedResult = searchCacheRepository.findByLocation(latitude, longitude, radius);

        if (cachedResult.isPresent()) {
            // Return cached response from database
            return ResponseEntity.ok(cachedResult.get().getResponseData());
        }

        // Call Google Places API
        String apiResponse = googlePlacesService.searchNearbyPlaces(latitude, longitude, radius);

        // Save to database for future requests
        SearchCache newCache = new SearchCache(latitude, longitude, radius, apiResponse);
        searchCacheRepository.save(newCache);

        return ResponseEntity.ok(apiResponse);
    }
}

