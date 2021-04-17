const startColorInput = document.querySelector('#starting-color');
const endColorInput = document.querySelector('#ending-color');
const startBtn = document.querySelector('#startButton');
const stopBtn = document.querySelector('#stopButton');
const colorDisplay = document.querySelector('.color-display');
const timeInterval = document.querySelector('.time-interval');

let button = {
    start: false
}


let timmy;

startBtn.addEventListener('click', (ev) => {
 
    colorDisplay.style.backgroundColor = startColorInput.value;
    let speed = timeInterval.value;
    
        timmy = setInterval(() => {
        if(colorDisplay.style.backgroundColor === startColorInput.value) {
            colorDisplay.style.backgroundColor = endColorInput.value;
        } else {
            colorDisplay.style.backgroundColor = startColorInput.value;
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