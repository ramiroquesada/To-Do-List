const {v4:uuid} = require('uuid')

export default class todos{

    
    constructor(title, dueDate, priority/* project*/){
        this.id = uuid();
        this.title = title;        
        this.dueDate = dueDate;
        this.priority = priority;
        //this.project = project;
        this.completed = false;
    }


    //GETTERS

    getId = () => this.id;

    getTitle = ()=> this.title;    

    getDueDate = ()=>  this.dueDate;

    getPriority = () => this.priority;

    getCompleted = ()=> this.completed;

    //SETTERS



    setTitle = (newTitle)=> this.title = newTitle;    

    setDueDate = (newDueDate) => this.dueDate = newDueDate;

    setPriority = (newPriority) => this.priority = newPriority;

    setCompleted = (newCompleted) => this.completed = newCompleted;

    //setProject = (newProject) => this.project = newProject;




}


