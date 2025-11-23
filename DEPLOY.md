# Deployment Guide for SmartFlash

## Option 1: Render (Recommended - Free Tier Available)

### Steps:

1. **Sign up at Render.com**
   - Go to https://render.com
   - Sign up with your GitHub account

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `romantic668/Flashcard`
   - Select the repository

3. **Configure the Service**
   - **Name**: `smartflash` (or any name you prefer)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose a paid plan)

4. **Environment Variables** (if needed)
   - `NODE_ENV`: `production`
   - `PORT`: Will be set automatically by Render

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your app
   - Your app will be available at: `https://smartflash.onrender.com` (or your custom domain)

### Note: SQLite on Render
- SQLite works on Render, but data may be reset on redeployments
- For production, consider upgrading to a PostgreSQL database (Render provides free PostgreSQL)

---

## Option 2: Railway (Easy & Free Tier)

### Steps:

1. **Sign up at Railway**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository: `romantic668/Flashcard`

3. **Configure**
   - Railway auto-detects Node.js
   - It will automatically run `npm install` and `npm start`
   - No additional configuration needed!

4. **Deploy**
   - Railway will deploy automatically
   - Get your URL: `https://your-app-name.railway.app`

---

## Option 3: Heroku (Classic Option)

### Steps:

1. **Install Heroku CLI**
   - Download from https://devcenter.heroku.com/articles/heroku-cli

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create smartflash-app
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **Open App**
   ```bash
   heroku open
   ```

### Note: Heroku requires a Procfile
Create `Procfile` (no extension) with:
```
web: node server.js
```

---

## Option 4: Vercel (Frontend + Serverless Functions)

Vercel is great but requires some modifications for the Express backend. You'd need to convert API routes to serverless functions.

---

## Option 5: DigitalOcean App Platform

1. Go to https://cloud.digitalocean.com/apps
2. Create new app from GitHub
3. Select your repository
4. Configure and deploy

---

## Important Notes:

### Database Considerations:
- **SQLite** works for development and small deployments
- For production with multiple users, consider:
  - **PostgreSQL** (Render, Railway, Heroku all offer free PostgreSQL)
  - **MySQL** (various providers)

### Environment Variables:
If you need to change the API URL in the frontend, update `script.js`:
```javascript
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
```

### CORS:
The backend already has CORS enabled, so it should work from any domain.

### Recommended for Beginners:
**Render** or **Railway** - both are free, easy to use, and work great with Node.js apps!

---

## Quick Deploy Checklist:

- [ ] Code pushed to GitHub
- [ ] All dependencies in `package.json`
- [ ] `package.json` has correct `start` script
- [ ] Environment variables configured (if needed)
- [ ] Database considerations (SQLite vs PostgreSQL)
- [ ] Test the deployed app

---

## After Deployment:

1. Update your frontend `API_BASE_URL` in `script.js` to point to your deployed backend
2. Test all features
3. Consider adding a custom domain
4. Set up monitoring/logging

