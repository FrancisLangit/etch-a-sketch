class EtchASketch {
    constructor() {
        this.defaultSize = 16;
        this.gridContainer = document.getElementById('grid-container');
    }
    
    createGrid(size) {
        /** Sets number of columns in grid container equal to size argument
         *  and fills such up with size**2 grid-item divs.*/
        this.gridContainer.style.setProperty(
            'grid-template-columns', `repeat(${size}, 1fr)`);
        for (let i = 0; i < size**2; i++) {
            const gridItem = document.createElement('div');
            gridItem.setAttribute('class', 'grid-item');
            this.gridContainer.appendChild(gridItem);
        }
    }

    promptNewGridSize() {
        /**Prompts user for new grid size. Changes number of grid-item divs in
         * container if user enters non-negative and non-zero number between 1
         * and 100.*/
        const newSize = prompt("Enter new size.");
        if (newSize > 0 && newSize <= 100) {
            this.gridContainer.innerHTML = '';
            this.createGrid(newSize);
        } else {
            alert("Size cannot be negative, 0, or over 100.");
        }
    }

    run() {
        /**Runs the program. Adds event listener to change size button and 
         * creates a 16x16 grid by default.*/
        const changeSizeButton = document.getElementById(
            'change-size-button');
        changeSizeButton.addEventListener(
            'click', () => this.promptNewGridSize());
        this.createGrid(16);
    }
}

main = new EtchASketch;
main.run();