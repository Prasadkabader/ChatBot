from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import database, crud, schemas
from typing import List

router = APIRouter()
get_db = database.get_db

@router.post("/{project_id}", response_model=schemas.PromptOut)
def create_prompt(project_id: int, prompt: schemas.PromptCreate, db: Session = Depends(get_db)):
    return crud.create_prompt(db, prompt, project_id)

@router.get("/{project_id}", response_model=List[schemas.PromptOut])
def get_prompts(project_id: int, db: Session = Depends(get_db)):
    return crud.get_prompts(db, project_id)

@router.get("/detail/{prompt_id}", response_model=schemas.PromptOut)
def get_prompt(prompt_id: int, db: Session = Depends(get_db)):
    db_prompt = crud.get_prompt(db, prompt_id)
    if not db_prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    return db_prompt