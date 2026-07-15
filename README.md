# C Challenge Portal

Full-stack portal where faculty publish C-programming challenges, students submit their work, and faculty review submissions.

## Run locally

1. Set `MONGODB_URI`, `FACULTY_USERNAME`, and `FACULTY_PASSWORD` in `backend/.env`.
2. Run `cd backend`, then `npm ci` and `npm start`.
3. Open `http://localhost:5000`.

## Deploy free on Render

This repository includes `render.yaml`. In Render, select **New > Blueprint**, connect this GitHub repository, and use the Free plan. Set these secret environment variables in Render:

- `MONGODB_URI`
- `FACULTY_USERNAME`
- `FACULTY_PASSWORD`

Render provides an `onrender.com` URL hosting both frontend and API. Free services sleep after 15 inactive minutes, so the next request can take about a minute.
