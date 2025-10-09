import { ToDo, templateProject, Project, allProject} from "./todo.js";

(function renderProject(){
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

   const title = document.createElement("p");
   const description = document.createElement("span");
   const duedate = document.createElement("p");
   const priority = document.createElement("p");
   const checklist =  document.createElement("input");
   checklist.type = "checkbox";
   checklist.checked = objectToDo.checklist;
   checklist.id = objectToDo.id;

   const label = document.createElement("label");
   label.htmlFor = objectToDo.id;
   label.textContent = "Done";

   title.textContent = objectToDo.title;
   description.textContent = objectToDo.description;
   duedate.textContent = objectToDo.dueDate;
   priority.textContent = `Priority: ${objectToDo.priority}`;

   todo.appendChild(title);
   todo.appendChild(description);
   todo.appendChild(duedate);
   todo.appendChild(priority);
   todo.appendChild(checklist);
   todo.appendChild(label);

   const tempatTodo = document.querySelector("#semuatodo");
   tempatTodo.appendChild(todo);
}