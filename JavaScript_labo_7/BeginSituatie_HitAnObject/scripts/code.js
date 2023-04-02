let global = {
    score : 0,
    gameEnded : false,
    timer : 0
}


const setup = () => {
    let startButton = document.querySelector('#startButton');
    startButton.addEventListener("click", startGame);
}

const startGame = (event) => {
    event.target.remove();
    randomObjectInvoegen();
}

const randomObjectInvoegen = () => {
    let field = document.querySelector("#playField");
    let object = document.createElement("img");
    let randomImageWaarde = Math.floor(Math.random()*5);
    object.setAttribute("src", "images/" + randomImageWaarde + ".png");
    object.setAttribute("alt", "targetObject");
    object.setAttribute("id", "target");
    object.setAttribute("style", "top: " + Math.floor(Math.random()*450) + "px; left: "
        + Math.floor(Math.random()*750) + "px");
    object.addEventListener("click", clickedTarget);
    field.appendChild(object);
    if (randomImageWaarde === 0) {
        global.timer = setTimeout(randomObjectVerwijderen, 3000);
    } else {
        global.timer = setTimeout(randomObjectVerwijderen, 1000);
    }
    console.log(global.timer);
}

const randomObjectVerwijderen = () => {
    let object = document.querySelector("#target");
    object.remove();
    clearTimeout(global.timer);
    randomObjectInvoegen();
}

const clickedTarget = (event) => {
    if (event.target.getAttribute("src") !== "images/0.png"){
        global.score = global.score + 1;
        randomObjectVerwijderen()
        let pElement = document.querySelector("#score");
        let pElementChild = pElement.firstChild;
        pElementChild.remove();
        let scoreText = document.createTextNode("Aantal hits: " + global.score);
        pElement.appendChild(scoreText);
    } else {
        if (!global.gameEnded) {
            endGame();
        }
    }
}

const endGame = () => {
    let gameOver = document.createElement("p");
    let gameOverText = document.createTextNode("GAME OVER");
    gameOver.appendChild(gameOverText);
    gameOver.setAttribute("id", "gameOver");
    let field = document.querySelector("#playField");
    field.appendChild(gameOver);
    clearTimeout(global.timer);
    global.gameEnded = true;
}

window.addEventListener("load", setup);


