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

   get getId(){return this.id};

   get getTitle(){return this.title};    

   get getDueDate(){return this.dueDate};

   get getPriority(){return this.priority};

   get getCompleted(){return this.completed};

    //SETTERS



   set setTitle(newTitle){ this.title = newTitle};    

   set setDueDate(newDueDate){ this.dueDate = newDueDate};

   set setPriority(newPriority){this.priority = newPriority};

   set setCompleted(newCompleted){this.completed = newCompleted};

    //setProject = (newProject) => this.project = newProject;




}

