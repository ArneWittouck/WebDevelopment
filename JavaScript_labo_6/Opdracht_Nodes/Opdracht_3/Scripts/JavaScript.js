const setup = () => {
    let p = document.createElement("p");
    let text = document.createTextNode("Random text");
    let div = document.querySelector("div");
    div.appendChild(p);
    p.appendChild(text);
}

window.addEventListener('load', setup);