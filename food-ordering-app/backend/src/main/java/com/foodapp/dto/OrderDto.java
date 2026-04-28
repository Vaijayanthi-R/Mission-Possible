package com.foodapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import java.util.List;

public class OrderDto {

    @Data
    public static class PlaceOrderRequest {
        @NotBlank(message = "Restaurant ID is required")
        private String restaurantId;

        @NotEmpty(message = "Order must have at least one item")
        private List<OrderItemRequest> items;

        @NotBlank(message = "Delivery address is required")
        private String deliveryAddress;
    }

    @Data
    public static class OrderItemRequest {
        private String menuItemId;
        private String name;
        private int quantity;
        private double price;
    }
}
