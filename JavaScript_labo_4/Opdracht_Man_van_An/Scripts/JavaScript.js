const setup = () => {
    let button = document.querySelector("#button");
    button.addEventListener("click", countAn);
}

const countAn = () => {
    let text = "De man van An geeft geen hand aan ambetante verwanten";
    let anPositie = 0;
    let aantalAn = 0;
    while (anPositie > -1) {
        anPositie = text.indexOf("an");
        text = text.substring((anPositie+2), text.length)
        aantalAn ++;
    }
    console.log(aantalAn);
}

window.addEventListener('load', setup);