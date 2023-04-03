let global = {
    VOLGORDE_KAARTEN : [],
    kaart_1 : null,
    kaart_2 : null,
    timeout : 0
}

const startGame = () => {
    let teGebruikenKaarten = ["kaart1", "kaart2", "kaart3", "kaart4", "kaart5", "kaart6", "kaart1", "kaart2",
        "kaart3", "kaart4", "kaart5", "kaart6"];
    let random = 0;
    let aantalGebruikteKaarten = 0;
    let i = 0;
    while (aantalGebruikteKaarten < 12) {
        random = Math.floor(Math.random()*12);
        if (teGebruikenKaarten[random] !== "gebruikt"){
            global.VOLGORDE_KAARTEN[i] = teGebruikenKaarten[random];
            i++;
        }
        teGebruikenKaarten[random] = "gebruikt";
        aantalGebruikteKaarten = 0;
        for (let i2 = 0; i2 < teGebruikenKaarten.length; i2++) {
            if (teGebruikenKaarten[i2] === "gebruikt") {
                aantalGebruikteKaarten ++;
            }
        }
    }
    let kaarten = document.querySelectorAll("img");

    for (let i = 0; i < kaarten.length; i++) {
        kaarten[i].addEventListener("click", kaartOmdraaien);
        console.log(kaarten[i]);
    }
    console.log(global.VOLGORDE_KAARTEN);
}

const kaartOmdraaien = (event) => {
    if (global.timeout === 0 && event.target.getAttribute("src") !== "images/correct.png") {
        let id = event.target.getAttribute("id");
        let cardNumber = global.VOLGORDE_KAARTEN[id];
        event.target.setAttribute("src", "images/" + cardNumber + ".png");
        if (global.kaart_1 === null) {
            global.kaart_1 = event.target;
        } else if (global.kaart_2 === null) {
            global.kaart_2 = event.target;
            if (global.kaart_1.getAttribute("src") === global.kaart_2.getAttribute("src") &&
            global.kaart_1.getAttribute("id") !== global.kaart_2.getAttribute("id")) {
                global.timeout = setTimeout(kaartenMatch, 1500);
            } else if (global.kaart_1.getAttribute("id") !== global.kaart_2.getAttribute("id")) {
                global.timeout = setTimeout(kaartenTerugDraaien, 1500);
            } else {
                global.kaart_2 = null;
            }
        }
    }
}

const kaartenTerugDraaien = () => {
    global.kaart_1.setAttribute("src", "images/achterkant.png");
    global.kaart_2.setAttribute("src", "images/achterkant.png");
    resetVelden();
}

const kaartenMatch = () => {
    global.kaart_1.setAttribute("src", "images/correct.png");
    global.kaart_2.setAttribute("src", "images/correct.png");
    resetVelden();
    checkIfWon();
}

const resetVelden = () => {
    global.kaart_1 = null;
    global.kaart_2 = null;
    clearTimeout(global.timeout);
    global.timeout = 0;
}

const checkIfWon = () => {
    let kaarten = document.querySelectorAll("img");
    let gewonnen = true;
    for (let i = 0; i < kaarten.length; i++) {
        if (kaarten[i].getAttribute("src") !== "images/correct.png") {
            gewonnen = false;
        }
    }
    if (gewonnen) {
        let gameOver = document.createElement("p");
        let gameOverText = document.createTextNode("YOU WIN");
        gameOver.appendChild(gameOverText);
        gameOver.setAttribute("id", "gameOver");
        let body = document.querySelector("body");
        body.appendChild(gameOver);
    }
}

window.addEventListener("load", startGame);


