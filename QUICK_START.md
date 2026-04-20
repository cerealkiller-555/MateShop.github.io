# Quick Start Guide - Sip & Energize Server Setup

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Database
Choose MongoDB:
- **Option A (Recommended)**: MongoDB Atlas (Cloud)
  - Create free account: https://www.mongodb.com/cloud/atlas
  - Create cluster, user, and get connection string
  
- **Option B**: Local MongoDB
  ```bash
  # macOS
  brew install mongodb-community && brew services start mongodb-community
  
  # Ubuntu
  sudo apt-get install -y mongodb && sudo service mongodb start
  ```

### 3. Update `.env` File
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/mateshop
JWT_SECRET=change_this_to_a_random_secret_string
NODE_ENV=development
```

### 4. Start Server
```bash
npm run dev
```

✅ Server running at `http://localhost:5000`

## Test the System

1. Open `login.html` in browser
2. Click "Join the community"
3. Register with test account:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
4. You should be redirected to products page

## 🚀 Deploy to Production

### Heroku (Free Alternative)
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_connection_string JWT_SECRET=your_secret
git push heroku main
```

### Render, DigitalOcean, or AWS
See detailed guide in [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md)

## Update Frontend for Production
In `script.js`:
```javascript
const API_BASE_URL = 'https://your-api-domain.com/api';
```

## 📚 Full Documentation
See [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md) for detailed setup, API documentation, and troubleshooting.

## Key Features
✅ User registration & login
✅ JWT authentication
✅ Secure password hashing
✅ User profile storage
✅ Order management
✅ Protected API routes

## Security Notes
- Change JWT_SECRET in production
- Use strong database passwords
- Keep Node.js and packages updated
- Never commit `.env` to git (already in .gitignore)
