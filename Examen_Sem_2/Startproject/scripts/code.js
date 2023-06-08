let global = {
    wordToFind : "",
    currentPlayerName: ""
}

const setup = () => {
    let inputField = document.querySelector("input");
    let goButton = document.querySelector("#go");
    inputField.setAttribute("disabled", "true");
    goButton.setAttribute("disabled", "true");

    let nieuwSpelButton = document.querySelector("#nieuw");
    nieuwSpelButton.addEventListener("click", askName);

    if (localStorage.getItem("highscores") !== null) {
        loadFromLocalStorage();
    }

    let clearButton = document.querySelector("#clear");
    clearButton.addEventListener("click", clearHighscores);
}

const askName = () => {
    let wordDivs = document.querySelectorAll(".word");
    for (let i = 0; i < wordDivs.length; i++) {
        wordDivs[i].remove();
    }

    let currentPlayerName = window.prompt("Naam speler: ");
    if (currentPlayerName !== null) {
        startGame();
        global.currentPlayerName = currentPlayerName;
    }
}

const startGame = () => {
    let wordList = ["vives", "stoel", "tafel", "hotel", "olijf", "jawel", "schip", "KAMER", "LEEUW", "PASEN" ,
        "POLEN" ,"SCHOT" ,"STIER" ,"AARDE" ,"ACTIE" ,"AGENT" ,"AKKER" ,"ANDER" ,"ANKER" ,"ARENA" ,"ATOOM" ,
        "BAARD" ,"BADEN" ,"BEELD" ,"BEIGE" ,"BEKER" ,"BETON"];

    global.wordToFind = wordList[Math.floor(Math.random()*27)];
    console.log(global.wordToFind);

    let newGameButton = document.querySelector("#nieuw");
    newGameButton.setAttribute("class", "hidden");

    let inputField = document.querySelector("input");
    inputField.removeAttribute("disabled");
    inputField.focus();
    inputField.addEventListener("keypress", checkIfEnter);

    let goButton = document.querySelector("#go");
    goButton.removeAttribute("disabled");
    goButton.addEventListener("click", validateGok);
}

const checkIfEnter = (event) => {
    if (event.key === "Enter") {
        validateGok()
    }
}

const validateGok = () => {
    let inputField = document.querySelector("input");
    let inputValue = inputField.value;
    if (inputValue.length === 5) {
        saveGokToGokken();
    }
}

const saveGokToGokken = () => {
    let inputField = document.querySelector("input");
    let inputValue = inputField.value.toUpperCase();

    let wordDiv = document.createElement("div");
    wordDiv.setAttribute("class", "word");

    for (let i = 0; i < inputValue.length; i++) {
        let letter = inputValue.slice(i,(i)+1);
        let letterTextNode = document.createTextNode(letter);
        let letterDiv = document.createElement("div");
        letterDiv.appendChild(letterTextNode);
        wordDiv.appendChild(letterDiv);
    }

    let gokkenDiv = document.querySelector("#gokken");
    gokkenDiv.appendChild(wordDiv);

    inputField.value = "";
    inputField.focus();

    colorLettersOfNewWord();
}

const colorLettersOfNewWord = () => {
    let wordDivs = document.querySelectorAll(".word");
    let wordDiv = wordDivs[wordDivs.length-1];
    let letterDivs = wordDiv.children;
    global.wordToFind = global.wordToFind.toUpperCase();
    let lettersArray = []

    for (let i = 0; i < letterDivs.length; i++) {
        lettersArray.push(letterDivs[i].firstChild.nodeValue);
    }

    for (let i = 0; i < lettersArray.length; i++) {
        if (lettersArray[i] === global.wordToFind[i]) {
            letterDivs[i].setAttribute("class", "juist");
        } else if (global.wordToFind.includes(lettersArray[i])) {
            letterDivs[i].setAttribute("class", "bevat");
        } else {
            letterDivs[i].setAttribute("class", "fout");
        }
    }
    checkIfWon();
}

const checkIfWon = () => {
    let wordDivs = document.querySelectorAll(".word");
    let wordDiv = wordDivs[wordDivs.length-1];
    let letterDivs = wordDiv.children;
    let allLettersGreen = true;

    for (let i = 0; i < letterDivs.length; i++) {
        if (letterDivs[i].getAttribute("class") !== "juist") {
            allLettersGreen = false;
        }
    }

    if (allLettersGreen) {
        resetGame();
        prepHighscores();
        savePlayerToHighscores();
    }
}

