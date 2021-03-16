class EtchASketch {
    constructor() {
        // Drawing modes.
        this.isGreyscale = false;
        this.isRainbow = false;
        this.isEraser = false;

        // Canvas settings.
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
         * div backgrounds of canvas squares to white upon click.*/
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

    darkenCanvasItemColor(canvasItem) {
        /**Subtracts 10% brightness from the canvasItem div using its "filter" 
         * CSS property.*/
        let filterProperty = getComputedStyle(canvasItem).filter;
        let brightness = filterProperty.replace(/[^\d.]/g, '');
        let newBrightness = brightness - 0.1;
        canvasItem.style.setProperty(
            'filter', `brightness(${newBrightness})`);
    }

    randomizeCanvasItemColor(canvasItem) {
        /**Sets the background of canvasItem to a random hexademical value.
         * Random hexadecimal generator originally by Stackoverflow user 
         * aravk33 from (https://stackoverflow.com/q/5092808/).*/
        const randomHex = '#' + (
            Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        canvasItem.style.setProperty('background', randomHex);
    }

    colorCanvasItem(canvasItem) {
        /**Changes background of canvasItem to a different color dependent on
         * boolean values of this.isGreyscale, this.isRainbow, and
         * this.isEraser.*/
        if (this.isGreyscale) {
            this.darkenCanvasItemColor(canvasItem);
        } else if (this.isRainbow) {
            this.randomizeCanvasItemColor(canvasItem);
        } else if (this.isEraser) {
            canvasItem.style.setProperty('background', 'white');
        } else {
            canvasItem.style.setProperty('background', 'black');
        }
    }

    toggleCanvas(isCanvasActive) {
        /**Adds mouseover event listener calling colorCanvasItem() to all 
         * canvas squares if isCanvasActive true. Otherwise, replaces all grid
         * items with a copy of themselves without any event listeners.*/
        const canvasStatus = document.getElementById('canvas-status');
        const canvasItems = document.querySelectorAll('.canvas-item');
        for (let i = 0; i < canvasItems.length; i++) {
            if (isCanvasActive) {
                canvasStatus.textContent = "Canvas active.";
                canvasItems[i].addEventListener(
                    'mouseover', () => this.colorCanvasItem(canvasItems[i]));
            } else {
                canvasStatus.textContent = "Canvas inactive.";
                canvasItems[i].replaceWith(canvasItems[i].cloneNode(true));
            }
        }
    }

    configureCanvasToggling() {
        /**Adds event listener to window that checks if a mouse click is made
         * inside or outside #canvas-container div. Passes true to 
         * toggleCanvas() if former. If latter, passes false.*/
        window.addEventListener('click', (e) => {
            if (this.canvasContainer.contains(e.target)) {
                this.toggleCanvas(true);
            } else {
                this.toggleCanvas(false);
            }
        });
    }

    createGrid(size) {
        /**Sets number of columns in grid container equal to size argument
         * and fills such up with size**2 canvas-item divs.*/
        this.canvasContainer.style.setProperty(
            'grid-template-columns', `repeat(${size}, 1fr)`);
        for (let i = 0; i < size ** 2; i++) {
            const canvasItem = document.createElement('div');
            canvasItem.classList.add('canvas-item', 'canvas-item-border');
            this.canvasContainer.appendChild(canvasItem);
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