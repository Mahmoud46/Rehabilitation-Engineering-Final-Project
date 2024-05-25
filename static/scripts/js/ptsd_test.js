let ptsd_test_pop = document.querySelector('.ptsd_test_pop'),
    st_eval_btn = ptsd_test_pop.querySelector('.st-btn'),
    opts_container = ptsd_test_pop.querySelector('.test-content ul');
let ptsd_quest = [
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
    "I try not to talk about the situation"
],
    ptsd_ops_scores = [
        { 'Not at all': 0 },
        { 'A little bit': 1 },
        { 'Moderately': 2 },
        { 'Quite a bit': 3 },
        { 'Extremely': 4 },
    ], qst_num = 1, qst_score = 0, ptsd_test_data = [];


AddTestDataToTest(qst_num, ptsd_quest[qst_num - 1]);
ptsd_test_pop.querySelector('.cls-btn').addEventListener('click', _ => {
    ptsd_test_pop.classList.remove('active');
    qst_num = 1; qst_score = 0
    ptsd_test_data = []
    st_eval_btn.classList.remove('active');
    console.log(qst_num, qst_score)
    AddTestDataToTest(qst_num, ptsd_quest[qst_num - 1])
});

opts_container.querySelectorAll('li').forEach(ops => {
    ops.addEventListener('click', _ => {
        qst_score += parseInt(ops.getAttribute('score'));
        ptsd_test_data.push({ "num": qst_num, "qst": ptsd_quest[qst_num - 1], "ans": ops.querySelector('span.op').innerText, "score": parseInt(ops.getAttribute('score')) })
        qst_num++;
        if (qst_num > 22) {
            st_eval_btn.classList.add('active');
            opts_container.classList.remove('active');
            return;
        };
        AddTestDataToTest(qst_num, ptsd_quest[qst_num - 1])
    });
});

ptsd_test_pop.querySelector('.st-btn').addEventListener('click', _ => UpdateRegUserPTSDImpact(qst_score));

function AddTestDataToTest(qst_num, ptsd_qst) {
    opts_container.classList.contains('active') ? null : opts_container.classList.add('active');
    ptsd_test_pop.querySelector('.q-num').innerText = qst_num;
    ptsd_test_pop.querySelector('.test-content p').innerText = ptsd_qst;
}

function EvaluateSeveretiyPTSD(ptsd_score) {
    let ptsd_impact = '';

    if (ptsd_score <= 10) ptsd_impact = 'Minimal';
    else if (ptsd_score <= 30) (ptsd_score - 11) / (30 - 11) >= 0.5 ? ptsd_impact = 'Moderate' : ptsd_impact = 'Low';
    else if (ptsd_score <= 50) (ptsd_score - 31) / (50 - 31) >= 0.5 ? ptsd_impact = 'High' : ptsd_impact = 'Moderate';
    else (ptsd_score - 51) / (88 - 51) >= 0.5 ? ptsd_impact = 'Severe' : ptsd_impact = 'High';
    return ptsd_impact;
}

function UpdateRegUserPTSDImpact(ptsd_score) {
    reg_user_data.ptsd_score = ptsd_score;
    reg_user_data.ptsd_impact = EvaluateSeveretiyPTSD(ptsd_score);
    reg_user_data.ptsd_test = ptsd_test_data;
    reg_user_data.ptsd_test_date = new Date().toISOString().substring(0, 10);;
    ptsd_test_pop.classList.remove('active');
    SendUserDataToServer(reg_user_data, stat, reg_stat);
}