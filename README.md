# 🍽️ Delish Nutrio API v2

This project is the **second version** of the Delish Nutrio API, originally built as a capstone project at TechCrush Bootcamp.  
**v2** upgrades the backend with **TypeScript**, improved structure, and better error handling. The API allows users to create and manage their accounts, set up a health profile, and generate personalized meal plans based on dietary needs and preferences.

The **v1** codebase (JavaScript version) is still available for reference on **Git tag: v1.0.0**.

---

## 🚀 Live API & Documentation

🔗 **Base URL:** [`https://delish-nutrio.onrender.com/`](https://delish-nutrio.onrender.com/)  
📖 **API Documentation (Swagger):** [View here](https://delish-nutrio.onrender.com/api/v2/docs/#/)

---

## 📦 New in v2

- ✔️ Migrated to **TypeScript** for type safety and maintainability
- ✔️ Improved request validation and error handling
- ✔️ Refactored routes and controllers for better scalability
- ✔️ Updated dependencies and security patches

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MySQL and MongoDB
- **Authentication:** JWT
- **Hosting:** Render.com

---

## ⚙️ Local Setup (Optional)

The API is fully deployed and live at [https://delish-nutrio.onrender.com](https://delish-nutrio.onrender.com).

If you want to run it locally (for development or contribution):

1. Clone the repo
2. Copy `.env.example` to `.env` and fill in your own database credentials (you’ll need your own MySQL and MongoDB instance).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run in dev mode
   ```bash
   npm run dev
   ```
   **Note**: The API depends on your own data. You’ll need to seed your database with meals and user data to test all features.

---

## 📡 API Endpoints

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/register`      | Register a new user          |
| POST   | `/api/login`         | Login and get JWT token      |
| POST   | `/api/newprofile`    | Create a new health profile  |
| PUT    | `/api/updateprofile` | Update user's health profile |
| POST   | `/api/generatemeal`  | Generate a new meal plan     |
| GET    | `/api/mealplan`      | Get personalized meal plan   |

👉 Full Swagger documentation: [View here](https://delish-nutrio-v2.onrender.com/api/v2/docs/#/)

---

## 📂 Versioning

| Version             | Location          | Status              |
| ------------------- | ----------------- | ------------------- |
| v1.0.0 (JavaScript) | Git tag: `v1.0.0` | Frozen snapshot     |
| v2 (TypeScript)     | `main` branch     | Actively maintained |

---

## ✅ Contributing

Contributions are welcome! Fork the repo, work on the `v2` branch, and submit a PR.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) for details.
