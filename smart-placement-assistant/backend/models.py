from database import get_db_connection

def fetch_all_questions(category: str = None, difficulty: str = None):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    query = 'SELECT * FROM questions WHERE 1=1'
    params = []
    if category:
        query += ' AND category = %s'
        params.append(category)
    if difficulty:
        query += ' AND difficulty = %s'
        params.append(difficulty)
    cursor.execute(query, params)
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result

def fetch_question_by_id(q_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM questions WHERE question_id = %s', (q_id,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    return result

def insert_attempt(student_id: int, question_id: int, answer: str, score: float, completed: bool):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = 'INSERT INTO attempts (student_id, question_id, submitted_answer, score, completed) VALUES (%s, %s, %s, %s, %s)'
    cursor.execute(query, (student_id, question_id, answer, score, completed))
    conn.commit()
    cursor.close()
    conn.close()

def fetch_student_progress(student_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    query = 'SELECT a.attempt_id, q.title, q.category, a.score, a.completed, a.attempted_at FROM attempts a JOIN questions q ON a.question_id = q.question_id WHERE a.student_id = %s'
    cursor.execute(query, (student_id,))
    attempts = cursor.fetchall()
    cursor.close()
    conn.close()
    return attempts
