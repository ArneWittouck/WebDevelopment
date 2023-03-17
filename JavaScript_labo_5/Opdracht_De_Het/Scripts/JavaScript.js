const setup = () => {
    let button = document.querySelector("#button");
    button.addEventListener("click", change);
}

const change = () => {
    let textInput = document.querySelector("#text").value;
    textInput = textInput.toLowerCase();
    let woordenVerzameling = textInput.split(" ");
    for (let i = 0; i < woordenVerzameling.length; i++) {
        if (woordenVerzameling.at(i) === "de"){
            woordenVerzameling[i] = "het";
        } else if (woordenVerzameling.at(i) === "het") {
            woordenVerzameling[i] = "de";
        }
    }
    console.log(woordenVerzameling.join(" "))
    let p = document.querySelector('#output');
    p.innerHTML = woordenVerzameling.join(" ");
}
window.addEventListener('load', setup);