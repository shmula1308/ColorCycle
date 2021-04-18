const startColorInput = document.querySelector('#starting-color');
const endColorInput = document.querySelector('#ending-color');
const startBtn = document.querySelector('#startButton');
const stopBtn = document.querySelector('#stopButton');
const colorDisplay = document.querySelector('.color-display');
const timeInterval = document.querySelector('.time-interval');
const alert = document.querySelector('.alert');
const radioBtns = document.querySelectorAll('.radioBtn');

//Default checked radio button when page loads
let colorCode = 'hex';

// Keeping track of start/stop button
const button = {
    start: false
}

//Keeping track of which color is displayed on color display. It's used when we hit the start button. I had to use this use object because the returned value from colorDisplay.style.backgroundColor was formated differently than the value I was getting from startColorInput.value or endColorInput.value
const colorChange = {
    endColor: false
}

// Timmy is used to stop to clear interval
let timmy;


// Event: When user changes color codes with radio buttons we call switchColorCode(colorCode) and change the variable colorCode above

document.querySelector('.color-codes-container').addEventListener('click', (ev) => {
     if(ev.target.matches('input')) {
        colorCode = ev.target.value;
        switchColorCode(colorCode);
     }
})


// switchColorCode function clears the input values, changes the placeholder values, and assigns a new string to colorCode variable
function switchColorCode(colorCode) {
    if(colorCode === 'hex') {
        startColorInput.value = "";
        endColorInput.value = "";
        startColorInput.placeholder = 'HEX value';
        endColorInput.placeholder = 'HEX value';
        colorCode = 'hex'
        
    }
    if(colorCode === 'rgb') {
        startColorInput.value = "";
        endColorInput.value = "";
        startColorInput.placeholder = 'RGB value';
        endColorInput.placeholder = 'RGB value';
        colorCode = 'rgb'
    }
    if(colorCode === 'hsl') {
        startColorInput.value = "";
        endColorInput.value = "";
        startColorInput.placeholder = 'HSL value';
        endColorInput.placeholder = 'HSL value';
        colorCode = 'hsl'
    }
    
}


// RegExp validation of color codes. It returns false if match() method return null, alert the user, removes alert within 2 seconds. Else it return true
function isValidHEXColor() {
    let str = startColorInput.value;
    if(str.match(/^#[a-f0-9]{6}$/i) === null) {
        alert.textContent = "Please enter a valid HEX value!"
        alert.classList.add('display-alert');
        setTimeout(() => {
            alert.classList.remove('display-alert');
        },2000)
        return false;
    } 
    return true;
}

function isValidRGBColor() {
    let str = startColorInput.value;
    if(str.match(/^rgb\((\d+),(\d+),(\d+)\)$/) === null) {
        alert.textContent = "Please enter a valid RGB value!"
        alert.classList.add('display-alert');
        setTimeout(() => {
            alert.classList.remove('display-alert');
        },2000)
        return false;
    }
    return true;
}

function isValidHSLColor() {
    let str = startColorInput.value;
    if(str.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g) === null) {
        alert.textContent = "Please enter a valid HSL value!"
        alert.classList.add('display-alert');
        setTimeout(() => {
            alert.classList.remove('display-alert');
        },2000)
        return false;
    }
   return true;
}


//Event: first we check for the validity of input. If false we stop everything from running by returning nothing.
//Else, we grab time interval value, change colorDisplay to first color value, start the setInterval and pass it speed value multiplied by 1000 to convert it to miliseconds. Within setInterval function we check what is applied to colorDisaply and change it accordingly. We keep track of changes with the object colorChange
//We change buttons from start to stop or vice versa.
startBtn.addEventListener('click', () => {

    if(colorCode === 'hex') {
        if(!isValidHEXColor()) {
            return;
        }
    } 

    if(colorCode === 'rgb') {
        if(!isValidRGBColor()) {
            console.log(startColorInput.value)
            return;
        }
    }
    if(colorCode === 'hsl') {
        if(!isValidHSLColor()) {
            return;
        }
    } 

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