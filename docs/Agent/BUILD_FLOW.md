# BUILD_FLOW.md

# QuickEats Build Flow & Development Execution Guide

## Version

1.0

---

# Purpose

This document defines the **mandatory development process** for QuickEats.

It is intended for AI-assisted development (Anto-0 2.0 + Gemini 3.1) and acts as the execution contract for the project.

The objective is to ensure that QuickEats is built like a production application rather than a prototype, with continuous validation, testing, version control, and design-first development.

---

# 🚨 Golden Rules

These rules have the highest priority.

1. Never skip phases.
2. Never generate placeholder or demo UI.
3. Never start coding before the Stitch MCP design is approved.
4. Never continue to the next phase if the current phase has unresolved issues.
5. Never assume missing requirements.
6. Always ask for clarification if information is missing.
7. Every stable feature must end with testing and a Git commit.
8. Keep the repository in a deployable state throughout development.

---

# Master Development Workflow

```text
Requirements
        ↓
Review Documents
        ↓
Validate Missing Information
        ↓
Stitch MCP Design
        ↓
Design Approval
        ↓
Technical Planning
        ↓
Backend Development
        ↓
Frontend Development
        ↓
Integration
        ↓
Testing
        ↓
Bug Fixes
        ↓
Git Commit
        ↓
Proceed To Next Phase
```

---

# Phase 0 — Project Validation

## Objective

Ensure enough information exists before writing code.

## Tasks

* Read PRD.md
* Read TRD.md
* Read UI_UX_BRIEF.md
* Read APP_FLOW.md
* Read DATABASE_SCHEMA.md
* Review project architecture
* Verify tech stack
* Verify deployment targets

---

## Mandatory Checklist

* Product scope is complete.
* Tech stack is finalized.
* Roles are defined.
* Features are defined.
* Database schema is complete.
* App flow is complete.
* UI brief is complete.

---

## If Anything Is Missing

**Stop development immediately.**

Do not guess.

Ask the project owner concise questions until the missing information is resolved.

Example:

> "The order cancellation rules are not defined. Please clarify before implementation."

---

# Phase 1 — Project Setup

## Objective

Create the development environment.

---

## Tasks

* Initialize Git repository
* Create monorepo structure
* Initialize backend
* Initialize customer app
* Initialize restaurant app
* Initialize admin dashboard
* Configure TypeScript
* Configure ESLint
* Configure Prettier
* Configure environment files
* Configure package manager
* Install dependencies

---

## Validation

* Applications start successfully.
* No lint errors.
* No TypeScript errors.
* Repository structure is clean.

---

## Git Commit

```text
chore: initialize QuickEats monorepo and development environment
```

---

# Phase 2 — Stitch MCP Design

## Objective

Design before development.

---

## Rules

Every screen must exist in Stitch MCP.

No exceptions.

---

## Process

For each feature:

Requirement

↓

Create Stitch Design

↓

Review

↓

Approval

↓

Lock Design

---

## Forbidden

* Placeholder UI
* Demo UI
* Temporary layouts
* Auto-generated mock screens

---

## Validation

Every screen has an approved Stitch design.

---

## Git Commit

```text
design: complete approved Stitch MCP screens for Phase 2
```

---

# Phase 3 — Backend Foundation

## Tasks

* Express server
* MongoDB connection
* Authentication
* Middleware
* Base folder structure
* Error handler
* Logging
* Validation
* API response format

---

## Validation

* Server starts.
* Database connects.
* APIs respond.
* Authentication works.

---

## Git Commit

```text
feat: implement backend foundation and authentication
```

---

# Phase 4 — Database Models

## Tasks

Create all models.

* Users
* Restaurants
* Foods
* Categories
* Orders
* Payments
* Reviews
* Favorites
* Coupons
* Notifications
* Others

---

## Validation

* Models compile.
* Relationships verified.
* Indexes created.

---

## Git Commit

```text
feat: implement database models and schema
```

---

# Phase 5 — Backend APIs

Develop APIs feature by feature.

Recommended order:

1. Authentication
2. Users
3. Restaurants
4. Categories
5. Foods
6. Cart
7. Orders
8. Payments
9. Reviews
10. Notifications
11. Coupons
12. Analytics

---

For every module:

* Build
* Test
* Validate
* Fix
* Commit

---

## Example Commit

```text
feat: add restaurant management APIs
```

---

# Phase 6 — Customer App

Development order:

* Authentication
* Navigation
* Home
* Search
* Restaurant
* Food
* Cart
* Checkout
* Orders
* Profile
* Reviews
* Notifications

---

Each screen follows:

Approved Stitch Design

↓

Implementation

↓

API Integration

↓

Testing

↓

Bug Fixes

↓

Commit

---

# Phase 7 — Restaurant App

Development order:

* Login
* Dashboard
* Orders
* Menu
* Categories
* Earnings
* Reviews
* Offers
* Profile
* Settings

Follow the same development cycle.

---

# Phase 8 — Admin Dashboard

Development order:

