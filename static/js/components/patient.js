export function renderAssessment(assessment_date, assessment_questions) {
  let assessment_page_01 = document.querySelector(".p1 .questions-table-body"),
    assessment_page_02 = document.querySelector(".p2 .questions-table-body");

  assessment_page_01.innerHTML = "";
  assessment_page_02.innerHTML = "";

  document.getElementById("p-assessment-date").innerText = assessment_date;

  assessment_questions.forEach((question) =>
    question.ordinal_position > 17
      ? (assessment_page_02.innerHTML += renderQuestion(question))
      : (assessment_page_01.innerHTML += renderQuestion(question)),
  );

  // Severity count
  document.getElementById("not-at-all").innerText = countInObjectList(
    "Not at all",
    assessment_questions,
  );
  document.getElementById("a-little-bit").innerText = countInObjectList(
    "A little bit",
    assessment_questions,
  );
  document.getElementById("moderately").innerText = countInObjectList(
    "Moderately",
    assessment_questions,
  );
  document.getElementById("quite-a-bit").innerText = countInObjectList(
    "Quite a bit",
    assessment_questions,
  );
  document.getElementById("extremely").innerText = countInObjectList(
    "Extremely",
    assessment_questions,
  );
}

function renderQuestion(question) {
  return `<div class="question-body" id="q${question.ordinal_position}">
                <p class="question-content"><span class="material-symbols-outlined">
                        line_start_circle
                    </span><span>${question.content}</span></p>
                <div class="questions-response">
                    ${renderAnswers(question.answer)}
                </div>
            </div>`;
}

function renderAnswers(answer) {
  let ptsd_ops_nums = {
      "Not at all": "",
      "A little bit": "",
      Moderately: "",
      "Quite a bit": "",
      Extremely: "",
    },
    opt_cont = "";
  for (let opt in ptsd_ops_nums)
    opt == answer
      ? (ptsd_ops_nums[opt] =
          `<p class="selected"><span class="material-symbols-outlined">task_alt</span><span>${opt}</span></p>`)
      : (ptsd_ops_nums[opt] =
          `<p><span class="material-symbols-outlined">radio_button_unchecked</span><span>${opt}</span></p>`);
  for (let opt in ptsd_ops_nums) opt_cont += ptsd_ops_nums[opt];
  return opt_cont;
}

function countInObjectList(answer, questions) {
  let count = 0;
  questions.forEach((question) => (question.answer == answer ? count++ : null));
  return count;
}
