class EtchASketch {
    constructor() {
        this.isGreyscale = false;
        this.isRainbow = false;
        this.isEraser = true;
        this.defaultSize = 16;
        this.gridContainer = document.getElementById('grid-container');
    }

    darkenGridItemColor(gridItem) {
        /**Subtracts 10% brightness from the gridItem div using its "filter" 
         * CSS property.*/
        let filterProperty = getComputedStyle(gridItem).filter;
        let brightness = filterProperty.replace(/[^\d.]/g, '');
        let newBrightness = brightness - 0.1;
        gridItem.style.setProperty('filter', `brightness(${newBrightness})`);
    }

    getRandomHex() {
        /**Generates a random hexidecimal value in the form of a string.
         * Original by aravk33 from https://stackoverflow.com/q/5092808/).*/
        return '#' + (
            Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
    }

    changeGridItemColor(gridItem) {
        /**Changes background-color of gridItem to a different color dependent
         * on boolean values of this.isGreyscale and this.isRainbow.*/
        if (this.isGreyscale) {
            this.darkenGridItemColor(gridItem);
        } else if (this.isRainbow) {
            gridItem.style.setProperty('background', this.getRandomHex());
        } else if (this.isEraser) {
            gridItem.style.setProperty('background', 'white');
        } else {
            gridItem.style.setProperty('background-color', 'black');
        }
    }

    createGridItem() {
        /**Creates a div with class grid-item and a mouseover event listener
         * that calls changeGridItemColor().*/
        const gridItem = document.createElement('div');
        gridItem.setAttribute('class', 'grid-item');
        gridItem.addEventListener(
            'mouseover', () => this.changeGridItemColor(gridItem));
        this.gridContainer.appendChild(gridItem);
    }

    createGrid(size) {
        /**Sets number of columns in grid container equal to size argument
         * and fills such up with size**2 grid-item divs.*/
        this.gridContainer.style.setProperty(
            'grid-template-columns', `repeat(${size}, 1fr)`);
        for (let i = 0; i < size ** 2; i++) {
            this.createGridItem();
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
        this.createGrid(this.defaultSize);
    }
}

main = new EtchASketch;
main.run();