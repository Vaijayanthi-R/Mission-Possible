package com.foodapp.service;

import com.foodapp.dto.OrderDto;
import com.foodapp.exception.BadRequestException;
import com.foodapp.exception.ResourceNotFoundException;
import com.foodapp.model.Order;
import com.foodapp.model.OrderItem;
import com.foodapp.model.Restaurant;
import com.foodapp.model.User;
import com.foodapp.repository.OrderRepository;
import com.foodapp.repository.RestaurantRepository;
import com.foodapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public Order placeOrder(OrderDto.PlaceOrderRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

        List<OrderItem> items = request.getItems().stream().map(i -> {
            OrderItem item = new OrderItem();
            item.setMenuItemId(i.getMenuItemId());
            item.setName(i.getName());
            item.setQuantity(i.getQuantity());
            item.setPrice(i.getPrice());
            item.setTotalPrice(i.getPrice() * i.getQuantity());
            return item;
        }).collect(Collectors.toList());

        double subtotal = items.stream().mapToDouble(OrderItem::getTotalPrice).sum();
        double deliveryFee = restaurant.getDeliveryFee();

        Order order = Order.builder()
                .userId(user.getId())
                .userEmail(user.getEmail())
                .restaurantId(restaurant.getId())
                .restaurantName(restaurant.getName())
                .items(items)
                .subtotal(subtotal)
                .deliveryFee(deliveryFee)
                .totalAmount(subtotal + deliveryFee)
                .deliveryAddress(request.getDeliveryAddress())
                .status(Order.OrderStatus.CONFIRMED)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Order saved = orderRepository.save(order);
        log.info("Order placed by {} for restaurant {}", email, restaurant.getName());

        emailService.sendOrderConfirmationEmail(user.getEmail(), saved);
        return saved;
    }

    public List<Order> getUserOrders() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public Order getOrderById(String orderId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!order.getUserId().equals(user.getId())) {
            throw new BadRequestException("Access denied");
        }
        return order;
    }

    public Order cancelOrder(String orderId) {
        Order order = getOrderById(orderId);

        if (order.getStatus() == Order.OrderStatus.DELIVERED ||
            order.getStatus() == Order.OrderStatus.CANCELLED) {
            throw new BadRequestException("Cannot cancel this order");
        }

        order.setStatus(Order.OrderStatus.CANCELLED);
        order.setUpdatedAt(LocalDateTime.now());
        Order saved = orderRepository.save(order);
        log.info("Order cancelled: {}", orderId);

        emailService.sendOrderCancellationEmail(order.getUserEmail(), saved);
        return saved;
    }
}
