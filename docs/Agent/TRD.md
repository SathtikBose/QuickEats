# TRD.md

# Technical Requirements Document (TRD)

## Project Name

**QuickEats**

---

# Version

1.0

---

# Purpose

This document defines the technical architecture, engineering standards, development workflow, infrastructure, coding conventions, security requirements, deployment strategy, and implementation rules for the QuickEats platform.

This document complements the Product Requirements Document (PRD) and serves as the primary technical reference throughout development.

---

# 🚨 Core Engineering Principle

**QuickEats is a production-style application.**

The project must prioritize:

* Scalability
* Maintainability
* Reusability
* Performance
* Security
* Clean Architecture
* Modular Design

The project must **never** be treated as a demo application or rapid prototype.

---

# System Architecture

The system consists of three client applications communicating with a shared backend.

```text
Customer App (React Native)

Restaurant App (React Native)

Admin Dashboard (React + Vite)

            │
            ▼

Node.js + Express REST API

            │

MongoDB Atlas
```

The backend is the single source of truth.

No application communicates directly with the database.

---

# Technology Stack

## Customer Application

* React Native
* Expo
* TypeScript
* Expo Router
* NativeWind
* Zustand
* TanStack Query
* Axios
* React Hook Form
* Zod

---

## Restaurant Application

* React Native
* Expo
* TypeScript
* Expo Router
* NativeWind
* Zustand
* TanStack Query
* Axios
* React Hook Form
* Zod

---

## Admin Dashboard

* React
* Vite
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Axios
* React Hook Form
* Zod
* Recharts

---

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB Atlas
* Mongoose
* JWT
* bcrypt
* Multer
* Cloudinary SDK
* Firebase Admin SDK
* Stripe SDK
* Socket.IO
* Resend SDK
* Helmet
* CORS
* Morgan
* Compression
* express-rate-limit
* dotenv

---

# Deployment

Backend

* Render

Admin Dashboard

* Vercel

Database

* MongoDB Atlas

Media

* Cloudinary

Email

* Resend

Push Notifications

* Firebase Cloud Messaging

Payments

* Stripe Test Mode

---

# Architecture Style

The backend should follow:

* Feature-Based Architecture
* Layered Architecture
* REST API Architecture
* Service Layer Pattern
* Repository Pattern (optional)
* Controller-Service-Model separation

---

# Recommended Folder Structure

```
backend/

src/

├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── repositories/
├── validators/
├── utils/
├── helpers/
├── sockets/
├── types/
├── constants/
├── uploads/
├── jobs/
├── docs/
├── app.ts
└── server.ts
```

---

# Frontend Folder Structure

```
apps/

customer-app/

restaurant-app/

admin-dashboard/
```

Each application should contain:

```
src/

components/

features/

hooks/

services/

store/

navigation/

screens/

types/

utils/

constants/

assets/
```

---

# State Management

Global State

* Zustand

Server State

* TanStack Query

Local State

* React Hooks

---

# Form Handling

All forms should use:

* React Hook Form
* Zod Validation

Avoid manual form validation whenever possible.

---

# API Layer

Use Axios.

Never perform fetch requests directly inside UI components.

Create a reusable API client.

Example layers:

```
apiClient

↓

Auth Service

↓

Restaurant Service

↓

Food Service

↓

Order Service

↓

Review Service
```

---

# Authentication

Authentication Method

JWT

Supported Providers

* Email Login
* Google OAuth

Passwords

* bcrypt hashing

Tokens

* Access Token

Refresh tokens are optional for this project.

---

# Authorization

Roles

Customer

Restaurant

Admin

Every protected endpoint must validate:

* Authentication
* User Role
* Resource Ownership (where applicable)

---

# API Design Standards

Use REST principles.

Examples:

GET

POST

PUT

PATCH

DELETE

Use plural resource names.

Example

```
/users

/restaurants

/foods

/orders

/reviews
```

Return consistent JSON responses.

Success Example

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {}
}
```

Failure Example

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

# Validation

All incoming requests must be validated.

Use Zod schemas.

Never trust client-side validation.

---

# Database

Database

MongoDB Atlas

ODM

Mongoose

Collections

* users
* restaurants
* addresses
* categories
* foods
* carts
* cartItems
* orders
* orderItems
* reviews
* favorites
* payments
* offers
* coupons
* banners
* earnings
* notifications
* admins

---

# Database Rules

Every document must include

```
createdAt

