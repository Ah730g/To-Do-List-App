//Element Selectors
let input = document.querySelector("input[type='text']");
let button = document.querySelector("input[type='button']");
let tasksContainer = document.querySelector(".tasks");
let deleteAllButton = document.querySelector(".delete-all");
let completeAllButton = document.querySelector(".complete-all"); 
let taskNumberElement = document.querySelector(".task-number");
let completeTaskElement = document.querySelector(".complete-task");

let tasksArray = [];

//Start the app
getDataFromLocalStorage();
setDefaultData();

//Buttons Events
button.onclick = function() {
    addToArray(input.value);
    input.value = ""; 
}
deleteAllButton.onclick = function() {
    tasksContainer.innerHTML = "";
    tasksArray = [];
    window.localStorage.removeItem("tasks");
    setDefaultData();
}
completeAllButton.onclick = function() {
    if(tasksArray.length > 0)
    {
        document.querySelectorAll(".tasks .task").forEach(task => {
            task.classList.toggle("done");
            updateTask(task.dataset.id);
        })
    }
}

//Important Functions
function addToArray(taskText)
{
    task = {
        id : Date.now(),
        title : taskText,
        completed : false
    };
    tasksArray.push(task);
    addTaskToPage();
    addToLocalStorage();
    setDefaultData();

}
function addTaskToPage() 
{
    tasksContainer.innerHTML = "";
    for(let i = 0; i < tasksArray.length; i++)
    {
        let div = document.createElement("div");
        div.className = "task";
        div.dataset.id = tasksArray[i].id;
        div.appendChild(document.createTextNode(tasksArray[i].title));

        //if the task is completed 
        if(tasksArray[i].completed)
            div.className = "task done";

        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));

        div.appendChild(span);

        tasksContainer.appendChild(div);
    }
}
function addToLocalStorage()
{
    window.localStorage.setItem("tasks",JSON.stringify(tasksArray));
    setDefaultData();
}
function getDataFromLocalStorage() 
{
    let data = window.localStorage.getItem("tasks")
    if(data)
    {
        tasksArray = JSON.parse(data);
        addTaskToPage();
    }
    
}
document.addEventListener("click",e=>{
    if(e.target.classList.contains("task"))
    {
        e.target.classList.toggle("done");
        updateTask(e.target.dataset.id);
    }
    if(e.target.classList.contains("del"))
    {
        removeTask(e.target.parentElement.dataset.id);
        e.target.parentElement.remove();
    }
})
function updateTask(taskID)
{
    tasksArray.forEach(task => {
        if(task.id == taskID)
        {
            task.completed = (task.completed)? false : true;
            addToLocalStorage();
            return;
        }
    })
}
function removeTask(taskID)
{
    tasksArray = tasksArray.filter(task => task.id != taskID);
    addToLocalStorage();
}
function setDefaultData()
{
    taskNumberElement.innerHTML = tasksArray.length;
    completeTaskElement.innerHTML = tasksArray.filter(task => task.completed).length;
}