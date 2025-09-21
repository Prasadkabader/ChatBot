from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import database, schemas, crud, llm

router = APIRouter()
get_db = database.get_db

@router.post("/{project_id}")
def chat_with_project(
    project_id: int,
    request: schemas.ChatRequest,
    db: Session = Depends(get_db)
):
    # Get project from DB
    project = crud.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Combine system prompt if prompt_id provided
    messages = []
    if request.prompt_id:
        prompt = crud.get_prompt(db, request.prompt_id)
        if prompt:
            messages.append({"role": prompt.role, "content": prompt.template})

    # Append user messages
    for msg in request.messages:
        messages.append({"role": msg.role, "content": msg.content})

    # Call Gemini API
    gemini_response = llm.send_message_to_llm(messages, model=project.model or "text-bison-001")

    # Return only the response text
    return {"response": gemini_response.get("response", "")}
