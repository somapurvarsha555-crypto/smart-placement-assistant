import mysql.connector
import os

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='Varsha@sql#',
        database='placement_assistant'
    )
