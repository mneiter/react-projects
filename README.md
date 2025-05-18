# 🧾 Task Manager Project Summary (React + FastAPI + MongoDB)

## 📦 Technologies

- **Frontend**: Next.js (App Router), React, TypeScript, TailwindCSS
- **Backend**: FastAPI (Python), MongoDB via `motor`
- **Database**: MongoDB (Docker with volume)
- **State Management**: `useState`, `useMemo`, `useRef`
- **Debugging**: VSCode + `debugpy` (port 5678)

---

## 🐳 Docker

- Uses `docker-compose.yml` with `.env` support
- Backend loads environment variables via `python-dotenv`
- Backend run command:

```bash
cd backend
uvicorn app.main:app --reload
```

---

## 🐍 Backend Structure (FastAPI)

```
backend/
├── app/
│   ├── main.py             # FastAPI entry point
│   ├── database.py         # MongoDB connection with `motor`
│   ├── models.py           # Pydantic models
│   └── routes/
│       └── tasks.py        # Task routes (CRUD)
├── requirements.txt
├── Dockerfile
```

---

## 🌐 Frontend Structure (Next.js)

```
src/
├── app/
│   ├── login/page.tsx      # Login form (planned for JWT)
│   ├── tasks/page.tsx      # Task manager page
│   └── api/tasks/          # API route structure
├── components/
│   ├── TaskManager.tsx     # Root task component
│   ├── layout/Header.tsx   # Layout header
│   └── tasks/              # Task-related UI components
├── context/ThemeContext.tsx
├── lib/mongodb.ts          # DB utility (if needed for SSR)
```

---

## ✅ Resolved Issues

- `bcrypt` AttributeError:

  ```bash
  pip install bcrypt==4.0.1
  ```

- `ModuleNotFoundError: No module named 'app'` — resolved by running `uvicorn` from inside `backend/`

---

## ⏭️ Next Steps

- 🔐 Implement **JWT Authentication** in `auth.py`, `auth_routes.py`
- 🔑 Secure task routes with authentication
- 🧠 Store JWT tokens in `localStorage` or `HttpOnly` cookies
- 📥 Enable login via `/login` (frontend)
- 🧪 Refactor state logic with `useReducer`
- ♻️ Persist `filter`, `tasks` state in `localStorage`

---

## 🧠 Resume in Chat

Say this:

> "I have a Task Manager project using FastAPI + MongoDB + Next.js. JWT is not implemented yet. We stopped after setting up backend routes and resolving import issues."
