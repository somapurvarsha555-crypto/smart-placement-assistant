def get_chatbot_response(message: str) -> str:
    msg = message.lower().strip()
    
    if any(word in msg for word in ["hello", "hi", "hey"]):
        return "Hello! I am your Placement Assistant Bot. You can ask me about Python, REST APIs, FastAPI, MySQL, or how to practice interviews!"
    elif "python" in msg:
        return "Python is a high-level, interpreted programming language widely used for web development, data science, and scripting due to its readable syntax."
    elif "rest api" in msg or "api" in msg:
        return "A REST API uses HTTP requests (GET, POST, PUT, DELETE) to communicate between a client (frontend) and a server (backend) using JSON payloads."
    elif "fastapi" in msg:
        return "FastAPI is a modern, fast (high-performance) web framework for building APIs with Python based on standard type hints."
    elif "mysql" in msg or "database" in msg:
        return "MySQL is an open-source relational database management system that organizes data into tables with rows and columns."
    elif "interview" in msg:
        return "To practice technical interviews effectively: 1. Understand the problem constraints, 2. Write pseudo-code, 3. Implement cleanly, and 4. Test with edge cases."
    elif "help" in msg:
        return "Supported topics: python, rest api, fastapi, mysql/database, interview, hello."
    else:
        return "I do not have a predefined answer for that. Try asking about Python, FastAPI, MySQL, REST APIs, or type 'help' for options!"