# 🏦 Bank Transaction Management System

A secure backend-based Bank Transaction Management System built using **Node.js, Express.js, and MongoDB**. This project provides RESTful APIs to manage user authentication, bank accounts, deposits, withdrawals, money transfers, and transaction records.

## 🚀 Features

- **JWT Authentication** – Secure user registration and login.
- **Account Management** – Create and manage bank accounts.
- **Deposit** – Add money to bank accounts.
- **Withdrawal** – Withdraw money with balance validation.
- **Money Transfer** – Transfer funds between accounts.
- **Ledger Management** – Maintain transaction history and financial records.
- **Initial Funds** – Initialize account balance.
- **Email Notifications** – Send emails using Nodemailer.
- **Protected Routes** – Authentication middleware for secure API access.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend Runtime |
| Express.js | REST API Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Nodemailer | Email Integration |
| bcrypt | Password Hashing |
| Postman | API Testing |

## 📂 Project Structure

```text
Bank-Transaction-Management-System/
│
├── src/
│   ├── config/
│   ├── Controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## ⚙️ Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/anubhavdotio/Bank-Transaction-Management-System.git
```

**2. Navigate to project directory**

```bash
cd Bank-Transaction-Management-System
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the project root and configure:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

Use your actual variable names from the project code.

**5. Start the server**

```bash
npm start
```

Or, if using nodemon:

```bash
npm run dev
```

## 🔐 Security

- JWT-based authentication.
- Password hashing.
- Protected API routes.
- Environment variables for sensitive configuration.
- Account balance validation.

## 🧪 API Testing

All backend APIs can be tested using **Postman**.

Main API modules:

- Authentication APIs
- Account APIs
- Deposit APIs
- Withdrawal APIs
- Money Transfer APIs
- Ledger APIs

## 📧 Email Integration

Nodemailer is integrated to send email notifications for supported operations.

## 🎯 Project Objective

The objective of this project is to develop a secure and modular banking backend system that demonstrates REST API development, database management, authentication, and transaction handling using the MERN backend technologies.

## 👨‍💻 Developer

**Anubhav**

GitHub: https://github.com/anubhavdotio

---

⭐ If you find this project useful, consider giving it a star!
