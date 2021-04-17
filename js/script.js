const startColorInput = document.querySelector('#starting-color');
const endColorInput = document.querySelector('#ending-color');
const startBtn = document.querySelector('#startButton');
const stopBtn = document.querySelector('#stopButton');
const colorDisplay = document.querySelector('.color-display');
const timeInterval = document.querySelector('.time-interval');
const alert = document.querySelector('.alert');
const radioBtns = document.querySelectorAll('.radioBtn');
let button = {
    start: false
}

let colorChange = {
    endColor: false
}

let timmy;

startColorInput.addEventListener('focusout', isValidHEXColor);
endColorInput.addEventListener('focusout', isValidHEXColor);

radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener('input', switchColorCode)
})


function switchColorCode(ev) {
    if(ev.target.value === 'hex') {
        startColorInput.value = "";
        endColorInput.value = "";
        document.getElementById('hex').checked = true;
        document.getElementById('rgb').checked = false;
        document.getElementById('hsl').checked = false;
        startColorInput.placeholder = 'HEX value';
        endColorInput.placeholder = 'HEX value';
        startColorInput.addEventListener('focusout', isValidHEXColor);
        endColorInput.addEventListener('focusout', isValidHEXColor);
    }
    if(ev.target.value === 'rgb') {
        startColorInput.value = "";
        endColorInput.value = "";
        document.getElementById('hex').checked = false;
        document.getElementById('rgb').checked = true;
        document.getElementById('hsl').checked = false;
        startColorInput.placeholder = 'RGB value';
        endColorInput.placeholder = 'RGB value';
        startColorInput.addEventListener('focusout', isValidRGBColor);
        endColorInput.addEventListener('focusout', isValidRGBColor);
    }
    if(ev.target.value === 'hsl') {
        startColorInput.value = "";
        endColorInput.value = "";
        document.getElementById('hex').checked = false;
        document.getElementById('rgb').checked = false;
        document.getElementById('hsl').checked = true;

        startColorInput.placeholder = 'HSL value';
        endColorInput.placeholder = 'HSL value';
        startColorInput.addEventListener('focusout', isValidHSLColor);
        endColorInput.addEventListener('focusout', isValidHSLColor);
    }
    console.log(ev.target.value)
}



function isValidHEXColor() {
    let str = startColorInput.value;
    if(str.match(/^#[a-f0-9]{6}$/i) === null) {
        alert.textContent = "Please enter a valid HEX value!"
        alert.classList.add('display-alert');
    }
    setTimeout(() => {
        alert.classList.remove('display-alert');
    },2000)
}

function isValidRGBColor() {
    let str = startColorInput.value;
    if(str.match(/^rgb\((\d+),(\d+),(\d+)\)$/) === null) {
        alert.textContent = "Please enter a valid RGB value!"
        alert.classList.add('display-alert');
    }
    setTimeout(() => {
        alert.classList.remove('display-alert');
    },2000)
}

function isValidHSLColor() {
    let str = startColorInput.value;
    if(str.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g) === null) {
        alert.textContent = "Please enter a valid HSL value!"
        alert.classList.add('display-alert');
    }
    setTimeout(() => {
        alert.classList.remove('display-alert');
    },2000)
}



startBtn.addEventListener('click', () => {
    let speed = timeInterval.value;
    colorDisplay.style.backgroundColor = startColorInput.value;
        timmy = setInterval(() => {   
        if(!colorChange.endColor) {
            colorDisplay.style.backgroundColor = endColorInput.value;
            colorChange.endColor = true;
        } else {
            colorDisplay.style.backgroundColor = startColorInput.value;
            colorChange.endColor = false;
        }
    },speed * 1000)

    if(!button.start) {
        button.start = true;
        startBtn.style.display = 'none';
        stopBtn.style.display = 'block';
        startColorInput.disabled = true;
        endColorInput.disabled = true;
        timeInterval.disabled = true;
    } 
})

stopBtn.addEventListener('click', () => {
        clearInterval(timmy)
        button.start = false;
        startBtn.style.display = 'block';
        stopBtn.style.display = 'none';
        startColorInput.disabled = false;
        endColorInput.disabled = false;
        timeInterval.disabled = false;
})