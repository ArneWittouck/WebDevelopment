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
    let wordList = ["vives", "stoel", "tafel", "hotel", "olijf", "jawel", "schip"];
    global.wordToFind = wordList[Math.floor(Math.random()*6)];
    console.log(global.wordToFind);

    let newGameButton = document.querySelector("#nieuw");
    newGameButton.setAttribute("class", "hidden");

    let inputField = document.querySelector("input");
    inputField.removeAttribute("disabled");
    inputField.focus();

    let goButton = document.querySelector("#go");
    goButton.removeAttribute("disabled");
    goButton.addEventListener("click", validateGok);
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
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    p2.setAttribute("style", "marginTop: 0");

    let wordDivs = document.querySelectorAll(".word");
    let numberOfTries = wordDivs.length;

    let winDate = new Date();
    let day = winDate.getDate();
    let monthNumber = winDate.getMonth();
    let months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    let month = months[monthNumber];
    let hours = winDate.getHours();
    let minutes = winDate.getMinutes();

    let momentOfWin = day + " " + month + " om " + hours + ":" + minutes;

    let highscoreString1 = global.currentPlayerName + ": " + numberOfTries + " gok(ken)";

    let highscoreTextNode1 = document.createTextNode(highscoreString1);

    let highscoreString2 = "[" + momentOfWin + "]";

    let highscoreTextNode2 = document.createTextNode(highscoreString2);

    list.appendChild(newListItem);
    p1.appendChild(highscoreTextNode1);
    p2.appendChild(highscoreTextNode2);
    newListItem.appendChild(p1);
    newListItem.appendChild(p2);

    newListItem.setAttribute("data-atlGokken", numberOfTries);

    sortHighscores();
}

const sortHighscores = () => {
    let listItems = document.querySelectorAll("li");
    let gokkenArray = [];
    let newListItemsOrder = [];
    for (let i = 0; i < listItems.length; i++) {
        gokkenArray.push(listItems[i].getAttribute("data-atlGokken"));
    }
    gokkenArray = gokkenArray.sort();
    for (let i = 0; i < listItems.length; i++) {
        for (let j = 0; j < gokkenArray.length; j++) {
            if (listItems[i].getAttribute("data-atlGokken") === gokkenArray[j]){
                newListItemsOrder.push(listItems[i]);
            }
        }
    }

    let ol = document.querySelector("ol");
}


window.addEventListener('load', setup);