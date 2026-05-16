# NGO Field Data Collection Dashboard (MERN)

Simple field-reporting system with two roles (Admin / Field Worker), Google OAuth + email login,
and an AI-generated summary of submitted reports.

## Stack
- **Frontend:** React (Vite) + React Router + Tailwind + Axios
- **Backend:** Node.js + Express (ES modules) + Mongoose
- **Auth:** JWT + bcrypt + Passport (Google OAuth)
- **AI:** OpenAI or Gemini (set whichever key you have)

## Setup

### 1. MongoDB
Run MongoDB locally (or use MongoDB Atlas). Default URI: `mongodb://127.0.0.1:27017/ngo_dashboard`.

### 2. Backend
```bash
cd backend
cp .env.example .env     # fill in values
npm install
npm run dev              # http://localhost:5000
```

**`.env` keys to fill:**
- `JWT_SECRET` — any long random string
- `ADMIN_EMAIL` — **hardcoded admin**. Whoever signs up/logs in with this email becomes admin automatically.
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — from Google Cloud Console (OAuth 2.0 Client). Add `http://localhost:5000/api/auth/google/callback` as an authorized redirect URI.
- `OPENAI_API_KEY` **or** `GEMINI_API_KEY` — only one is needed.

### 3. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```

## How roles work
- Default role on signup = `worker`.
- If a user signs up / logs in with the email matching `ADMIN_EMAIL`, they're promoted to `admin` automatically.
- Admin can promote/demote any other user from the **Users** page.

## Routes
**Worker:** `/` Home · `/submit` Submit Report · `/my-reports` My Reports
**Admin:** `/` Dashboard · `/reports` All Reports · `/ai-summary` AI Summary · `/users` Users

## API
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
GET    /api/auth/google              (start OAuth)
GET    /api/auth/google/callback
GET    /api/auth/users               (admin)
PATCH  /api/auth/users/:id/role      (admin)

POST   /api/submission               (worker)
GET    /api/submission/mine          (worker)
GET    /api/submission                (admin, supports ?q&region&activityType&from&to&workerId)
GET    /api/submission/stats         (admin)

POST   /api/ai/generate-summary      (admin)
```
