from fastapi import FastAPI
from app.routers import auth, users, projects, prompts, chat
from app.database import Base, engine

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Chatbot Platform")

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(prompts.router, prefix="/api/prompts", tags=["prompts"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
