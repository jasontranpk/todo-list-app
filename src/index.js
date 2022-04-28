import './style.css';
import todoItem from './todoItem';
import project from './project';
import {format, isSameDay, isSameWeek, addDays} from 'date-fns'

const today = new Date();

const todo =  (() => {
    const todoList = [];
    const _todoContainer = document.getElementById('todo-container');
    const add = (todoItem) => {
        todoList.push(todoItem);
    };
    const render = (opt) => {
        _todoContainer.innerHTML = '';
        if(opt == 'inbox'){
            todoList.forEach( (val, index) => {
                if(val.done == false && val.removed == true){
                    renderTask(opt, val, index);
                }
            });
            createDelBtn();
        } else if(opt == 'today'){
            todoList.forEach( (val, index) => {
                if(val.done == false && val.removed == true && isSameDay(today, val.dueDate)){
                    renderTask(opt, val, index);
                }
            });
        } else if(opt == 'thisWeek'){
            todoList.forEach( (val, index) => {
                if(val.done == false && val.removed == true && isSameWeek(today, val.dueDate)){
                    renderTask(opt, val, index);
                }
            });
        }else{

        }
        createAddBtn();
    }   
    const renderTask = (opt, task, index) => {
        const todoItemDiv = document.createElement('div');
        todoItemDiv.className = 'todo-item';

        const doneCheckbox = document.createElement('input');
        doneCheckbox.type = 'checkbox';

        const taskNameSpan = document.createElement('span');
        taskNameSpan.textContent = task.title;
        taskNameSpan.className = 'task-name';

        const dueDateSpan = document.createElement('span');
        dueDateSpan.textContent = format(task.dueDate, 'MM/dd/yyyy');
        dueDateSpan.className = 'due-date';

        const xBtn = document.createElement('a');
        xBtn.innerHTML = '&#10006;';
        xBtn.className = 'delete-btn';

        todoItemDiv.appendChild(doneCheckbox);
        todoItemDiv.appendChild(taskNameSpan);
        todoItemDiv.appendChild(dueDateSpan);
        todoItemDiv.appendChild(xBtn);

        _todoContainer.appendChild(todoItemDiv);

        //Click on task name to edit
        taskNameSpan.addEventListener('click', () => {
            let tempName = taskNameSpan.textContent;
            taskNameSpan.textContent = '';
            const taskNameInput = document.createElement('input');
            taskNameInput.className = 'task-name-input';
            taskNameSpan.appendChild(taskNameInput);
            taskNameInput.focus();
            taskNameInput.value = tempName; 
            taskNameInput.addEventListener('keypress', (e) => {
                if(e.key == 'Enter'){
                    todoList[index].title = taskNameInput.value; 
                    render(opt);
                }
            } )
        })

        dueDateSpan.addEventListener('click', () => {
            let tempDate = dueDateSpan.textContent;
            dueDateSpan.textContent = '';
            const dueDateInput = document.createElement('input');
            dueDateInput.className = 'due-date-input';
            dueDateSpan.appendChild(dueDateInput);
            dueDateInput.focus();
            dueDateInput.value = tempDate; 
            dueDateInput.addEventListener('keypress', (e) => {
                if(e.key == 'Enter'){
                    todoList[index].dueDate = dueDateInput.value; 
                    render(opt);
                }
            } )
        })
    }
    const createDelBtn = () => {
        let delBtns = document.getElementsByClassName('delete-btn');
        delBtns = Array.from(delBtns);
        //console.log(delBtn);
        delBtns.forEach((val , index) =>{
            val.addEventListener('click', (e) => {
                e.preventDefault();
                todoList.splice(index, 1);
                console.log(index);
                render('inbox');
            })
        })
    }
    const createAddBtn = () => {
        const todoContainer = document.getElementById('todo-container');
        const addTask = document.createElement('div');
        addTask.innerHTML = `<div class="add-task"><a id="add-task-btn" href=""> &#43; Add Task </a></div>`; 
        todoContainer.appendChild(addTask);
        const addTaskBtn = document.getElementById('add-task-btn');
        addTaskBtn.addEventListener('click', e => {
            e.preventDefault();
            // e.target.classList.add('hide');
            // const addInput =  document.createElement('input');
            // addInput.classList = 'add-input show';
            // addInput.type = "text";
            // todoContainer.appendChild(addInput);
            addTaskBtn.innerHTML = '';

            const addTaskWrapper = document.createElement('div');
            addTaskWrapper.className = 'add-task-wrapper';
            addTaskBtn.appendChild(addTaskWrapper);

            const taskNameInput = document.createElement('input');
            taskNameInput.type = 'text';
            taskNameInput.className = 'text-input';

            addTaskWrapper.appendChild(taskNameInput);
            taskNameInput.focus();
            const acceptBtn = document.createElement('button');
            acceptBtn.textContent = 'Add';
            acceptBtn.className = 'btn';
            addTaskWrapper.appendChild(acceptBtn);

            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'btn';
            cancelBtn.textContent = 'Cancel';
            addTaskWrapper.appendChild(cancelBtn);
            cancelBtn.addEventListener('click', (e) => {
                render('inbox');
            })
            acceptBtn.addEventListener('click', (e) => {
                const todoTemp = todoItem(taskNameInput.value)
                todo.add(todoTemp);
                //console.log(todoList);
                render('inbox');
            })

        })
        
    }
    return {render, add}
})();
const projects = (()=> {

    const projectList = [];
    const add = (project) => {
        projectList.push(project);
    }
    const render = () =>{
        const projectContainer = document.getElementById('project-list');
        projectList.forEach( (val) => {
            const project = document.createElement('div');
            project.innerHTML = `<li class="sb-url"><a href="">${val.name}</a></li>`;
            projectContainer.appendChild(project);
        });

    }
    return {add, render}
})();


const todo1 = todoItem('Call Mom', 'this is sample', '1/1/2022',1, false);
const todo2 = todoItem('Get Groceries', 'this is sample', today,1, false);
const todo3 = todoItem('Pay Electricity Bill', 'this is sample', '1/1/2022',1, false);
const todo4 = todoItem('Get Dentist Appointment', 'this is sample', addDays(today,2),2, false);


todo.add(todo1);
todo.add(todo2);
todo.add(todo3);
todo.add(todo4);


const project1 = project('New Brands');
project1.add(todo3);
console.log(project1);
const project2 = project('Website Update');
const project3 = project('Product Roadmap');

projects.add(project1);
projects.add(project2);
projects.add(project3);

todo.render('inbox');
projects.render();

const inboxNav = document.getElementById('inbox-nav');
const todayNav = document.getElementById('today-nav');
const thisWeekNav = document.getElementById('thisWeek-nav');

inboxNav.addEventListener('click',(e) => {
    e.preventDefault();
    todo.render('inbox')
})
todayNav.addEventListener('click',(e) => {
    e.preventDefault();
    todo.render('today')
})
thisWeekNav.addEventListener('click',(e) => {
    e.preventDefault();
    todo.render('thisWeek')
})