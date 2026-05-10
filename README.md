# Microservices Backend Architecture with NestJS

This repository contains a production-ready, highly scalable microservices architecture built using NestJS, Redis, PostgreSQL, and MongoDB.

## 🏗️ Architecture Overview

The system consists of 4 core components:

1. **API Gateway**: Acts as the single entry point. Handles HTTP requests, rate limiting (Throttling), global JWT authentication, and routes traffic to internal microservices via Redis.
2. **Auth Service**: Manages user registration, login, and JWT generation. Uses PostgreSQL for strong ACID properties. Emits a `user.created` event upon successful registration.
3. **User Service**: Manages user profiles. Connects to PostgreSQL. Listens to events from the Auth Service to initialize user profiles.
4. **Product Service**: Manages a high-volume product catalog using MongoDB for flexible document storage and high read throughput.

## ⚡ Scalability & Production Readiness

- **Stateless Services**: All NestJS applications are stateless and can be horizontally scaled by spinning up more instances.
- **Event-Driven & Async**: Services communicate via Redis (TCP/PubSub) which decouples components and prevents HTTP bottlenecks internally.
- **Database Segregation**: Auth and User services use separate PostgreSQL schemas (or separate databases entirely in a real production environment), while Product uses MongoDB.
- **Reverse Proxy**: NGINX sits in front of the API Gateway to handle TLS termination, basic connection rate limiting, and load balancing.
- **Throttling**: The API Gateway implements request rate limiting using `@nestjs/throttler` to prevent abuse.

## 🚀 Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running the System Locally

To spin up the entire infrastructure (Databases, Redis, NGINX, and Microservices):

```bash
docker-compose up --build -d
```

### Accessing the API

The API is exposed via NGINX on port `80`. 

- **Register:** `POST http://localhost/api/auth/register`
- **Login:** `POST http://localhost/api/auth/login`
- **Get Profile:** `GET http://localhost/api/users/:id` (Requires Bearer Token)
- **Create Product:** `POST http://localhost/api/products` (Requires Bearer Token)

## 📁 Repository Structure

```
/
├── api-gateway/       # HTTP Entry Point & JWT Guard
├── auth-service/      # Authentication & Authorization (Prisma + Postgres)
├── user-service/      # User Profile Management (Prisma + Postgres)
├── product-service/   # Product Catalog (Mongoose + MongoDB)
├── nginx/             # Reverse Proxy Configuration
└── docker-compose.yml # Local Infrastructure Setup
```
# micro-service
