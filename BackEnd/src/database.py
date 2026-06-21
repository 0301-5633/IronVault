import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

# make .env file with contents
# DB_HOST=host
# DB_USER=user
# DB_PASSWORD=password
# DB_NAME=dbname

class MySQLDatabase:
    def __init__(self):
        # Database configuration details
        load_dotenv()
        self.config = {
            "host": os.getenv("DB_HOST"),
            "user": os.getenv("DB_USER"),
            "password": os.getenv("DB_PASSWORD"),
            "database": os.getenv("DB_NAME")
        }
        self.connection = None

    # This runs when you enter the 'with' block
    def __enter__(self):
        try:
            self.connection = mysql.connector.connect(**self.config)
            return self.connection
        except Error as e:
            print(f"Database connection error: {e}")
            raise e

    # This runs automatically when you exit the 'with' block
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.connection and self.connection.is_connected():
            self.connection.close()
