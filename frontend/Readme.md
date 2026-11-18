# Frontend: JWT Authentication (React)

## Run
```
cd frontend
npm install
cp .env.example .env    # Windows: copy .env.example .env
npm run dev
```
`VITE_API_URL` is the backend URL (default `http://localhost:5000`). Start the backend first.

## Features
- Register and Login forms with error messages
- After login the JWT is saved in `localStorage`
- The protected route is called with `Authorization: Bearer <token>`
- If the token is missing, invalid or expired the user is logged out with a message
- Logout removes the token from `localStorage`
