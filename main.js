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
    
    checkChangeSizeButton() {
        /**Changes number of grid-item divs in grid container if and when user
         * clicks change size button and inputs new size.*/
        const changeSizeButton = document.getElementById('change-size-button');
        changeSizeButton.addEventListener("click", () => {
            const newSize = prompt("Enter new size.");
            this.gridContainer.innerHTML = '';
            this.createGrid(newSize);
        });
    }
    
    run() {
        /**Runs the program. Creates a 16x16 grid by default.*/
        this.checkChangeSizeButton();
        this.createGrid(16);
    }
}

main = new EtchASketch;
main.run();