import os
from dotenv import load_dotenv

load_dotenv()

ENV = {
    "JWT_SECRET": os.environ.get('JWT_SECRET'),
    "DATABASE_URL":  os.environ.get('DATABASE_URL'),
    "PORT" : int(os.environ.get("PORT", 5000))
}