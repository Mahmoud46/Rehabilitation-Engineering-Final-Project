let features_pop = document.querySelector('.f-pop'),
    lrn_btns = document.querySelectorAll('.f button'),
    cls_btns = document.querySelectorAll('.pop .cls-btn'),
    contact_pop = document.querySelector('.cont-pop'),
    login_pop = document.querySelector('.login-pop'),
    reg_pop = document.querySelector('.reg-pop'),
    sbmt_data_btns = document.querySelectorAll('.submit-data-btn');

let content = {
    "Mindfulness and Relaxation Exercises": "Target anxiety, stress, and depression symptoms, utilizing guided meditations, breathing techniques, and body scans to promote relaxation and mindfulness.",
    "Educational Resources About PTSD": "Aim to inform and empower users by providing knowledge about the condition. These resources, often found in high-quality apps, typically include psychoeducational materials covering symptoms, causes, and treatments of PTSD.",
    "Direct Links to Professional Help": "To facilitate access to professional care when needed",
    "Symptom Tracking": "To monitor progress and tailor the therapeutic approach. which can be beneficial for self-management and for sharing information with healthcare professionals."
},
    login_user_data = { email: '', password: '' },
    reg_user_data = { full_name: '', email: '', password: '', gender: '', birth_date: '', ptsd_score: 0, ptsd_impact: '', ptsd_test: [], ptsd_test_date: '' },
    stat = '', reg_stat = 'pri_stage';


document.querySelector('.sub-mail-btns .mail').addEventListener('click', _ => contact_pop.classList.add('active'));
document.querySelector('.frg-psrd button').addEventListener('click', e => e.preventDefault())
document.querySelector('.menu .login-btn').addEventListener('click', _ => { login_pop.classList.add('active'); stat = 'login' });
document.querySelector('.menu .reg-btn').addEventListener('click', _ => { reg_pop.classList.add('active'), stat = 'reg' });
document.querySelector('.sub-mail-btns .sub-btn').addEventListener('click', _ => { reg_pop.classList.add('active'), stat = 'reg' });

lrn_btns.forEach(btn => btn.addEventListener('click', e => ActivateFeaturePopWindow(e.target.parentNode.querySelector('img').src, e.target.parentNode.querySelector('h3').innerText)));
cls_btns.forEach(btn => btn.addEventListener('click', e => e.target.parentNode.parentNode.classList.remove('active')))


sbmt_data_btns.forEach(btn => btn.addEventListener('click', e => {
    stat == 'login' ? UserLogin(e) : UserPreRegister(e);
}));

function ActivateFeaturePopWindow(img_url, f_title) {
    features_pop.querySelector('img').src = img_url;
    features_pop.querySelector('h1').innerText = f_title;
    features_pop.querySelector('p').innerText = content[f_title];

    features_pop.classList.add('active');
}

function UserLogin(e) {
    login_user_data.email = document.getElementById('login-user-mail').value;
    login_user_data.password = document.getElementById('login-user-password').value, 5;
    if (ValidateEmail(login_user_data.email) && login_user_data.password) {
        e.preventDefault();
        SendUserDataToServer(login_user_data, stat, reg_stat);
        console.log(login_user_data);
    }
}

function UserPreRegister(e) {
    reg_user_data.full_name = document.getElementById('reg-full-name').value;
    reg_user_data.email = document.getElementById('reg-user-mail').value;
    reg_user_data.password = document.getElementById('reg-user-password').value;
    reg_user_data.birth_date = document.getElementById('reg-user-bd').value;
    reg_user_data.gender = document.getElementById('reg-user-gender').value;
    if (reg_user_data.full_name && ValidateEmail(reg_user_data.email) && reg_user_data.password && reg_user_data.birth_date && reg_user_data.birth_date && reg_user_data.gender) {
        e.preventDefault();
        SendUserDataToServer(reg_user_data, stat, reg_stat);
    }
}

function ValidateEmail(email_address) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_address);
}
function GoToUserPage(username) {
    let user_page_link = document.createElement('a');
    user_page_link.href = `${window.origin}/${username}`;
    user_page_link.click();
}

function SendUserDataToServer(user_data, stat, reg_stat) {
    let loader_pop = document.querySelector('.loader_pop')
    loader_pop.classList.add('active');
    fetch(`${window.origin}/user_sign`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ 'user_date': user_data, 'sign_stat': stat, 'reg_stat': reg_stat }),
        cache: 'no-cache',
        headers: new Headers({
            'content-type': "application/json",
        }),
    }).then(response => {
        if (response.status !== 200) {
            console.log(`Response status was not 200: ${response.status}`);
            alert(`Some thing went wrong, There is a problem in you data used in ${stat == 'login' ? "login" : "registration"}`);
            loader_pop.classList.remove('active');
            return;
        }
        response.json().then(data => {
            loader_pop.classList.remove('active');
            if (stat == "login") {
                if (data['login_valid']) GoToUserPage(data['username']);
                else alert("Problem With loging in, Please try again later");
            } else {
                if (reg_stat == 'pri_stage' && data['reg_valid'] && !data["user_reg"]) {
                    document.querySelector('.ptsd_test_pop').classList.add('active');
                    reg_stat = 'sec_stage';
                }
                else if (data["user_reg"])
                    GoToUserPage(data['username']);
                else alert("There is a problem with regestration, Please try again later.");
            }

            console.log(data);
            return;
        });
    });
}