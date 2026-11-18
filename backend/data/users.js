// In-memory "database": users are stored in an array (cleared whenever the server restarts).
// Each user: { id, username, passwordHash }
export const users = []
