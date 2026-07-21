# APP_FLOW.md

# QuickEats Application Flow Document

## Version

1.0

---

# Project Name

**QuickEats**

---

# Purpose

This document defines the complete user journey and application flow for all three QuickEats applications.

It describes how users move through the system, how screens connect, how features interact, and the expected navigation between different modules.

This document should be used before any UI design or development begins.

---

# 🚨 Mandatory Development Workflow

Every feature in this document must follow this sequence:

```text
Requirement
      ↓
Application Flow
      ↓
Stitch MCP Design
      ↓
Design Review
      ↓
Approval
      ↓
Frontend Development
      ↓
Backend Integration
      ↓
Testing
      ↓
Production
```

**No screen should be implemented before its flow is finalized and its Stitch MCP design is approved.**

---

# System Overview

QuickEats consists of:

* Customer Mobile Application
* Restaurant Partner Mobile Application
* Admin Dashboard

All three applications communicate with a shared backend and database.

---

# CUSTOMER APPLICATION FLOW

---

## Launch Flow

```
Splash Screen
      ↓
Check Authentication
      ↓
Already Logged In?
      ↓
Yes → Home
No  → Login
```

---

## Authentication Flow

```
Login

↓

Forgot Password

↓

Reset Password

↓

Login

↓

Home
```

OR

```
Register

↓

Email Verification (Optional)

↓

Login

↓

Home
```

OR

```
Google Login

↓

Home
```

---

## Home Flow

```
Home

├── Current Location
├── Search
├── Categories
├── Featured Restaurants
├── Recommended
├── Popular Near You
├── Offers
├── Recently Ordered
└── Bottom Navigation
```

Bottom Navigation

```
Home

Search

Orders

Favorites

Profile
```

---

## Search Flow

```
Search

↓

Suggestions

↓

Restaurant Results

↓

Restaurant Details
```

OR

```
Search

↓

Food Results

↓

Restaurant Details
```

Filters

```
Rating

Delivery Time

Veg

Non-Veg

Offers

Open Now

Distance
```

---

## Restaurant Flow

```
Restaurant List

↓

Restaurant Details

↓

Menu Categories

↓

Food Details

↓

Add To Cart

↓

Cart
```

---

## Food Flow

```
Food Details

↓

Customization

↓

Quantity

↓

Add To Cart

↓

Cart
```

---

## Cart Flow

```
Cart

↓

Apply Coupon

↓

Price Summary

↓

Checkout
```

---

## Checkout Flow

```
Checkout

↓

Select Address

↓

Choose Payment

↓

Review Order

↓

Place Order

↓

Order Confirmation

↓

Track Order
```

---

## Order Tracking Flow

```
Order Received

↓

Restaurant Accepted

↓

Preparing

↓

Ready

↓

Out For Delivery

↓

Delivered

↓

Review

↓

Order History

↓

Reorder
```

---

## Favorites Flow

```
Favorites

↓

Restaurant

↓

Restaurant Details

↓

Order Again
```

---

## Profile Flow

```
Profile

├── Edit Profile
├── Addresses
├── Order History
├── Notifications
├── Wishlist
├── Settings
└── Logout
```

---

# RESTAURANT APPLICATION FLOW

---

## Launch Flow

```
Splash

↓

Login

↓

Restaurant Dashboard
```

---

## Dashboard Flow

```
Dashboard

├── Orders
├── Menu
├── Categories
├── Earnings
├── Reviews
├── Analytics
├── Offers
└── Settings
```

---

## Incoming Order Flow

```
New Order

↓

View Order

↓

Accept

↓

Preparing

↓

Ready

↓

Completed
```

OR

```
New Order

↓

Reject Order
```

---

## Menu Management Flow

```
Menu

↓

Categories

↓

Food List

↓

Add Food

↓

Upload Image

↓

Save
```

OR

```
Food

↓

Edit Food

↓

Update

↓

Save
```

OR

```
Food

↓

Delete
```

---

## Restaurant Profile Flow

```
Profile

↓

Restaurant Details

↓

Images

↓

Operating Hours

↓

Delivery Radius

↓

Save
```

---

## Earnings Flow

```
Dashboard

↓

Revenue

↓

Daily

↓

Weekly

↓

Monthly
```

---

## Reviews Flow

```
Dashboard

↓

Reviews

↓

Customer Review

↓

Reply (Optional)
```

