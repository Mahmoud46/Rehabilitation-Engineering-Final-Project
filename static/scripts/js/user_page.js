let switch_imgs_list = ['./static/imgs/bgs/f1.jpeg', './static/imgs/bgs/f2.jpg', './static/imgs/bgs/f3.jpg', './static/imgs/bgs/f4.jpg'],
    switch_key_content = [
        "Mindfulness and Relaxation Exercises",
        "Educational Resources About PTSD",
        "Direct Links to Professional Help",
        "Symptom Tracking"
    ],
    switch_value_content = [
        "Target anxiety, stress, and depression symptoms, utilizing guided meditations, breathing techniques, and body scans to promote relaxation and mindfulness.",
        "Aim to inform and empower users by providing knowledge about the condition. These resources, often found in high-quality apps, typically include psychoeducational materials covering symptoms, causes, and treatments of PTSD.",
        "To facilitate access to professional care when needed",
        "To monitor progress and tailor the therapeutic approach, which can be beneficial for self-management and for sharing information with healthcare professionals."
    ], switch_index = 0,
    encouragement_messages = [
        "Embrace today with a gentle heart. Allow yourself to feel joy in small moments and find peace in the now.",
        "Today holds potential for happiness. Look for beauty in the ordinary and let it uplift your spirit.",
        "Give yourself permission to smile today. Every moment of joy is a victory worth celebrating.",
        "Today is a canvas; paint it with colors of joy and moments of gratitude.",
        "Let today be the day you embrace joy, no matter how small. Each happy moment is a pearl in the necklace of your life.",
        "Encourage yourself to find one thing that makes you smile today. It could be as simple as the warmth of the sun or the sound of laughter.",
        "Happiness is not the absence of problems, but the ability to deal with them. Celebrate your strength today.",
        "Take a moment to appreciate today for what it is, knowing that each day you have is a precious gift.",
        "Remember, happiness often sneaks in through a door you didn’t know you left open. Be open to the joys of today.",
        "Focus on today’s small joys and achievements. You deserve to feel proud and content, one moment at a time.",
        "Find strength in the knowledge that today is a new opportunity for happiness and peace.",
        "Let go of yesterday's struggles. Today offers a new start to embrace your journey with a smile.",
        "You have the power to make today beautiful. Allow yourself moments of joy.",
        "Every day is a step forward. Celebrate where you are right now, on this day.",
        "Believe in the good of today. Your attitude shapes your opportunities.",
        "Laugh, love, live - today is yours to enjoy. Take it all one moment at a time.",
        "Today, let yourself be led by your dreams, not your fears. Seek out things that make you happy.",
        "Embrace the joy of being alive today. Feel the hope that comes with the morning light.",
        "Make today matter by finding happiness in small gestures and simple pleasures.",
        "Smile at the world today and it will smile back. Positivity is a choice that enhances your well-being."
    ], encouragement_messages_switch_index = 0,
    page_num = 0, pages = [];

GetUserData(username);

document.querySelector('.user-menu-icon .user_data_title_menu button.user-icon-btn').addEventListener('click', e => {
    e.target.parentNode.querySelector('p').classList.toggle('active');
    document.querySelector('.user-menu-icon .user-menu').classList.toggle('active');
});

document.querySelector('.medical-report-info .cls-btn').addEventListener('click', e => e.target.parentNode.parentNode.classList.remove('active'));
document.getElementById('sh-med-repo').addEventListener('click', _ => document.querySelector('.medical-report-info').classList.add('active'));
document.getElementById('logout_btn').addEventListener('click', _ => GoToLandingPage());

