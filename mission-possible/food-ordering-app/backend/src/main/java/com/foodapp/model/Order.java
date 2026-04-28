package com.foodapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String userId;

    private String userEmail;

    private String restaurantId;

    private String restaurantName;

    private List<OrderItem> items;

    private double subtotal;

    private double deliveryFee;

    private double totalAmount;

    private String deliveryAddress;

    @Builder.Default
    private OrderStatus status = OrderStatus.PENDING;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public enum OrderStatus {
        PENDING, CONFIRMED, PREPARING, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
    }
}
