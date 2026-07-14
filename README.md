# C Challenge Portal

A small full-stack portal where faculty publish a C-programming challenge, students submit their work, and faculty securely review submissions.

## Run locally

1. In `backend/.env`, set a valid `MONGODB_URI` and change `FACULTY_USERNAME` / `FACULTY_PASSWORD`.
2. From the `backend` folder, run `npm install` (only needed once) and then `npm start`.
3. Open [http://localhost:5000](http://localhost:5000). Do not open the HTML file directly.

## Use the portal

1. Select **Faculty**, log in using the credentials in `backend/.env`, and save a challenge.
2. Students select **Student**, read the active challenge, enter their details and work, then submit.
3. Faculty opens the dashboard to view all submissions. API access that reads submissions or changes challenges requires a faculty session.

## GitHub

The root `.gitignore` keeps `backend/.env` and `node_modules` out of Git. Create an empty GitHub repository, then run the commands in the "GitHub push" section below.

```powershell
git init
git add .
git commit -m "Build C Challenge Portal"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/c-challenge-portal.git
git push -u origin main
```

When GitHub asks for a password, use a GitHub Personal Access Token, or authenticate with GitHub Desktop / `gh auth login`.
