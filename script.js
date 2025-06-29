const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitList = document.getElementById("habit-list");

// Load saved habits
window.onload = function () {
  const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
  savedHabits.forEach((habit) => {
    addHabit(habit.text, habit.completed);
  });
};

habitForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const habit = habitInput.value.trim();
  if (habit !== "") {
    addHabit(habit, false);
    saveHabit(habit, false);
    habitInput.value = "";
  }
});

function addHabit(habitText, isCompleted) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;

  const span = document.createElement("span");
  span.textContent = habitText;
  if (isCompleted) span.style.textDecoration = "line-through";

  checkbox.addEventListener("change", () => {
    span.style.textDecoration = checkbox.checked ? "line-through" : "none";
    updateHabit(habitText, checkbox.checked);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeHabit(habitText);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  habitList.appendChild(li);
}

function saveHabit(habitText, isCompleted) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.push({ text: habitText, completed: isCompleted });
  localStorage.setItem("habits", JSON.stringify(habits));
}

function removeHabit(habitText) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits = habits.filter((h) => h.text !== habitText);
  localStorage.setItem("habits", JSON.stringify(habits));
}

function updateHabit(habitText, newStatus) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits = habits.map((h) =>
    h.text === habitText ? { ...h, completed: newStatus } : h
  );
  localStorage.setItem("habits", JSON.stringify(habits));
}