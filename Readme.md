# Authentication with JWT (Express + React)

- `backend/`: Express API with `/register`, `/login` and `/protected` (see `backend/Readme.md`)
- `frontend/`: React app with register/login forms and access to the protected route (see `frontend/Readme.md`)

## Run locally
```
# terminal 1
cd backend && npm install && cp .env.example .env && npm run dev
# terminal 2
cd frontend && npm install && cp .env.example .env && npm run dev
```
Open `http://localhost:5173`. (PowerShell: use `copy .env.example .env`.)

## Deployed links
- Backend (Render): https://YOUR-BACKEND.onrender.com
- Frontend (Netlify): https://YOUR-FRONTEND.netlify.app