// switching images and content in col-2
setInterval(_ => {
    document.querySelector('.user-hero .col-2 img').src = switch_imgs_list[switch_index];
    document.querySelector('.user-hero .col-2 .content h1').innerText = switch_key_content[switch_index];
    document.querySelector('.user-hero .col-2 .content p').innerText = switch_value_content[switch_index];
    document.querySelector('.user-hero .col-1 p.switch-quote').innerText = encouragement_messages[encouragement_messages_switch_index];
    switch_index++
    encouragement_messages_switch_index++
    if (switch_index == switch_imgs_list.length) switch_index = 0;
    if (encouragement_messages_switch_index == encouragement_messages.length) encouragement_messages_switch_index = 0;
}, 2000);

document.querySelector('.medical-report-info-cont-body button').addEventListener('click', e => {
    PrepareReportPage(document.querySelector('.medical-report-form.p1'));
});
document.querySelector('.medical-report-info-cont-body button').addEventListener('click', e => {
    PrepareReportPage(document.querySelector('.medical-report-form.p2'));
});

function GoToLandingPage() {
    let user_page_link = document.createElement('a');
    user_page_link.href = `${window.origin}`;
    user_page_link.click();
}

function GetUserData(username) {
    fetch(`${window.origin}/get_user_data`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ 'username': username }),
        cache: 'no-cache',
        headers: new Headers({
            'content-type': "application/json",
        }),
    }).then(response => {
        if (response.status !== 200) {
            console.log(`Response status was not 200: ${response.status}`);
            alert(`Response status was not 200: ${response.status}`);
            return;
        }
        response.json().then(data => {
            console.log(data);
            SpreadUserData(data['user_data']);
            return
        });
    });
}

function SpreadUserData(user_data) {
    let full_name = user_data['full_name'],
        asses_finds_cont = document.getElementById('patient-asses-find');
    document.getElementById('cur_fst_name').innerText = full_name.split(' ')[0];
    document.getElementById('name-fst-ltr').innerText = full_name.split('')[0];
    document.getElementById('cur_full_name').innerText = full_name;
    document.getElementById('cur_username').innerText = user_data["username"];
    document.getElementById('patient-name').innerText = full_name;
    document.getElementById('patient-age').innerText = user_data['age'];
    document.getElementById('patient-ptsd-test-date').innerText = ConvertDate(user_data['ptsd_test_date']);
    document.getElementById('patient-gender').innerText = user_data['gender'];
    asses_finds_cont.innerHTML = '';
    user_data['ptsd_test'].forEach(quest => {
        asses_finds_cont.innerHTML += ` <p><span>${quest.num}</span><span>${quest.qst}</span><span>${quest.ans}</span></p>`
    });
    document.getElementById('count-0').innerText = CountInList('Not at all', user_data['ptsd_test']);
    document.getElementById('count-1').innerText = CountInList('A little bit', user_data['ptsd_test']);
    document.getElementById('count-2').innerText = CountInList('Moderately', user_data['ptsd_test']);
    document.getElementById('count-3').innerText = CountInList('Quite a bit', user_data['ptsd_test']);
    document.getElementById('count-4').innerText = CountInList('Extremely', user_data['ptsd_test']);
    document.getElementById('patient-test-score').innerText = user_data['ptsd_score']
    document.getElementById('patient-test-ptsd-impact').innerText = user_data['ptsd_impact'];


    // report spreed
    document.getElementById('p-name').innerText = full_name;
    document.getElementById('p-age').innerText = user_data['age'];
    document.getElementById('p-gender').innerText = user_data['gender'];
    document.getElementById('p-assessment-date').innerText = ConvertDate(user_data['ptsd_test_date']);
    document.getElementById('p-impact').innerText = user_data['ptsd_impact'];
    document.getElementById('p-score').innerText = user_data['ptsd_score'];
    CreatePTSDReport(user_data["ptsd_test"]);
    document.getElementById('not-at-all').innerText = CountInList('Not at all', user_data['ptsd_test']);
    document.getElementById('a-little-bit').innerText = CountInList('A little bit', user_data['ptsd_test']);
    document.getElementById('moderately').innerText = CountInList('Moderately', user_data['ptsd_test']);
    document.getElementById('quite-a-bit').innerText = CountInList('Quite a bit', user_data['ptsd_test']);
    document.getElementById('extremely').innerText = CountInList('Extremely', user_data['ptsd_test']);

    document.getElementById('ptsd-score-dis').innerText = user_data['ptsd_score'];
    document.getElementById('ptsd-impact-dis').innerText = user_data['ptsd_impact'];
    document.getElementById('ptsd-name-dis').innerText = full_name;
}

