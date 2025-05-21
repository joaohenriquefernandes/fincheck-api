# 📊 FincheckAPI

**FincheckAPI** is a RESTful API built with **NestJS** that powers Fincheck — a personal finance application designed to help users monitor and manage their financial life in a simple and efficient way.

---

## 📌 About the Project

Fincheck was created to give users complete control over their financial activities. It allows them to manage:

- Bank accounts
- Investments
- Expenses and income
- Financial planning

The main goal is to promote **financial awareness and control** through an intuitive and powerful platform.

---

## 🚀 Main Features

- 🔐 **Authentication**  
  Account creation, login, and protected user dashboard using JWT authentication.

- 🏦 **Bank Accounts**  
  Full CRUD operations to manage user's bank accounts.

- 📈 **360° Overview**  
  A centralized view of all bank accounts and investments.

---

## 🛠️ Tech Stack
[![Technologies](https://skillicons.dev/icons?i=nestjs,nodejs,ts,postgres,prisma,docker)](https://skillicons.dev)

---

## 📂 API Endpoints

### 👤 Users

| Method | Endpoint     | Description                   |
|--------|--------------|-------------------------------|
| GET    | `/users/me`  | Retrieve the current user profile |

---

### 🔐 Auth

| Method | Endpoint        | Description               |
|--------|------------------|---------------------------|
| POST   | `/auth/signup`   | Create a new user account |
| POST   | `/auth/signin`   | Log into a user account   |

---

### 🗂️ Categories

| Method | Endpoint                     | Description                     |
|--------|------------------------------|---------------------------------|
| POST   | `/categories`                | Create a new category           |
| GET    | `/categories`                | List all categories             |
| GET    | `/categories/{categoryId}`   | Retrieve a specific category    |
| PUT    | `/categories/{categoryId}`   | Update a specific category      |
| DELETE | `/categories/{categoryId}`   | Delete a specific category      |

---

### 🏦 Bank Accounts

| Method | Endpoint                            | Description                       |
|--------|-------------------------------------|-----------------------------------|
| POST   | `/bank-accounts`                    | Create a new bank account         |
| GET    | `/bank-accounts`                    | List all bank accounts            |
| GET    | `/bank-accounts/{bankAccountId}`    | Retrieve a specific bank account  |
| PUT    | `/bank-accounts/{bankAccountId}`    | Update a specific bank account    |
| DELETE | `/bank-accounts/{bankAccountId}`    | Delete a specific bank account    |

---

### 💸 Transactions

| Method | Endpoint                              | Description                       |
|--------|----------------------------------------|-----------------------------------|
| POST   | `/transactions`                        | Create a new transaction          |
| GET    | `/transactions`                        | List all transactions             |
| GET    | `/transactions/{transactionId}`        | Retrieve a specific transaction   |
| PUT    | `/transactions/{transactionId}`        | Update a specific transaction     |
| DELETE | `/transactions/{transactionId}`        | Delete a specific transaction     |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
DATABASE_URL=postgresql://root:root@localhost:5432/fincheck?schema=public
JWT_SECRET=your_jwt_secret
```

---

## 🧪 Running the Project Locally

### Clone the repository

```bash
git clone https://github.com/your-username/fincheck-api.git
cd fincheck-api
```

---

### Install dependencies

```bash
npm install
```

---

### Create the environment variables file

```bash
cp .env.example .env
```

---

### Start PostgreSQL with Docker

```bash
docker-compose up -d
```

---

### Generate the Prisma client

```bash
npx prisma generate
```

---

### Run the database migrations

```bash
npx prisma migrate dev
```

---

### Start the development server

```bash
npm run start:dev
```

---

## 📘 Swagger API Documentation
After starting the server, access the full API documentation at:

```bash
http://localhost:3000/api
```

---

## 🤝 Contributing
Feel free to open issues, suggest improvements or submit pull requests to help improve the project!

---

## 📄 License

This project is licensed under the [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

---

## ✉️ Contact
Developed by João Henrique Fernandes.

[![Linkedin](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/joaohenriquefernandes/)
[![Github](https://skillicons.dev/icons?i=github)](https://github.com/joaohenriquefernandes)
