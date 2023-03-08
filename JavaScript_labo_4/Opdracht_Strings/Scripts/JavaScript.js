const setup = () => {
    let number = 34;
    console.log(typeof number)
    let intrest = 0.12;
    console.log(typeof intrest)
    let isGevaarlijk=true;
    console.log(typeof isGevaarlijk)
    let vandaag = new Date();
    console.log(typeof vandaag)
    const print = (message) => {
        console.log(message);
    }
    console.log(typeof print)
}
window.addEventListener('load', setup);