function ConvertDate(dateStr) {
    // Create a new Date object from the input string
    const date = new Date(dateStr);

    // Options to control the output format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // Convert the Date object to a formatted string
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}

function CountInList(ans, qst_list) {
    let count = 0;
    qst_list.forEach(qst_list => qst_list.ans == ans ? count++ : null)
    return count
}

function CreatePTSDReport(data) {
    let question_body_p1 = document.querySelector('.p1 .questions-table-body'),
        question_body_p2 = document.querySelector('.p2 .questions-table-body');
    question_body_p1.innerHTML = '';
    question_body_p2.innerHTML = '';

    data.forEach(qst => {
        qst["num"] > 17 ? question_body_p2.innerHTML += CreateQuestionBody(qst["qst"], qst["num"], qst["ans"]) : question_body_p1.innerHTML += CreateQuestionBody(qst["qst"], qst["num"], qst["ans"]);
    })

}

function CreateQuestionBody(question_content, qest_num, ans) {

    return `<div class="question-body" id="q${qest_num}">
                <p class="question-content"><span class="material-symbols-outlined">
                        line_start_circle
                    </span><span>${question_content}</span></p>
                <div class="questions-response">
                    ${GetAnsweredOptions(ans)}
                </div>
            </div>`
}

function GetAnsweredOptions(ans) {
    ptsd_ops_nums = {
        'Not at all': '',
        'A little bit': '',
        'Moderately': '',
        'Quite a bit': '',
        'Extremely': ''
    }, opt_cont = '';
    for (let opt in ptsd_ops_nums) opt == ans ? ptsd_ops_nums[opt] = `<p class="selected"><span class="material-symbols-outlined">task_alt</span><span>${opt}</span></p>` : ptsd_ops_nums[opt] = `<p><span class="material-symbols-outlined">radio_button_unchecked</span><span>${opt}</span></p>`;
    for (let opt in ptsd_ops_nums) opt_cont += ptsd_ops_nums[opt];
    return opt_cont;
}

function PrepareReportPage(report_container) {

    html2canvas(report_container, {
        scale: 5, // Adjust scale to improve image quality
        logging: true, // Enable logging for debugging
        useCORS: true // Try capturing external images
    }).then(canvas => ReportPagesHandler(canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")));
}


function ReportPagesHandler(page) {
    pages.push(page);
    page_num++;
    console.log(pages)
    console.log(page_num);
    if (page_num > 1) { GetFullMedicalReportPDF(pages); return; }
}

function GetFullMedicalReportPDF(repo_pages) {
    pages = []; page_num = 0;
    let loader_pop = document.querySelector('.loader_pop')
    loader_pop.classList.add('active');
    fetch(`${window.origin}/combine_report_page`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ 'page_01': repo_pages[0], 'page_02': repo_pages[1] }),
        cache: 'no-cache',
        headers: new Headers({
            'content-type': "application/json",
        }),
    }).then(response => {
        if (response.status !== 200) {
            console.log(`Response status was not 200: ${response.status}`);
            alert(`Response status was not 200: ${response.status}`);
            loader_pop.classList.remove('active');
            return;
        }
        response.json().then(data => {
            loader_pop.classList.remove('active');
            console.log(data);

            let link = document.createElement('a');
            link.download = data['pdf_report'].split('/')[-1];
            link.href = data['pdf_report'];
            link.click();
            return;
        });
    });
}