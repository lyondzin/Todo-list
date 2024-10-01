let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 

const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; 
        updateTasksList();
        updateStats();
        saveTasksToLocalStorage(); 
    }
};


const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasksToLocalStorage(); 
};


const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasksToLocalStorage(); 
};


const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1); 
    updateTasksList();
    updateStats();
    saveTasksToLocalStorage(); 
};


const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100 || 0;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;
};

const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onChange="toggleTaskComplete(${index})"/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <span onClick="editTask(${index})" class="edit-text">Edit</span>
                <span onClick="deleteTask(${index})" class="delete-text">Delete</span>
            </div>
        </div>
    `;
    

        taskList.append(listItem);
    });
};


document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});


document.addEventListener('DOMContentLoaded', () => {
    updateTasksList();
    updateStats(); 
});
