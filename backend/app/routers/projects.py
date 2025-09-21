from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import database, crud, schemas

router = APIRouter()
get_db = database.get_db

@router.post("/")
def create_project(project: schemas.ProjectCreate, user_id: int, db: Session = Depends(get_db)):
    return crud.create_project(db, project, user_id)

@router.get("/user/{user_id}")
def list_projects(user_id: int, db: Session = Depends(get_db)):
    return crud.get_projects(db, user_id)

@router.get("/{project_id}")
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = crud.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
