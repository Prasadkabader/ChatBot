from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict
from datetime import datetime


# User schemas
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True

# Project schemas
class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    model: str = "text-bison-001"
    settings: Optional[Dict] = {}

class ProjectOut(BaseModel):
    id: int
    name: str
    description: Optional[str]
    model: str
    settings: Dict
    created_at: datetime

    class Config:
        from_attributes = True

# Prompt schemas
class PromptCreate(BaseModel):
    title: str
    role: str = "system"
    template: str
    variables: Optional[Dict] = {}

class PromptOut(BaseModel):
    id: int
    title: str
    role: str
    template: str
    variables: Dict
    version: int
    created_at: datetime

    class Config:
        from_attributes = True

# Chat schemas
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    prompt_id: Optional[int] = None
    messages: List[Message]
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 1024

class ChatResponse(BaseModel):
    response: str

# Login schema
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str