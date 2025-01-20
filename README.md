# Personal Expense Tracker 💰

A modern expense tracking application built with React, TypeScript, and FastAPI.

## Project Structure
```
expense-tracker/
├── backend/               # FastAPI backend
│   ├── main.py           # Main FastAPI application
│   └── requirements.txt  # Python dependencies
└── frontend/             # React frontend
    ├── src/              # Source files
    ├── public/           # Static files
    ├── package.json      # Node.js dependencies
    └── .env             # Environment variables
```

## ✨ Features

- 💳 Add, edit, and delete expenses
- 📊 Interactive dashboard with expense trends
- 🌓 Dark/Light mode toggle
- 📥 Export expenses to CSV
- 🔍 Advanced filtering and search
- 📱 Fully responsive design
- ⚡ Real-time updates

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization
- Framer Motion for animations

### Backend
- FastAPI (Python 3.8+)
- Pydantic for data validation
- SQLAlchemy (ready for database integration)
- CORS middleware
- Uvicorn server

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install  # or yarn install
```

3. Start the development server:
```bash
npm run dev  # or yarn dev
```

The application will be available at `http://localhost:5173`

## 📝 API Documentation

FastAPI provides automatic interactive API documentation. Visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 📄 License

This project is licensed under the MIT License.