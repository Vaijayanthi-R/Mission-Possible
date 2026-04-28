package com.foodapp.repository;

import com.foodapp.model.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {
    List<Restaurant> findByActiveTrue();
    List<Restaurant> findByCuisineIgnoreCaseAndActiveTrue(String cuisine);
    List<Restaurant> findByNameContainingIgnoreCaseAndActiveTrue(String name);
}
