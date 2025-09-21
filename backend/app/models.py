from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime
import json

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    email = Column(String(100), unique=True, index=True)
    password_hash = Column(String(128))
    created_at = Column(DateTime, default=datetime.utcnow)

    projects = relationship("Project", back_populates="owner")

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(100))
    description = Column(Text)
    model = Column(String(50))
    settings = Column(Text, default='{}')  # Store JSON as string
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="projects")
    prompts = relationship("Prompt", back_populates="project")

    def get_settings(self):
        return json.loads(self.settings or "{}")

    def set_settings(self, data):
        self.settings = json.dumps(data)

class Prompt(Base):
    __tablename__ = "prompts"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    title = Column(String(100))
    role = Column(String(20))  # system, user, assistant
    template = Column(Text)
    variables = Column(Text, default='{}')  # Store JSON as string
    version = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="prompts")

    def get_variables(self):
        return json.loads(self.variables or "{}")

    def set_variables(self, data):
        self.variables = json.dumps(data)
