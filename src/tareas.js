export default class todos{

    
    constructor(title, description, dueDate, priority ){
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }


    //GETTERS

    getId = () => this.id;

    getTitle = ()=> this.title;

    getDescription = ()=> this.description;

    getDueDate = ()=>  this.dueDate;

    getPriority = () => this.priority;

    //SETTERS

    setTitle = (newTitle)=> this.title = newTitle;

    setDescription = (newDescription) => this.description = newDescription;

    setDueDate = (newDueDate) => this.dueDate = newDueDate;

    setPriority = (newPriority) => this.priority = newPriority;


}


