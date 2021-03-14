function setUpGridContainer(size) {
    /**Sets the number of columns in the grid container equal to "size" 
     * argument, of which is either 16 (by default) or as inputted by user.*/
    const gridContainer = document.getElementById('grid-container');
    gridContainer.style.setProperty(
        'grid-template-columns', `repeat(${size}, 1fr)`);
    return gridContainer;
}

function createGrid(size) {
    /**Fills up the grid container with square divs respective to "size" 
     * argument. Such is equal to both the length and width of the grid 
     * container in number of square divs.*/
    const gridContainer = setUpGridContainer(size);    
    for (i = 0; i < size**2; i++) {
        const gridItem = document.createElement('div');
        gridItem.setAttribute('class', 'grid-item');
        gridContainer.appendChild(gridItem);
    }
}

createGrid(16);