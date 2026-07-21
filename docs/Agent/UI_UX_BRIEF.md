# UI_UX_BRIEF.md

# QuickEats UI/UX Design Brief

## Version

1.0

---

# Project Name

**QuickEats**

---

# Purpose

This document defines the complete UI/UX vision, design system, interaction principles, screen hierarchy, and Stitch MCP workflow for the QuickEats platform.

It serves as the **single source of truth** for every design decision.

Every screen created for the Customer App, Restaurant App, and Admin Dashboard **must follow this document**.

---

# 🚨 Mandatory Design Workflow

## This is the most important rule in the project.

**QuickEats is a Design-First project.**

Every feature must follow this workflow:

```text
Requirement
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
Production Ready
```

**Implementation before Stitch MCP approval is NOT allowed.**

---

# Design Philosophy

QuickEats should feel:

* Premium
* Clean
* Modern
* Minimal
* Fast
* Friendly
* Professional

The experience should be inspired by the usability and polish of leading food delivery apps while remaining an **original QuickEats product**.

Do **not** copy Zomato branding, icons, illustrations, assets, or exact layouts.

Instead, capture the same principles:

* Clear visual hierarchy
* Large food imagery
* Simple navigation
* Fast ordering flow
* Minimal user effort

---

# Design Principles

## 1. Simplicity

Every screen should have a clear primary action.

Avoid unnecessary elements.

---

## 2. Speed

The UI should reduce the number of taps needed to complete common tasks.

Example:

Restaurant

↓

Food

↓

Cart

↓

Checkout

should require as few interactions as possible.

---

## 3. Consistency

Spacing

Typography

Buttons

Cards

Colors

Icons

Animations

should remain consistent throughout the project.

---

## 4. Accessibility

Support:

* Large touch targets
* Readable typography
* Proper color contrast
* Accessible form labels
* Keyboard-friendly admin dashboard

---

## 5. Delight

Micro-interactions should make the experience feel polished.

Examples:

* Button press animations
* Loading skeletons
* Success animations
* Empty states
* Smooth transitions

---

# Design Style

Overall style:

* Minimal
* Rounded
* Spacious
* Modern
* Soft shadows
* Clean cards
* Large food photography
* Bright accents
* High readability

---

# Color Palette

## Primary

```text
#E23744
```

QuickEats Red

---

## Secondary

```text
#F8F8F8
```

---

## Accent

```text
#FFD166
```

---

## Success

```text
#22C55E
```

---

## Warning

```text
#F59E0B
```

---

## Error

```text
#EF4444
```

---

## Text

Primary

```text
#1F2937
```

Secondary

```text
#6B7280
```

Disabled

```text
#9CA3AF
```

---

## Background

```text
#FFFFFF
```

Cards

```text
#FFFFFF
```

Surface

```text
#F5F5F5
```

---

# Typography

Primary Font

Inter

Fallback

System Sans

---

# Font Scale

Display

40

Heading

32

Title

24

Subtitle

18

Body

16

Caption

14

Small

12

---

# Border Radius

Cards

16px

Buttons

14px

Inputs

12px

Bottom Sheets

24px

Images

16px

---

# Shadows

Use soft elevation.

Avoid harsh shadows.

Mobile should rely on spacing more than heavy shadows.

---

# Iconography

Use

Lucide Icons

or

Material Icons

Icons should be:

* Simple
* Outlined
* Consistent

---

# Image Guidelines

Images should be:

High quality

Rounded

Consistent aspect ratio

Optimized

Food should always be the hero.

---

# Animation Guidelines

Animations should be subtle.

Recommended duration

150–250ms

Use:

* Fade
* Slide
* Scale
* Bottom Sheet Motion

Avoid excessive animations.

---

# Customer App UX

## Navigation

Bottom Navigation

Recommended Tabs

* Home
* Search
* Orders
* Favorites
* Profile

---

## Home Screen

Sections

* Location
* Search
* Categories
* Featured
* Recommended
* Popular
* Offers
* Recently Ordered

Cards should be highly visual.

---

## Restaurant Screen

Display

* Banner
* Rating
* Delivery Time
* Distance
* Menu Categories
* Food Cards

Food cards should prioritize:

Image

↓

Name

↓

Price

↓

Add Button

---

## Cart

Large total

Clear CTA

Minimal distractions

Persistent checkout button

---

## Checkout

Single-column layout

Simple payment selection

Easy address switching

Large confirmation button

---

## Orders

Timeline layout

Visual progress indicator

Easy reorder

Invoice access

---

## Profile

Simple list layout

Large profile image

