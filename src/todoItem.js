function todoItem(title, description, dueDate, priority, progress){
    const todoItem = {};
    todoItem.title = title;
    todoItem.description = description;
    todoItem.dueDate = dueDate;
    todoItem.priority = priority;
    todoItem.progress = progress;
    return todoItem;
}
export default todoItem;