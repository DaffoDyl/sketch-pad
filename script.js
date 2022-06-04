const sketchpad = document.getElementById("sketchpad");
let gridSize = 16;

let removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let makeGrid = (rows, cols) => {
    removeAllChildNodes(sketchpad);
    sketchpad.style.setProperty('--grid-rows', rows);
    sketchpad.style.setProperty('--grid-cols', cols);
    for (i = 0; i < (rows * cols); i++) {
      let cell = document.createElement("div");
      sketchpad.appendChild(cell).className = "gridItem";
    }
}

makeGrid(16, 16);
