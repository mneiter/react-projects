import debugpy
debugpy.listen(("0.0.0.0", 5678))  # Открываем порт для отладчика
print("✅ Debugger is listening on port 5678")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.tasks import router as task_router

app = FastAPI()

# Enable CORS for localhost:3000 (Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_router, prefix="/tasks", tags=["tasks"])
