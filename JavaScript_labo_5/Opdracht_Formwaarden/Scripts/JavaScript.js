const setup = () => {
    let button = document.querySelector("#button");
    button.addEventListener("click", toonResultaat);
}

const toonResultaat = () => {
    let roker = document.querySelector("#roker").checked;
    if (roker === true) {
        roker = "Is roker";
    } else {
        roker = "Is geen roker";
    }
    console.log(roker);


    let moedertaal = "moedertaal is ";
    let moedertalen = document.getElementsByName("moedertaal");
    let found = false;
    let i = 0;
    while (!found) {
        if (moedertalen.item(i).checked){
            moedertaal += moedertalen.item(i).value;
            found = true;
        }
        i++;
    }
    console.log(moedertaal);


    let buurland = "favoriete buurland is ";
    let buurlanden = document.querySelector("#buurland").options;
    i = buurlanden.selectedIndex;
    buurland += buurlanden.item(i).value;
    console.log(buurland);


    let bestelling = "bestelling bestaat uit ";
    let mogelijkheden = document.querySelector("#bestelling").options;
    i = 0;
    for (i; i < mogelijkheden.length; i++){
        if (mogelijkheden.item(i).selected){
            bestelling += mogelijkheden.item(i).text + " ";
        }
    }
    if (bestelling === "bestelling bestaat uit "){
        bestelling += "niets";
    }
    console.log(bestelling);

    let p = document.querySelector('#output');
    p.innerHTML = "<br>" + roker + "<br>" + moedertaal + "<br>" + buurland + "<br>" + bestelling;
}

window.addEventListener('load', setup);