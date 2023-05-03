const setup = () => {
    let sliders = document.getElementsByClassName("slider");
    let button = document.querySelector("#save");
    button.addEventListener("click", save);

    for (let i = 0; i < sliders.length; i++) {
        sliders[i].addEventListener("change", update);
        sliders[i].addEventListener("input", update);
    }
    restoreSliders();
    restoreSavedColors();
    update();
}

const update = () => {
    let colorDemos=document.getElementsByClassName("colorDemo");
    let sliders = document.getElementsByClassName("slider");
    let pR = document.getElementsByClassName("pR");
    let pG = document.getElementsByClassName("pG");
    let pB = document.getElementsByClassName("pB");
    let valueR=sliders[0].value;
    let valueG=sliders[1].value;
    let valueB=sliders[2].value;
    // console.log("de waarde van de R slider is momenteel : "+valueR);
    // console.log("de waarde van de G slider is momenteel : "+valueG);
    // console.log("de waarde van de B slider is momenteel : "+valueB);
    colorDemos[0].style.backgroundColor="rgb("+valueR+', '+valueG+', '+valueB+')';
    pR[0].innerHTML = 'Red '+valueR;
    pG[0].innerHTML = 'Green '+valueG;
    pB[0].innerHTML = 'Blue '+valueB;
    saveSliders();
}

const save = () => {
    let divSavedColors = document.querySelector(".savedColors");
    let newDiv = document.createElement("div");
    let sliders = document.getElementsByClassName("slider");
    let valueR = sliders[0].value;
    let valueG = sliders[1].value;
    let valueB = sliders[2].value;
    newDiv.setAttribute("class", "savedColor");
    newDiv.setAttribute("style", "background-color: rgb("+valueR+', '+valueG+', '+valueB+")");
    newDiv.setAttribute("red", valueR);
    newDiv.setAttribute("green", valueG);
    newDiv.setAttribute("blue", valueB);
    divSavedColors.appendChild(newDiv);
    let closeButton = document.createElement("button");
    let closeButtonText = document.createTextNode("X");
    closeButton.setAttribute("class", "closeButton")
    newDiv.appendChild(closeButton);
    closeButton.appendChild(closeButtonText);

    let closeButtons = document.getElementsByClassName("closeButton");
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", removeSavedColor);
    }
    let savedColorsDivs = document.getElementsByClassName("savedColor");
    for (let i = 0; i < savedColorsDivs.length; i++) {
        savedColorsDivs[i].addEventListener("click", selectColor);
    }

    saveToLocalStorage();
}

const removeSavedColor = (event) => {
    localStorage.clear();
    let child = event.target;
    let parent = child.parentElement;
    parent.remove();
    saveToLocalStorage();
}

const selectColor = (event) => {
    let target = event.target;
    let colorValues = target.getAttribute("style");
    let start = colorValues.indexOf("(") + 1;
    let eind = colorValues.indexOf(",");
    let valueR = colorValues.slice(start, eind);
    colorValues = colorValues.slice(eind+2, colorValues.length);

    eind = colorValues.indexOf(",");
    let valueG = colorValues.slice(0, eind);
    colorValues = colorValues.slice(eind+2, colorValues.length);

    let valueB = colorValues.slice(0, colorValues.length-1);


    let sliders = document.getElementsByClassName("slider");
    sliders[0].value = valueR;
    console.log(valueR);
    sliders[1].value = valueG;
    console.log(valueG);
    sliders[2].value = valueB;
    console.log(valueB);

    update();
}

const saveToLocalStorage = () => {
    localStorage.clear();
    let savedColorArray = document.getElementsByClassName("savedColor");
    let arrayOfColors = [];
    for (let i = 0; i < savedColorArray.length; i++) {
        let color = savedColorArray[i];
        let red = color.getAttribute("red");
        let green = color.getAttribute("green");
        let blue = color.getAttribute("blue");
        let colorArray = [];
        colorArray.push(red);
        colorArray.push(green);
        colorArray.push(blue);
        arrayOfColors.push(colorArray);
    }
    console.log(arrayOfColors);
    let StringSavedColorArray = JSON.stringify(arrayOfColors);
    localStorage.setItem("savedColors", StringSavedColorArray);
}

const restoreSavedColors = () => {
    let divSavedColors = document.querySelector(".savedColors");
    let savedColorArray = JSON.parse(localStorage.getItem("savedColors"));
    for (let i = 0; i < savedColorArray.length; i++) {
        let newDiv = document.createElement("div");
        let color = savedColorArray[i];
        let red = color[0];
        let green = color[1];
        let blue = color[2];

        newDiv.setAttribute("class", "savedColor");
        newDiv.setAttribute("style", "background-color: rgb("+red+', '+green+', '+blue+")");
        newDiv.setAttribute("red", red);
        newDiv.setAttribute("green", green);
        newDiv.setAttribute("blue", blue);

        divSavedColors.appendChild(newDiv);
        let closeButton = document.createElement("button");
        let closeButtonText = document.createTextNode("X");
        closeButton.setAttribute("class", "closeButton")
        newDiv.appendChild(closeButton);
        closeButton.appendChild(closeButtonText);

        let closeButtons = document.getElementsByClassName("closeButton");
        for (let i = 0; i < closeButtons.length; i++) {
            closeButtons[i].addEventListener("click", removeSavedColor);
        }
        let savedColorsDivs = document.getElementsByClassName("savedColor");
        for (let i = 0; i < savedColorsDivs.length; i++) {
            savedColorsDivs[i].addEventListener("click", selectColor);
        }

        saveToLocalStorage();
    }
}

const saveSliders = () => {
    let sliders = document.getElementsByClassName("slider");
    let red = sliders[0].value;
    let green = sliders[1].value;
    let blue = sliders[2].value;
    let sliderArray = [];
    sliderArray.push(red);
    sliderArray.push(green);
    sliderArray.push(blue);
    let StringArray = JSON.stringify(sliderArray);
    localStorage.setItem("sliders", StringArray);

}

const restoreSliders = () => {
    if (localStorage.getItem("sliders") !== null) {
        let sliders = document.getElementsByClassName("slider");
        let valueArray = JSON.parse(localStorage.getItem("sliders"));
        console.log(valueArray);
        sliders[0].value = valueArray[0];
        sliders[1].value = valueArray[1];
        sliders[2].value = valueArray[2];
    }
}

// Console.time
// Console.timeEnd ofz

window.addEventListener('load', setup);