updatedAt
```

Use ObjectId references consistently.

Create indexes for:

* email
* phone
* restaurantId
* userId
* categoryId
* orderId

---

# Image Uploads

All uploads should use

Cloudinary

Supported

Restaurant Images

Food Images

Profile Images

Banner Images

Never store image files inside MongoDB.

Only store URLs.

---

# Payments

Stripe Test Mode

Payment flow

Customer

↓

Backend

↓

Stripe

↓

Webhook

↓

Payment Success

↓

Update Order

---

# Push Notifications

Firebase Cloud Messaging

Notifications

New Order

Order Accepted

Preparing

Ready

Delivered

Promotions

---

# Email

Resend

Emails

Registration

Password Reset

Order Confirmation

Restaurant Approval

---

# Real-Time Communication

Use Socket.IO

Real-time Events

New Order

Restaurant Accepts Order

Preparing

Ready

Delivered

Admin Broadcast

Restaurant Status

---

# Security

Mandatory Middleware

Helmet

CORS

Rate Limiter

Compression

JWT Authentication

Password Hashing

Input Validation

Protected Routes

Environment Variables

Never expose secrets to the frontend.

---

# Error Handling

Create a centralized error handler.

Return standardized responses.

Log server errors.

Avoid exposing internal errors to clients.

---

# Logging

Morgan

Log

Requests

Errors

Response Time

Status Codes

---

# Environment Variables

Separate environment files.

Example

```
.env.development

.env.production
```

Do not hardcode credentials.

---

# Performance

Use

Pagination

Lazy Loading

Database Indexes

Image Optimization

Caching where appropriate

Avoid unnecessary re-renders.

---

# Code Quality

Use

ESLint

Prettier

Strict TypeScript

Reusable Components

Reusable Hooks

Reusable Services

Avoid duplicated logic.

---

# Naming Conventions

Components

PascalCase

Variables

camelCase

Files

camelCase or kebab-case

Constants

UPPER_CASE

Interfaces

Prefix with

I

Example

```
IUser

IRestaurant
```

Enums

PascalCase

---

# Git Strategy

Main Branch

```
main
```

Development Branch

```
develop
```

Feature Branch

```
feature/auth

feature/orders

feature/cart
```

Commit Messages

```
feat:

fix:

refactor:

docs:

style:

test:
```

---

# Testing Strategy

Backend

API Testing

Validation

Authentication

Authorization

Database

Frontend

Navigation

Forms

API Integration

Role Testing

Manual Testing

End-to-End User Flow

---

# Build Strategy

Development

↓

Local Testing

↓

UI Approval

↓

API Integration

↓

Feature Testing

↓

Bug Fixes

↓

Deployment

---

# 🚨 Mandatory Stitch MCP Development Rules

These rules are non-negotiable.

## Rule 1

Every UI screen must originate from Stitch MCP.

---

## Rule 2

No developer may implement a screen without an approved Stitch design.

---

## Rule 3

The development order must always be:

Requirement

↓

Stitch Design

↓

Design Review

↓

Approval

↓

Frontend Implementation

↓

Backend Integration

↓

Testing

---

## Rule 4

Placeholder screens are prohibited.

Demo UIs are prohibited.

Auto-generated temporary layouts are prohibited.

---

## Rule 5

Every implemented screen must maintain a one-to-one relationship with its Stitch design.

---

## Rule 6

If a screen changes, the Stitch design must be updated before implementation changes.

---

## Rule 7

Do not create independent UI components without verifying they align with the approved Stitch design system.

---

## Rule 8

The visual language should be inspired by the usability, spacing, hierarchy, and navigation patterns of Zomato while remaining an original QuickEats product.

Do not copy copyrighted assets, branding, logos, illustrations, or proprietary interface elements.

---

# Definition of Done

A feature is considered complete only if:

* Functional requirements are implemented.
* Stitch MCP design exists and is approved.
* Frontend matches the approved Stitch design.
* Backend integration is complete.
* Validation is implemented.
* Error handling is implemented.
* Loading and empty states are handled.
* Responsive behavior is verified (where applicable).
* Code passes linting.
* Manual testing is complete.
* No placeholder content remains.

---

# Technical Success Criteria

The project is successful when:

* Three client applications are fully operational.
* All applications use the same backend.
* Authentication and authorization work correctly.
* APIs follow REST standards.
* Database schema is normalized for MongoDB usage.
* Images are managed through Cloudinary.
* Payments function in Stripe Test Mode.
* Notifications are delivered through Firebase.
* Emails are sent through Resend.
* Real-time events use Socket.IO.
* Deployment works on Render and Vercel.
* Every screen has a corresponding approved Stitch MCP design.
* The codebase follows clean architecture and production-quality engineering standards.

---

# End of Technical Requirements Document
