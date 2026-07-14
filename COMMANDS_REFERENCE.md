# 💻 Command Reference - Copy & Paste Ready

## 🟦 PART 1: GitHub Setup Commands

### Configure Git (Do this once)
```powershell
git config --global user.name "Your Full Name"
git config --global user.email "your.email@gmail.com"
```

### Initialize Repository (In project root folder)
```powershell
cd c:\Users\ADMIN\Downloads\c-challenge-portal
git init
git add .
git commit -m "Initial commit: Challenge Portal setup"
git branch -M main
```

### Push to GitHub (Replace YOUR_USERNAME)
```powershell
git remote add origin https://github.com/YOUR_USERNAME/challenge-portal.git
git push -u origin main
```

---

## 📤 PART 2: Update & Push Code

### Every time you make changes:
```powershell
# Check what changed
git status

# Add all changes
git add .

# Describe your changes
git commit -m "Your change description here"

# Send to GitHub
git push
```

### Examples of good commit messages:
```
git commit -m "Add user authentication"
git commit -m "Fix MongoDB connection issue"
git commit -m "Update frontend styling"
git commit -m "Add challenge creation feature"
```

---

## 🚀 PART 3: Railway Deployment Setup

### No commands needed for Railway!
- Go to https://railway.app
- Sign up with GitHub
- Click "New Project" → "Deploy from GitHub repo"
- Select your repository
- Add environment variables
- Done! Auto-deploys when you git push

---

## 🔧 PART 4: Local Development Commands

### Start backend locally
```powershell
cd backend
npm start
```

### Start with auto-reload (install first: npm install -g nodemon)
```powershell
npm run dev
```

### Install new package
```powershell
npm install express
```

### Test API locally
```powershell
curl http://localhost:5000/health
```

---

## 🐛 PART 5: Troubleshooting Commands

### Check Git status
```powershell
git status
```

### See your commit history
```powershell
git log --oneline
```

### Undo last commit (if you made a mistake)
```powershell
git reset --soft HEAD~1
```

### See remote URL
```powershell
git remote -v
```

### Pull latest changes (if working with others)
```powershell
git pull
```

### Check npm version
```powershell
npm --version
```

### Check Node version
```powershell
node --version
```

### Clear npm cache (if installation fails)
```powershell
npm cache clean --force
npm install
```

---

## 📁 PART 6: File Operations

### Create backend/public folder
```powershell
mkdir backend\public
```

### Copy frontend to backend
```powershell
Copy-Item frontend\index.html -Destination backend\public\index.html
```

### Check if file exists
```powershell
Test-Path backend\public\index.html
```

---

## 🌐 PART 7: Environment Variables

### To use .env file in Node.js:
```javascript
require('dotenv').config();
const mongoUrl = process.env.MONGODB_URI;
```

### .env file example:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?appName=db
PORT=5000
NODE_ENV=production
```

---

## 📝 PART 8: Common Git Operations

### Create new branch (for features)
```powershell
git checkout -b feature/new-feature-name
git push -u origin feature/new-feature-name
```

### Switch between branches
```powershell
git checkout main
git checkout feature/other-feature
```

### Merge branch to main
```powershell
git checkout main
git merge feature/new-feature-name
git push
```

### Delete branch
```powershell
git branch -d feature/old-feature
```

---

## 🎯 QUICK START SEQUENCE

### Day 1: Initial Setup
```powershell
cd c:\Users\ADMIN\Downloads\c-challenge-portal
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/challenge-portal.git
git branch -M main
git push -u origin main
```

### Go to Railway.app
- Sign up with GitHub
- Deploy from repository
- Add MONGODB_URI env variable
- Get live URL

### Access Live App
```
Open: https://your-railway-url
Everything works! 🚀
```

---

## 📱 TESTING ENDPOINTS

### Health check
```
GET https://your-railway-url/health
```

### Get all challenges
```
GET https://your-railway-url/api/challenges
```

### Create challenge
```
POST https://your-railway-url/api/challenges
Body: {"title": "Test", "description": "Test", "difficulty": "easy"}
```

### Get all submissions
```
GET https://your-railway-url/api/submissions
```

### Create submission
```
POST https://your-railway-url/api/submissions
Body: {"challengeId": "xxx", "code": "function() {}"}
```

---

## 🆘 Emergency Commands

### If Git is messed up, restart:
```powershell
# Remove Git
rm -r .git

# Start fresh
git init
git add .
git commit -m "Fresh start"
git remote add origin https://github.com/YOUR_USERNAME/challenge-portal.git
git push -u origin main --force
```

### If Node modules broken:
```powershell
cd backend
rm node_modules
rm package-lock.json
npm install
```

---

## ✅ Checklist Commands

Run these to verify everything:

```powershell
# Check Git installed
git --version

# Check Node installed
node --version

# Check NPM installed
npm --version

# Check MongoDB connection (in backend folder)
# Edit server.js, run: npm start
# Should say "✅ Connected to MongoDB Atlas"

# Check Railway deployment
# Open your Railway URL in browser
# Should see your app!
```

---

## 🎓 Learning Resources

- **Git Tutorial**: https://git-scm.com/book/en/v2
- **GitHub Guides**: https://guides.github.com
- **Railway Docs**: https://docs.railway.app
- **Node.js Tutorial**: https://nodejs.org/en/docs/guides/getting-started-with-nodejs
- **Express Guide**: https://expressjs.com/starter/installing.html

---

## 💡 Pro Tips

1. **Commit frequently** - Small commits are easier to debug
2. **Write clear messages** - Future you will thank present you
3. **Test before push** - Run `npm start` to verify locally
4. **Check logs** - Railway and Render show deployment logs
5. **Use branches** - Keep main stable, test new features on branches
6. **Pull before push** - Always `git pull` before `git push`

