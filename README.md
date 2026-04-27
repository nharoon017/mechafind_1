# MechaFind — Mechanic Finder Platform

MechaFind is a full-stack web application that connects vehicle owners with mechanics. Customers can search for mechanics by location, share their GPS coordinates, send service requests, chat with mechanics in real time, and leave reviews. Mechanics get their own dashboard to manage incoming jobs, update availability, and communicate with customers.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Set Up MongoDB](#2-set-up-mongodb)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Run the Backend](#4-run-the-backend)
  - [5. Run the Frontend](#5-run-the-frontend)
- [API Reference](#api-reference)
  - [Auth — Customers](#auth--customers)
  - [Auth — Mechanics](#auth--mechanics)
  - [Mechanics](#mechanics)
  - [Service Requests](#service-requests)
  - [Messaging](#messaging)
  - [Reviews](#reviews)
  - [Health Check](#health-check)
- [Frontend Routes](#frontend-routes)
- [Data Models](#data-models)
  - [User](#user)
  - [Mechanic](#mechanic)
  - [ServiceRequest](#servicerequest)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## Features

### Customer Side
- **Register / Login** with email and password (JWT-secured)
- **Search mechanics** by location keyword (case-insensitive)
- **View mechanic profiles** — services offered, location, availability status, and rating
- **Send a service request** including vehicle details, issue description, and GPS coordinates
- **Customer dashboard** — view all submitted requests and their current statuses
- **In-request chat** — send and receive messages with the assigned mechanic
- **Submit a star rating and review** once a job is marked Completed
- **Profile management** — update name, workshop name, and service location (requires password confirmation)

### Mechanic Side
- **Separate mechanic registration and login** flow via `/mechanic/register` and `/mechanic/login`
- **Mechanic dashboard** — view all incoming service requests with customer details, vehicle info, and a Google Maps link to the customer's location
- **Accept, Decline, or Complete** service requests
- **Toggle availability** (Open / Closed) directly from the dashboard
- **In-request chat** — message the customer associated with any job
- **Profile management** — update name, services offered, location, and contact number

### General
- Role-based routing: mechanic users are automatically redirected to `/mechanic/dashboard` on login
- JWT tokens stored in `localStorage` and sent as `Authorization: Bearer <token>` headers
- Emergency page for urgent assistance scenarios
- About, Services, and Partners landing pages

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router DOM 7, Bootstrap 5, React-Bootstrap, Vite |
| Backend | Node.js, Express 4 |
| Database | MongoDB (via Mongoose 7) |
| Auth | JSON Web Tokens (jsonwebtoken), bcryptjs |
| Dev tooling | Nodemon, ESLint, Vite |

---

## Project Structure

```
mechafind_1/
├── backend/                        # Express API server
│   ├── controllers/
│   │   └── mechanicController.js   # Mechanic auth, profile, and request handlers
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT verification + mechanic role guard
│   ├── models/
│   │   └── Mechanic.js             # Mongoose schema for the Mechanic collection
│   ├── routes/
│   │   └── mechanicRoutes.js       # /api/mechanic/* route definitions
│   ├── db.js                       # MongoDB connection + User & Request schemas
│   ├── server.js                   # App entry point, all customer-facing routes
│   ├── .env                        # Environment variables (not committed in production)
│   └── package.json
│
└── mechafind/                      # Vite + React frontend
    ├── public/
    ├── src/
    │   ├── assets/                 # Images used throughout the UI
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── home.jsx
    │   │   ├── About.jsx
    │   │   ├── services.jsx
    │   │   ├── partners.jsx
    │   │   ├── Emergency.jsx
    │   │   ├── Login.jsx           # Customer login
    │   │   ├── Register.jsx        # Customer registration
    │   │   ├── SearchMechanic.jsx  # Search + request flow
    │   │   ├── CustomerDashboard.jsx
    │   │   ├── MechanicLogin.jsx
    │   │   ├── MechanicRegister.jsx
    │   │   ├── MechanicDashboard.jsx
    │   │   └── MechanicProfile.jsx
    │   ├── App.jsx                 # Router setup and role-based redirect logic
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- **MongoDB** running locally on port `27017`, or a MongoDB Atlas URI

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mechafind_1
```

### 2. Set Up MongoDB

Make sure MongoDB is running locally:

```bash
# macOS (Homebrew)
brew services start mongodb-community

# Ubuntu / Debian
sudo systemctl start mongod

# Windows — start from Services or run:
net start MongoDB
```

Alternatively, create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas) and copy the connection string.

### 3. Configure Environment Variables

Edit `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/mechafind
JWT_SECRET=mechafind_super_secret_key_2024
PORT=5000
```

> **Important:** Change `JWT_SECRET` to a long, random string before deploying to any public environment.

### 4. Run the Backend

```bash
cd backend
npm install
npm run dev        # Starts with nodemon (auto-restarts on file changes)
# or
npm start          # Starts with plain node
```

The API server will be available at `http://localhost:5000`.  
Confirm it is running by visiting: `http://localhost:5000/api/health`

### 5. Run the Frontend

Open a second terminal:

```bash
cd mechafind
npm install
npm run dev
```

The React dev server will start at `http://localhost:5173`.

---

## API Reference

All endpoints are prefixed with `http://localhost:5000`.  
Protected routes require an `Authorization: Bearer <token>` header.

### Auth — Customers

#### `POST /api/register`

Register a new Customer or Mechanic (legacy user-based flow).

**Request body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword",
  "role": "Customer",
  "workshopName": null,
  "serviceLocation": null,
  "specialization": null
}
```
For `role: "Mechanic"`, `workshopName`, `serviceLocation`, and `specialization` are required.

**Response `201`:**
```json
{
  "message": "Account created successfully!",
  "token": "<jwt>",
  "user": { "id": "...", "name": "Jane Doe", "email": "...", "role": "Customer" }
}
```

---

#### `POST /api/login`

**Request body:**
```json
{ "email": "jane@example.com", "password": "securepassword" }
```

**Response `200`:**
```json
{
  "message": "Login successful!",
  "token": "<jwt>",
  "user": { "id": "...", "name": "Jane Doe", "role": "Customer" }
}
```

---

### Auth — Mechanics

#### `POST /api/mechanic/register`

Register a mechanic with their own dedicated account.

**Request body:**
```json
{
  "name": "Ali's Garage",
  "email": "ali@garage.com",
  "password": "securepassword",
  "services": ["Engine Repair", "Oil Change", "Tyre Replacement"],
  "location": "Hyderabad",
  "contact": "+91-9876543210"
}
```
`services` can be either an array or a comma-separated string.

**Response `201`:**
```json
{
  "success": true,
  "message": "Mechanic registered successfully!",
  "data": { "token": "<jwt>", "mechanic": { "id": "...", "name": "...", "role": "mechanic" } }
}
```

---

#### `POST /api/mechanic/login`

**Request body:**
```json
{ "email": "ali@garage.com", "password": "securepassword" }
```

---

### Mechanics

#### `GET /api/mechanics?location=<keyword>`

Search for mechanics by location. `location` is optional; omitting it returns all mechanics.

**Response `200`:**
```json
{
  "mechanics": [
    {
      "id": "...",
      "name": "Ali's Garage",
      "workshopName": "Ali's Garage",
      "location": "Hyderabad",
      "services": "Engine Repair, Oil Change",
      "rating": "4.7",
      "status": "available"
    }
  ],
  "total": 1
}
```

---

#### `GET /api/mechanic/profile` *(Mechanic token required)*

Returns the authenticated mechanic's profile and stats.

#### `PUT /api/mechanic/profile` *(Mechanic token required)*

Update the mechanic's name, services, location, contact, or open/closed status.

---

### Service Requests

#### `POST /api/requests`

Submit a new service request from a customer to a mechanic.

**Request body:**
```json
{
  "mechanicId": "<mechanic_object_id>",
  "customerId": "<user_object_id_or_null>",
  "customerName": "Jane Doe",
  "customerPhone": "+91-9876543210",
  "customerLatitude": 17.3850,
  "customerLongitude": 78.4867,
  "customerLocation": "Banjara Hills, Hyderabad",
  "vehicle": "Honda City 2019",
  "issue": "Engine won't start"
}
```
Both `customerLatitude` and `customerLongitude` are **required** so the mechanic can navigate to the customer.

**Response `201`:**
```json
{ "message": "Request sent successfully!", "requestId": "..." }
```

---

#### `GET /api/requests/customer/:customer_id`

Returns all requests submitted by a given customer, including status, messages, mechanic name, and a Google Maps link.

---

#### `GET /api/requests/:mechanic_id`

Returns all requests assigned to a given mechanic. Each item includes a `mapUrl` linking directly to the customer's GPS coordinates on Google Maps.

---

#### `GET /api/mechanic/requests` *(Mechanic token required)*

Returns all requests for the currently authenticated mechanic.

---

#### `PATCH /api/requests/:request_id`

Update a request's status. Used by mechanics.

**Request body:**
```json
{ "status": "Accepted" }
```
Valid values: `"Accepted"`, `"Declined"`, `"Completed"`.

---

#### `PUT /api/mechanic/requests/:id` *(Mechanic token required)*

Alias route for updating request status from the mechanic dashboard.

---

### Messaging

#### `GET /api/requests/single/:request_id`

Poll a single request to retrieve the latest messages and status. Used by the customer chat view.

#### `POST /api/requests/:request_id/message`

Append a message to a request's message thread.

**Request body:**
```json
{ "sender": "Customer", "text": "How far away are you?" }
```
`sender` must be `"Customer"` or `"Mechanic"`.

---

### Reviews

#### `PATCH /api/requests/:request_id/review`

Submit a star rating and written review after a job is completed.

**Request body:**
```json
{ "rating": 5, "review": "Fixed the issue quickly and professionally." }
```
`rating` must be an integer between 1 and 5.

---

### Health Check

#### `GET /api/health`

```json
{ "status": "MechaFind backend is running", "port": 5000 }
```

---

## Frontend Routes

| Path | Component | Access |
|---|---|---|
| `/` | `Home` | Public |
| `/about` | `About` | Public |
| `/services` | `Services` | Public |
| `/partners` | `Partners` | Public |
| `/search` | `SearchMechanic` | Public (requests require Customer login) |
| `/emergency` | `Emergency` | Public |
| `/login` | `Login` | Public |
| `/register` | `Register` | Public |
| `/customer-dashboard` | `CustomerDashboard` | Customer login required |
| `/mechanic/register` | `MechanicRegister` | Public |
| `/mechanic/login` | `MechanicLogin` | Public |
| `/mechanic/dashboard` | `MechanicDashboard` | Mechanic login required |
| `/mechanic/profile` | `MechanicProfile` | Mechanic login required |

> Authenticated mechanic users are automatically redirected from any non-`/mechanic/*` route to `/mechanic/dashboard`.

---

## Data Models

### User

Stored in the `users` collection. Covers both Customer and Mechanic accounts registered through the customer-facing flow.

| Field | Type | Notes |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required, unique, lowercased |
| `password` | String | Bcrypt-hashed |
| `role` | `"Customer"` \| `"Mechanic"` | Required |
| `workshopName` | String | Mechanic only |
| `serviceLocation` | String | Mechanic only |
| `specialization` | String | Mechanic only |
| `createdAt` / `updatedAt` | Date | Auto-managed by Mongoose |

---

### Mechanic

Stored in the `mechanics` collection. Used for mechanics who register through the dedicated mechanic flow.

| Field | Type | Notes |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required, unique |
| `password` | String | Bcrypt-hashed |
| `services` | String[] | e.g. `["Oil Change", "Tyre Replacement"]` |
| `location` | String | Required — used for search filtering |
| `contact` | String | Required — shared with customers on request |
| `isOpen` | Boolean | Defaults to `true` (available) |

---

### ServiceRequest

Stored in the `requests` collection.

| Field | Type | Notes |
|---|---|---|
| `mechanicId` | ObjectId → Mechanic | Required |
| `userId` | ObjectId → User | Optional (null for guest requests) |
| `customerName` | String | Required |
| `customerPhone` | String | Required |
| `customerLatitude` | Number | Required |
| `customerLongitude` | Number | Required |
| `customerLocation` | String | Human-readable address label |
| `vehicle` | String | Required |
| `issue` | String | Required |
| `status` | `"Pending"` \| `"Accepted"` \| `"Declined"` \| `"Completed"` | Defaults to `"Pending"` |
| `rating` | Number (1–5) | Set by customer after completion |
| `review` | String | Set by customer after completion |
| `messages` | Message[] | Embedded sub-documents |

**Message sub-document:**

| Field | Type |
|---|---|
| `sender` | `"Customer"` \| `"Mechanic"` |
| `text` | String |
| `createdAt` | Date |

---

## Authentication

The app uses two separate JWT flows:

**Customer flow** — token issued by `/api/login` or `/api/register` and stored in `localStorage` as `mechafind_token`. User data is stored as `mechafind_user`.

**Mechanic flow** — token issued by `/api/mechanic/login` or `/api/mechanic/register` and stored in `localStorage` as `mechafind_token`. Mechanic data is stored as `mechafind_mechanic`.

Protected mechanic API routes validate the token via `verifyToken` middleware and confirm the `role` is `"mechanic"` via `requireMechanic` middleware. Tokens expire after **7 days**.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `MONGO_URI` | `mongodb://127.0.0.1:27017/mechafind` | MongoDB connection string |
| `JWT_SECRET` | `mechafind_super_secret_key_2024` | Secret used to sign JWTs — **change before deploying** |
| `PORT` | `5000` | Port the Express server listens on |

---

## Scripts

### Backend (`backend/`)

| Command | Description |
|---|---|
| `npm start` | Start the server with `node` |
| `npm run dev` | Start with `nodemon` for live reloading |

### Frontend (`mechafind/`)

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server at `http://localhost:5173` |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the source files |

---
