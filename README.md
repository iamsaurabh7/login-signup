# React Login & Sign-Up Application

A responsive React application demonstrating user authentication UI with comprehensive form validation, routing, and modern design patterns.

## Features

- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Form Validation**: Comprehensive client-side validation with real-time feedback
- **React Router**: Navigation between Login and Sign-Up screens
- **Redux State Management**: Centralized state management with Redux Toolkit
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, professional interface with Tailwind CSS

## Technologies Used

- **React 19.1.1** - UI framework with functional components and hooks
- **TypeScript 4.9.5** - Type-safe JavaScript development
- **Redux Toolkit** - State management solution
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Scripts** - Build tooling and development server

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd login-signup
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Form Validation Rules

### Login Form
- **Username**: Required field with basic validation
- **Password**: Required field

### Sign-Up Form
- **Name**: Alphabets only, minimum 2 characters
- **Username**: Alphanumeric with underscores/hyphens, 3-20 characters
- **Email**: Valid email format required
- **Phone**: International format with country code (e.g., +1234567890)
- **Password**: Minimum 8 characters with uppercase, lowercase, and number
- **Confirm Password**: Must match the password field

## Application Flow

1. **Default Route**: Redirects to Login page
2. **Login Page**: User can navigate to Sign-Up or attempt login
3. **Sign-Up Page**: After successful validation, redirects to Login with success message
4. **Form Validation**: Real-time validation with error messages below each field

## Available Scripts

- `npm start` - Runs the development server
- `npm run build` - Creates production build
- `npm test` - Runs test suite

## Project Structure

```
src/
├── components/          # React components
│   ├── ErrorBoundary.tsx   # Error handling component
│   ├── Input.tsx           # Reusable form input component
│   ├── Login.tsx           # Login page component
│   └── SignUp.tsx          # Sign-up page component
├── store/              # Redux store configuration
│   ├── store.ts            # Store setup
│   └── authSlice.ts        # Authentication state slice
├── types/              # TypeScript type definitions
│   └── index.ts            # Application types
├── utils/              # Utility functions
│   └── validation.ts       # Form validation logic
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is licensed under the MIT License.# login-signup
