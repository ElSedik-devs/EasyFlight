---

# ✈️ EasyFlight

A full-stack **flight booking web app** with a modern **Angular 19** frontend and **Spring Boot** backend. It integrates **Keycloak** for authentication, **Stripe** for payments, and **MySQL** (Dockerized) for persistence.

---

## 🚀 Demo

🎥 **Demo Video**: ## 🚀 

[![Demo Video](https://img.youtube.com/vi/68IEWcIc3Us/maxresdefault.jpg)](https://youtu.be/Dp9cvgTLtwg)


---

## 🛠️ Technologies Used

* **Frontend:** Angular 19 (Angular Material, TypeScript)
* **Backend:** Spring Boot (Java 17+, Spring Data JPA, REST APIs)
* **Authentication:** Keycloak (OIDC / OAuth 2.0, JWT)
* **Payments:** Stripe Checkout
* **Database:** MySQL 8 (Docker)
* **Build Tools:** Maven, Angular CLI
* **Styling:** Angular Material + custom CSS

---

## ✨ Features

* 🔎 Search flights (one-way / return) with date picker
* 🪑 Choose cabins (Economy / Business / First)
* 👥 Add travellers and passenger details
* 🔐 Secure login/logout with Keycloak
* 💳 Checkout with Stripe test cards
* 📦 Booking history page
* 🛠️ Admin dashboard **in progress**

---

## ⚡ Quick Start

1. **Clone the repo:**

   ```bash
   git clone https://github.com/ElSedik-devs/EasyFlight.git
   cd EasyFlight
   ```
2. **Run backend (Spring Boot):**

   ```bash
   cd backend
   mvn spring-boot:run
   ```
3. **Run frontend (Angular 19):**

   ```bash
   cd frontend
   npm install
   npm start
   ```
4. Open [http://localhost:4200](http://localhost:4200) in your browser.

> 🐳 MySQL and Keycloak are configured via **Docker Compose** (`docker-compose up -d`).
> 💳 Use Stripe **test cards** for checkout (e.g., `4242 4242 4242 4242`).

---

## 📝 License

MIT

---
