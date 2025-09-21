from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import database, crud, schemas
from typing import List

router = APIRouter()
get_db = database.get_db

@router.post("/", response_model=schemas.ProjectOut)
def create_project(project: schemas.ProjectCreate, user_id: int, db: Session = Depends(get_db)):
    return crud.create_project(db, project, user_id)

@router.get("/user/{user_id}", response_model=List[schemas.ProjectOut])
def list_projects(user_id: int, db: Session = Depends(get_db)):
    return crud.get_projects(db, user_id)

@router.get("/{project_id}", response_model=schemas.ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = crud.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project