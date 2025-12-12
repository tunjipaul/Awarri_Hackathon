# CivicAccess

A multilingual legal chatbot that bridges the gap between complex Nigerian laws and everyday citizens. CivicAccess references the 1999 Nigerian Constitution, the Nigerian Police Act, and Lagos State Tenancy Laws, providing accessible legal information in multiple languages.

## Project Overview

CivicAccess is a full-stack application built for the Awarri Hackathon by Team Sabilaw. It combines a powerful backend API with an intuitive React frontend to deliver legal information in English, Hausa, Igbo, Yoruba, and Pidgin.

## Repository Structure

```
CivicAccess/
├── civicaccess/                 # React-based user interface
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md            # Frontend-specific documentation
├── backend/                  # API server and LLM integration
│   ├── app/
│   ├── config/
│   ├── requirements.txt
│   └── README.md            # Backend-specific documentation
├── .gitignore
└── README.md                # This file
```

## Technology Stack

### Frontend
- React 18
- Tailwind CSS
- Lucide React Icons
- JavaScript (ES6+)

### Backend
- Python
- FastAPI
- LLM Integration
- Database (Tursoo DB)

## Quick Start

### Prerequisites

- Node.js (v14+) and npm
- Python (v3.8+) and pip
- Git

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run at `http://localhost:5173`

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The backend will run at `http://localhost:8000` (or your configured port)

## Features

### Legal Information Access
- 1999 Nigerian Constitution (as amended)
- Nigerian Police Act 2020
- Lagos State Tenancy Laws
- Fundamental Human Rights

### Multilingual Support
- English
- Hausa
- Igbo
- Yoruba
- Pidgin

### User Features
- Real-time chat interface
- Language selection and switching
- User authentication
- Session management
- Responsive mobile-friendly design


## Project Structure Details

### Frontend (`/frontend`)
Contains all React components, pages, and styling:
- Chat interface
- Language selector
- Authentication screens
- Footer with legal information
- Responsive layouts

### Backend (`/backend`)
Contains the API server and AI integration:
- RESTful API endpoints
- LLM integration for legal queries
- Database models and migrations
- Authentication and authorization
- Text processing and translation

## API Endpoints

For a complete list of backend endpoints, refer to the [Backend README](./backend/README.md).

Example endpoints:
- `POST /api/chat` - Send a message and get legal information
- `GET /api/languages` - Get available languages
- `POST /api/auth/login` - User authentication
- `GET /api/constitution` - Fetch Constitution information

## Environment Variables

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_KEY=your_api_key
```

### Backend (.env)
```
DATABASE_URL=your_database_url
LLM_API_KEY=your_llm_api_key
SECRET_KEY=your_secret_key
```

## Getting Help

- Check the individual README files in `/frontend` and `/backend`
- Review the code comments and documentation
- Open an issue on the GitHub repository

## Contributing

1. Create a feature branch (`git checkout -b feature/YourFeature`)
2. Make your changes in either frontend or backend
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request
6. For heaven's sake don't push to main branch, thanks.

## Legal Disclaimer

CivicAccess provides legal information, not professional legal advice. Every translation is subject to interpretation. Users must consult qualified legal professionals for specific legal matters. Terms and conditions apply.

## Team & Credits

**Developed by**: Team Sabilaw  
**Event**: Awarri Hackathon  
**Year**: 2024-2025

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Deployment

For production deployment instructions:
- Frontend: See [Frontend README](./frontend/README.md)
- Backend: See [Backend README](./backend/README.md)

## Support

For questions or issues:
- Create an issue in the repository
- Contact Team Sabilaw
- Check existing documentation

---

**Last Updated**: December 2025  
**Version**: 1.0.0
