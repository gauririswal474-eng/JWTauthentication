# Backend: JWT Authentication (Express)

## Run
```
cd backend
npm install
cp .env.example .env    # Windows: copy .env.example .env
npm run dev
```
| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `JWT_SECRET` | Secret used to sign tokens (required, use a long random string) |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `1h` |
| `CLIENT_URL` | Frontend origin allowed by CORS (empty = allow all) |

## Routes
| Method | Route | Description |
|---|---|---|
| POST | `/register` | Body `{ username, password }`. Stores the user in an in-memory array. |
| POST | `/login` | Validates credentials and returns `{ token }` (a JWT). |
| GET | `/protected` | Needs header `Authorization: Bearer <token>`. |

## How it works
- Users live in an array (`data/users.js`), so they are lost when the server restarts.
- Passwords are hashed with bcrypt before being stored; plain-text passwords are never saved.
- `middleware/auth.js` verifies the token and rejects missing, invalid and expired tokens with 401.
- Validation: username at least 3 characters, password at least 6, duplicate usernames return 409, wrong login returns a generic 401 message.
