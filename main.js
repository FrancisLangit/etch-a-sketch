function createGridContainer(size) {
    const gridContainer = document.createElement('div');
    gridContainer.style.setProperty('display', `inline-grid`);
    gridContainer.style.setProperty(
        'grid-template-columns', `repeat(${size}, 1fr)`);
    document.body.appendChild(gridContainer);
    return gridContainer;
}

function createGrid(size) {
    const gridContainer = createGridContainer(size);    

    const area = size**2
    for (i = 0; i < area; i++) {
        const gridItem = document.createElement('div');
        gridItem.setAttribute('class', 'grid-item');
        gridContainer.appendChild(gridItem);
    }
}

createGrid(9);