# Full Stack E-Commerce Project

This repository contains frontend and backend code for an E-commerce application. The frontend is built with React.js and backend with Nest.js.
I build this project from scratch.

## Project Structure

```
project/
├── frontend/          # React.js frontend (branch: frontend)
└── backend/           # Nest.js backend (branch: main)
```

## Frontend (React.js)

Our frontend code is located in the `frontend` branch.

### Technology Stack
- **React.js**: Main frontend framework
- **React Router**: For handling navigation
- **Tailwind CSS**: For styling
- **Shadcn UI**: For pre-built components
- **Lucide React**: For icons

### Key Features
- Category-based product browsing
- Product search functionality
- Shopping cart management
- User authentication
- Responsive design

### Pages Structure
```
src/
├── components/        # Reusable UI components
├── pages/            # Main application pages
│   ├── Home/
│   ├── Category/
│   ├── Product/
│   └── Cart/
├── contexts/         # React contexts
├── hooks/            # Custom hooks
└── utils/           # Helper functions
```

### How to Run Frontend
```bash
# Clone the repository
git clone https://github.com/wafi04/TEST.git

# Checkout frontend branch
git checkout frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Backend (Nest.js)

Our backend code is located in the `main` branch.

### Technology Stack
- **Nest.js**: Backend framework
- **Prisma**: Database ORM
- **MySql**: Database
- **JWT**: Authentication

### Key Features
- RESTful API endpoints
- Database integration
- Authentication & Authorization
- Product management
- Order processing

### API Structure
```
src/
├── controllers/      # Request handlers
├── services/        # Business logic
├── dto/             # Data Transfer Objects
└── prisma/         # Database schema and migrations
```

### How to Run Backend
```bash
# Clone the repository
git clone https://github.com/wafi04/TEST.git

# Install dependencies
npm install

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Start development server
npm run start:dev
```

## API Endpoints

### Products
- `GET /api/products`: Get all products
- `GET /api/products/notme` : Get all products not user created
- `GET /api/products/:id`: Get product by ID
- `POST /api/products`: Create new product (user only)
- `PUT /api/products/:id`: Update product (user only)
- `DELETE /api/products/:id`: Delete product (user only)

### Categories
- `GET /api/categories`: Get all categories
- `GET /api/categories/:id`: Get category by ID
- `GET /api/categories/:id/products`: Get products in category

### Authentication
- `POST /api/auth/register`: Register new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/profile`: Get user profile

## Git Branch Management

### Frontend Branch
Contains all React.js related code:
```bash
# Create and switch to frontend branch
git checkout -b frontend

# Push to frontend branch
git push origin frontend
```

### Main Branch (Backend)
Contains all Nest.js related code:
```bash
# Switch to main branch
git checkout main

# Push to main branch
git push origin main
```

## Environment Setup

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

### Backend (.env)
```env
DATABASE_URL="myssql://user:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key"
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
Thank you semoga membantu 
