const setup = () => {
    let lis = document.querySelectorAll("li");
    for (let i = 0; i < lis.length; i++){
        lis.item(i).className = "listitem";
    }
    let body = document.querySelector("body");
    let style = document.createElement("style");
    let styleText = document.createTextNode("li.listitem {color: red}")
    body.appendChild(style);
    style.appendChild(styleText);

    let img = document.createElement("img");
    img.setAttribute("src", "images/Person_icon_BLACK-01.svg.png");
    body.appendChild(img);
    let style2 = document.createElement("style");
    let styleImg = document.createTextNode("img {width: 100px}");
    let styleImg2 = document.createTextNode("img {height: 100px}");
    body.appendChild(style2);
    style2.appendChild(styleImg);
    style2.appendChild(styleImg2);
}

window.addEventListener('load', setup);