# ✍️ BlogVerse — Full Stack Blog Platform

A full stack **Blog Platform** built with **React + Node.js + Express + MongoDB Atlas**.  
Write, publish, like, and comment on blog posts with full authentication!

---

## 🚀 Features

- ✅ **User Authentication** (Register/Login with JWT)
- ✍️ **Create, Edit, Delete** blog posts
- ❤️ **Like** posts
- 💬 **Comment** on posts
- 🔍 **Search** and **filter** by category
- 📖 Auto **read time** calculation
- 📱 Fully **responsive** dark theme UI
- ☁️ **MongoDB Atlas** cloud database

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 + Vite | Frontend |
| React Router v6 | Client-side routing |
| Node.js + Express | Backend API |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |

---

## 📁 Project Structure

```
blog-platform/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   └── EditPost.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── server/                  # Node.js backend
    ├── models/
    │   ├── User.js
    │   └── Post.js
    ├── routes/
    │   ├── auth.js
    │   └── posts.js
    ├── middleware/
    │   └── auth.js
    ├── index.js
    ├── .env
    └── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/jatinmor89/blog-platform.git
cd blog-platform
```

### 2. Setup Server
```bash
cd server
npm install
npm run dev
```
Server runs on http://localhost:5000

### 3. Setup Client
```bash
cd client
npm install
npm run dev
```
Client runs on http://localhost:5173

---

## 📋 What I Learned

- Full stack MERN architecture
- JWT authentication with bcrypt
- REST API design with Express
- MongoDB Atlas cloud database
- React Router v6 navigation
- Protected routes
- State management across components

---


## 👤 Author

**Jatin** — [GitHub](https://github.com/jatinmor89) | [LinkedIn](https://www.linkedin.com/in/jatin-mor)

---

## 📄 License

MIT License
