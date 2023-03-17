const setup = () => {
    let button = document.querySelector("#button");
    button.addEventListener("click", maakMetSpaties);
}

const maakMetSpaties = () => {
    let text = document.querySelector("#text").value;
    let text2 = text.replaceAll(" ", "")
    let textArray = text2.split("");
    let result = textArray.join(" ");
    console.log(result.trim());
}

window.addEventListener('load', setup);