---

## Offers Flow

```
Offers

↓

Create Offer

↓

Configure Discount

↓

Publish
```

---

## Settings Flow

```
Settings

├── Restaurant Availability
├── Minimum Order
├── Delivery Radius
├── Operating Hours
└── Logout
```

---

# ADMIN DASHBOARD FLOW

---

## Login Flow

```
Admin Login

↓

Dashboard
```

---

## Dashboard Flow

```
Dashboard

├── Revenue
├── Orders
├── Users
├── Restaurants
├── Payments
├── Reviews
├── Coupons
├── Categories
├── Notifications
└── Reports
```

---

## User Management Flow

```
Users

↓

Search

↓

View User

↓

Block

OR

Delete
```

---

## Restaurant Management Flow

```
Restaurants

↓

Pending

↓

Review

↓

Approve

OR

Reject

↓

Active Restaurant
```

OR

```
Restaurant

↓

Suspend
```

---

## Food Management Flow

```
Foods

↓

Search

↓

View Food

↓

Remove
```

---

## Category Management Flow

```
Categories

↓

Add

↓

Edit

↓

Delete
```

---

## Coupon Flow

```
Coupons

↓

Create

↓

Configure Rules

↓

Activate

↓

Expire
```

---

## Banner Flow

```
Banner

↓

Upload

↓

Publish

↓

Replace

↓

Archive
```

---

## Notification Flow

```
Notifications

↓

Compose

↓

Select Audience

↓

Send
```

---

## Reports Flow

```
Reports

↓

Daily

↓

Weekly

↓

Monthly

↓

Export CSV

↓

Export PDF
```

---

# CROSS-APPLICATION FLOW

---

## Customer Places Order

```
Customer

↓

Checkout

↓

Backend

↓

Restaurant Receives Order

↓

Restaurant Accepts

↓

Customer Notification

↓

Restaurant Updates Status

↓

Customer Tracking

↓

Delivered

↓

Review
```

---

## Restaurant Updates Order

```
Restaurant

↓

Update Status

↓

Backend

↓

Socket.IO Event

↓

Customer App Updated

↓

Notification Sent
```

---

## Admin Approves Restaurant

```
Restaurant Registers

↓

Pending Approval

↓

Admin Reviews

↓

Approve

↓

Restaurant Activated

↓

Email Sent

↓

Restaurant Can Login
```

---

## Customer Review Flow

```
Order Delivered

↓

Review Screen

↓

Submit Review

↓

Restaurant Receives Review

↓

Admin Can Moderate
```

---

# GLOBAL NAVIGATION RULES

Every application should provide:

* Clear back navigation
* Persistent navigation (where appropriate)
* Loading states
* Empty states
* Error states
* Confirmation dialogs for destructive actions

---

# STATE TRANSITIONS

---

## Order Lifecycle

```
Pending

↓

Accepted

↓

Preparing

↓

Ready

↓

Out For Delivery (Future)

↓

Delivered

↓

Completed
```

---

## Restaurant Lifecycle

```
Registration

↓

Pending Approval

↓

Approved

↓

Active

↓

Suspended

↓

Archived
```

---

## User Lifecycle

```
Register

↓

Verify

↓

Active

↓

Blocked (Admin)

↓

Deleted
```

---

# UX FLOW PRINCIPLES

Every journey should:

* Minimize the number of taps.
* Keep primary actions visible.
* Avoid unnecessary navigation depth.
* Provide immediate feedback.
* Preserve user context when navigating back.
* Use consistent transitions across screens.

---

# 🚨 Mandatory Stitch MCP Flow Rules

1. Every flow in this document must have a corresponding Stitch MCP design before development.
2. No screen may be implemented without an approved Stitch design.
3. Navigation should mirror the approved Stitch prototypes.
4. Any change to a flow requires updating the Stitch design before modifying code.
5. Placeholder screens, demo layouts, and temporary UI are not permitted.
6. Customer, Restaurant, and Admin applications must each maintain a complete, reviewable design flow in Stitch MCP.

---

# Definition of Flow Done

A feature flow is considered complete only when:

* The user journey is documented.
* All entry and exit points are defined.
* Edge cases are identified.
* Required screens are listed.
* Stitch MCP designs exist for every screen.
* Navigation paths are approved.
* Backend integration points are identified.
* QA scenarios are documented.

---

# End of Application Flow Document
