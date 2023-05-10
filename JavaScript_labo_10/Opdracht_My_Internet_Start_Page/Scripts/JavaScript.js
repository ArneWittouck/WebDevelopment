const setup = () => {
    let bigButton = document.querySelector("#bigButton");
    bigButton.addEventListener("click", validate);

    let clearHistoryButton = document.querySelector("#clearHistory");
    clearHistoryButton.addEventListener("click", clearSearchHistory);

    let inputField = document.querySelector("#input");
    inputField.addEventListener("keypress", checkIfEnter);

    restoreSavedItems();
}

const checkIfEnter = (event) => {
    if (event.key === "Enter") {
        validate();
    }
}

const validate = () => {
    let validCommand = false;
    let validPrefix = false;

    let input = document.querySelector("#input").value;
    let char = input.slice(0, 3).toLowerCase();

    if (char.slice(0,1) === "/" && char.slice(2,3) === " ") {
        validCommand = true;
    }

    if(char === "/y " || char === "/g " || char === "/i " || char === "/t ") {
        validPrefix = true;
    }

    if (validCommand && validPrefix) {
        search();
    } else if (!validCommand) {
        alert("Invalid command")
    } else {
        alert("Unknown command prefix")
    }
}

const search = () => {
    let inputField = document.querySelector("#input");
    let input = inputField.value;
    let char = input.slice(1, 2).toLowerCase();
    let searchValue = input.slice(3, input.length);
    let url = "";

    if (char === "g") {
        url = "https://www.google.com/search?q=" + searchValue;
    } else if (char === "y") {
        url = "https://www.youtube.com/results?search_query=" + searchValue;
    } else if (char === "t") {
        url = "https://www.twitter.com/" + searchValue;
    } else if (char === "i") {
        url = "https://www.instagram.com/" + searchValue + "/";
    }

    let buttons = document.querySelectorAll("div > button");
    let isNewValue = true;

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute("about") === input) {
            isNewValue = false;
        }
    }

    if (isNewValue) {
        saveToHistory();
    }

    inputField.value = null;

    window.open(url);
}

const saveToHistory = () => {
    let savedDivs = document.querySelectorAll("div.col-md-3");
    let rows = document.querySelectorAll("div.row");
    let history = document.querySelector(".container-fluid");

    let inputField = document.querySelector("#input");
    let input = inputField.value;
    let char = input.slice(1, 2);
    let searchValue = input.slice(3, input.length);

    if (char === "g") {
        char = "Google";
    } else if (char === "y") {
        char = "Youtube";
    } else if (char === "t") {
        char = "Twitter";
    } else if (char === "i") {
        char = "Instagram";
    }

    let outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "col-md-3 " + char.toLowerCase() + " m-3");

    let h3Title = document.createElement("h3");
    let h3TextNode = document.createTextNode(char);
    h3Title.appendChild(h3TextNode);
    outerDiv.appendChild(h3Title);

    let pSearchValue = document.createElement("p");
    let pTextNode = document.createTextNode(searchValue);
    pSearchValue.appendChild(pTextNode);
    outerDiv.appendChild(pSearchValue);

    let goButton = document.createElement("button");
    let goText = document.createTextNode("Go!");
    goButton.setAttribute("about", input);
    goButton.appendChild(goText);
    outerDiv.appendChild(goButton);

    if (rows.length === 0 || ((savedDivs.length % 3) === 0)) {
        let newRow = document.createElement("div");
        newRow.setAttribute("class", "row");
        history.appendChild(newRow);
        newRow.appendChild(outerDiv);
    } else {
        rows[rows.length-1].appendChild(outerDiv);
    }
    addButtonEventListeners();
    saveToLocalStorage();
    inputField.value = null;
}

const addButtonEventListeners = () => {
    let buttons = document.querySelectorAll("div > button")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", loadFromHistory);
    }
}

const loadFromHistory = (event) => {
    let searchBar = document.querySelector("#input");

    let button = event.target;

    searchBar.value = button.getAttribute("about");

    search();
}

const saveToLocalStorage = () => {
    localStorage.clear();

    let savedDivs = document.querySelectorAll("div > button");
    console.log(savedDivs);
    let arrayToSave = [];

    for (let i = 0; i < savedDivs.length; i++) {
        let about = savedDivs[i].getAttribute("about");
        console.log(about);
        arrayToSave.push(about);
    }

    console.log(arrayToSave);

    let StringArrayToSave = JSON.stringify(arrayToSave);
    localStorage.setItem("History", StringArrayToSave);
}

const restoreSavedItems = () => {
    let StringItemArray = localStorage.getItem("History");
    let itemsArray = JSON.parse(StringItemArray);

    let searchBar = document.querySelector("#input");

    for (let i = 0; i < itemsArray.length; i++) {
        searchBar.value = itemsArray[i];
        saveToHistory();
    }
}

const clearSearchHistory = () => {
    let sure = window.confirm("Weet je het zeker?");
    if (sure) {
        localStorage.clear();
        let savedDivs = document.querySelectorAll("div > button");
        for (let i = 0; i < savedDivs.length; i++) {
            savedDivs[i].remove();
        }

        let rows = document.querySelectorAll("div.row");
        for (let i = 0; i < rows.length; i++) {
            rows[i].remove();
        }
    }
}

window.addEventListener('load', setup);