"use strict";

//Functions to get element/elements

function selectElement(selector) {
    return document.querySelector(selector);
}
function selectElements(selector) {
    return document.querySelectorAll(selector);
}

//Add task input functional

selectElement("#task-title").addEventListener("keypress", e => {
    if (e.keyCode == 13) addTask();
});

selectElement("#add-task").onclick = addTask;

//Open/close Table

selectElement(".open-creator").onclick = openCreator;
selectElement("#cancel").onclick = openCreator;

function openCreator() {
    const table = selectElement(".create-table");
    table.classList.toggle("active");
}

//Functions to create task and check if value is correct

function addTask() {
    const isEmpty = selectElement(".creator-inner span");
    const title = selectElement("#task-title");

    //Check if input is empty
    if (title.value == "") {
        isEmpty.classList.add("active");
        return false;
    }
    createTask(title.value);
    isEmpty.classList.remove("active");
    title.value = "";
}

function createTask(val = "Task") {
    const mainCon = selectElement(".main-container");
    let task = document.createElement("div");
    task.className = "task";
    task.innerHTML = `<h2>${val}</h2><div class="goals-container">
    <input type="text" name="add-goal" class="add-goal"></div><button class="close-task">&times;</button>`;
    mainCon.append(task);

    addCloseEvents();
    addDropToContainer();
    addGoal();
}

//Function to add close functional to task

function addCloseEvents() {
    const closeTask = selectElements(".close-task");
    for (const close of closeTask) {
        close.onclick = function () {
            this.parentElement.remove();
        }
    }
}

//Functions to create golas 

function addGoal() {
    const addInput = selectElements(".add-goal");
    addInput.forEach(add => {
        add.onkeypress = function (e) {
            if (e.keyCode == 13 && this.value != "") {
                createGoal(this.value, this, false);
            }
        }
    });
}

function createGoal(val, obj, i = false) {
    let goal = document.createElement("div");
    goal.className = "goal";
    goal.setAttribute("draggable", true);
    goal.textContent = val;
    goal.addEventListener("dragstart", dragDrop.dragStart);
    goal.addEventListener("dragend", dragDrop.dragEnd);
    if (i) {
        if (obj.check) goal.classList.add("active");
        selectElements(".task")[i].querySelector(".goals-container").append(goal);
    }
    else {
        obj.parentElement.append(goal);
    }

    obj.value = "";
    checkGoal();
    //addDropToContainer();
}

//Function to mark compleate goals

function checkGoal() {
    const goal = selectElements(".goal");
    goal.forEach(g => {
        g.onclick = function () {
            this.classList.toggle("active");
        }
    });
}

//Function to add drag and drop events to goals

function addDropToContainer() {
    const goalContainer = selectElements(".goals-container");
    for (const goal of goalContainer) {
        goal.addEventListener("dragover", dragDrop.dragOver);
        goal.addEventListener("drop", dragDrop.drop);
    }
}

//Drag and Drop metods

let dragDrop = {

    dragStart() {
        setTimeout(() => this.classList.add("hide"), 4);
    },

    dragEnd() {
        setTimeout(() => this.classList.remove("hide"), 4);
    },

    dragOver(e) {
        e.preventDefault();
        this.classList.add("active");
    },

    dragEnter() {
        this.classList.add("active");
    },

    dragLeave() {
        this.classList.remove("active");
    },

    drop() {
        const dragOnEl = selectElement(".hide");
        this.append(dragOnEl);
    },

    basketDrop() {
        const dragOnEl = selectElement(".hide");
        dragOnEl.remove();
        this.classList.remove("active");
    }
};

//Add drag and drop events to basket

(() => {
    const basket = selectElement(".basket");
    basket.addEventListener("dragover", dragDrop.dragOver);
    basket.addEventListener("drop", dragDrop.basketDrop);
    basket.addEventListener("dragenter", dragDrop.dragEnter);
    basket.addEventListener("dragleave", dragDrop.dragLeave);
})();

//If user is logIn

if (flag) {
    //Set or update user data in database
    selectElement("#save").onclick = () => {
        let data = new FormData;
        data.append("data", getAllTasks());
        console.log(data);
        sendData(data);
    }
    //Get data and create tasks and goals
    document.addEventListener("DOMContentLoaded", async () => {
        console.log("i");
        let data;
        await getData().then(res => data = JSON.parse(res));
        data.forEach((task, index) => {
            createTask(task.val);
            for (let goal of task.obj) {
                createGoal(goal.val, goal, String(index));
            }
        });
    });
}

