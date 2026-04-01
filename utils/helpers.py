from PIL import Image
from datetime import date

def images_to_pdf(image_paths, output_path):
    """
    Converts a list of images into a single PDF file.
    
    :param image_paths: List of strings (file paths to images)
    :param output_path: String (full path where the PDF should be saved)
    """
    images = []
    
    for path in image_paths:
        try:
            # Open the image and convert to RGB (PDFs don't support RGBA/transparency)
            img = Image.open(path).convert('RGB')
            images.append(img)
        except Exception as e:
            print(f"Skipping {path} due to error: {e}")

    if not images:
        print("No valid images found.")
        return

    # Take the first image and append the rest
    images[0].save(
        output_path, 
        save_all=True, 
        append_images=images[1:]
    )
    
    return output_path

def parse_question_list(question_tuple_list):
    return [{"ordinal_position": question[2], "content": question[3], "answer": question[4], "score": question[5]} for question in question_tuple_list]

def calculate_age(birthdate):
    """
    Calculates age based on a date object.
    :param birthdate: a datetime.date object
    :return: int age
    """
    today = date.today()
    
    # Calculate the difference in years
    age = today.year - birthdate.year
    
    # Adjust if the birthday hasn't happened yet this year
    # (today.month, today.day) < (birthdate.month, birthdate.day) 
    # evaluates to True (1) or False (0)
    has_not_passed_birthday = (today.month, today.day) < (birthdate.month, birthdate.day)
    
    return age - has_not_passed_birthday