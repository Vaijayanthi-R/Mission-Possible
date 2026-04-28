package com.foodapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

    private String id;

    private String name;

    private String description;

    private double price;

    private String category;

    private String imageUrl;

    @Builder.Default
    private boolean available = true;

    private boolean vegetarian;
}
