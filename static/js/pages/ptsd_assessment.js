import { PTSD_ASSESSMENT, PTSD_ASSESSMENT_UI } from "../ui/ptsd_assessment.js";
import {
  addTestDataToTest,
  completeAssessment,
} from "../components/ptsd_assessment.js";
import { AUTH_DATA } from "../ui/home.js";

export default function PTSDAssessment() {
  addTestDataToTest(
    PTSD_ASSESSMENT.qst_num,
    PTSD_ASSESSMENT.questions[PTSD_ASSESSMENT.qst_num - 1],
  );

  PTSD_ASSESSMENT_UI.ptsd_test_pop
    .querySelector(".cls-btn")
    .addEventListener("click", (_) => {
      PTSD_ASSESSMENT_UI.ptsd_test_pop.classList.remove("active");
      PTSD_ASSESSMENT.qst_num = 1;
      PTSD_ASSESSMENT.qst_score = 0;
      PTSD_ASSESSMENT.ptsd_test_data = [];
      PTSD_ASSESSMENT_UI.st_eval_btn.classList.remove("active");
      console.log(PTSD_ASSESSMENT.qst_num, PTSD_ASSESSMENT.qst_score);
      addTestDataToTest(
        PTSD_ASSESSMENT.qst_num,
        PTSD_ASSESSMENT.questions[PTSD_ASSESSMENT.qst_num - 1],
      );
    });

  PTSD_ASSESSMENT_UI.opts_container.querySelectorAll("li").forEach((ops) => {
    ops.addEventListener("click", (_) => {
      PTSD_ASSESSMENT.qst_score += parseInt(ops.getAttribute("score"));
      PTSD_ASSESSMENT.ptsd_test_data.push({
        num: PTSD_ASSESSMENT.qst_num,
        qst: PTSD_ASSESSMENT.questions[PTSD_ASSESSMENT.qst_num - 1],
        ans: ops.querySelector("span.op").innerText,
        score: parseInt(ops.getAttribute("score")),
      });
      PTSD_ASSESSMENT.qst_num++;
      if (PTSD_ASSESSMENT.qst_num > 22) {
        PTSD_ASSESSMENT_UI.st_eval_btn.classList.add("active");
        PTSD_ASSESSMENT_UI.opts_container.classList.remove("active");
        return;
      }
      addTestDataToTest(
        PTSD_ASSESSMENT.qst_num,
        PTSD_ASSESSMENT.questions[PTSD_ASSESSMENT.qst_num - 1],
      );
    });
  });

  PTSD_ASSESSMENT_UI.ptsd_test_pop
    .querySelector(".st-btn")
    .addEventListener("click", (_) =>
      completeAssessment(
        PTSD_ASSESSMENT.qst_score,
        PTSD_ASSESSMENT.ptsd_test_data,
        AUTH_DATA.signup_data,
      ),
    );
}
