# CivicAccess Frontend

CivicAccess is a multilingual legal chatbot that provides accessible information on Nigerian law. The frontend is built with React and provides an intuitive interface for users to interact with the AI-powered legal assistant.

## Overview

CivicAccess references the 1999 Nigerian Constitution, the Nigerian Police Act, and Lagos State Tenancy Laws. It bridges the gap between complex legal documents and everyday citizens by providing information in multiple languages including English, Hausa, Igbo, Yoruba, and Pidgin.

## Features

- **Multilingual Support**: Users can interact with CivicAccess in English, Hausa, Igbo, Yoruba, and Pidgin
- **Real-time Chat Interface**: Interactive messaging with the AI legal assistant
- **Language Selection**: Easy language switching via dropdown menu
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Legal Information Access**: Quick access to information on:
  - 1999 Constitution (as amended)
  - Nigerian Police Act 2020
  - Lagos State Tenancy Laws
  - Fundamental Human Rights
- **User Authentication**: Login/logout functionality with user session management
- **Accessible Footer**: Hover-based legal disclaimer and project information

## Tech Stack

- **React 18** - UI framework
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **JavaScript (ES6+)** - Programming language

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Team-Sabilaw/CivicAccess-frontend.git
cd civicaccess-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
REACT_APP_API_URL=your_backend_api_url
REACT_APP_API_KEY=your_api_key
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Footer.jsx           # Footer with legal disclaimers
│   ├── ChatInterface.jsx    # Main chat interface
│   ├── LanguageSelector.jsx # Language switching component
│   ├── Header.jsx           # App header with branding
│   └── ...
├── pages/
│   ├── HomePage.jsx         # Landing page
│   ├── ChatPage.jsx         # Main chatbot page
│   └── ...
├── styles/
│   └── globals.css          # Global Tailwind styles
├── App.jsx                  # Main app component
└── index.js                 # Entry point
```

## Key Components

### Header Component
- Displays CivicAccess branding
- Language selector dropdown
- Login/Logout button
- Online status indicator

### Chat Interface
- Message display area
- Real-time message input
- Send button with validation
- Typing indicators

### Footer Component
- Copyright information with Team Sabilaw credit
- Hover-reveal tooltip showing:
  - CivicAccess mission statement
  - Legal disclaimer
  - Terms and conditions notice

## Styling

The project uses Tailwind CSS for styling. Key design elements:

- **Primary Color**: Green (#16a34a) - Represents trust and legal authority
- **Background**: Light gray and white for readability
- **Text Colors**: Dark gray for main content, lighter gray for secondary text
- **Responsive Breakpoints**: Mobile-first approach with md and lg breakpoints

## Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (use with caution)
npm eject
```

## Responsive Design

The application is fully responsive:

- **Mobile** (< 768px): Single column layout, stacked components
- **Tablet** (768px - 1024px): Adjusted spacing and component sizes
- **Desktop** (> 1024px): Full multi-column layout with optimized spacing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting for faster initial load
- Lazy loading of components
- Optimized images and assets
- Minified CSS and JavaScript in production

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request
5. Don't push to main make God no deal with you(sarcasm for the heavy hearted).

## Legal Disclaimer

CivicAccess provides legal information, not professional legal advice. Every translation is subject to interpretation. Users should consult with qualified legal professionals for specific legal matters.

## Acknowledgments

- **Team Sabilaw** - Development team
- **Awarri Hackathon** - Event sponsor
- Built with React and Tailwind CSS

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support & Contact

For issues, questions, or contributions, please contact Team Sabilaw or open an issue on the GitHub repository.

---

**Last Updated**: December 2025  
**Version**: 1.0.0
