from pydantic import BaseModel

class AttemptCreate(BaseModel):
    student_id: int
    question_id: int
    submitted_answer: str
    score: float
    completed: bool

class ChatMessage(BaseModel):
    message: str
