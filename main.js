let TasksList = [
  { title: "Tarea 1", complete: false },
  { title: "Tarea 2", complete: false },
];

const $listView = document.querySelector(".ListView");
const $form = document.querySelector(".fromSubmit");
const $input = document.querySelector(".inputText");

let checking = false;
let indextask = null;

function getListTasks() {
  const data = TasksList.map(
    (el, index) => `
    <li class="listTask">
      <input type="checkbox"
        onclick="completeTask(${index})"
        ${el.complete ? "checked" : ""}>
      <span class="checkmark"></span>
      <a href="#" onclick="EditTask(${index})"
      class="${el.complete ? "complete" : ""}">
        ${el.title}
      </a>
      <button class="buttondDelete" onclick="deleteTask(${index})">x</button>
    </li>`
  ).join("");
  $listView.innerHTML = data;
}

getListTasks();

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  if ($input.value === "") {
    alert("el formulario esta vacio");
  } else {
    if (checking) {
      TasksList[indextask].title = $input.value;
      checking = false;
      indextask = null;
    } else {
      TasksList.push({ title: $input.value, complete: false });
    }
    $input.value = "";
  }
  getListTasks();
});

function deleteTask(index) {
  TasksList.splice(index, 1);
  getListTasks();
}

function EditTask(index) {
  const data = TasksList[index];
  $input.value = data.title;
  checking = true;
  indextask = index;
}

function completeTask(index) {
  if (TasksList[index].complete) {
    TasksList[index].complete = false;
  } else {
    TasksList[index].complete = true;
  }
  console.log(TasksList[index].complete);
  getListTasks();
}
