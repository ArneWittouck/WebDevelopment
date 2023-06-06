let global = {
    hiddenTasks : []
}

const setup = () => {
    let addDiv = document.querySelector(".plusDiv");
    addDiv.addEventListener("click", convertToForm);

    let wisButton = document.querySelector("#wisAlleTaken");
    wisButton.addEventListener("click", wisAlleTaken);

    let sortButton = document.querySelector("#sorteer");
    sortButton.addEventListener("click", sortByDate);

    let hideButton = document.querySelector("#hidePast");
    hideButton.addEventListener("click", hideOrShow);
}

const convertToForm = () => {
    let forms = document.querySelectorAll("form");
    if (forms.length === 0) {
        let addDiv = document.querySelectorAll(".taskContainer > div")[0];
        addDiv.setAttribute("class", "noPlusDiv");

        // <form method="get">
        let form = document.createElement("form");
        form.setAttribute("method", "get");
        addDiv.appendChild(form);

        // <label for="txtVoornaam">Voornaam</label>
        // <input type="text" id="txtVoornaam"/>
        let label1 = document.createElement("label");
        label1.setAttribute("for", "txtTask");
        let label1Text = document.createTextNode("Task:");
        label1.appendChild(label1Text);
        form.appendChild(label1);
        let input1 = document.createElement("input");
        input1.setAttribute("type", "text");
        input1.setAttribute("id", "txtTask");
        input1.setAttribute("autofocus", "");
        form.appendChild(input1);

        let label2 = document.createElement("label");
        label2.setAttribute("for", "dateTask");
        let label2Text = document.createTextNode("Date:");
        label2.appendChild(label2Text);
        form.appendChild(label2);
        let input2 = document.createElement("input");
        input2.setAttribute("type", "date");
        input2.setAttribute("id", "dateTask");
        form.appendChild(input2);

        let label3 = document.createElement("label");
        label3.setAttribute("for", "txtDescription");
        let label3Text = document.createTextNode("Description:");
        label3.appendChild(label3Text);
        form.appendChild(label3);
        let input3 = document.createElement("textarea");
        input3.setAttribute("id", "txtDescription");
        input3.setAttribute("class", "description");
        input3.setAttribute("max", "description");
        form.appendChild(input3);

        let saveButton = document.createElement("button");
        let saveButtonText = document.createTextNode("save");
        saveButton.setAttribute("class", "saveButton");
        saveButton.appendChild(saveButtonText);
        addDiv.appendChild(saveButton);

        saveButton.addEventListener("click", saveTask);
    }
}

const saveTask = (event) => {
    event.stopPropagation();
    let newTask = document.createElement("div");
    newTask.setAttribute("class", "task");
    let taskContainer = document.querySelector(".taskContainer");
    taskContainer.appendChild(newTask);

    let taskName = document.querySelector("#txtTask").value;
    let taskDate = document.querySelector("#dateTask").value;
    let taskDescription = document.querySelector("#txtDescription").value;

    newTask.setAttribute("data-date", taskDate);

    let taskTitle = document.createElement("h2");
    let taskTitleTextNode = document.createTextNode(taskName);
    taskTitle.appendChild(taskTitleTextNode);
    newTask.appendChild(taskTitle);

    let taskDescriptionP = document.createElement("p");
    let taskDescriptionTextNode = document.createTextNode(taskDescription);
    taskDescriptionP.appendChild(taskDescriptionTextNode);
    newTask.appendChild(taskDescriptionP);

    let taskDateP = document.createElement("p");
    let taskDateTextNode = document.createTextNode(taskDate);
    taskDateP.appendChild(taskDateTextNode);
    newTask.appendChild(taskDateP);

    let doneButton = document.createElement("button");
    let doneButtonText = document.createTextNode("Done");
    doneButton.appendChild(doneButtonText);
    doneButton.addEventListener("click", doneFunction);
    newTask.appendChild(doneButton);

    restorePlusDiv();
}

const restorePlusDiv = () => {
    let addDiv = document.querySelector(".noPlusDiv");
    let form = document.querySelector("form");
    let saveButton = document.querySelector(".saveButton");
    addDiv.removeChild(form);
    addDiv.removeChild(saveButton);
    addDiv.setAttribute("class", "plusDiv");
}

const doneFunction = (event) => {
    let task = event.target.parentElement;
    event.stopPropagation();
    let taskClass = task.getAttribute("class");

    if (taskClass.includes("done")) {
        taskClass = taskClass.replace("done", "");
        task.setAttribute("class", taskClass);
    } else {
        task.setAttribute("class", taskClass + " done");
    }
}

const wisAlleTaken = () => {
    let alleTaken = document.querySelectorAll(".task");
    for (let i = 0; i < alleTaken.length; i++) {
        alleTaken[i].remove();
    }
}

const sortByDate = () => {
    let alleTaken = document.querySelectorAll(".task");
    let listOfAllDates = [];
    let sortedTasks = [];
    for (let i = 0; i < alleTaken.length; i++) {
        listOfAllDates.push(alleTaken[i].getAttribute("data-date"));
    }
    listOfAllDates = listOfAllDates.sort();

    for (let i = 0; i < listOfAllDates.length; i++) {
        for (let j = 0; j < alleTaken.length; j++) {
            if (alleTaken[j].getAttribute("data-date") === listOfAllDates[i]) {
                sortedTasks.push(alleTaken[j]);
            }
        }
    }

    wisAlleTaken();

    let taskContainer = document.querySelector(".taskContainer");
    for (let i = 0; i < sortedTasks.length; i++) {
        taskContainer.appendChild(sortedTasks[i]);
    }
}

const hideOrShow = () => {
    if (global.hiddenTasks.length === 0) {
        hidePastTasks();
        console.log("It works");
    } else {
        showPastTasks();
        console.log("somethings wrong");
    }
}

const hidePastTasks = () => {
    let alleTaken = document.querySelectorAll(".task");
    let now = new Date();
    let listOfAllDates = [];
    for (let i = 0; i < alleTaken.length; i++) {
        listOfAllDates.push(alleTaken[i].getAttribute("data-date"));
        let taskDate = new Date(listOfAllDates[i]);
        if (taskDate.getTime() < now.getTime()) {
            global.hiddenTasks.push(alleTaken[i]);
            alleTaken[i].remove();
        }
    }
}

const showPastTasks = () => {
    let taskContainer = document.querySelector(".taskContainer");
    for (let i = 0; i < global.hiddenTasks.length; i++) {
        taskContainer.appendChild(global.hiddenTasks[i]);
    }

    global.hiddenTasks = [];

    console.log(global.hiddenTasks);
}




window.addEventListener("load", setup);