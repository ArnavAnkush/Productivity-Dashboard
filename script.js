function openPages() {
  const cards = document.querySelectorAll(".elem");

  const fullPage = document.querySelectorAll(".fullelem");

  const backBtn = document.querySelectorAll(".fullelem .back");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      fullPage[card.id].style.display = "block";
    });
  });

  backBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullPage[back.id].style.display = "none";
    });
  });
}

openPages();

const form = document.querySelector(".addtask form");
const taskInput = document.querySelector(".addtask form #task-input");
const taskDetailsInput = document.querySelector(".addtask form textarea");
const taskCheckbox = document.querySelector(".addtask form #check");

function todoList() {
  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("task list is empty");
  }

  function renderTask() {
    const allTask = document.querySelector(".alltask");

    let sum = " ";

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
              <details>
                  <summary>
                  <h5>
      ${elem.task}
      <span class='${elem.imp}'>imp</span>
    </h5>
  </summary>

  <p class="task-details">${elem.details}</p>
</details>

<button id = ${idx}>Completed</button>
            </div>`;
    });

    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();
    taskCheckbox.checked = false;
    taskInput.value = " ";
    taskDetailsInput.value = " ";
  });
}
todoList();

function dailyPlanner() {
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  const resetBtn = document.querySelector(".daily-planner-fullpage .reset");

  let dayPlanner = document.querySelector(".day-planner");

  let hours = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  let wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    let savedData = dayPlanData[idx] || "";

    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
            <p>${elem}</p>
            <input id = ${idx} type="text" placeholder="..." value = ${savedData} >
    </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  let dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });

  resetBtn.addEventListener("click", function () {
    if (!confirm("Reset your entire daily planner?")) return;

    localStorage.removeItem("dayPlanData");
    document
      .querySelectorAll(".day-planner input")
      .forEach((i) => (i.value = ""));
  });
}
dailyPlanner();
