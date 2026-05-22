# UNIVENDA

UNIVENDA is a full-stack student marketplace where students can sell self-made products and offer freelance services, while customers can buy products or hire students.

## Structure

```text
backend/
  src/
    config/        Supabase connection
    controllers/   Request handlers
    middleware/    Supabase auth, role checks, file uploads
    models/        User, Product, Service schemas
    routes/        Express route modules
frontend/
  src/
    api/           API client
    components/    Shared UI and form components
    context/       Auth session state
    pages/         Landing, auth, student, customer pages
    routes/        Route guards
```

## Tech Stack

- Frontend: React with Vite
- Backend: Supabase directly from the frontend
- Database: Supabase Postgres
- Authentication: Supabase Auth

## Setup

1. Install dependencies.

```bash
npm run install:all
```

2. Create frontend environment file.

```bash
copy frontend\.env.example frontend\.env
```

3. Update `frontend/.env`.

```text
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Create the Supabase profile table.

Run the SQL in `backend/supabase/schema.sql` in your Supabase SQL editor.

5. Run both apps.

```bash
npm run dev
```

## Routes

Frontend:

- `/` landing page
- `/auth/student`
- `/auth/customer`
- `/register/student`
- `/register/customer`
- `/student/dashboard`
- `/customer/dashboard`
- `/customer/products/:id`
- `/customer/freelancers/:id`

Data:

- Registration uses `supabase.auth.signUp()`
- Login uses `supabase.auth.signInWithPassword()`
- Profile details are stored in the Supabase `users` table
