from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import AttemptCreate, ChatMessage
from models import fetch_all_questions, fetch_question_by_id, insert_attempt, fetch_student_progress
from chatbot import get_chatbot_response

app = FastAPI(title="Smart Placement Preparation Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend is running successfully!"}

@app.get("/questions")
def get_questions(category: str = None, difficulty: str = None):
    return fetch_all_questions(category, difficulty)

@app.get("/questions/{question_id}")
def get_question(question_id: int):
    q = fetch_question_by_id(question_id)
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    return q

@app.post("/attempts")
def post_attempt(attempt: AttemptCreate):
    insert_attempt(attempt.student_id, attempt.question_id, attempt.submitted_answer, attempt.score, attempt.completed)
    return {"status": "success", "message": "Attempt saved"}

@app.get("/students/{student_id}/progress")
def get_progress(student_id: int):
    attempts = fetch_student_progress(student_id)
    total_solved = sum(1 for a in attempts if a["completed"])
    return {"student_id": student_id, "total_attempts": len(attempts), "total_solved": total_solved, "attempts": attempts}

@app.post("/chat")
def chat(payload: ChatMessage):
    return {"reply": get_chatbot_response(payload.message)}