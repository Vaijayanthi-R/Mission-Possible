package com.foodapp.service;

import com.foodapp.model.Order;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendRegistrationEmail(String toEmail, String userName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Welcome to FoodHub! 🍕");
            message.setText(String.format(
                "Hi %s,\n\nWelcome to FoodHub! Your account has been created successfully.\n\n" +
                "You can now browse restaurants and place orders.\n\n" +
                "Happy eating!\nThe FoodHub Team", userName));
            mailSender.send(message);
            log.info("Registration email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send registration email to {}: {}", toEmail, e.getMessage());
        }
    }

    @Async
    public void sendOrderConfirmationEmail(String toEmail, Order order) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Order Confirmed! #" + order.getId());
            message.setText(String.format(
                "Hi,\n\nYour order has been confirmed!\n\n" +
                "Order ID: %s\nRestaurant: %s\nTotal: ₹%.2f\nDelivery Address: %s\n\n" +
                "Estimated delivery time: 30-45 minutes.\n\n" +
                "Thank you for ordering with FoodHub!\nThe FoodHub Team",
                order.getId(), order.getRestaurantName(), order.getTotalAmount(), order.getDeliveryAddress()));
            mailSender.send(message);
            log.info("Order confirmation email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send order confirmation email to {}: {}", toEmail, e.getMessage());
        }
    }

    @Async
    public void sendOrderCancellationEmail(String toEmail, Order order) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Order Cancelled #" + order.getId());
            message.setText(String.format(
                "Hi,\n\nYour order #%s from %s has been cancelled.\n\n" +
                "Total Refund: ₹%.2f\n\n" +
                "If you have any questions, please contact our support.\n\n" +
                "The FoodHub Team",
                order.getId(), order.getRestaurantName(), order.getTotalAmount()));
            mailSender.send(message);
            log.info("Order cancellation email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send cancellation email to {}: {}", toEmail, e.getMessage());
        }
    }
}
