//Variables section.
const gridWrapper = document.querySelector('.grid-wrapper');
let size = 10;
let gridElement;
let penColor = 'rgb(0, 0, 0)';
let penMode = 'default';

//Functions section.
//Function that generates default grid.
//Not sure if it correct to add event listener loop that generate grid.
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function generateGrid(size) {
    console.log(`initializing function generateGrid()`);
    let elementSize = 600 / size;
    
    for (let i = 0; i < (size * size); i++) {
        gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.style.cssText = `width: ${elementSize}px; 
            height: ${elementSize}px;
            background-color: rgb(255, 255, 255)`;
        gridWrapper.appendChild(gridElement);
        gridElement.addEventListener('mousedown', pen);
        gridElement.addEventListener('mouseover', pen);
    }
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

generateGrid(size);
//Controls functions.
function gridSize() {
    deleteCurrentGrid();
    while(true) {
        size = prompt("Enter grid size from 10 to 99", "10");
        if (+size > 9 && +size < 100) {
            console.log(`grid size = ${size}`);
            generateGrid(size);
            break;
        } else {
            alert("You've entered wrong grid size.");
        }
    }
}

function deleteCurrentGrid() {
    console.log('Delete current grid');
    let gridSelector = document.getElementById('wrapper');
    while (gridSelector.firstChild) {
        gridSelector.removeChild(gridSelector.lastChild);
    }
}

function pen(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (penMode === 'default') {
        penColor = `rgb(0, 0, 0)`;
        e.target.style.backgroundColor = penColor;
    } else if (penMode === `rainbow`) {
        e.target.style.backgroundColor = `rgb(${getRandomInt(255)}, 
        ${getRandomInt(255)}, ${getRandomInt(255)})`;
    } else if (penMode === `darkerTool`) {
        let rgbString = e.target.style.backgroundColor;
        let rgbList = rgbString.slice(4, (rgbString.length - 1)).split(', ');
        let red = parseInt(rgbList[0]);
        let green = parseInt(rgbList[1]);
        let blue = parseInt(rgbList[2]);
        console.log(red, green, blue);
        e.target.style.backgroundColor = `rgb(${red / 1.3}, ${green / 1.3}, ${blue / 1.3})`;
    } else if (penMode === `lighterTool`) {
        let rgbString = e.target.style.backgroundColor;
        let rgbList = rgbString.slice(4, (rgbString.length - 1)).split(', ');
        let red = parseInt(rgbList[0]);
        let green = parseInt(rgbList[1]);
        let blue = parseInt(rgbList[2]);
        console.log(red, green, blue);
        e.target.style.backgroundColor = `rgb(${red * 1.3}, ${green * 1.3}, ${blue * 1.3})`;
    }
}
function blackPen() {
    penMode = `default`;
}
function eraser() {
    
}

function rainbow() {
    penMode = `rainbow`;
}

function darkerTool() {
    penMode = `darkerTool`;
}

function lighterTool() {
    penMode = `lighterTool`;
}

function clearGrid() {
    let gridClear = document.querySelectorAll('.grid-element');
    for (let i = 0; i < gridClear.length; i++) {
        gridClear[i].style.backgroundColor = 'rgb(255, 255, 255)';
    }
}