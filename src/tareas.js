export const {v4:uuid} = require('uuid')

export default class Todos{

    
    constructor(title, dueDate, priority){
        this.id = uuid();
        this.title = title;        
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = "Ninguna";
        this.completed = false;
    }


}

