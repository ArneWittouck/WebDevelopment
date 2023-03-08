

const setup = () => {
    let sliders = document.getElementsByClassName("slider");

    for (let i = 0; i < sliders.length; i++) {
        sliders[i].addEventListener("change", update);
        sliders[i].addEventListener("input", update);
    }

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
    console.log("de waarde van de R slider is momenteel : "+valueR);
    console.log("de waarde van de G slider is momenteel : "+valueG);
    console.log("de waarde van de B slider is momenteel : "+valueB);
    colorDemos[0].style.backgroundColor="rgb("+valueR+', '+valueG+', '+valueB+')';
    pR[0].innerHTML = 'Red '+valueR;
    pG[0].innerHTML = 'Green '+valueG;
    pB[0].innerHTML = 'Blue '+valueB;
}
window.addEventListener('load', setup);