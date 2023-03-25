const setup = () => {
    let body = document.querySelector("body");
    let p = document.querySelectorAll("p")[0];
    let text = document.createTextNode("Good job!");
    let newP = document.createElement("p");
    body.removeChild(p);
    body.appendChild(newP);
    newP.appendChild(text);
}

window.addEventListener('load', setup);