Clear account settings

---

# Restaurant App UX

Restaurant owners prioritize efficiency over discovery.

The interface should reduce operational friction.

---

## Dashboard

Show

Revenue

Orders

Pending

Preparing

Completed

Best Sellers

Recent Activity

---

## Menu Management

Fast editing

Bulk actions

Availability toggle

Image upload

Category organization

---

## Order Management

Incoming orders should receive immediate visual attention.

Large Accept

Large Reject

Clear status updates

Minimal scrolling

---

## Analytics

Simple charts

Revenue

Orders

Popular Items

Peak Hours

---

# Admin Dashboard UX

The admin interface should emphasize data density without sacrificing clarity.

---

## Sidebar Navigation

Dashboard

Users

Restaurants

Foods

Orders

Coupons

Categories

Payments

Reviews

Notifications

Settings

---

## Dashboard

Cards

Charts

Tables

KPIs

Recent Activity

---

## Data Tables

Features

Search

Filters

Pagination

Sorting

Bulk Actions

Responsive behavior

---

## Forms

Clear validation

Grouped fields

Helpful placeholders

Confirmation dialogs

---

# Components

The following components should become reusable design system elements.

Buttons

Cards

Inputs

Search Bars

Badges

Avatars

Chips

Tags

Dialogs

Bottom Sheets

Dropdowns

Snackbars

Loading Indicators

Skeleton Loaders

Empty States

Tables

Charts

Stat Cards

---

# Empty States

Every empty state should include:

Illustration or icon

Helpful message

Primary action

Examples

"No orders yet."

"Search restaurants"

---

# Error States

Friendly messaging

Retry button

No technical error messages exposed to users.

---

# Loading States

Use skeleton loaders.

Avoid blank white screens.

Buttons should show loading indicators.

---

# Responsive Design

## Customer

Phone-first

---

## Restaurant

Phone-first

---

## Admin

Desktop-first

Responsive down to tablet widths

---

# Design System Rules

Every spacing value should follow an 8px spacing scale.

Typography must remain consistent.

Avoid random colors.

Avoid inconsistent button sizes.

Avoid different border radii across screens.

---

# 🚨 Mandatory Stitch MCP Rules

## Rule 1

Every screen must be designed in Stitch MCP before implementation.

---

## Rule 2

No placeholder screens.

No demo UI.

No autogenerated temporary layouts.

---

## Rule 3

Every screen requires design approval before development.

---

## Rule 4

Each implemented screen must exactly match its approved Stitch design.

---

## Rule 5

If the UI changes, the Stitch design must be updated first.

---

## Rule 6

Every reusable component should originate from the Stitch design system.

---

## Rule 7

Design consistency has higher priority than adding new features.

---

## Rule 8

The design should be inspired by the usability and navigation patterns of Zomato while remaining a unique QuickEats interface.

Never copy:

* Logos
* Branding
* Illustrations
* Icons
* Proprietary assets
* Exact screen replicas

---

# Screen Inventory

## Customer App

* Splash
* Login
* Register
* Forgot Password
* Home
* Search
* Categories
* Restaurant List
* Restaurant Details
* Food Details
* Cart
* Checkout
* Payment
* Order Tracking
* Order History
* Favorites
* Notifications
* Profile
* Settings
* Addresses
* Reviews

---

## Restaurant App

* Login
* Dashboard
* Orders
* Order Details
* Menu
* Add Food
* Edit Food
* Categories
* Reviews
* Analytics
* Earnings
* Offers
* Restaurant Profile
* Settings

---

## Admin Dashboard

* Login
* Dashboard
* Users
* Restaurants
* Orders
* Foods
* Categories
* Coupons
* Banners
* Reviews
* Payments
* Notifications
* Reports
* Settings

---

# Definition of Design Done

A screen is considered complete only when:

* The Stitch MCP design exists.
* The layout is approved.
* Colors follow the design system.
* Typography follows the design system.
* Components use approved variants.
* Accessibility is reviewed.
* Responsive behavior is considered.
* States (loading, empty, error, success) are designed.
* Interactions are documented.
* The implementation matches the approved Stitch design.

---

# Final Design Objective

QuickEats should feel like a polished, production-ready food delivery platform.

Users should experience:

* Fast navigation
* Clear information hierarchy
* Consistent visual language
* Smooth interactions
* Modern aesthetics
* Minimal cognitive load
* High usability

Every design decision should reinforce simplicity, speed, and trust while maintaining an original identity inspired by—but never copying—the best practices of leading food delivery applications.

---

# End of UI/UX Design Brief
