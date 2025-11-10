# FixMate Backend

This folder contains the FixMate backend built with **Spring Boot**, **PostgreSQL**, **Docker**, and **Flyway**.

This guide explains how any team member can set up the project on their machine.

---

## ✅ 1. Requirements

Install these before starting:

- Java 21
- Maven
- Docker + Docker Compose
- IntelliJ IDEA (recommended)

---

## ✅ 2. Start PostgreSQL (Docker)

All developers use the same PostgreSQL configuration.

### Start the database:

```bash
cd backend
docker compose up -d

#view Database
psql -h localhost -U fixmate -d fixmatedb

#Stop the database:
docker compose down

#Run the Backend
mvn spring-boot:run
