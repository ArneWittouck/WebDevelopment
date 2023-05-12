const setup = () => {
    let button = document.querySelector("#goButton");
    button.addEventListener("click", validate);
}

const validate = () => {
    let input = document.querySelector("#input");
    let inputValue = input.value;
    if (isNaN(inputValue) === true) {
        window.alert("Error: Je moet een getal ingeven.")
    } else {
        generateTafel();
        input.value = null;
    }
}

const generateTafel = () => {
    let fullDate = new Date();
    let timestamp = fullDate.getHours() + ":" + fullDate.getMinutes() + ":" + fullDate.getSeconds();

    let input = document.querySelector("#input");
    let tablesDiv = document.querySelector("#tablesDiv");
    let getal = input.value;

    let outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "outerDiv");

    let divHeader = document.createElement("div");
    divHeader.setAttribute("class", "divHeader");
    let pHeader = document.createElement("p");
    let textHeader = document.createTextNode("Tafel van " + getal + " gemaakt op: " + timestamp);

    pHeader.appendChild(textHeader);
    divHeader.appendChild(pHeader);
    outerDiv.appendChild(divHeader);

    for (let i = 1; i < 11; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "itemDiv");
        let p = document.createElement("p");
        let text = document.createTextNode(getal + " x " + i + " = " + (getal * i));

        if (i % 2 === 0) {
            div.setAttribute("style", "background-color: #d3d3d3;");
        }

        p.appendChild(text);
        div.appendChild(p);
        outerDiv.appendChild(div);
    }

    tablesDiv.appendChild(outerDiv);
}





window.addEventListener("load", setup);