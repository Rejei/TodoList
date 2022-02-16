const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const notCompletedList = document.querySelector(".notCompletedList");
const completedList = document.querySelector(".completedList")
const deleteAllBtn = document.querySelector(".footer button");

let todoList;
!localStorage.Todo ? todoList = [] : todoList = JSON.parse(localStorage.getItem('Todo'))

function Todo(description){
    this.description = description;
    this.isCompleted = false;
}

inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value;
    !!userEnteredValue.trim() ?
        addBtn.classList.add("active") : //активируем кнопку "плюс"
        addBtn.classList.remove("active"); //деактивируем кнопку "плюс"
}

function showTasks(){
    const notCompletedList = document.querySelector(".notCompletedList");
    const completedList = document.querySelector(".completedList");
    const notCompletedTasksCounter = document.querySelector(".notCompletedTasksCounter");
    const completedTasksCounter = document.querySelector(".completedTasksCounter");
    const tasksCounter = document.querySelector(".tasksCounter");
    let notCompleteLiTag = '-';
    let completeLiTag = '-';
    let finished = 0;
    tasksCounter.innerHTML = 0;
    notCompletedTasksCounter.innerHTML = 0;
    completedTasksCounter.innerHTML = 0;

    todoList.length > 0 ?
        deleteAllBtn.classList.add("active") ://активируем кнопку "удалить все"
        deleteAllBtn.classList.remove("active"); //деактивируем кнопку "удалить все"

    todoList.forEach((element, index) => {
        if(!element.isCompleted){
            let newLi =`<li>${element.description}
                    <div class="buttons">
                    <span class="icon completed" onclick="completeTask(${index})"><i class="fas fa-check"></i></span>
                    <span class="icon deleted" onclick="deleteTask(${index})"><i class="fas fa-trash"></i>
                    </div>
            </span></li>`
            notCompleteLiTag === '-' ? notCompleteLiTag = newLi : notCompleteLiTag += newLi
        } else {
            finished++;
            let newLi = `<li>${element.description}
                <div class="buttons">
                <span class="icon deleted" onclick="deleteTask(${index})"><i class="fas fa-trash"></i>
                </div>
            </span></li>`
            completeLiTag === '-' ? completeLiTag = newLi : completeLiTag += newLi
        };
    });
    notCompletedList.innerHTML = notCompleteLiTag; //добавляем созданный li в список
    completedList.innerHTML = completeLiTag; //добавляем созданный li в список
    notCompletedTasksCounter.innerHTML = todoList.length - finished; //присваиваем значение счетчику "выполняемых заданий"
    completedTasksCounter.innerHTML = finished; //присваиваем значение счетчику "выполненных заданий"
    tasksCounter.innerHTML = todoList.length //присваиваем значение счетчику "всего заданий"
    inputBox.value = ""; //зачистка поля ввода
}

showTasks();

addBtn.onclick = () => { //добавление нового активного задания
    let userEnteredValue = inputBox.value; //значение поля input присваиваем переменнной
    todoList.push(new Todo(userEnteredValue)); //пушим новое значение в список
    localStorage.setItem("Todo", JSON.stringify(todoList)); //преобразуем js объект в строку JSON и изменяем содержимое локального хранилища
    showTasks();
    addBtn.classList.remove("active"); //как только задание добавлено деактивируем кнопку "плюс"
}

function deleteTask(index){
    todoList.splice(index, 1);
    localStorage.setItem("Todo", JSON.stringify(todoList));
    showTasks();
}

function completeTask(index){
    todoList[index].isCompleted = true;
    localStorage.setItem("Todo", JSON.stringify(todoList));
    showTasks();
}

deleteAllBtn.onclick = () => {
    todoList = [];
    localStorage.setItem("Todo", JSON.stringify(todoList));
    showTasks();
}