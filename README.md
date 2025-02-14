# 🍽️ Delish Nutrio API

This project is a capstone project at TechCrush Bootcamp, designed to showcase backend development skills by building a robust API for a web application that allows users to create and manage their accounts, set up a health profile, and generate personalized meal plans based on their preferences and dietary needs. The API is built with Node.js and Express and is hosted on [Render](https://delish-nutrio.onrender.com/).

## 🚀 Live API & Documentation
🔗 **Base URL:** [`https://delish-nutrio.onrender.com/`](https://delish-nutrio.onrender.com/)  
📖 **API Documentation:** [View here](https://delish-nutrio.onrender.com/api-docs/#/)  

## 📦 Features
- User Registeration and Login
- User Account Management
- User authentication (JWT-based)
- Personalized meal plan generation
- Support for dietary restrictions and preferences
- CRUD operations for meal plans

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL and MongoDB
- **Authentication:** JWT
- **Hosting:** Render.com

## 📡 API Endpoints

| Method | Endpoint             | Description                     |
|--------|----------------------|---------------------------------|
| POST   | `/api/register`       | Register a new user            |
| POST   | `/api/login`          | Login and get JWT token        |
| POST   | `/api/newprofile`     | Create a new health profile
| PUT    | `/api/updateprofile`  | Updates user's health profile
| POST   | `/api/generatemeal`   | Generate a new meal plan            |
| GET    | `/api/mealplan`       | Get personalized meal plan     |

Full documentation is available [here](https://delish-nutrio.onrender.com/api-docs/#/).

## ✅ Contributing
Contributions are welcome! Feel free to fork the repo and submit a PR.  

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.