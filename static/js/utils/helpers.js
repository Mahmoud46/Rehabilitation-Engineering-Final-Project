import { AUTH_DATA } from "../ui/home.js";
import { login, signup } from "../services/auth.js";

export function authenticateUser(e) {
  AUTH_DATA.login_data.email = document.getElementById("login-user-mail").value;
  ((AUTH_DATA.login_data.password = document.getElementById(
    "login-user-password",
  ).value),
    5);
  if (
    validateEmail(AUTH_DATA.login_data.email) &&
    AUTH_DATA.login_data.password
  ) {
    e.preventDefault();
    login(AUTH_DATA.login_data);
    console.log(AUTH_DATA.login_data);
  }
}

export function registerUser(e) {
  AUTH_DATA.signup_data.full_name =
    document.getElementById("reg-full-name").value;
  AUTH_DATA.signup_data.email = document.getElementById("reg-user-mail").value;
  AUTH_DATA.signup_data.password =
    document.getElementById("reg-user-password").value;
  AUTH_DATA.signup_data.birth_date =
    document.getElementById("reg-user-bd").value;
  AUTH_DATA.signup_data.gender =
    document.getElementById("reg-user-gender").value;
  if (
    AUTH_DATA.signup_data.full_name &&
    validateEmail(AUTH_DATA.signup_data.email) &&
    AUTH_DATA.signup_data.password &&
    AUTH_DATA.signup_data.birth_date &&
    AUTH_DATA.signup_data.birth_date &&
    AUTH_DATA.signup_data.gender
  ) {
    e.preventDefault();
    signup(AUTH_DATA.signup_data);
  }
}

export function evaluatePTSDSeveretiy(ptsd_score) {
  let ptsd_impact = "";

  if (ptsd_score <= 10) ptsd_impact = "Minimal";
  else if (ptsd_score <= 30)
    (ptsd_score - 11) / (30 - 11) >= 0.5
      ? (ptsd_impact = "Moderate")
      : (ptsd_impact = "Low");
  else if (ptsd_score <= 50)
    (ptsd_score - 31) / (50 - 31) >= 0.5
      ? (ptsd_impact = "High")
      : (ptsd_impact = "Moderate");
  else
    (ptsd_score - 51) / (88 - 51) >= 0.5
      ? (ptsd_impact = "Severe")
      : (ptsd_impact = "High");
  return ptsd_impact;
}

export function validateEmail(email_address) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_address);
}

export async function prepareMedicalReportPage(report_container) {
  const canvas = await html2canvas(report_container, {
    scale: 5, // Adjust scale to improve image quality
    logging: true, // Enable logging for debugging
    useCORS: true, // Try capturing external images
  });

  return canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
}
