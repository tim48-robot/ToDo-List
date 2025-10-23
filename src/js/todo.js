let counterId = 0;
export const allProject = [];
export class Project{
    constructor(name){
        this.name = name;
        this.todos = [];
        allProject.push(this);
    }
    
    addToDo(todo){
        this.todos.push(todo);
    }
}

export const templateProject = new Project("template");

export class ToDo{
    constructor(title, description, dueDate, priority, checkList=false, project=templateProject){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checkList = checkList;
        this.id = counterId;
        counterId++;
        localStorage.setItem("counterId", counterId);
        project.addToDo(this);
    }

    setPriority(priority){
        this.priority = priority;
    }

    setCheckList(){
        this.checkList = true;
    }
}

const testTodo = new ToDo("butuh dikerjakann", "CEPATTT", "15 Januari", "high");


