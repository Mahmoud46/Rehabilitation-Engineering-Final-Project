import sqlite3
from typing import Literal
from config.env import ENV

class AssessmentSchema:
    def __init__(self, db_path):
        self.__db_path = db_path

        db = sqlite3.connect(self.__db_path)

        # Create the assessments table
        db.execute("""
        CREATE TABLE IF NOT EXISTS assessments (
            assessment_id INTEGER PRIMARY KEY AUTOINCREMENT,
            
            -- Assessment Data
            assessment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            ptsd_score INTEGER NOT NULL,
            ptsd_impact TEXT NOT NULL CHECK(ptsd_impact IN ('minimal', 'low', 'moderate', 'high', 'severe')),
            
            -- Relationship
            user_id INTEGER NOT NULL,
            
            -- Constraints
            FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
        );
        """)

        # Create the questions table
        db.execute("""
        CREATE TABLE IF NOT EXISTS questions (
            question_id INTEGER PRIMARY KEY AUTOINCREMENT,
            
            -- The Foreign Key to the specific assessment
            assessment_id INTEGER NOT NULL,
            
            -- Positioning and Content
            ordinal_position INTEGER NOT NULL,
            content TEXT NOT NULL,             -- The question text
            
            -- The User's Response
            answer TEXT NOT NULL,              -- e.g., 'Not at all', 'Extremely'
            score INTEGER NOT NULL,               -- e.g., 0, 1, 2, 3, 4
            
            -- Relationship
            FOREIGN KEY (assessment_id) REFERENCES assessments (assessment_id) ON DELETE CASCADE
        );
        """)

        db.close()

    def insert(self, user_id, ptsd_score: int, ptsd_impact: Literal['minimal', 'low', 'moderate', 'high', 'severe'], questions):
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor()

        sql = """
            INSERT INTO assessments (ptsd_score, ptsd_impact, user_id)
            VALUES (?, ?, ?)
            RETURNING *;
        """

        try:
            cr.execute(sql, (ptsd_score, ptsd_impact, user_id))
            new_assessment = cr.fetchone()
            db.commit()

            # Add assessment's questions 
            for question in questions:
                self.__insert(new_assessment[0], question["num"], question["qst"], question["ans"], question["score"])
            
            print("Assessment created successfully!")
            return new_assessment
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()

    def __insert(self, assessment_id, ordinal_position: int, content, answer, score: int): # To insert new question to questions table 
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor()

        sql = """
            INSERT INTO questions (assessment_id, ordinal_position, content, answer, score)
            VALUES (?, ?, ?, ?, ?)
            RETURNING *;
        """

        try:
            cr.execute(sql, (assessment_id, ordinal_position, content, answer, score))
            new_question = cr.fetchone()
            db.commit()

            print("Question is created successfully!")
            return new_question
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()

    def delete(self, assessment_id):
        db = sqlite3.connect(self.__db_path)
        cr =db.cursor()

        sql = """
        DELETE FROM assessments
        WHERE assessment_id = ?;
        """
        
        # Activate the foreign key
        cr.execute("PRAGMA foreign_keys = ON;")

        try:
            # Delete the user with a user_id
            cr.execute(sql, (assessment_id,))
            db.commit()

            # Select the user with the id 
            cr.execute("SELECT * FROM assessments WHERE assessment_id = ?", (assessment_id,))
            user = cr.fetchone()

            if not user: return "Assessment deleted successfully!" 
            return user
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()

    def find_by_id(self, assessment_id):
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor() 

        sql = """
        SELECT * FROM assessments
        WHERE assessment_id = ? LIMIT 1;
        """    

        try:
            cr.execute(sql, (assessment_id,))
            assessment = cr.fetchone()

            if not assessment: 
                print("Assessment not found!")

            return assessment
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()

    def find_questions_by_assessment_id(self, assessment_id):
        db = sqlite3.connect(self.__db_path)
        cr = db.cursor() 

        sql = """
        SELECT * FROM questions
        WHERE assessment_id = ?;
        """    
        try:
            cr.execute(sql, (assessment_id,))
            questions = cr.fetchall()

            if not questions: 
                print("Assessment not found!")

            return questions
        except sqlite3.IntegrityError as e:
            print(f"Database error: {e}")
        finally:
            db.close()



Assessment = AssessmentSchema(ENV["DATABASE_URL"])