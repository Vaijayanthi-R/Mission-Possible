# 🍕 FoodHub - Food Ordering Application

A full-stack food ordering application built with **React.js**, **Spring Boot**, and **MongoDB**.

---

## 📁 Project Structure

```
food-ordering-app/
├── backend/          # Spring Boot REST API
│   └── src/main/java/com/foodapp/
│       ├── config/       # Security, Swagger, Async, DataSeeder
│       ├── controller/   # AuthController, RestaurantController, OrderController
│       ├── dto/          # Request/Response DTOs
│       ├── exception/    # GlobalExceptionHandler, Custom Exceptions
│       ├── model/        # User, Restaurant, MenuItem, Order, OrderItem
│       ├── repository/   # MongoDB Repositories
│       ├── security/     # JwtAuthenticationFilter
│       ├── service/      # AuthService, RestaurantService, OrderService, EmailService
│       └── util/         # JwtUtil
└── frontend/         # React.js UI
    └── src/
        ├── components/   # Navbar, ProtectedRoute
        ├── context/      # AuthContext, CartContext
        ├── pages/        # Home, Login, Register, RestaurantDetail, Cart, Orders, OrderConfirmation
        ├── services/     # axios API service
        └── styles/       # Global CSS
```

---

## ⚙️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React.js 18, React Router v6, Axios, React Hot Toast |
| Backend   | Spring Boot 3.2, Spring Security, Spring Data MongoDB |
| Database  | MongoDB Atlas                     |
| Auth      | JWT (JSON Web Tokens)             |
| Email     | JavaMailSender (Gmail SMTP)       |
| Docs      | Springdoc OpenAPI 3 (Swagger UI)  |

---

## 🚀 Setup & Run

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.8+

---

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs at: **http://localhost:8080**
Swagger UI: **http://localhost:8080/swagger-ui.html**

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at: **http://localhost:3000**

---

## 🔑 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Restaurants
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/restaurants` | Get all restaurants |
| GET | `/api/restaurants/{id}` | Get restaurant + menu |
| GET | `/api/restaurants/search?query=` | Search restaurants |
| GET | `/api/restaurants/cuisine/{cuisine}` | Filter by cuisine |

### Orders (Protected - JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place new order |
| GET | `/api/orders` | Get user's orders |
| GET | `/api/orders/{id}` | Get order details |
| PUT | `/api/orders/{id}/cancel` | Cancel order |

---

## 📧 Email Notifications

Emails are sent automatically for:
- ✅ **Registration** — Welcome email on signup
- ✅ **Order Confirmation** — Order details after placing
- ✅ **Order Cancellation** — Cancellation notification

---

## 🗄️ Database Schema

### Collections
- **users** — id, name, email, password(bcrypt), phone, address, roles, createdAt
- **restaurants** — id, name, description, cuisine, address, imageUrl, rating, deliveryTime, deliveryFee, active, menuItems[]
- **orders** — id, userId, userEmail, restaurantId, restaurantName, items[], subtotal, deliveryFee, totalAmount, deliveryAddress, status, createdAt

---

## 🔒 Security Features
- BCrypt password hashing
- JWT stateless authentication
- Protected routes (frontend + backend)
- CORS configured for localhost:3000
- Input validation on all request bodies

---

## 🌱 Sample Data

On first startup, 4 restaurants are automatically seeded:
1. **Spice Garden** — South Indian
2. **Pizza Paradise** — Italian
3. **Burger Barn** — American
4. **Biryani House** — Mughlai

---

## 📝 Logging

Logs are written to:
- Console: All DEBUG+ logs for `com.foodapp`
- File: `logs/food-app.log`

---

## 📖 Swagger UI

Visit `http://localhost:8080/swagger-ui.html` to explore and test all APIs interactively.

To authenticate in Swagger:
1. Call `/api/auth/login` to get JWT token
2. Click **Authorize** button
3. Enter: `Bearer <your-token>`
