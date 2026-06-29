# Product Management CRUD Application

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** application that allows users to securely manage their own products. The application includes user authentication using **JWT**, password encryption with **bcryptjs**, and complete CRUD (Create, Read, Update, Delete) functionality.

## 🚀 Live Demo

**Live Website:** https://product-management-crud-application.onrender.com/

---

## 📌 Features

* User Registration and Login
* JWT Authentication & Authorization
* Secure password hashing using bcryptjs
* Add new products
* View all products added by the logged-in user
* Update product information
* Delete products
* User-specific product management (each user can only access their own products)
* Fully Responsive UI
* Clean and modern interface built with Bootstrap
* RESTful API architecture

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* dotenv
* CORS

---

## 🔐 Authentication

* User signup with encrypted passwords
* Secure login using JWT
* Protected backend routes
* Only authenticated users can perform CRUD operations
* Each user can only view and manage their own products

---

## 📂 Project Workflow

1. User signs up.
2. User logs in.
3. JWT token is generated after successful login.
4. Authenticated user is redirected to the Product page.
5. User can:

   * Add products
   * Edit existing products
   * Delete products
6. Only the logged-in user's products are displayed.

---

## 📦 Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Install frontend dependencies

```bash
cd client
npm install
npm run dev
```

### Install backend dependencies

```bash
cd server
npm install
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the server folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 📸 Screenshots

Add screenshots of:

* Signup Page
* Login Page
* Product Dashboard
* Add Product
* Edit Product

---

## 👨‍💻 Author

**Rajashree Mukherjee**

If you like this project, feel free to ⭐ the repository.
