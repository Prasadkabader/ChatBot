from sqlalchemy.orm import Session
from passlib.context import CryptContext
from . import models, schemas
from .auth import hash_password

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -------------------- USER CRUD --------------------
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def list_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

# -------------------- PROJECT CRUD --------------------
def create_project(db: Session, project: schemas.ProjectCreate, user_id: int):
    db_project = models.Project(
        user_id=user_id,
        name=project.name,
        description=project.description,
        model=project.model,
        settings=project.settings
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def get_projects(db: Session, user_id: int):
    return db.query(models.Project).filter(models.Project.user_id == user_id).all()

def get_project(db: Session, project_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id).first()

# -------------------- PROMPT CRUD --------------------
def create_prompt(db: Session, prompt: schemas.PromptCreate, project_id: int):
    db_prompt = models.Prompt(
        project_id=project_id,
        title=prompt.title,
        role=prompt.role,
        template=prompt.template,
        variables=prompt.variables
    )
    db.add(db_prompt)
    db.commit()
    db.refresh(db_prompt)
    return db_prompt

def get_prompts(db: Session, project_id: int):
    return db.query(models.Prompt).filter(models.Prompt.project_id == project_id).all()

def get_prompt(db: Session, prompt_id: int):
    return db.query(models.Prompt).filter(models.Prompt.id == prompt_id).first()
