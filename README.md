# LWMMS (Light Weight Museum Management System)

## Project Overview
LWMMS is a comprehensive museum management system that consists of three main components:
- A React-based frontend for user interaction
- An Express.js backend API for data management
- A Virtual Tour feature for immersive museum experience

## Features
- User authentication and authorization
- Product management system
- Event management and ticketing
- Virtual museum tour with 3D visualization
- Payment integration with Stripe
- Interactive artwork displays
- Audio guide support
- Cart and purchase management

## Tech Stack

### Frontend
- React.js
- Redux Toolkit for state management
- Tailwind CSS for styling
- React Router for navigation
- Stripe.js for payment integration
- React Icons
- React Toastify for notifications

### Backend
- Node.js with Express
- PostgreSQL database
- Sequelize ORM
- JWT for authentication
- bcryptjs for password hashing
- Stripe API integration
- Body-parser and Cookie-parser middlewares

### Virtual Tour
- Three.js for 3D rendering
- Vite as build tool
- Custom modules for:
  - Audio guide
  - Movement controls
  - VR support
  - Interactive paintings and sculptures

## Installation

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx sequelize-cli init
   npx sequelize-cli db:migrate
   ```

4. Create a .env file with necessary environment variables:
   ```
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Tailwind CSS:
   ```bash
   npx tailwindcss init
   ```

### Virtual Tour Setup
1. Navigate to the Virtual_Tour directory:
   ```bash
   cd Virtual_Tour
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Start the Virtual Tour:
   ```bash
   cd Virtual_Tour
   npm run dev
   ```

## Project Structure
```
├── backend/               # Express backend
│   ├── config/           # Database and app configuration
│   ├── controller/       # Route controllers
│   ├── middleware/       # Custom middlewares
│   ├── models/          # Sequelize models
│   └── routes/          # API routes
├── frontend/            # React frontend
│   ├── public/         # Static files
│   └── src/            # Source files
└── Virtual_Tour/       # 3D virtual tour
    ├── modules/        # Tour features
    └── public/         # Assets and models
```

## API Documentation
The backend provides RESTful APIs for:
- User management (/api/users)
- Product management (/api/products)
- Event management (/api/events)
- Ticket management (/api/tickets)
- Payment processing (/api/stripe)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

