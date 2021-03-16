class EtchASketch {
    constructor() {
        this.isGridActive = false;
        this.isGreyscale = false;
        this.isRainbow = false;
        this.isEraser = false;
        this.defaultSize = 16;
        this.gridContainer = document.getElementById('grid-container');
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

    configureChangeSizeButton() {
        /**Adds event listener to change size button that makes it call upon
         * promptNewGridSize upon click.*/
        const changeSizeButton = document.getElementById(
            'change-size-button');
        changeSizeButton.addEventListener(
            'click', () => this.promptNewGridSize());
    }

    configureClearCanvasButton() {
        /**Adds event listener to clear canvas button that makes it turn all 
         * gridItem div backgrounds to white upon click. */
        const clearCanvasButton = document.getElementById(
            'clear-canvas-button');
        clearCanvasButton.addEventListener('click', () => {
            const gridItems = document.querySelectorAll('.grid-item');
            for (let i = 0; i < gridItems.length; i++) {
                gridItems[i].style.setProperty('background', 'white');
            }
        });
    }

    configureToggleBordersButton() {
        /**Adds event listener to toggle borders button that makes it toggle 
         * the borders on all the grid squares on and off.*/
        const toggleGridButton = document.getElementById(
            'toggle-borders-button');
        toggleGridButton.addEventListener('click', () => {
            const gridItems = document.querySelectorAll('.grid-item');
            for (let i = 0; i < gridItems.length; i++) {
                gridItems[i].classList.toggle('grid-item-border');
            }
        }); 
    }

    toggleGrid(isGridActive) {
        /**Adds mouseover event listener calling colorGridItem() to all grid
         * items if isGridActive true. Otherwise, replaces all grid items with
         * a copy of themselves without any event listeners.*/
        this.isGridActive = isGridActive
        const gridItems = document.querySelectorAll('.grid-item');
        for (let i = 0; i < gridItems.length; i++) {
            if (isGridActive) {
                gridItems[i].addEventListener(
                    'mouseover', () => this.colorGridItem(gridItems[i]));
            } else {
                gridItems[i].replaceWith(gridItems[i].cloneNode(true));
            }
        }
    }

    configureGridToggling() {
        /**Adds event listener to window that checks if a mouse click is made
         * inside or outside #grid-conatiner div. Passes true to toggleGrid()
         * if former. If latter, passes false.*/
        window.addEventListener('click', (e) => {
            if (this.gridContainer.contains(e.target)) {
                this.toggleGrid(true);
            } else {
                this.toggleGrid(false);
            }
        });
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
            Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }

    colorGridItem(gridItem) {
        /**Changes background of gridItem to a different color dependent on 
         * boolean values of this.isGreyscale and this.isRainbow.*/
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
         * that calls colorGridItem().*/
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item', 'grid-item-border');
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

    run() {
        /**Runs the program. Configures buttons on user interface and creates
         * a 16x16 grid by default.*/
        this.configureChangeSizeButton();
        this.configureClearCanvasButton();
        this.configureToggleBordersButton();
        this.configureGridToggling();
        this.createGrid(this.defaultSize);
    }
}

main = new EtchASketch;
main.run();