const redV = Math.floor(Math.random() * 255);
const greenV = Math.floor(Math.random() * 255);
const blueV = Math.floor(Math.random() * 255);

const rgbV = String('rgb(' + redV + ', ' + greenV + ', ' + blueV + ')');

console.log(rgbV);

document.documentElement.style.setProperty('--r', redV);
document.documentElement.style.setProperty('--g', greenV);
document.documentElement.style.setProperty('--b', blueV);
