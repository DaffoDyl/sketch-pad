const sketchpad = document.getElementById("sketchpad");
const rowValue = document.getElementById("rowValue");
const columnValue = document.getElementById("columnValue");
const penColor = document.getElementById("penColor");
const backgroundColor = document.getElementById("backgroundColor");

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

let draw = (cell) => {
    if(mouseDown) {
        cell.style.backgroundColor = penColor.value;
        cell.classList.add("drawn");
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

let init = ()=> {
    makeGrid(16);
    document.body.onmousedown = () => mouseDown = true;
    document.body.onmouseup = () => mouseDown = false;
}

init();
