import { PTSD_ASSESSMENT_UI } from "../ui/ptsd_assessment.js";
import { evaluatePTSDSeveretiy } from "../utils/helpers.js";
import { signup } from "../services/auth.js";

export function addTestDataToTest(qst_num, ptsd_qst) {
  PTSD_ASSESSMENT_UI.opts_container.classList.contains("active")
    ? null
    : PTSD_ASSESSMENT_UI.opts_container.classList.add("active");
  PTSD_ASSESSMENT_UI.ptsd_test_pop.querySelector(".q-num").innerText = qst_num;
  PTSD_ASSESSMENT_UI.ptsd_test_pop.querySelector(".test-content p").innerText =
    ptsd_qst;
}

export function completeAssessment(ptsd_score, ptsd_test_data, user_data) {
  user_data.ptsd_score = ptsd_score;
  user_data.ptsd_impact = evaluatePTSDSeveretiy(ptsd_score);
  user_data.ptsd_test = ptsd_test_data;
  user_data.ptsd_test_date = new Date().toISOString().substring(0, 10);
  PTSD_ASSESSMENT_UI.ptsd_test_pop.classList.remove("active");
  signup(user_data);
}
