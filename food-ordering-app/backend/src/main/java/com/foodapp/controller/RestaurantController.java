package com.foodapp.controller;

import com.foodapp.dto.ApiResponse;
import com.foodapp.model.Restaurant;
import com.foodapp.service.RestaurantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
@Tag(name = "Restaurants", description = "Browse restaurants and menus")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping
    @Operation(summary = "Get all active restaurants")
    public ResponseEntity<ApiResponse<List<Restaurant>>> getAllRestaurants() {
        return ResponseEntity.ok(ApiResponse.success("Restaurants fetched", restaurantService.getAllRestaurants()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get restaurant by ID with menu")
    public ResponseEntity<ApiResponse<Restaurant>> getRestaurant(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Restaurant fetched", restaurantService.getRestaurantById(id)));
    }

    @GetMapping("/search")
    @Operation(summary = "Search restaurants by name")
    public ResponseEntity<ApiResponse<List<Restaurant>>> searchRestaurants(@RequestParam String query) {
        return ResponseEntity.ok(ApiResponse.success("Search results", restaurantService.searchRestaurants(query)));
    }

    @GetMapping("/cuisine/{cuisine}")
    @Operation(summary = "Filter restaurants by cuisine")
    public ResponseEntity<ApiResponse<List<Restaurant>>> getRestaurantsByCuisine(@PathVariable String cuisine) {
        return ResponseEntity.ok(ApiResponse.success("Restaurants by cuisine", restaurantService.getRestaurantsByCuisine(cuisine)));
    }
}
