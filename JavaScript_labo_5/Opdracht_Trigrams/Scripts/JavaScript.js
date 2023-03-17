const setup = () => {
    let button = document.querySelector("#button");
    button.addEventListener("click", printTigrams);
}

const printTigrams = () => {
    let textInput = document.querySelector("#text").value;
    let result = "";
    let outputResult = "";
    for (let i = 0; i < (textInput.length - 2); i++) {
        result = textInput.slice(i, i+3);
        console.log(result);
        outputResult += " ";
        outputResult += result
    }
    outputResult = outputResult.replaceAll(" ", "<br>")
    let p = document.querySelector('#output');
    p.innerHTML = outputResult;
}
window.addEventListener('load', setup);