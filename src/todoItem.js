import {isDate} from 'date-fns';

function todoItem(title, description, dueDate, project, done, removed){
    const todoItem = {};
    todoItem.title = title;
    todoItem.description = description;
    todoItem.dueDate = new Date(dueDate);
    
    todoItem.project = project;
    todoItem.removed = removed;
    if(done){
        todoItem.done = done;
    }else
        todoItem.done = false;
    if(removed){
        todoItem.removed = false;
    }
    else 
        todoItem.removed = true;
    
    return todoItem;
}
export default todoItem;