import sqlite3
from typing import Literal
from config.env import ENV

class FileSchema:
    def __init__(self, db_path):
        self.__db_path = db_path
        
        db = sqlite3.connect(self.__db_path)
        
        # Create the files table to store urls for generated and uploaded files
        db.execute("""
        CREATE TABLE IF NOT EXISTS files (
            -- Identifiers
            file_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            assessment_id INTEGER,       -- Optional: Link to a specific assessment
            
            -- Content & Category
            title     TEXT NOT NULL,         
            type      TEXT DEFAULT 'other'   -- Category
                    CHECK(type IN ('identity', 'medical_report', 'prescription', 'profile_picture', 'other')),
            
            -- Technical Metadata
            file_type TEXT NOT NULL,         -- MIME type (e.g., 'image/png', 'application/pdf')
            url       TEXT NOT NULL,         
            
            -- Timestamps
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            
            -- Relationships
            FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
            FOREIGN KEY (assessment_id) REFERENCES assessments (assessment_id) ON DELETE CASCADE
        );
        """)

        db.close()

    def insert(self, user_id, url, title, type: Literal['identity', 'medical_report', 'prescription', 'profile_picture', 'other'], file_type, assessment_id=None):
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor()

        sql = """
            INSERT INTO files (user_id, title, type, file_type, url)
            VALUES (?, ?, ?, ?, ?)
            RETURNING *;
        """

        assessment_sql = """
            INSERT INTO files (user_id, assessment_id, title, type, file_type, url)
            VALUES (?, ?, ?, ?, ?, ?)
            RETURNING *;
        """

        try:
            if type == "medical_report":
                cr.execute(assessment_sql, (user_id, assessment_id, title, type, file_type, url))
            else:
                cr.execute(sql, (user_id, title, type, file_type, url))
            
            new_file = cr.fetchone()

            db.commit()

            print("File created successfully!")
            return new_file
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()
    
    def delete(self, file_id):
        db = sqlite3.connect(self.__db_path)
        cr =db.cursor()

        sql = """
        DELETE FROM users
        WHERE user_id = ?;
        """

        try:
            # Delete the user with a user_id
            cr.execute(sql, (file_id,))
            db.commit()

            # Select the user with the id 
            cr.execute("SELECT * FROM files WHERE file_id = ?", (file_id,))
            user = cr.fetchone()

            if not user: return "File deleted successfully!" 
            return user
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()
    
    def find_by_assessment_id(self, assessment_id):
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor() 

        sql = """
        SELECT * FROM files
        WHERE assessment_id = ? LIMIT 1;
        """    

        try:
            cr.execute(sql, (assessment_id,))
            file = cr.fetchone()
            return file
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()
            pass


File = FileSchema(ENV['DATABASE_URL'])