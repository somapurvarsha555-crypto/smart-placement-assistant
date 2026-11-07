def get_chatbot_response(message: str) -> str:
    msg = message.lower().strip()
    if any(w in msg for w in ['hello', 'hi']):
        return 'Hello! I am your Placement Assistant Bot. Ask me about Python, REST APIs, FastAPI, or MySQL.'
    elif 'python' in msg:
        return 'Python is a high-level language popular for scripting, web development, and backend APIs.'
    elif 'rest api' in msg or 'api' in msg:
        return 'REST APIs use HTTP methods (GET, POST) to exchange JSON data between client and server.'
    elif 'fastapi' in msg:
        return 'FastAPI is a modern, high-performance Python framework for building REST APIs using standard type hints.'
    elif 'mysql' in msg or 'database' in msg:
        return 'MySQL is a relational database management system using tables, rows, and columns.'
    elif 'help' in msg:
        return 'Supported topics: python, rest api, fastapi, mysql, interview, hello.'
    else:
        return "I do not have a predefined answer for that. Try asking about Python, FastAPI, MySQL, or type 'help'."