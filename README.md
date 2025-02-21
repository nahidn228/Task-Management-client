# Task Management Application 📝

A modern and responsive task management web application that allows users to add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into **To-Do, In Progress, and Done**, and all changes are saved instantly to the database for real-time synchronization.

## 🚀 Live Demo
🔗 [Live App](your-live-link-here)



## 🛠 Features
- 🔒 **Authentication** – Firebase Authentication (Google Sign-In)
- ✅ **Task Management** – Add, edit, delete, reorder, and drag-and-drop tasks
- 📌 **Real-Time Updates** – Tasks remain in sync with MongoDB
- 🎨 **Modern UI** – Clean and responsive interface with minimalistic design
- 🌙 **Dark Mode** 
- ⏳ **Due Date Tracking** – 

## ⚡ Tech Stack
### Frontend:
- React (Vite.js)
- TailwindCSS
- Firebase Authentication
- React Router
- React Beautiful DnD (@hello-pangea/dnd)
- Axios (API Calls)
- React Query (Data Fetching & Caching)
- SweetAlert2 (Alerts)
- React Icons & Lucide-React
- React Datepicker


## 📦 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

### 2️⃣ Install Dependencies
#### Frontend:
```sh
cd frontend
npm install
npm run dev
```



### 3️⃣ Environment Variables
Create a `.env` file in the **backend** directory and add:
```env
MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key

```

## 🎯 API Endpoints
### **User Authentication**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/auth/login` | User authentication (Google Sign-In) |

### **Task Management**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/tasks` | Retrieve all tasks for the logged-in user |
| `POST` | `/tasks` | Add a new task |
| `PUT` | `/tasks/:id` | Update task details |
| `DELETE` | `/tasks/:id` | Delete a task |

## 📌 To-Do & Future Enhancements
- ✅ Drag-and-Drop functionality (Implemented)
- 🌙 Dark Mode Toggle
- 🏷 Task Due Dates with Overdue Indicators
- 📊 Activity Log (Track task updates)

## 📄 License
This project is licensed under the **MIT License**.

---

🎯 Built with ❤️ by **[Your Name](https://github.com/your-username)**

