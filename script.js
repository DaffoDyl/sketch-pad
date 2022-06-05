const sketchpad = document.getElementById("sketchpad");
const rowValue = document.getElementById("rowValue");
const columnValue = document.getElementById("columnValue");

let gridSize = 16;

let removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let makeGrid = (rows, cols=rows) => {
    removeAllChildNodes(sketchpad);
    sketchpad.style.setProperty('--grid-rows', rows);
    sketchpad.style.setProperty('--grid-cols', cols);
    for (i = 0; i < (rows * cols); i++) {
      let cell = document.createElement("div");
      sketchpad.appendChild(cell).className = "gridItem";
    }
    rowValue.textContent = rows;
    columnValue.textContent = cols;
}

let init = ()=> {
    makeGrid(16);
}

init();
