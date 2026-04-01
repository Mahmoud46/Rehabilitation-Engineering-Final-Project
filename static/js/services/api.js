import { renderAssessment } from "../components/patient.js";
import { PATIENT_DATA } from "../ui/patient.js";

export async function getMedicalAssessment() {
  let loader_pop = document.querySelector(".loader_pop");
  try {
    loader_pop.classList.add("active");
    const res = await fetch(`${window.origin}/api/latest_ptsd_assessment`);
    const data = await res.json();
    if (data.success)
      renderAssessment(data.result.assessment_date, data.result.questions);
    else alert(data.message);
  } catch (error) {
    alert(error);
  } finally {
    loader_pop.classList.remove("active");
  }
}

export async function dowloadLatestMedicalReportAsPdf(
  medical_report_pages,
  loader_pop,
) {
  try {
    const res = await fetch(`${window.origin}/api/latest_ptsd_report_pdf`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        page_01: medical_report_pages.page_01,
        page_02: medical_report_pages.page_02,
      }),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });

    const data = await res.json();
    if (!data.success) alert(data.message);
    else {
      // Create link
      let link = document.createElement("a");
      link.download = data.result.split("/")[-1];
      link.href = data.result;
      link.click();
    }
  } catch (error) {
    alert(error);
  } finally {
    PATIENT_DATA.medical_report_pages = {};
    loader_pop.classList.remove("active");
  }
}
