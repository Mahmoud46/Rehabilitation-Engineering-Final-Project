import { PATIENT_STATIC_DATA, PATIENT_DATA } from "../ui/patient.js";
import { prepareMedicalReportPage } from "../utils/helpers.js";
import { logout } from "../services/auth.js";
import {
  getMedicalAssessment,
  dowloadLatestMedicalReportAsPdf,
} from "../services/api.js";

getMedicalAssessment();

document
  .querySelector(".user-menu-icon .user_data_title_menu button.user-icon-btn")
  .addEventListener("click", (e) => {
    e.target.parentNode.querySelector("p").classList.toggle("active");
    document
      .querySelector(".user-menu-icon .user-menu")
      .classList.toggle("active");
  });

document
  .querySelector(".medical-report-info .cls-btn")
  .addEventListener("click", (e) =>
    e.target.parentNode.parentNode.classList.remove("active"),
  );

document
  .getElementById("sh-med-repo")
  .addEventListener("click", (_) =>
    document.querySelector(".medical-report-info").classList.add("active"),
  );

document
  .getElementById("logout_btn")
  .addEventListener("click", (_) => logout());

// switching images and content in col-2
setInterval((_) => {
  document.querySelector(".user-hero .col-2 img").src =
    PATIENT_STATIC_DATA.switch_imgs_list[PATIENT_DATA.switch_index];
  document.querySelector(".user-hero .col-2 .content h1").innerText =
    PATIENT_STATIC_DATA.switch_key_content[PATIENT_DATA.switch_index];
  document.querySelector(".user-hero .col-2 .content p").innerText =
    PATIENT_STATIC_DATA.switch_value_content[PATIENT_DATA.switch_index];
  document.querySelector(".user-hero .col-1 p.switch-quote").innerText =
    PATIENT_STATIC_DATA.encouragement_messages[
      PATIENT_DATA.encouragement_messages_switch_index
    ];
  PATIENT_DATA.switch_index++;
  PATIENT_DATA.encouragement_messages_switch_index++;
  if (PATIENT_DATA.switch_index == PATIENT_STATIC_DATA.switch_imgs_list.length)
    PATIENT_DATA.switch_index = 0;
  if (
    PATIENT_DATA.encouragement_messages_switch_index ==
    PATIENT_STATIC_DATA.encouragement_messages.length
  )
    PATIENT_DATA.encouragement_messages_switch_index = 0;
}, 2000);

// Download report
document
  .querySelector(".medical-report-info-cont-body button")
  .addEventListener("click", async (e) => {
    const loader_pop = document.querySelector(".loader_pop");
    loader_pop.classList.add("active");

    PATIENT_DATA.medical_report_pages.page_01 = await prepareMedicalReportPage(
      document.querySelector(".medical-report-form.p1"),
    );
    PATIENT_DATA.medical_report_pages.page_02 = await prepareMedicalReportPage(
      document.querySelector(".medical-report-form.p2"),
    );

    // downloadMedicalReportAsPDF(PATIENT_DATA.medical_report_pages);
    await dowloadLatestMedicalReportAsPdf(
      PATIENT_DATA.medical_report_pages,
      loader_pop,
    );
  });
