CREATE DATABASE IF NOT EXISTS placement_assistant;
USE placement_assistant;

CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    branch VARCHAR(60),
    study_year INT
);

CREATE TABLE IF NOT EXISTS questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(60) NOT NULL,
    difficulty VARCHAR(20) DEFAULT 'Beginner',
    description TEXT NOT NULL,
    sample_input TEXT,
    expected_output TEXT
);

CREATE TABLE IF NOT EXISTS attempts (
    attempt_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    question_id INT NOT NULL,
    submitted_answer TEXT,
    score DECIMAL(5,2) DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

-- Insert a default demo student
INSERT INTO students (student_id, full_name, branch, study_year) 
VALUES (1, 'Alex Smith', 'Computer Science', 3) 
ON DUPLICATE KEY UPDATE full_name=full_name;

-- Insert sample questions
INSERT INTO questions (title, category, difficulty, description, sample_input, expected_output) VALUES
('Reverse a String', 'Strings', 'Beginner', 'Write a function that reverses a given string.', 'hello', 'olleh'),
('Check Palindrome', 'Strings', 'Beginner', 'Determine whether a string reads the same backward as forward.', 'racecar', 'True'),
('Find Maximum in List', 'Lists', 'Beginner', 'Given a list of numbers, return the largest element.', '[4, 1, 9, 2]', '9');