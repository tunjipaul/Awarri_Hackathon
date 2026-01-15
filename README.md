# CivicAccess - Multilingual Legal Chatbot

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

A multilingual legal chatbot that bridges the gap between complex Nigerian laws and everyday citizens. CivicAccess references the 1999 Nigerian Constitution, the Nigerian Police Act, and Lagos State Tenancy Laws, providing accessible legal information in multiple languages.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

CivicAccess is a full-stack application built for the Awarri Hackathon by **Team Sabilaw**. It combines a powerful backend API with an intuitive React frontend to deliver legal information in multiple languages, making Nigerian legal systems more accessible to everyday citizens.

**Key Objectives:**

- Simplify complex legal information
- Provide multilingual support
- Enable easy access to constitutional and statutory laws
- Support informed decision-making on legal matters

## ✨ Features

### 📚 Legal Information Access

- 1999 Nigerian Constitution (as amended)
- Nigerian Police Act 2020
- Lagos State Tenancy Laws
- Fundamental Human Rights

### 🌍 Multilingual Support

- English
- Hausa
- Igbo
- Yoruba
- Pidgin English

### 👤 User Features

- Real-time chat interface with AI-powered responses
- Language selection and instant switching
- Secure user authentication & session management
- Responsive mobile-friendly design
- User profile management

## 🛠️ Technology Stack

### Frontend

- **React 18** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **JavaScript (ES6+)** - Programming language

### Backend

- **Python 3.8+** - Server language
- **FastAPI** - High-performance web framework
- **SQLAlchemy** - ORM for database management
- **LibSQL** - Lightweight database
- **JWT** - Secure authentication
- **Pydantic** - Data validation

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14+) and npm
- **Python** (v3.8+) and pip
- **Git**

### Installation & Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Team-Sabilaw/CivicAccess.git
cd CivicAccess
```

#### 2. Backend Setup

```bash
cd Civic_Access/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run the server
uvicorn app:app --reload
```

Backend will run at `http://localhost:8000`

#### 3. Frontend Setup

```bash
cd Civic_Access/CivicAccess

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env.local
# Edit .env.local with your backend URL

# Start development server
npm run dev
```

Frontend will run at `http://localhost:5173`

## 📁 Project Structure

```
Civic_Access/
├── backend/                          # FastAPI server
│   ├── app.py                        # Main application
│   ├── database.py                   # Database setup
│   ├── models.py                     # Data models
│   ├── requirements.txt              # Python dependencies
│   ├── routes/                       # API routes
│   │   └── auth.py                   # Authentication endpoints
│   ├── myenv/                        # Virtual environment
│   └── README.md                     # Backend documentation
│
├── CivicAccess/                      # React frontend
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   ├── pages/                    # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   └── LanguageSelection.jsx
│   │   ├── App.jsx                   # Main app component
│   │   ├── App.css                   # Global styles
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Base styles
│   ├── public/                       # Static assets
│   ├── package.json                  # Dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── eslint.config.js              # Linting rules
│   ├── index.html                    # HTML template
│   └── README.md                     # Frontend documentation
│
└── README.md                         # This file
```

## 📖 Documentation

For detailed documentation on specific parts:

- **[Backend Documentation](./Civic_Access/backend/README.md)** - API endpoints, database schema, authentication
- **[Frontend Documentation](./Civic_Access/CivicAccess/README.md)** - Components, styling, deployment

## 🌐 API Endpoints

Key backend endpoints (see [Backend README](./Civic_Access/backend/README.md) for complete documentation):

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/`              | Health check      |
| POST   | `/auth/login`    | User login        |
| POST   | `/auth/register` | User registration |
| POST   | `/auth/logout`   | User logout       |

## ⚙️ Environment Variables

### Backend (.env)

```env
DATABASE_URL=your_libsql_database_url
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (.env.local)

```env
VITE_BACKEND_URL=http://localhost:1234
VITE_API_KEY=your_api_key
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes** and commit (`git commit -m 'Add AmazingFeature'`)
4. **Push to your branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Guidelines

- Do **not** push directly to the main branch
- Ensure code follows project conventions
- Write meaningful commit messages
- Update documentation as needed

## 🔒 Legal Disclaimer

**Important:** CivicAccess provides legal information for educational and informational purposes only. It does **not** constitute professional legal advice. Every translation is subject to interpretation. Users must consult with qualified legal professionals for specific legal matters or advice.

## 👥 Team & Credits

- **Developed by:** Team Sabilaw
- **Event:** Awarri Hackathon
- **Year:** 2024-2025
- **Built with:** React, FastAPI, and ❤️

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

## 📞 Support & Contact

For questions, issues, or suggestions:

- Open an [Issue](https://github.com/Team-Sabilaw/CivicAccess/issues) on GitHub
- Contact Team Sabilaw
- Check the [Wiki](https://github.com/Team-Sabilaw/CivicAccess/wiki) for FAQs

---

**Last Updated:** December 2025  
**Version:** 1.0.0  
**Status:** Active Development

- **Contact Team Sabilaw:**

1. Akinrinde Ademola Victor (GitHub: @Ademsbabyy)
2. Oluwapelumi Oluwafemi Awoyale(GitHub: @femilearnsai)
3. Dasaolu Samuel(GitHub: @samueldasaolu)
4. Ogor Paul Olatunji(GitHub: @tunjipaul)
