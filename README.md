# Iuvo PTSD (Post-Traumatic Stress Disorder) Rehabilitation Platform

**Iuvo** is a full-stack web application designed to support individuals affected by Post-Traumatic Stress Disorder (PTSD) through structured rehabilitation planning based on scientific and clinical methodologies. The platform focuses on assessment, awareness, and guided support for both patients and healthcare professionals.

---

## 📌 Overview

Iuvo PTSD provides a rehabilitation-oriented framework that helps users better understand and manage PTSD symptoms through evidence-based techniques. The platform combines diagnostic tools, educational resources, and planned therapeutic support in a single, accessible system.

The current demo version offers a standardized PTSD assessment that evaluates symptom severity and generates a comprehensive clinical report.

---

## 🧠 Core Features

- **PTSD Severity Assessment**  
  The platform includes a PTSD diagnostic test based on the [PCL-5 (PTSD Checklist for DSM-5)]("https://drive.google.com/drive/folders/1bzNYGyQIArEo_GJ9FzXQ61kAltthyASU), a clinically recognized screening tool.

- **Automated PDF Report Generation**  
  Upon completing the assessment, the system generates a detailed PDF report that includes:

  - An overview of the patient’s condition
  - PTSD severity analysis
  - Practical recommendations for symptom management

  This report can be used by both patients and healthcare professionals to support further evaluation.

- **Rehabilitation-Oriented Design**  
  The application is structured to guide users toward long-term recovery through scientifically grounded rehabilitation concepts.

---

## 🚀 Planned Future Enhancements

The platform is designed to evolve into a more interactive rehabilitation environment, including:

- **Mindfulness & Relaxation Exercises**  
  Game-based and guided exercises aimed at reducing stress and improving emotional regulation.

- **Professional Support Integration**  
  Direct links to licensed mental health professionals, allowing referrals or redirection to appropriate specialists.

- **Educational Resources About PTSD**  
  Curated materials such as:

  - Books
  - Research papers
  - Educational videos

  These resources aim to improve awareness and understanding of PTSD for patients, caregivers, and the public.

---

## 🛠️ Tech Stack

- **Frontend**

  - HTML
  - CSS
  - Sass
  - JavaScript

- **Backend**
  - Python
  - Flask

---

## 💾 Data Management

- User textual input is stored locally in **JSON files**
- Generated PDF reports and uploaded images are stored locally in designated directories
- No external database is required in the current implementation

---

## 📂 Project Structure

```bash
project-root/
├── controllers/
├── services/
├── db/
|   ├── imgs/
|   └── data.txt
├── static/
|   ├── imgs/
|   ├── reports/           # Generated PDF reports
|   ├── js/
|   └── styles/
├── templates/         # HTML templates
├── app.py             # Flask application entry point
└── requirements.txt   # Python dependencies
```

---

## ⚙️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/Mahmoud46/Rehabilitation-Engineering-Final-Project.git
```

2. Navigate to the project directory

```bash
cd Rehabilitation-Engineering-Final-Project
```

3. Create and activate a virtual environment

```bash
python -m venv venv
venv\Scripts\activate    # On macOS / Linux: source venv/bin/activate
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Run the Flask server

```bash
flask run
```

---

### ⚠️ Disclaimer

This application is intended for educational and supportive purposes only and is not a substitute for professional medical diagnosis or treatment. Users are strongly encouraged to consult licensed healthcare professionals for clinical decisions.
