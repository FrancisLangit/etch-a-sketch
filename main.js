function setUpGridContainer(size) {
    /**Sets number of columns in grid container equal to size.*/
    const gridContainer = document.getElementById('grid-container');
    gridContainer.style.setProperty(
        'grid-template-columns', `repeat(${size}, 1fr)`);
    return gridContainer;
}

function fillUpGrid(size) {
    /**Fills up the grid container with size^2 grid-item divs.*/
    const gridContainer = setUpGridContainer(size);    
    for (i = 0; i < size**2; i++) {
        const gridItem = document.createElement('div');
        gridItem.setAttribute('class', 'grid-item');
        gridContainer.appendChild(gridItem);
    }
}


function changeGridSize() {
    const changeSizeButton = document.getElementById('change-size-button');
    changeSizeButton.addEventListener("click", () => {
        const newSize = prompt("Enter new size.");
        const gridContainer = document.getElementById('grid-container');
        gridContainer.innerHTML = '';
        fillUpGrid(newSize);
    });
}

changeGridSize();
fillUpGrid(16);