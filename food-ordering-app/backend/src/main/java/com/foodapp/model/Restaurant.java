package com.foodapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.ArrayList;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "restaurants")
public class Restaurant {

    @Id
    private String id;

    private String name;

    private String description;

    private String cuisine;

    private String address;

    private String imageUrl;

    private double rating;

    private int deliveryTime;

    private double deliveryFee;

    @Builder.Default
    private boolean active = true;

    @Builder.Default
    private List<MenuItem> menuItems = new ArrayList<>();
}
