# DATABASE_SCHEMA.md

# QuickEats Database Schema Document

## Version

1.0

---

# Project Name

**QuickEats**

---

# Purpose

This document defines the complete MongoDB database schema for the QuickEats platform.

It specifies:

* Collections
* Relationships
* Field definitions
* Indexes
* Validation rules
* Data conventions
* Collection ownership
* Future scalability

This schema is the **single source of truth** for backend development.

---

# Database

**MongoDB Atlas**

Database Name

```text
quickeats
```

All three applications (**Customer, Restaurant, Admin**) share the same database.

---

# Database Design Principles

* Single database
* Separate collections
* ObjectId references
* Soft deletion where applicable
* Audit timestamps
* Minimal duplication
* Optimized for MongoDB
* Future scalable

Every collection must include:

```text
_id
createdAt
updatedAt
```

---

# COLLECTION OVERVIEW

```text
admins
users
restaurants
addresses
categories
foods
foodVariants
carts
cartItems
orders
orderItems
payments
reviews
favorites
coupons
offers
banners
notifications
earnings
```

---

# 1. ADMINS

Purpose

Platform administrators.

Fields

```text
_id
name
email
password
role
isActive
lastLogin
createdAt
updatedAt
```

Indexes

* email (unique)

---

# 2. USERS

Purpose

Customer accounts.

Fields

```text
_id
fullName
email
phone
password
googleId
profileImage
role
isVerified
isBlocked
lastLogin
createdAt
updatedAt
```

Indexes

* email (unique)
* phone
* googleId

---

# 3. RESTAURANTS

Purpose

Restaurant partner information.

Fields

```text
_id
ownerName
restaurantName
email
phone
password
googleId
description
cuisine
address
city
state
postalCode
latitude
longitude
deliveryRadius
coverImage
logo
openingTime
closingTime
isApproved
isOpen
isBlocked
averageRating
totalReviews
createdAt
updatedAt
```

Indexes

* email
* restaurantName
* city
* cuisine

---

# 4. ADDRESSES

Purpose

Customer delivery addresses.

Fields

```text
_id
userId
label
receiverName
phone
addressLine1
addressLine2
city
state
postalCode
latitude
longitude
isDefault
createdAt
updatedAt
```

Relationships

* userId → users

Indexes

* userId

---

# 5. CATEGORIES

Purpose

Food categories.

Examples

* Pizza
* Burger
* Biryani
* Chinese
* Dessert

Fields

```text
_id
name
slug
image
isActive
sortOrder
createdAt
updatedAt
```

Indexes

* slug
* name

---

# 6. FOODS

Purpose

Restaurant menu items.

Fields

```text
_id
restaurantId
categoryId
name
description
price
discountPrice
image
isVeg
isAvailable
isBestSeller
preparationTime
averageRating
totalReviews
createdAt
updatedAt
```

Relationships

* restaurantId → restaurants
* categoryId → categories

Indexes

* restaurantId
* categoryId
* name

---

# 7. FOOD VARIANTS

Purpose

Food customizations.

Examples

* Extra Cheese
* Extra Sauce
* Large Size

Fields

```text
_id
foodId
title
price
isRequired
createdAt
updatedAt
```

Relationships

* foodId → foods

---

# 8. CARTS

Purpose

Customer shopping cart.

Fields

```text
_id
userId
subtotal
discount
deliveryFee
platformFee
tax
grandTotal
createdAt
updatedAt
```

Relationships

* userId → users

Indexes

* userId

---

# 9. CART ITEMS

Purpose

Food items inside cart.

Fields

```text
_id
cartId
foodId
quantity
selectedVariants
price
total
createdAt
updatedAt
```

Relationships

* cartId → carts
* foodId → foods

Indexes

* cartId
* foodId

---

# 10. ORDERS

Purpose

Customer orders.

Fields

```text
_id
orderNumber
userId
restaurantId
addressId
paymentId
status
subtotal
discount
deliveryFee
platformFee
tax
grandTotal
paymentStatus
estimatedDeliveryTime
notes
createdAt
updatedAt
```

Relationships

* userId → users
* restaurantId → restaurants
* addressId → addresses
* paymentId → payments

Indexes

* orderNumber (unique)
* userId
* restaurantId
* status

---

# Order Status Enum

```text
PENDING

ACCEPTED

PREPARING

READY

OUT_FOR_DELIVERY

DELIVERED

CANCELLED
```

---

# Payment Status Enum

```text
PENDING

PAID

FAILED

REFUNDED
```

---

# 11. ORDER ITEMS

Purpose

Food items inside an order.

Fields

```text
_id
orderId
foodId
quantity
price
selectedVariants
total
createdAt
updatedAt
```

Relationships

* orderId → orders
* foodId → foods

Indexes

* orderId

---

# 12. PAYMENTS

