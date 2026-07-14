# 🚀 GitHub to Live Deployment Guide

## Phase 1: GitHub Setup

### Step 1: Create GitHub Account (if you don't have)
1. Go to https://github.com/signup
2. Create account with email, password, username
3. Verify email

### Step 2: Create New Repository on GitHub
1. Go to https://github.com/new
2. Enter Repository Name: `challenge-portal`
3. Add Description: "Challenge Portal - Submit and Track Coding Challenges"
4. Select Public (for free hosting)
5. Check "Add a README file" - NO (we have one)
6. Click "Create repository"

### Step 3: Install Git on Your Computer
1. Download from https://git-scm.com/download/win
2. Install with default options
3. Open PowerShell and verify:
   ```
   git --version
   ```

### Step 4: Configure Git
Open PowerShell and run:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 5: Push Code to GitHub
In the project root directory (`c-challenge-portal`):

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Challenge Portal with MongoDB integration"

# Add GitHub as remote (REPLACE YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/challenge-portal.git

# Rename main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Phase 2: Backend Deployment (Node.js + MongoDB)

### Option A: Deploy to Railway.app (Recommended for Beginners)

#### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub (easier!)
3. Authorize Railway to access your GitHub

#### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Search for "challenge-portal"
4. Select your repository
5. Click "Deploy"

#### Step 3: Add Environment Variables
1. Go to "Variables" tab
2. Add these variables:
   - `MONGODB_URI`: Your MongoDB connection string with password
   - `PORT`: 5000
   - `NODE_ENV`: production

#### Step 4: Configure Port
1. In Railway dashboard, click "Settings"
2. Under "Networking", set port to 5000
3. Copy the public URL (e.g., https://challenge-portal-production.up.railway.app)

#### Step 5: Your Backend is Live! ✅
Test with: `https://your-railway-url/health`

---

### Option B: Deploy to Render.com

#### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render

#### Step 2: Create New Service
1. Click "New +"
2. Select "Web Service"
3. Connect your GitHub repo (challenge-portal)
4. Select main branch

#### Step 3: Configure Service
- **Name**: challenge-portal-backend
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

#### Step 4: Add Environment Variables
Add in "Environment" section:
```
MONGODB_URI=mongodb+srv://usingm32_db_user:PASSWORD@cluster0.lnxxh1e.mongodb.net/?appName=Cluster0
NODE_ENV=production
```

#### Step 5: Deploy
- Click "Create Web Service"
- Wait for deployment (2-3 minutes)
- Get your live URL

---

### Option C: Deploy to Heroku (Free tier removed, but good for reference)
(Heroku removed free tier in late 2022, not recommended)

---

## Phase 3: Frontend Deployment

### Option 1: Same Server as Backend (Easiest)

#### Step 1: Modify Backend to Serve Frontend

Create file: `backend/public/index.html`

Copy your frontend/index.html content to this file.

#### Step 2: Update server.js
Add this before routes:
```javascript
app.use(express.static('public'));

// Serve index.html for all non-API routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
```

#### Step 3: Update Frontend API URL
In public/index.html, change:
```javascript
const API_URL = 'http://localhost:5000/api';
```
To:
```javascript
const API_URL = '/api';
```

#### Step 4: Push to GitHub
```bash
git add .
git commit -m "Add frontend to public directory"
git push
```

#### Step 5: Redeploy on Railway/Render
- They auto-redeploy when you push to GitHub
- Your app is now fully live at the Railway/Render URL!

---

### Option 2: Deploy Frontend to GitHub Pages (Alternative)

#### Step 1: Create gh-pages Branch
```bash
git checkout -b gh-pages
```

#### Step 2: Copy Frontend Files
- Copy frontend/index.html to root as index.html
- Or set up GitHub Pages to use /docs folder

#### Step 3: Configure GitHub Pages
1. Go to repository Settings
2. Click "Pages" (left sidebar)
3. Select "Deploy from a branch"
4. Choose "gh-pages" branch
5. Click Save

Your frontend will be at: `https://YOUR_USERNAME.github.io/challenge-portal`

---

## Phase 4: Final Updates

### Step 1: Update Frontend with Live Backend URL
In your frontend/index.html or public/index.html:
```javascript
// Change this:
const API_URL = 'http://localhost:5000/api';

// To this (Railway example):
const API_URL = 'https://challenge-portal-production.up.railway.app/api';

// Or if using same server:
const API_URL = '/api';
```

### Step 2: Push Final Changes
```bash
git add .
git commit -m "Update API endpoint for production"
git push
```

### Step 3: Test Live Application
1. Open your Railway/Render URL
2. Create a challenge
3. Submit a solution
4. Verify MongoDB operations work

---

## 📋 Complete Checklist

- [ ] Created GitHub account
- [ ] Created challenge-portal repository
- [ ] Installed Git
- [ ] Configured Git with name/email
- [ ] Pushed code to GitHub
- [ ] Created Railway/Render account
- [ ] Connected GitHub repository
- [ ] Added MongoDB connection string
- [ ] Backend is live and running
- [ ] Frontend updated with live API URL
- [ ] Tested create/read/update/delete operations
- [ ] Everything working on live URL

---

## 🔗 Important Links

| Step | URL |
|------|-----|
| GitHub | https://github.com/new |
| Railway | https://railway.app |
| Render | https://render.com |
| MongoDB | https://cloud.mongodb.com |
| Git Download | https://git-scm.com/download/win |

---

## 🆘 Troubleshooting

### Backend not connecting to MongoDB
- ✅ Check IP whitelist in MongoDB Atlas
- ✅ Verify connection string in environment variables
- ✅ Ensure password doesn't have special characters (URL encode if needed)

### Frontend can't reach backend
- ✅ Check API_URL is correct production URL
- ✅ Verify CORS is enabled in server.js
- ✅ Check browser console for errors (F12)

### Deployment fails
- ✅ Check logs in Railway/Render dashboard
- ✅ Ensure package.json has "start" script
- ✅ Verify all environment variables are set

### Git push rejected
- ✅ Use `git pull` first if repository was modified
- ✅ Check if remote URL is correct: `git remote -v`

---

## 🎉 You're Done!

Your Challenge Portal is now **LIVE on the Internet**! 🚀

Share your live URL with friends to test it!

---

## Optional: Custom Domain

Want a custom domain? 
1. Buy domain from GoDaddy/Namecheap
2. Point DNS to Railway/Render
3. Add domain in hosting service settings

---

## Next Steps

1. Add user authentication (login/register)
2. Add code execution feature
3. Create leaderboard
4. Add email notifications
5. Mobile app version

Happy coding! 💻
