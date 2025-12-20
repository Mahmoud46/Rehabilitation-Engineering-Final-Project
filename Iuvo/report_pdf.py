from PIL import Image
from random import randint
def convert_images_to_pdf(image_paths):
    output_pdf_path=f'./static/db/pdfs/ptsd_medical_report{randint(0,999999999999999)}.pdf'
    # Ensure there is at least one image
    if not image_paths:
        raise ValueError("No images to convert.")

    image_list = []
    for img_path in image_paths:
        img = Image.open(img_path)
        print(img)
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        image_list.append(img)

    # Save all images to a single PDF file
    image_list[0].save(output_pdf_path, save_all=True, append_images=image_list[1:])
    return output_pdf_path
