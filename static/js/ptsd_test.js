import { ptsd_quest } from "./constants.js";

let ptsd_test_pop = document.querySelector(".ptsd_test_pop"),
	st_eval_btn = ptsd_test_pop.querySelector(".st-btn"),
	opts_container = ptsd_test_pop.querySelector(".test-content ul"),
	qst_num = 1,
	qst_score = 0,
	ptsd_test_data = [];

AddTestDataToTest(qst_num, ptsd_quest[qst_num - 1]);
ptsd_test_pop.querySelector(".cls-btn").addEventListener("click", (_) => {
	ptsd_test_pop.classList.remove("active");
	qst_num = 1;
	qst_score = 0;
	ptsd_test_data = [];
	st_eval_btn.classList.remove("active");
	console.log(qst_num, qst_score);
	AddTestDataToTest(qst_num, ptsd_quest[qst_num - 1]);
});

opts_container.querySelectorAll("li").forEach((ops) => {
	ops.addEventListener("click", (_) => {
		qst_score += parseInt(ops.getAttribute("score"));
		ptsd_test_data.push({
			num: qst_num,
			qst: ptsd_quest[qst_num - 1],
			ans: ops.querySelector("span.op").innerText,
			score: parseInt(ops.getAttribute("score")),
		});
		qst_num++;
		if (qst_num > 22) {
			st_eval_btn.classList.add("active");
			opts_container.classList.remove("active");
			return;
		}
		AddTestDataToTest(qst_num, ptsd_quest[qst_num - 1]);
	});
});

ptsd_test_pop
	.querySelector(".st-btn")
	.addEventListener("click", (_) => UpdateRegUserPTSDImpact(qst_score));

function AddTestDataToTest(qst_num, ptsd_qst) {
	opts_container.classList.contains("active")
		? null
		: opts_container.classList.add("active");
	ptsd_test_pop.querySelector(".q-num").innerText = qst_num;
	ptsd_test_pop.querySelector(".test-content p").innerText = ptsd_qst;
}

function EvaluateSeveretiyPTSD(ptsd_score) {
	let ptsd_impact = "";

	if (ptsd_score <= 10) ptsd_impact = "Minimal";
	else if (ptsd_score <= 30)
		(ptsd_score - 11) / (30 - 11) >= 0.5
			? (ptsd_impact = "Moderate")
			: (ptsd_impact = "Low");
	else if (ptsd_score <= 50)
		(ptsd_score - 31) / (50 - 31) >= 0.5
			? (ptsd_impact = "High")
			: (ptsd_impact = "Moderate");
	else
		(ptsd_score - 51) / (88 - 51) >= 0.5
			? (ptsd_impact = "Severe")
			: (ptsd_impact = "High");
	return ptsd_impact;
}

function UpdateRegUserPTSDImpact(ptsd_score) {
	reg_user_data.ptsd_score = ptsd_score;
	reg_user_data.ptsd_impact = EvaluateSeveretiyPTSD(ptsd_score);
	reg_user_data.ptsd_test = ptsd_test_data;
	reg_user_data.ptsd_test_date = new Date().toISOString().substring(0, 10);
	ptsd_test_pop.classList.remove("active");
	SendUserDataToServer(reg_user_data, stat, reg_stat);
}
