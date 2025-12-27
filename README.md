# 🚀 Django React Login System
### Full Stack Authentication using React, Django & PostgreSQL

---

## 📌 Project Overview

This project is a **full-stack authentication system** built using **React** for the frontend and **Django REST Framework** for the backend, with **PostgreSQL** as the database.

The application provides:
- User Signup (Registration)
- User Login
- JWT-based Authentication
- Secure REST APIs
- Django Admin Panel for user management

This project follows **industry-standard architecture**:
- Django is used only as a **backend API**
- React is used only as a **frontend SPA**
- No Django HTML templates are used

---

## 🧠 System Architecture

```
React Frontend (SPA)
        |
        | Axios API Requests
        v
Django REST API (JWT Authentication)
        |
        v
PostgreSQL Database
```

---

## 🛠️ Technology Stack

### Frontend
- React (Create React App)
- Axios
- React Router DOM

### Backend
- Django
- Django REST Framework
- Django Simple JWT
- Django CORS Headers

### Database
- PostgreSQL

---

## 📂 Project Folder Structure

```
django-react-login/
│
├── backend/
│   ├── backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── authapp/
│   │   ├── serializers/
│   │   │   └── user_serializer.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── models.py
│   │   └── apps.py
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── App.js
│   │   └── index.js
│
└── README.md
```

---

## 🔐 Authentication Flow (JWT)

1. User registers using React Signup page  
2. React sends data to Django API  
3. Django stores user in PostgreSQL  
4. User logs in using credentials  
5. Django returns JWT access token  
6. React stores token in localStorage  
7. Token is sent with protected API requests  

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| POST | /api/register/ | User registration |
| POST | /api/login/ | User login (JWT token) |
| GET  | /admin/ | Django admin panel |

⚠️ Always use trailing slash `/` in API URLs.

---

## ⚙️ Setup Instructions

### Backend Setup (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at:
```
http://127.0.0.1:8000/
```

---

### Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Frontend runs at:
```
http://localhost:3000/
```

---

## 🛡️ Django Admin Panel

Admin URL:
```
http://127.0.0.1:8000/admin/
```

Use superuser credentials created during setup.

---

## ❗ Important Notes

- Django root URL (`/`) returns **404 by design**
- React handles the homepage
- Django serves **only APIs**
- PostgreSQL service must be running
- CORS is enabled for frontend-backend communication

---

## 🚀 Future Enhancements

- Protected routes in React
- Logout functionality
- Password reset & email verification
- Role-based access control
- UI enhancement with Tailwind CSS
- Cloud deployment (AWS / Render / Vercel)

---

## 👨‍💻 Author

Rohit Shahare  
Full Stack Developer (React | Django | PostgreSQL)

---

## 📄 License

This project is created for **learning and educational purposes**.  
Free to use and modify.
