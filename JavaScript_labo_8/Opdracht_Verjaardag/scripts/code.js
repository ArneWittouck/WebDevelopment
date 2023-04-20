let global = {
    element : 0
}


const setup = () => {
    let button = document.querySelector(".button");
    button.addEventListener("click", berekenAantalDagen);
}

const berekenAantalDagen = () => {

    if (global.element !== 0) {
        let antwoord = document.querySelector(".antwoord");
        antwoord.remove();
        let answer = document.querySelector(".answer");
        answer.remove();
    }

    let input = new Date(document.getElementById("date").value).getTime();
    let todayDate = new Date();
    todayDate = todayDate.getTime();
    let difference = (todayDate - input)/1000/60/60/24;
    console.log(difference);
    let h2 = document.createElement("h2");
    h2.setAttribute("class", "antwoord");
    let antwoord = document.createTextNode("Je leeft al " + Math.floor(difference) + " dagen.");
    h2.appendChild(antwoord);

    global.element = h2;

    let body = document.querySelector("body");
    body.appendChild(h2);

    berekenAantalDagenTotVerjaardag();
}

const berekenAantalDagenTotVerjaardag = () => {
    let input = new Date(document.getElementById("date").value);
    let todayDate = new Date();
    let day = input.getDate();
    let month = input.getMonth();
    let year = todayDate.getFullYear();
    let birthday = new Date(year, month, day);
    console.log(birthday);
    let result = (birthday.getTime() - todayDate.getTime())/1000/60/60/24;
    console.log(result);

    if (result < 0) {
        year ++;
        birthday = new Date(year, month, day);
        result = (birthday.getTime() - todayDate.getTime())/1000/60/60/24;
    }

    let h2 = document.createElement("h2");
    let newTekst = document.createTextNode(Math.floor(result) + " dagen tegen je volgende verjaardag.");
    h2.appendChild(newTekst);
    h2.setAttribute("class", "answer");

    let body = document.querySelector("body");
    body.appendChild(h2);
}

window.addEventListener("load", setup);