function sendData(data) {
    return new Promise(async (resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("load", e => {
            if (xhr.status === 200) {
                const popSuccess = selectElement(".data-save");
                popSuccess.classList.add("active");
                setTimeout(() => popSuccess.classList.remove("active"), 1500);
            }
            else {
                const popError = selectElement(".data-save-error");
                popError.classList.add("active");
                setTimeout(() => popError.classList.remove("active"), 1500);
            }
        });
        xhr.addEventListener("error", e => {
            const popError = selectElement(".data-save-error");
            popError.classList.add("active");
            setTimeout(() => popError.classList.remove("active"), 1500);
        });
        await xhr.open("POST", "send.php", true);
        await xhr.send(data);
    });
}

function getData() {
    return new Promise(async (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        selectElement(".loading").classList.add("active");
        xhr.addEventListener("load", e => {
            resolve(xhr.responseText);
            selectElement(".loading").classList.remove("active");
        });
        xhr.addEventListener("error", e => {
            throw new Error(xhr.statusText);
        });
        await xhr.open("POST", "get.php", true);
        await xhr.send();
    });
}

//Function to pack all tasks into JSON

function getAllTasks() {
    const tasks = selectElements(".task");
    let result = [];

    tasks.forEach(item => {
        let goal = item.querySelectorAll(".goal");
        let taskObj = new Task(item.querySelector("h2").innerHTML);
        for (let g of goal) {
            let check = g.classList.contains("active") ? true : false;
            taskObj.obj.push({ val: g.innerHTML, check: check });
        }
        result.push(taskObj);
    });
    return JSON.stringify(result);
}

//Show/hide modal window

(() => {
    try {
        selectElement("#register").onclick = () => {
            selectElement(".register-modal").classList.add("active");
        }
        selectElement("#log-in").onclick = () => {
            selectElement(".login-modal").classList.add("active");
        };

        selectElement(".login-modal").addEventListener("click", closeModal);
        selectElement(".register-modal").addEventListener("click", closeModal);
    }
    catch { console.log("Error"); }
})();

function closeModal(e) {
    if (e.target.classList.contains("modal")) {
        this.classList.remove("active");
        clearError();
    }
}

function clearError() {
    let error = selectElements(".reg-error");
    error.forEach(item => {
        item.textContent = "";
    });
}

//Check if data in register form is correct

selectElement("#register-form").addEventListener("submit", function (e) {
    let user = selectElement("#reg-nickname").value;
    let mail = selectElement("#reg-mail").value;
    let pass = selectElement("#reg-password").value;
    let repeat = selectElement("#reg-repeat").value;
    let error = selectElements(".reg-error");
    let errorsArr = ["", "", "", ""];

    if (user == "") {
        e.preventDefault();
        errorsArr[0] = "Wpisz nick";
    }
    if (mail == "") {
        e.preventDefault();
        errorsArr[1] = "Sprawdź email";
    };
    if (pass.length < 6) {
        e.preventDefault();
        errorsArr[2] = "Hasło jest za krótkie";
    }
    if (pass != repeat || pass == "") {
        e.preventDefault();
        errorsArr[3] = "Hasła są różne";
    }

    for (let i = 0; i < error.length; i++) {
        error[i].textContent = errorsArr[i];
    }
});

//Check if data in login form is correct

selectElement("#login-form").addEventListener("submit", function (e) {
    let mail = selectElement("#log-mail").value;
    let pass = selectElement("#log-password").value;

    if (mail == "") {
        e.preventDefault();
        selectElement(".log-error").textContent = "Mial albo hasło jest błędny!";
    };
    if (pass.length < 6) {
        e.preventDefault();
        selectElement(".log-error").textContent = "Mial albo hasło jest błędny!";
    }
});

//If login is failed

(function logInError() {
    try {
        let logModal = selectElement(".login-modal");
        if (error) {
            logModal.classList.add("active");
            selectElement(".log-error").textContent = error;
        }
        if (cLogError) {
            logModal.classList.add("active");
            selectElement("#c-log-error").textContent = cLogError;
        }
    }
    catch {
        console.log("error");
    }
})();

//If register is failed

(function registerError() {
    const regModal = selectElement(".register-modal");
    try {
        if (regError) {
            regModal.classList.add("active");
            selectElements(".reg-error")[1].textContent = regError;
        }
        if (cRegError) {
            regModal.classList.add("active");
            selectElement("#c-reg-error").textContent = cRegError;
        }
    }
    catch {
        console.log("error");
    }
})();

//Cookie close

selectElement("#close-cookie").onclick = () => {
    selectElement(".cookie-warning").classList.remove("active");
}