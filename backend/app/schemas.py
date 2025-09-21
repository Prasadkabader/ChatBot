from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict


# User schemas
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        orm_mode = True

# Project schemas
class ProjectCreate(BaseModel):
    name: str
    description: Optional[str]
    model: str
    settings: Optional[Dict] = {}

class ProjectOut(BaseModel):
    id: int
    name: str
    description: Optional[str]
    model: str
    settings: Dict

    class Config:
        orm_mode = True

# Prompt schemas
class PromptCreate(BaseModel):
    title: str
    role: str
    template: str
    variables: Optional[Dict] = {}

class PromptOut(BaseModel):
    id: int
    title: str
    role: str
    template: str
    variables: Dict

    class Config:
        orm_mode = True

# Chat schemas
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    prompt_id: Optional[int]
    messages: List[Message]
    temperature: Optional[float] = 0.2
    max_tokens: Optional[int] = 512


class UserCreate(BaseModel):
    email: EmailStr
    password: str
