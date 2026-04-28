package com.foodapp.config;

import com.foodapp.model.MenuItem;
import com.foodapp.model.Restaurant;
import com.foodapp.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RestaurantRepository restaurantRepository;

    @Override
    public void run(String... args) {
        if (restaurantRepository.count() == 0) {
            seedRestaurants();
            log.info("Sample data seeded successfully");
        }
    }

    private void seedRestaurants() {
        Restaurant r1 = Restaurant.builder()
                .name("Spice Garden")
                .description("Authentic South Indian cuisine with traditional recipes")
                .cuisine("South Indian")
                .address("12, Anna Nagar, Chennai")
                .imageUrl("https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400")
                .rating(4.5)
                .deliveryTime(30)
                .deliveryFee(30)
                .menuItems(Arrays.asList(
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Masala Dosa").description("Crispy dosa with spiced potato filling").price(80).category("Main Course").imageUrl("https://images.unsplash.com/photo-1630383249896-483b095f3b6d?w=300").vegetarian(true).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Idli Sambar").description("Soft idlis with sambar and chutneys").price(60).category("Breakfast").imageUrl("https://images.unsplash.com/photo-1589301761787-3b2afe3efe94?w=300").vegetarian(true).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Chicken Chettinad").description("Spicy Chettinad chicken curry").price(220).category("Main Course").imageUrl("https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300").vegetarian(false).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Pongal").description("Rice and lentil dish with ghee").price(70).category("Breakfast").imageUrl("https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300").vegetarian(true).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Filter Coffee").description("Traditional South Indian filter coffee").price(40).category("Beverages").imageUrl("https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300").vegetarian(true).build()
                ))
                .build();

        Restaurant r2 = Restaurant.builder()
                .name("Pizza Paradise")
                .description("Wood-fired pizzas and Italian classics")
                .cuisine("Italian")
                .address("45, T. Nagar, Chennai")
                .imageUrl("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400")
                .rating(4.3)
                .deliveryTime(40)
                .deliveryFee(50)
                .menuItems(Arrays.asList(
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Margherita Pizza").description("Classic tomato, mozzarella, basil").price(299).category("Pizza").imageUrl("https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300").vegetarian(true).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Pepperoni Pizza").description("Loaded with pepperoni and cheese").price(349).category("Pizza").imageUrl("https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300").vegetarian(false).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Pasta Arrabiata").description("Penne in spicy tomato sauce").price(249).category("Pasta").imageUrl("https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=300").vegetarian(true).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Garlic Bread").description("Toasted bread with garlic butter").price(129).category("Sides").imageUrl("https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300").vegetarian(true).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Tiramisu").description("Classic Italian dessert").price(199).category("Desserts").imageUrl("https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300").vegetarian(true).build()
                ))
                .build();

        Restaurant r3 = Restaurant.builder()
                .name("Burger Barn")
                .description("Juicy burgers and crispy fries")
                .cuisine("American")
                .address("78, Adyar, Chennai")
                .imageUrl("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400")
                .rating(4.1)
                .deliveryTime(25)
                .deliveryFee(40)
                .menuItems(Arrays.asList(
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Classic Beef Burger").description("Beef patty with lettuce, tomato, cheese").price(199).category("Burgers").imageUrl("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300").vegetarian(false).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Veggie Burger").description("Crispy veggie patty with fresh toppings").price(159).category("Burgers").imageUrl("https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300").vegetarian(true).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Chicken Burger").description("Grilled chicken with special sauce").price(179).category("Burgers").imageUrl("https://images.unsplash.com/photo-1550317138-10000687a72b?w=300").vegetarian(false).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("French Fries").description("Crispy golden fries with seasoning").price(99).category("Sides").imageUrl("https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300").vegetarian(true).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Chocolate Shake").description("Rich and creamy chocolate milkshake").price(149).category("Beverages").imageUrl("https://images.unsplash.com/photo-1572490122747-3e9523c145b7?w=300").vegetarian(true).build()
                ))
                .build();

        Restaurant r4 = Restaurant.builder()
                .name("Biryani House")
                .description("Authentic Hyderabadi and Chettinad Biryani")
                .cuisine("Mughlai")
                .address("23, Nungambakkam, Chennai")
                .imageUrl("https://images.unsplash.com/photo-1563379091339-03246963d8d0?w=400")
                .rating(4.7)
                .deliveryTime(45)
                .deliveryFee(35)
                .menuItems(Arrays.asList(
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Chicken Biryani").description("Aromatic basmati rice with tender chicken").price(280).category("Biryani").imageUrl("https://images.unsplash.com/photo-1563379091339-03246963d8d0?w=300").vegetarian(false).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Mutton Biryani").description("Slow-cooked mutton in fragrant rice").price(350).category("Biryani").imageUrl("https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300").vegetarian(false).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Veg Biryani").description("Mixed vegetables in aromatic basmati").price(220).category("Biryani").imageUrl("https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300").vegetarian(true).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Raita").description("Cooling yogurt with cucumber").price(60).category("Sides").imageUrl("https://images.unsplash.com/photo-1589301761787-3b2afe3efe94?w=300").vegetarian(true).build(),
                        MenuItem.builder().id(UUID.randomUUID().toString()).name("Gulab Jamun").description("Sweet milk solid dumplings in syrup").price(80).category("Desserts").imageUrl("https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300").vegetarian(true).build()
                ))
                .build();

        restaurantRepository.saveAll(List.of(r1, r2, r3, r4));
    }
}
