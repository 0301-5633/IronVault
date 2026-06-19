import mysql.connector
from mysql.connector import Error

class MySQLDatabase:
    def __init__(self):
        # Database configuration details
        # Temp for testing. See todos
        self.config = {
            "host": "localhost", #TODO:
            "user": "root", #TODO: Needs correct user
            "password": "PUT_PASSWORD_HERE", #TODO: HANDLE WITH ENVIRONMENT VARIABLES
            "database": "ironVault"
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
