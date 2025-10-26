import { ToDo, Project, allProject} from "./todo.js";
let templateProject;
import "../styles.css";
const button = document.querySelector("#createnew");
const modal = document.querySelector("#idModal");
const form = modal.querySelector("form#todoForm");
const closeButton = modal.querySelector("#closeModal");


function renderProject(){
    if ((localStorage.getItem("allProject")) === null){}
    else{
        deleteAll();
        allProject.length = 0;
        const data = JSON.parse(localStorage.getItem("allProject"));
        data.forEach(projData => {
            const project = new Project(projData.name);
            projData.todos.forEach(todo => {
             const instance = new ToDo(todo.title, todo.description, todo.dueDate, todo.priority, todo.checkList, project);
             instance.id = todo.id;
            });
        });
    }

    if (allProject.length > 0) {
        templateProject = allProject.find(project => project.name === "template") || allProject[0];
    } else {
        templateProject = new Project("template");
    }

    for (let i=0; i<allProject.length; i++){
        let project = allProject[i];

        for (let j=0; j<project.todos.length; j++){
            addToDom(project.todos[j]);
        }
    }
}

function addToDom(objectToDo){
   const todo = document.createElement("div");
   todo.classList.add("todo");

   const title = document.createElement("h3");
   const description = document.createElement("span");
   const duedate = document.createElement("p");
   const priority = document.createElement("p");
   const checklist =  document.createElement("input");
   checklist.type = "checkbox";
   checklist.checked = objectToDo.checkList;
   checklist.id = objectToDo.id;

   const label = document.createElement("label");
   label.htmlFor = objectToDo.id;
   label.textContent = objectToDo.title;

   description.textContent = objectToDo.description;
   duedate.textContent = objectToDo.dueDate;
   priority.textContent = `Priority: ${objectToDo.priority}`;

   todo.appendChild(checklist);
   todo.appendChild(label);
   todo.appendChild(title);
   todo.appendChild(description);
   todo.appendChild(duedate);
   todo.appendChild(priority);


   const tempatTodo = document.querySelector("#semuatodo");
   tempatTodo.appendChild(todo);

    checklist.addEventListener("click", () => {
        objectToDo.checkList = checklist.checked;
        console.log(objectToDo.checkList);
        console.log(allProject);
        localStorage.setItem("allProject", JSON.stringify(allProject));
    })

}

function deleteAll(){
    const tempatTodo = document.querySelector("#semuatodo");
    tempatTodo.innerHTML = "";
}

function showModal(){
    modal.classList.add("show");
}


button.addEventListener("click", showModal);
closeButton.addEventListener("click", () => {
    modal.classList.remove("show");
})

modal.addEventListener("click", (e)=> {
    if (e.target === modal){
        modal.classList.remove("show");
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = form.querySelector("input[name=title]").value;
    const description = form.querySelector("textarea[name=description]").value;
    const duedate = form.querySelector("input[name=duedate]").value;
    const priority = form.querySelector("select[name=priority]").value;
    const newTodo = new ToDo(title, description, duedate, priority, false, templateProject);
    console.log(allProject)
    console.log(newTodo)
    localStorage.setItem("allProject", JSON.stringify(allProject));
    addToDom(newTodo);
    modal.classList.remove("show");
    form.reset();
})

renderProject()