* Login
* Dashboard
* Users
* Restaurants
* Categories
* Foods
* Orders
* Coupons
* Payments
* Reviews
* Notifications
* Reports
* Settings

Again:

Design

↓

Code

↓

Integrate

↓

Test

↓

Commit

---

# Phase 9 — Integration

## Tasks

* Connect frontend to backend
* Connect Stripe
* Connect Firebase
* Connect Cloudinary
* Connect Resend
* Verify Socket.IO events

---

## Validation

All integrations operate correctly.

---

## Git Commit

```text
feat: integrate external services
```

---

# Phase 10 — Quality Assurance

For every completed feature perform:

## Functional Testing

* Expected behavior
* Edge cases
* Invalid inputs
* Authorization
* Error handling

---

## UI Testing

* Layout
* Responsive behavior
* Stitch design consistency
* Loading states
* Empty states
* Error states

---

## API Testing

* Success responses
* Failure responses
* Validation
* Security

---

## Performance Testing

* API latency
* Rendering
* Image loading
* Database queries

---

## Security Review

* Protected routes
* JWT validation
* Role validation
* Input sanitization
* Password hashing

---

# Phase 11 — Bug Fix Loop

This phase is **mandatory**.

Repeat until stable.

```text
Test
   ↓
Find Bug
   ↓
Fix Bug
   ↓
Retest
   ↓
Still Failing?
   ↓
Yes → Repeat
No  → Continue
```

Continue looping until:

* No blocking bugs
* No runtime errors
* No TypeScript errors
* No lint errors
* No broken navigation
* No failing API requests

---

# Phase 12 — Code Review

Review for:

* Duplicate code
* Naming consistency
* Folder structure
* Reusable components
* Performance
* Readability
* Maintainability

Refactor where needed before proceeding.

---

# Phase 13 — Production Readiness Checklist

Before deployment confirm:

* All requirements implemented.
* All Stitch MCP screens implemented.
* No placeholder UI.
* No TODO comments.
* No mock data.
* No console errors.
* No TypeScript errors.
* No ESLint warnings.
* Environment variables configured.
* Images optimized.
* Authentication verified.
* Payments tested in Stripe Test Mode.
* Firebase notifications verified.
* Emails verified.
* API documentation updated.

---

# Phase 14 — Deployment

Deploy in order:

Backend

↓

Database

↓

Admin Dashboard

↓

Mobile Builds

---

Targets

* Render
* MongoDB Atlas
* Vercel
* Expo EAS (for production builds)

---

# Git Commit Rules

Commit only when:

* A feature is complete.
* Tests pass.
* Lint passes.
* TypeScript passes.
* The application builds successfully.

Avoid committing broken code.

---

## Commit Message Convention

### Features

```text
feat: implement customer authentication
```

### Fixes

```text
fix: resolve checkout validation issue
```

### Refactoring

```text
refactor: simplify order service logic
```

### Documentation

```text
docs: update API documentation
```

### Styling

```text
style: improve dashboard spacing
```

### Testing

```text
test: add order service test cases
```

### Chores

```text
chore: update project dependencies
```

---

# Continuous Verification Loop

Every feature must complete this cycle:

```text
Plan
   ↓
Review Requirements
   ↓
Verify Stitch Design
   ↓
Develop
   ↓
Run TypeScript Check
   ↓
Run Linter
   ↓
Run Tests
   ↓
Manual Testing
   ↓
Fix Issues
   ↓
Retest
   ↓
Git Commit
   ↓
Proceed
```

If any step fails, return to the previous step until it succeeds.

---

# AI Development Rules

The AI must:

* Work phase by phase.
* Never jump ahead.
* Never skip testing.
* Never skip code review.
* Never invent missing requirements.
* Prefer reusable components.
* Keep code modular.
* Follow the approved design system.
* Explain major architectural decisions when necessary.

---

# Mandatory Clarification Rule

Before starting any new phase, the AI must ask:

> **"Do you want to proceed with this phase?"**

If required information is missing, the AI must ask specific questions instead of making assumptions.

Examples:

* "The payment refund flow is not defined. How should refunds work?"
* "Restaurant operating hours are missing. Should restaurants support multiple shifts?"
* "Order cancellation rules are unclear. Please confirm the expected behavior."

Development must pause until the answers are received.

---

# Final Approval Gate

Before writing production code, the AI must confirm:

* PRD reviewed ✅
* TRD reviewed ✅
* UI/UX Brief reviewed ✅
* App Flow reviewed ✅
* Database Schema reviewed ✅
* Stitch MCP designs approved ✅
* Missing requirements resolved ✅

Only after all items are confirmed should coding begin.

---

# Definition of Done

The project is complete only when:

* All three applications are fully implemented.
* Every implemented screen matches its approved Stitch MCP design.
* All APIs are integrated.
* All automated and manual tests pass.
* No runtime, TypeScript, or lint errors remain.
* The repository is clean and committed with professional commit history.
* The application is deployable on the defined infrastructure.
* The project is production-ready.

---

# End of Build Flow
