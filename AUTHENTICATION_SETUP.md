# Sip & Energize - Authentication & Database Setup Guide

## Overview
This guide explains how to set up the backend server with database authentication for the Sip & Energize mate shop.

## System Architecture

```
Client (Frontend)
├── login.html (Login/Register page)
├── index.html (Products page - requires authentication)
└── script.js (Authentication API calls)

↓ (API requests via fetch)

Server (Node.js/Express)
├── Routes
│   ├── /api/auth/register (POST)
│   ├── /api/auth/login (POST)
│   ├── /api/auth/verify (POST)
│   └── /api/orders/* (Protected routes)
├── Models
│   ├── User (username, email, password, profile info)
│   └── Order (user orders, items, totals)
└── Middleware
    └── Authentication (JWT token verification)

↓ (Database operations)

Database (MongoDB)
├── users (user accounts & credentials)
└── orders (user orders & history)
```

## Prerequisites

### Required Software
- **Node.js** (v14+) - [https://nodejs.org](https://nodejs.org)
- **MongoDB** - Choose one:
  - **Local Installation** - [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
  - **MongoDB Atlas** (Cloud) - [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) (Recommended for easy setup)

## Step 1: Install Node.js

### On Windows/Mac/Linux
1. Download from [https://nodejs.org](https://nodejs.org)
2. Run the installer and follow the prompts
3. Verify installation:
```bash
node --version
npm --version
```

## Step 2: Set Up MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 free tier)
4. In the Security section:
   - Enable "Database Access" and create a user
   - Enable "Network Access" and add your IP (or 0.0.0.0/0 for development)
5. Get your connection string from "Connect" → "Connect your application"
   - It will look like: `mongodb+srv://username:password@cluster.mongodb.net/mateshop`

### Option B: Local MongoDB

```bash
# On macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# On Linux (Ubuntu)
sudo apt-get install -y mongodb

# On Windows
# Download installer from https://www.mongodb.com/try/download/community
```

Start MongoDB:
```bash
mongod
```

Connection string: `mongodb://localhost:27017/mateshop`

## Step 3: Set Up the Backend Server

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (`.env` file already exists):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mateshop
JWT_SECRET=your_super_secret_key_change_this_in_production
NODE_ENV=development
```

**For MongoDB Atlas**, replace the URI with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mateshop
```

## Step 4: Run the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

Check if it's running:
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{"status":"Server is running"}
```

## Step 5: Update Frontend Configuration

In `script.js`, update the API URL if your server is not on localhost:
```javascript
const API_BASE_URL = 'http://localhost:5000/api'; // Change this for production
```

For production, update to your server's domain:
```javascript
const API_BASE_URL = 'https://your-api-domain.com/api';
```

## Testing the Authentication

1. Open `login.html` in your browser
2. Click "Join the community" to register
3. Fill in the registration form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - First Name: `Test`
   - Last Name: `User`
4. Click "Create Account"
5. You should be redirected to `index.html`

## API Endpoints

### Authentication Routes

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "testuser",
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { ... }
}
```

#### Verify Token
```http
POST /api/auth/verify
Authorization: Bearer jwt_token_here

Response:
{
  "success": true,
  "message": "Token is valid",
  "user": {
    "userId": "user_id",
    "email": "test@example.com"
  }
}
```

### Orders Routes (Require Authentication)

#### Get User's Orders
```http
GET /api/orders
Authorization: Bearer jwt_token_here

Response:
{
  "success": true,
  "orders": [ ... ]
}
```

#### Create Order
```http
POST /api/orders
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "items": [
    { "name": "Sara 1KG", "price": 300, "quantity": 2 }
  ],
  "total": 600,
  "shippingAddress": "123 Main St, City"
}
```

## Database Collections

### Users Collection
```javascript
{
  _id: ObjectId,
  username: "testuser",
  email: "test@example.com",
  password: "hashed_password", // Automatically hashed with bcryptjs
  firstName: "Test",
  lastName: "User",
  address: null,
  phone: null,
  createdAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  items: [
    { name: "Product", price: 300, quantity: 1 }
  ],
  total: 300,
  status: "pending",
  shippingAddress: "123 Main St",
  createdAt: Date
}
```

## Deployment Options

### Deploy Backend to Heroku

1. Install Heroku CLI: [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

2. Login to Heroku:
```bash
heroku login
```

3. Create a Heroku app:
```bash
heroku create your-app-name
```

4. Add MongoDB Atlas connection:
```bash
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster...
heroku config:set JWT_SECRET=your_secret_key_here
heroku config:set NODE_ENV=production
```

5. Deploy:
```bash
git push heroku main
```

6. View logs:
```bash
heroku logs --tail
```

### Deploy Backend to Render

1. Sign up at [https://render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Set environment variables in dashboard
5. Deploy automatically on push

### Deploy Backend to DigitalOcean

1. Create a Droplet (Ubuntu 20.04)
2. SSH into the droplet
3. Install Node.js and MongoDB
4. Clone repository and install dependencies
5. Set up PM2 for process management:
```bash
npm install -g pm2
pm2 start server.js --name "mateshop-api"
pm2 startup
pm2 save
```

## Security Checklist

- [ ] Change `JWT_SECRET` to a strong random value in production
- [ ] Use environment variables for sensitive data (never hardcode)
- [ ] Enable HTTPS for all production connections
- [ ] Set up CORS properly to only allow your domain
- [ ] Enable MongoDB authentication and network restrictions
- [ ] Use strong passwords for database users
- [ ] Implement rate limiting for API endpoints
- [ ] Keep Dependencies updated regularly
- [ ] Monitor server logs for suspicious activity
- [ ] Use HTTPS for all frontend-backend communication

## Troubleshooting

### "Cannot connect to MongoDB"
- Check if MongoDB is running
- Verify connection string in `.env`
- Check firewall settings if using MongoDB Atlas

### "TypeError: Cannot read property 'email' of undefined"
- Make sure all form fields are properly filled
- Check browser console for validation errors

### "401 Unauthorized"
- Token may have expired
- Try logging in again
- Clear localStorage and refresh

### CORS Errors
- Update CORS configuration in `server.js` to include your frontend domain
- For development, `http://localhost:5000` is already configured

### Server not starting
- Check if port 5000 is already in use
- Try: `lsof -i :5000` to find process using port
- Change PORT in `.env` to a different value

## Next Steps

1. Implement password reset functionality
2. Add email verification for new accounts
3. Add profile editing/update endpoints
4. Implement order tracking
5. Add admin dashboard for order management
6. Implement payment integration (Stripe, PayPal)
7. Add push notifications for order status

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs: `npm run dev`
3. Check browser console for frontend errors
4. Consult MongoDB documentation

## Files Structure

```
mateshop.github.io/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── orders.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── README.md
├── script.js (Updated with auth functions)
├── login.html (Updated with registration form)
├── index.html (Updated with auth check)
└── ... other files
```
