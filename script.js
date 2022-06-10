const sketchpad = document.getElementById("sketchpad");
const rowValue = document.getElementById("rowValue");
const columnValue = document.getElementById("columnValue");
const penColor = document.getElementById("penColor");
const backgroundColor = document.getElementById("backgroundColor");
const rainbowBtn = document.getElementById("rainbowBtn");
const shaderBtn = document.getElementById("shaderBtn");
const lightenBtn = document.getElementById("lightenBtn");
const eraserBtn = document.getElementById("eraserBtn");
const gridBtn = document.getElementById("gridBtn");

let mouseDown = false;

let removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let setBackgroundColor = () => {
    let grid = sketchpad.getElementsByTagName("div");
    for( i=0; i< grid.length; i++ ) {
        let cell = grid[i];
        if(cell.classList.contains("drawn") == false) {
            cell.style.backgroundColor = backgroundColor.value;
        }
    }
}

let rgbRandom = () => {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`
}

let rgbShade = (cell) => {
    let rgbValues = cell.style.backgroundColor.match(/\d+/g).map(
        x => parseInt(x)-5
    );
    return `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`
}

let rgbLighten = (cell) => {
    let rgbValues = cell.style.backgroundColor.match(/\d+/g).map(
        x => parseInt(x)+5
    );
    return `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
}

let draw = (cell) => {
    if(mouseDown) {
        cell.classList.add("drawn"); 
        if(isBtnActive(rainbowBtn)) {
            cell.style.backgroundColor = rgbRandom();
        }
        else if(isBtnActive(shaderBtn)) {
            cell.style.backgroundColor = rgbShade(cell);
        }
        else if(isBtnActive(lightenBtn)) {
            cell.style.backgroundColor = rgbLighten(cell);
        }
        else if(isBtnActive(eraserBtn)) {
            cell.style.backgroundColor = backgroundColor.value;
            cell.classList.remove("drawn");  
        }
        else {
            cell.style.backgroundColor = penColor.value;
        }
    }
}

let makeGrid = (rows, cols=rows) => {
    removeAllChildNodes(sketchpad);
    sketchpad.style.setProperty('--grid-rows', rows);
    sketchpad.style.setProperty('--grid-cols', cols);
    for (i = 0; i < (rows * cols); i++) {
      let cell = document.createElement("div");
      cell.addEventListener('mousemove', () => draw(cell));
      sketchpad.appendChild(cell).className = "gridItem";
    }
    setBackgroundColor();
    rowValue.textContent = rows;
    columnValue.textContent = cols;
}

let removeToggles = () => {
    rainbowBtn.classList.remove("active");
    shaderBtn.classList.remove("active");
    lightenBtn.classList.remove("active");
    eraserBtn.classList.remove("active");
}

let toggleBtn = (button) => {
    if(button.classList.contains("active")) {
        button.classList.remove("active");
    }
    else if(button.classList.contains("gridBtn")) {
        button.classList.add("active");
    }
    else {
        removeToggles();
        button.classList.add("active");
    }  
}

let isBtnActive = (button) => {
    return button.classList.contains("active");
}

let init = ()=> {
    makeGrid(16);
    document.body.onmousedown = () => mouseDown = true;
    document.body.onmouseup = () => mouseDown = false;
}

rainbowBtn.addEventListener("click", () => toggleBtn(rainbowBtn));
shaderBtn.addEventListener("click", () => toggleBtn(shaderBtn));
lightenBtn.addEventListener("click", () => toggleBtn(lightenBtn));
eraserBtn.addEventListener("click", () => toggleBtn(eraserBtn));
gridBtn.addEventListener("click", () => toggleBtn(gridBtn));

init();