const resetGame = () => {
    let inputField = document.querySelector("input");
    let goButton = document.querySelector("#go");
    inputField.setAttribute("disabled", "true");
    goButton.setAttribute("disabled", "true");

    let newGameButton = document.querySelector("#nieuw");
    newGameButton.removeAttribute("class");
}

const prepHighscores = () => {
    let highscoresDiv = document.querySelector("#highscores");

    let listItems = document.querySelectorAll("li");
    let lists = document.querySelectorAll("ol");
    if (listItems.length === 0 && lists.length === 0) {
        let newList = document.createElement("ol");
        highscoresDiv.appendChild(newList);
    }
}

const savePlayerToHighscores = () => {
    let list = document.querySelector("ol");
    let newListItem = document.createElement("li");

    let wordDivs = document.querySelectorAll(".word");
    let numberOfTries = wordDivs.length;

    let winDate = new Date();
    let day = winDate.getDate();
    let monthNumber = winDate.getMonth();
    let months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober",
        "November", "December"];
    let month = months[monthNumber];
    let hours = winDate.getHours();
    let minutes = winDate.getMinutes();

    let momentOfWin = day + " " + month + " om " + hours + ":" + minutes;

    let highscoreString = global.currentPlayerName + ": " + numberOfTries + " gok(ken)" + '\n' + "[" + momentOfWin + "]";
    console.log(highscoreString);

    let highscoreTextNode = document.createTextNode(highscoreString);

    newListItem.setAttribute("data-string", highscoreString);

    list.appendChild(newListItem);
    newListItem.appendChild(highscoreTextNode);

    newListItem.setAttribute("data-atlGokken", numberOfTries + "");

    sortHighscores();
}

const sortHighscores = () => {
    let listItems = document.querySelectorAll("li");
    let gokkenArray = [];
    let newListItemsOrder = [];
    for (let i = 0; i < listItems.length; i++) {
        gokkenArray.push(listItems[i].getAttribute("data-atlGokken"))
    }
    gokkenArray = gokkenArray.sort();
    for (let i = 0; i < listItems.length; i++) {
        for (let j = 0; j < gokkenArray.length; j++) {
            if (gokkenArray[i] === listItems[j].getAttribute("data-atlGokken")){
                newListItemsOrder.push(listItems[j]);
            }
        }
    }

    for (let i = 0; i < listItems.length; i++) {
        listItems[i].remove();
    }
    let ol = document.querySelector("ol");

    for (let i = 0; i < newListItemsOrder.length; i++) {
        ol.appendChild(newListItemsOrder[i]);
    }

    saveToLocalStorage();
}

const saveToLocalStorage = () => {
    let highscores = document.querySelectorAll("li");
    let arrayToSave = [];
    for (let i = 0; i < highscores.length; i++) {
        let dataString = highscores[i].getAttribute("data-string");
        arrayToSave.push(dataString);
    }

    let stringToSave = JSON.stringify(arrayToSave);

    localStorage.setItem("highscores", stringToSave);
}

const loadFromLocalStorage = () => {
    let historyString = localStorage.getItem("highscores");
    let historyArray = JSON.parse(historyString);

    prepHighscores();

    let list = document.querySelector("ol");

    for (let i = 0; i < historyArray.length; i++) {
        let newListItem = document.createElement("li");
        let highscoreTextNode = document.createTextNode(historyArray[i]);
        newListItem.appendChild(highscoreTextNode);

        let numberOfTriesLocation = historyArray[i].indexOf(": ")+2;
        let numberOfTries = historyArray[i].slice(numberOfTriesLocation, (numberOfTriesLocation+1));
        newListItem.setAttribute("data-atlGokken", numberOfTries);
        newListItem.setAttribute("data-string", historyArray[i]);

        list.appendChild(newListItem);
    }
}

const clearHighscores = () => {
    let highscores = document.querySelectorAll("li");
    for (let i = 0; i < highscores.length; i++) {
        highscores[i].remove();
    }
    localStorage.clear();
}


window.addEventListener('load', setup);