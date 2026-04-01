export const HOME_UI = {
  features_pop: document.querySelector(".f-pop"),
  lrn_btns: document.querySelectorAll(".f button"),
  cls_btns: document.querySelectorAll(".pop .cls-btn"),
  contact_pop: document.querySelector(".cont-pop"),
  login_pop: document.querySelector(".login-pop"),
  reg_pop: document.querySelector(".reg-pop"),
  submit_data_btns: document.querySelectorAll(".submit-data-btn"),
};

export const STATIC_DATA = {
  content: {
    "Mindfulness and Relaxation Exercises":
      "Target anxiety, stress, and depression symptoms, utilizing guided meditations, breathing techniques, and body scans to promote relaxation and mindfulness.",
    "Educational Resources About PTSD":
      "Aim to inform and empower users by providing knowledge about the condition. These resources, often found in high-quality apps, typically include psychoeducational materials covering symptoms, causes, and treatments of PTSD.",
    "Direct Links to Professional Help":
      "To facilitate access to professional care when needed",
    "Symptom Tracking":
      "To monitor progress and tailor the therapeutic approach. which can be beneficial for self-management and for sharing information with healthcare professionals.",
  },
};

export const AUTH_DATA = {
  login_data: { email: "", password: "" },
  signup_data: {
    full_name: "",
    email: "",
    password: "",
    gender: "",
    birth_date: "",
    ptsd_score: 0,
    ptsd_impact: "",
    ptsd_test: [],
    ptsd_test_date: "",
  },
  stat: "",
  reg_stat: "pri_stage",
};
