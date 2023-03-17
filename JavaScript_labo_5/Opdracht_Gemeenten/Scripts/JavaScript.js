const setup = () => {
    let gemeente = "";
    let gemeenten = [];
    while (gemeente.toLowerCase() !== "stop"){
        gemeente = window.prompt("Gemeente:");
        console.log(gemeente);
        if (gemeente !== "stop"){
            gemeenten.push(gemeente);
        }
    }
    gemeenten = gemeenten.sort();
    console.log(gemeenten);

    for (let i = 0; i < gemeenten.length; i++) {
        let output = document.querySelector('#output');
        output.innerHTML += "<option value=\"" + gemeenten[i] + "\" \>" + gemeenten[i] + "</option>";
    }
}


window.addEventListener('load', setup);
