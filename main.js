class EtchASketch {
    constructor() {
        // Drawing modes.
        this.isGreyscale = false;
        this.isRainbow = false;
        this.isEraser = false;

        // Canvas settings.
        this.isCanvasActive = false;
        this.defaultSize = 16;
        this.canvasContainer = document.getElementById('canvas-container');
    }

    promptNewCanvasSize() {
        /**Prompts user for new canvas size. Changes number of canvas-item 
         * divs in container if user enters non-negative and non-zero number
         * between 1 and 100.*/
        const newSize = prompt("Enter new size.");
        if (newSize > 0 && newSize <= 100) {
            this.canvasContainer.innerHTML = '';
            this.createGrid(newSize);
        } else {
            alert("Size cannot be negative, 0, or over 100.");
        }
    }

    configureChangeSizeButton() {
        /**Adds event listener to change size button that makes it call upon
         * promptNewCanvasSize upon click.*/
        const changeSizeButton = document.getElementById(
            'change-size-button');
        changeSizeButton.addEventListener(
            'click', () => this.promptNewCanvasSize());
    }

    configureClearCanvasButton() {
        /**Adds event listener to clear canvas button that makes it turn all 
         * div backgrounds of canvas squares to white upon click. */
        const clearCanvasButton = document.getElementById(
            'clear-canvas-button');
        clearCanvasButton.addEventListener('click', () => {
            const canvasItems = document.querySelectorAll('.canvas-item');
            for (let i = 0; i < canvasItems.length; i++) {
                canvasItems[i].style.setProperty('background', 'white');
            }
        });
    }

    configureToggleBordersButton() {
        /**Adds event listener to toggle borders button that makes it toggle 
         * the borders on all canvas squares on and off.*/
        const toggleBordersButton = document.getElementById(
            'toggle-borders-button');
        toggleBordersButton.addEventListener('click', () => {
            const canvasItems = document.querySelectorAll('.canvas-item');
            for (let i = 0; i < canvasItems.length; i++) {
                canvasItems[i].classList.toggle('canvas-item-border');
            }
        }); 
    }

    toggleCanvas(isCanvasActive) {
        /**Adds mouseover event listener calling colorCanvasItem() to all 
         * canvas squares if isCanvasActive true. Otherwise, replaces all grid
         * items with a copy of themselves without any event listeners.*/
        this.isCanvasActive = isCanvasActive
        const canvasItems = document.querySelectorAll('.canvas-item');
        for (let i = 0; i < canvasItems.length; i++) {
            if (isCanvasActive) {
                canvasItems[i].addEventListener(
                    'mouseover', () => this.colorCanvasItem(canvasItems[i]));
            } else {
                canvasItems[i].replaceWith(canvasItems[i].cloneNode(true));
            }
        }
    }

    configureCanvasToggling() {
        /**Adds event listener to window that checks if a mouse click is made
         * inside or outside #canvas-container div. Passes true to toggleCanvas()
         * if former. If latter, passes false.*/
        window.addEventListener('click', (e) => {
            if (this.canvasContainer.contains(e.target)) {
                this.toggleCanvas(true);
            } else {
                this.toggleCanvas(false);
            }
        });
    }

    darkenCanvasItemColor(canvasItem) {
        /**Subtracts 10% brightness from the canvasItem div using its "filter" 
         * CSS property.*/
        let filterProperty = getComputedStyle(canvasItem).filter;
        let brightness = filterProperty.replace(/[^\d.]/g, '');
        let newBrightness = brightness - 0.1;
        canvasItem.style.setProperty('filter', `brightness(${newBrightness})`);
    }

    getRandomHex() {
        /**Generates a random hexidecimal value in the form of a string.
         * Original by aravk33 from https://stackoverflow.com/q/5092808/).*/
        return '#' + (
            Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }

    colorCanvasItem(canvasItem) {
        /**Changes background of canvasItem to a different color dependent on
         * boolean values of this.isGreyscale, this.isRainbow, 
         * this.isEraser.*/
        if (this.isGreyscale) {
            this.darkenCanvasItemColor(canvasItem);
        } else if (this.isRainbow) {
            canvasItem.style.setProperty('background', this.getRandomHex());
        } else if (this.isEraser) {
            canvasItem.style.setProperty('background', 'white');
        } else {
            canvasItem.style.setProperty('background', 'black');
        }
    }

    createCanvasItem() {
        /**Creates a div with class canvas-item and a mouseover event listener
         * that calls colorCanvasItem().*/
        const canvasItem = document.createElement('div');
        canvasItem.classList.add('canvas-item', 'canvas-item-border');
        this.canvasContainer.appendChild(canvasItem);
    }

    createGrid(size) {
        /**Sets number of columns in grid container equal to size argument
         * and fills such up with size**2 canvas-item divs.*/
        this.canvasContainer.style.setProperty(
            'grid-template-columns', `repeat(${size}, 1fr)`);
        for (let i = 0; i < size ** 2; i++) {
            this.createCanvasItem();
        }
    }

    run() {
        /**Runs the program. Configures buttons on user interface, configures
         * canvas toggling feature, and creates a 16x16 grid by default.*/
        this.configureChangeSizeButton();
        this.configureClearCanvasButton();
        this.configureToggleBordersButton();
        this.configureCanvasToggling();
        this.createGrid(this.defaultSize);
    }
}

main = new EtchASketch;
main.run();