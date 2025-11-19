package com.codexist.places.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "search_cache", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"latitude", "longitude", "radius"}))
public class SearchCache {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, precision = 10, scale = 7)
    private Double latitude;

    @Column(nullable = false, precision = 10, scale = 7)
    private Double longitude;

    @Column(nullable = false)
    private Integer radius;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String responseData;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public SearchCache() {
        this.createdAt = LocalDateTime.now();
    }

    public SearchCache(Double latitude, Double longitude, Integer radius, String responseData) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.radius = radius;
        this.responseData = responseData;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Integer getRadius() {
        return radius;
    }

    public void setRadius(Integer radius) {
        this.radius = radius;
    }

    public String getResponseData() {
        return responseData;
    }

    public void setResponseData(String responseData) {
        this.responseData = responseData;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

