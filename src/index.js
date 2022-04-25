import './style.css';

import './todoItem';
import todoItem from './todoItem';

const todo =  (() => {
    const todoList = [];
    const add = (todoItem) => {
        todoList.push(todoItem);
    };
    const render = () => {
        const todoContainer = document.getElementById('todo-container');
        todoList.forEach( (val, index) => {
            const todoItemDiv = document.createElement('div');
            todoItemDiv.className = 'todo-item';
            todoItemDiv.innerHTML = `<input type="checkbox" name="" id=""> ${todoList[index].title} <span>20/11/2023</span>`;
            todoContainer.appendChild(todoItemDiv);
        });
        const addTask = document.createElement('div');
        addTask.className = 'add-task';
        addTask.innerHTML = `<div class="add-task"><a href=""> &#43; Add Task </a></div>`;
        todoContainer.appendChild(addTask);
    }
    return {render, add}
})();
const todo1 = todoItem('Call Mom', 'this is sample', '1/1/2022','1','00');
const todo2 = todoItem('Get Groceries', 'this is sample', '1/1/2022','1','01');
const todo3 = todoItem('Pay Electricity Bill', 'this is sample', '1/1/2022','1','01');
const todo4 = todoItem('Get Dentist Appointment', 'this is sample', '1/1/2022','1','01');
todo.add(todo1);
todo.add(todo2);
todo.add(todo3);
todo.add(todo4);
todo.render();