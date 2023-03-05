const setup = () => {
    let btnSubstring = document.getElementById("btnSubstring");
    btnSubstring.addEventListener("click", substring);
}

const substring = () => {
    let numberLinks=document.getElementById("numberLinks");
    let txtLinks=document.getElementById("txtLinks");
    let numberRechts=document.getElementById("numberRechts");
    let txtOutput=document.getElementById("txtOutput");

    let g1=parseInt(numberLinks.value, 10);
    let g2=parseInt(numberRechts.value, 10);
    txtOutput.innerHTML= txtLinks.substring(g1, g2);
}

window.addEventListener("load", setup);