Purpose

Stripe payment records.

Fields

```text
_id
orderId
stripePaymentIntent
paymentMethod
status
amount
currency
paidAt
createdAt
updatedAt
```

Relationships

* orderId → orders

Indexes

* orderId
* stripePaymentIntent

---

# 13. REVIEWS

Purpose

Customer reviews.

Fields

```text
_id
userId
restaurantId
foodId
rating
comment
images
isHidden
createdAt
updatedAt
```

Relationships

* userId → users
* restaurantId → restaurants
* foodId → foods

Indexes

* restaurantId
* userId
* foodId

---

# 14. FAVORITES

Purpose

Saved restaurants.

Fields

```text
_id
userId
restaurantId
createdAt
updatedAt
```

Relationships

* userId → users
* restaurantId → restaurants

Indexes

* userId
* restaurantId

---

# 15. COUPONS

Purpose

Platform-wide discounts.

Fields

```text
_id
code
title
description
discountType
discountValue
minimumOrder
maximumDiscount
usageLimit
usedCount
expiryDate
isActive
createdAt
updatedAt
```

Indexes

* code (unique)

---

# Discount Types

```text
PERCENTAGE

FLAT
```

---

# 16. OFFERS

Purpose

Restaurant-specific promotions.

Fields

```text
_id
restaurantId
title
description
discountType
discountValue
startDate
endDate
isActive
createdAt
updatedAt
```

Relationships

* restaurantId → restaurants

Indexes

* restaurantId

---

# 17. BANNERS

Purpose

Home page promotional banners.

Fields

```text
_id
title
image
redirectType
redirectId
priority
isActive
createdAt
updatedAt
```

---

# Redirect Types

```text
Restaurant

Category

Food

Offer

External Link
```

---

# 18. NOTIFICATIONS

Purpose

Push notifications.

Fields

```text
_id
userId
title
message
type
isRead
sentAt
createdAt
updatedAt
```

Relationships

* userId → users

Indexes

* userId

---

# Notification Types

```text
ORDER

PAYMENT

PROMOTION

SYSTEM

RESTAURANT
```

---

# 19. EARNINGS

Purpose

Restaurant revenue tracking.

Fields

```text
_id
restaurantId
orderId
amount
commission
netAmount
createdAt
updatedAt
```

Relationships

* restaurantId → restaurants
* orderId → orders

Indexes

* restaurantId
* orderId

---

# COLLECTION RELATIONSHIPS

```text
Users
 ├── Addresses
 ├── Cart
 ├── Orders
 ├── Reviews
 ├── Favorites
 └── Notifications

Restaurants
 ├── Foods
 ├── Orders
 ├── Reviews
 ├── Offers
 └── Earnings

Categories
 └── Foods

Foods
 ├── Food Variants
 ├── Cart Items
 ├── Order Items
 └── Reviews

Orders
 ├── Order Items
 └── Payments
```

---

# DATA VALIDATION RULES

Every API must validate:

* Required fields
* Email format
* Phone format
* Price ≥ 0
* Rating between 1–5
* Valid ObjectId references
* Enum values
* Duplicate email prevention
* Duplicate coupon code prevention

Use **Zod** for request validation.

---

# INDEXING STRATEGY

Create indexes on:

```text
users.email
users.phone

restaurants.email
restaurants.restaurantName

foods.restaurantId
foods.categoryId

orders.orderNumber
orders.userId
orders.restaurantId

payments.stripePaymentIntent

favorites.userId

reviews.restaurantId

notifications.userId
```

Use compound indexes where beneficial, such as:

```text
restaurantId + isAvailable
restaurantId + categoryId
userId + createdAt
```

---

# SECURITY RULES

* Passwords stored only as bcrypt hashes.
* Never store card details.
* Store only Stripe references.
* Validate all ObjectIds.
* Protect sensitive fields from public responses.
* Use role-based access control.

---

# SCALABILITY CONSIDERATIONS

Future collections may include:

```text
deliveryPartners
driverLocations
chatMessages
loyaltyPoints
referrals
giftCards
wallets
subscriptions
supportTickets
```

The schema should support future expansion without major redesign.

---

# 🚨 Stitch MCP Database Rules

* Every UI form must map directly to the schema defined here.
* Field names used in Stitch MCP designs should match backend field names wherever practical.
* New UI fields require corresponding schema updates before implementation.
* Database changes must be reflected in the UI and API documentation before coding.

---

# Definition of Schema Done

The database schema is considered complete when:

* All collections are defined.
* Relationships are documented.
* Required fields are identified.
* Validation rules are specified.
* Indexes are planned.
* Security considerations are addressed.
* Future scalability has been considered.
* The schema aligns with the PRD, TRD, UI/UX Brief, and Application Flow documents.

---

# End of Database Schema Document
