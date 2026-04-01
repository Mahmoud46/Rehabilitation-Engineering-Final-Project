export const PTSD_ASSESSMENT = {
  questions: [
    "Any reminder brought back feelings about the event/s",
    "I had trouble staying asleep",
    "Other things kept making me think about it",
    "I felt irritable and angry",
    "I avoided letting myself get upset when I thought about it or was reminded of it",
    "I thought about the event when I didn't mean to",
    "I felt as if the event hadn't happened or it wasn't real",
    "I have stayed away from reminders about the situation",
    "Images and pictures of the event pop into my mind",
    "I have been jumpy and easily startled",
    "I have tried not to think about the situation",
    "I am aware I have a lot of feelings about what happened but I haven’t dealt with them",
    "I feel quite 'numb' about the situation",
    "I have found myself acting/feeling like I am back at the time of the event",
    "I have had trouble falling asleep",
    "I experience waves of strong feelings about the situation",
    "I have tried to remove the situation from my memory",
    "I have trouble concentrating on things I am supposed to do",
    "Reminders of the event cause me to have physical reactions such as sweating, palpitations, panic attacks",
    "I have dreams about the situation",
    "I feel on-guard and struggle to relax",
    "I try not to talk about the situation",
  ],
  answers_scores: [
    { "Not at all": 0 },
    { "A little bit": 1 },
    { Moderately: 2 },
    { "Quite a bit": 3 },
    { Extremely: 4 },
  ],

  qst_num: 1,
  qst_score: 0,
  ptsd_test_data: [],
};

export const PTSD_ASSESSMENT_UI = {
  ptsd_test_pop: document.querySelector(".ptsd_test_pop"),
  st_eval_btn: document.querySelector(".ptsd_test_pop .st-btn"),
  opts_container: document.querySelector(".ptsd_test_pop .test-content ul"),
};
