import sqlite3
from config.env import ENV
from typing import Literal

class UserSchema:
    def __init__(self, db_path):
        self.__db_path = db_path

        db = sqlite3.connect(self.__db_path)

        # Create the users table
        db.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            
            -- Profile Information
            full_name TEXT NOT NULL,
            birth_date DATE,
            gender TEXT CHECK(gender IN ('male', 'female')),
            
            -- Credentials & Identity
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            
            -- Access Control (New Role Column)
            role TEXT DEFAULT 'patient' CHECK(role IN ('patient', 'doctor', 'admin')),
                   
            -- Clinical Metrics
            latest_assessment_id INTEGER,
            latest_ptsd_score REAL DEFAULT 0.0,
            latest_ptsd_impact TEXT CHECK(
                (role = 'patient' AND latest_ptsd_impact IN ('minimal', 'low', 'moderate', 'high', 'severe')) OR 
                (role != 'patient' AND latest_ptsd_impact IS NULL)
            ),
            
            -- Metadata
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        """)

        # Create the Trigger for automatic 'updated_at'
        db.execute("""
        CREATE TRIGGER IF NOT EXISTS update_user_timestamp 
        AFTER UPDATE ON users
        FOR EACH ROW
        BEGIN
            UPDATE users 
            SET updated_at = CURRENT_TIMESTAMP 
            WHERE user_id = OLD.user_id;
        END;
        """)

        db.close()

    def insert(self, full_name, birth_date, gender: Literal["male", "female"], email, username, password_hash, role: Literal['patient', 'doctor', 'admin'], latest_assessment_id: int=None, latest_ptsd_score: int=None, latest_ptsd_impact: Literal['minimal', 'low', 'moderate', 'high', 'severe']=None):
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor()

        patinet_sql = """
            INSERT INTO users (full_name, birth_date, gender, email, username, password_hash, role, latest_assessment_id, latest_ptsd_score, latest_ptsd_impact)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            RETURNING *;
            """ 

        admin_sql = """
            INSERT INTO users (full_name, birth_date, gender, email, username, password_hash, role)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            RETURNING *;
        """
        
        try:
            # Insert a new user 
            if role == "patient":
                cr.execute(patinet_sql, (full_name, birth_date, gender, email, username, password_hash, role, latest_assessment_id, latest_ptsd_score, latest_ptsd_impact))

            elif role == "admin":
                cr.execute(admin_sql, (full_name, birth_date, gender, email, username, password_hash, role,))

            new_user = cr.fetchone()
            db.commit()
            
            print("User created successfully!")

            return new_user
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()
              
    def update(self, user_id:int, password_hash=None, latest_assessment_id: int=None, latest_ptsd_score: int=None, latest_ptsd_impact: Literal['minimal', 'low', 'moderate', 'high', 'severe']=None):
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor()

        password_hash_sql = """
        UPDATE users SET password_hash = ?
        WHERE user_id = ?
        """

        assessment_sql = """
        UPDATE users SET latest_assessment_id = ?, latest_ptsd_score = ?, latest_ptsd_impact = ?
        WHERE user_id = ?
        """

        try:
            # Update the password
            if password_hash:
                cr.execute(password_hash_sql, (password_hash, user_id))

            elif latest_assessment_id and latest_ptsd_impact and latest_ptsd_score is not None:
                cr.execute(assessment_sql, (latest_assessment_id, latest_ptsd_score, latest_ptsd_impact, user_id))
            
            db.commit()

            # Select the user with the id 
            cr.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
            user = cr.fetchone()
            return user
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()

    def delete(self, user_id):
        db = sqlite3.connect(self.__db_path)
        cr =db.cursor()
        sql = """
        DELETE FROM users
        WHERE user_id = ?;
        """
        
        # Activate the foreign key
        cr.execute("PRAGMA foreign_keys = ON;")

        try:
            # Delete the user with a user_id
            cr.execute(sql, (user_id,))
            db.commit()

            # Select the user with the id 
            cr.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
            user = cr.fetchone()

            if not user: return "User deleted successfully!" 
            return user
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()

    def find_by_id(self, user_id):
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor() 

        sql = """
        SELECT * FROM users
        WHERE user_id = ? LIMIT 1;
        """    

        try:
            cr.execute(sql, (user_id,))
            user = cr.fetchone()
            return user
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()

    def find_by_email(self, email):
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor() 

        sql = """
        SELECT * FROM users
        WHERE email = ? LIMIT 1;
        """    

        try:
            cr.execute(sql, (email,))
            user = cr.fetchone()
            return user
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()


User = UserSchema(ENV['DATABASE_URL'])