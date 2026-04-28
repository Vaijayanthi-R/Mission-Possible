# Database Schema — FoodHub (MongoDB)

## Collection: users
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique, indexed)",
  "password": "String (BCrypt hashed)",
  "phone": "String",
  "address": "String",
  "roles": ["ROLE_USER"],
  "enabled": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

## Collection: restaurants
```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String",
  "cuisine": "String",
  "address": "String",
  "imageUrl": "String",
  "rating": 4.5,
  "deliveryTime": 30,
  "deliveryFee": 40.0,
  "active": true,
  "menuItems": [
    {
      "id": "UUID String",
      "name": "String",
      "description": "String",
      "price": 120.0,
      "category": "String",
      "imageUrl": "String",
      "available": true,
      "vegetarian": false
    }
  ]
}
```

## Collection: orders
```json
{
  "_id": "ObjectId",
  "userId": "String (ref: users._id)",
  "userEmail": "String",
  "restaurantId": "String (ref: restaurants._id)",
  "restaurantName": "String",
  "items": [
    {
      "menuItemId": "String",
      "name": "String",
      "quantity": 2,
      "price": 120.0,
      "totalPrice": 240.0
    }
  ],
  "subtotal": 240.0,
  "deliveryFee": 40.0,
  "totalAmount": 280.0,
  "deliveryAddress": "String",
  "status": "CONFIRMED",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

## Order Status Flow
```
PENDING → CONFIRMED → PREPARING → OUT_FOR_DELIVERY → DELIVERED
                                                    ↘ CANCELLED (from PENDING/CONFIRMED)
```
