# Sip & Energize Backend Server

Backend server for the Sip & Energize mate shop with user authentication and order management.

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud instance like MongoDB Atlas)

### Installation

1. Install dependencies:
```bash
cd server
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mateshop
JWT_SECRET=your_secret_key_change_this_in_production
NODE_ENV=development
```

### Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout user

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderId` - Get specific order

## Database Schema

### Users
- username (unique)
- email (unique)
- password (hashed)
- firstName
- lastName
- address
- phone
- createdAt

### Orders
- userId (reference to User)
- items (array of products)
- total
- status
- shippingAddress
- createdAt

## Deployment

For production deployment, use services like:
- Heroku
- AWS
- DigitalOcean
- Render
- Railway

Remember to:
1. Change JWT_SECRET to a strong random value
2. Use a cloud MongoDB service (MongoDB Atlas)
3. Set NODE_ENV to 'production'
