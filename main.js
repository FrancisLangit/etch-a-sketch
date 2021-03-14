function createGrid(size) {
    const gridContainer = document.getElementById('grid-container');
    for (i = 0; i < size; i++) {
        const gridItem = document.createElement('div');
        gridItem.setAttribute('class', 'grid-item');
        gridItem.textContent = i;
        gridContainer.appendChild(gridItem);
    }
}

createGrid(64);