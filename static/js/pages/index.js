import { HOME_UI, AUTH_DATA } from "../ui/home.js";
import { registerUser, authenticateUser } from "../utils/helpers.js";
import { ActivateFeaturePopWindow } from "../components/home.js";
import PTSDAssessment from "./ptsd_assessment.js";

PTSDAssessment();

document
  .querySelector(".sub-mail-btns .mail")
  .addEventListener("click", (_) =>
    HOME_UI.contact_pop.classList.add("active"),
  );

document
  .querySelector(".frg-psrd button")
  .addEventListener("click", (e) => e.preventDefault());

document.querySelector(".menu .login-btn").addEventListener("click", (_) => {
  HOME_UI.login_pop.classList.add("active");
  AUTH_DATA.stat = "login";
});

document.querySelector(".menu .reg-btn").addEventListener("click", (_) => {
  (HOME_UI.reg_pop.classList.add("active"), (AUTH_DATA.stat = "reg"));
});

document
  .querySelector(".sub-mail-btns .sub-btn")
  .addEventListener("click", (_) => {
    (HOME_UI.reg_pop.classList.add("active"), (AUTH_DATA.stat = "reg"));
  });

HOME_UI.lrn_btns.forEach((btn) =>
  btn.addEventListener("click", (e) =>
    ActivateFeaturePopWindow(
      e.target.parentNode.querySelector("img").src,
      e.target.parentNode.querySelector("h3").innerText,
    ),
  ),
);

HOME_UI.cls_btns.forEach((btn) =>
  btn.addEventListener("click", (e) =>
    e.target.parentNode.parentNode.classList.remove("active"),
  ),
);

// inputs
document.querySelectorAll(".ip-ptsd input").forEach((ip) => {
  ip.addEventListener("input", (e) => {
    if (e.target.value == "") {
      e.target.classList.remove("not-empty");
      e.target.parentNode.querySelector("span").classList.remove("not-empty");
    } else {
      e.target.classList.contains("not-empty")
        ? null
        : e.target.classList.add("not-empty");
      e.target.parentNode.querySelector("span").classList.contains("not-empty")
        ? null
        : e.target.parentNode.querySelector("span").classList.add("not-empty");
    }
  });
});

document.querySelectorAll(".ip-ptsd textarea").forEach((ip) => {
  ip.addEventListener("input", (e) => {
    if (e.target.value == "") {
      e.target.classList.remove("not-empty");
      e.target.parentNode.querySelector("span").classList.remove("not-empty");
    } else {
      e.target.classList.contains("not-empty")
        ? null
        : e.target.classList.add("not-empty");
      e.target.parentNode.querySelector("span").classList.contains("not-empty")
        ? null
        : e.target.parentNode.querySelector("span").classList.add("not-empty");
    }
  });
});

//
HOME_UI.submit_data_btns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    AUTH_DATA.stat == "login" ? authenticateUser(e) : registerUser(e);
  }),
);
