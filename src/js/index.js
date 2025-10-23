import { ToDo, templateProject, Project, allProject} from "./todo.js";
import "../styles.css";

(function renderProject(){
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

    for (let i=0; i<allProject.length; i++){
        let project = allProject[i];

        for (let j=0; j<project.todos.length; j++){
            addToDom(project.todos[j]);
        }
    }
}())

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
