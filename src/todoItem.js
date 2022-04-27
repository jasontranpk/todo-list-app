function todoItem(title, description, dueDate, priority, done, removed){
    const todoItem = {};
    todoItem.title = title;
    todoItem.description = description;
    todoItem.dueDate = dueDate;
    todoItem.priority = priority;
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