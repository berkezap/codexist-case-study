package com.codexist.places.repository;

import com.codexist.places.entity.SearchCache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SearchCacheRepository extends JpaRepository<SearchCache, Long> {

    @Query("SELECT s FROM SearchCache s WHERE s.latitude = :latitude AND s.longitude = :longitude AND s.radius = :radius")
    Optional<SearchCache> findByLocation(@Param("latitude") Double latitude, 
                                         @Param("longitude") Double longitude, 
                                         @Param("radius") Integer radius);
}


