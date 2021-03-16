class EtchASketch {
    constructor() {
        this.defaultCanvasSize = 16;
        this.canvasContainer = document.getElementById('canvas-container');
    }

    changeCanvasSize() {
        /**Prompts user for new canvas size. Changes number of canvas-item 
         * divs in container if user enters non-negative and non-zero number
         * between 1 and 32.*/
        const newCanvasSize = prompt("Enter new size.");
        if (newCanvasSize > 0 && newCanvasSize <= 32) {
            this.canvasContainer.innerHTML = '';
            this.createNewCanvas(newCanvasSize);
        } else if (newCanvasSize <= 0 || newCanvasSize > 32) {
            alert("Size cannot be negative, 0, or over 32.");
        }
    }

    configureChangeSizeButton() {
        /**Adds event listener to change size button that makes it call upon
         * changeCanvasSize upon click.*/
        const changeSizeButton = document.getElementById(
            'change-size-button');
        changeSizeButton.addEventListener(
            'click', () => this.changeCanvasSize());
    }

    configureClearCanvasButton() {
        /**Adds event listener to clear canvas button that makes it turn all 
         * div backgrounds of canvas squares to white upon click.*/
        const clearCanvasButton = document.getElementById(
            'clear-canvas-button');
        clearCanvasButton.addEventListener('click', () => {
            const canvasItems = document.querySelectorAll('.canvas-item');
            for (let i = 0; i < canvasItems.length; i++) {
                this.resetCanvasItem(canvasItems[i]);
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

    configureButtons() {
        /**Adds event listeners to all buttons in the user interface.*/
        this.configureChangeSizeButton();
        this.configureClearCanvasButton();
        this.configureToggleBordersButton();
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

    resetCanvasItem(canvasItem) {
        /**Resets background and filter CSS attributes of canvasItem back to
         * its defaults in .canvas-item class.*/
        canvasItem.style.setProperty('background', 'white');
        canvasItem.style.setProperty('filter', 'brightness(1)');
    }

    colorCanvasItem(canvasItem) {
        /**Changes background of canvasItem to a different color dependent on
         * boolean values of this.isGreyscale, this.isRainbow, and
         * this.isEraser.*/
        if (document.getElementById('greyscale-button').checked) {
            this.darkenCanvasItemColor(canvasItem);
        } else if (document.getElementById('rainbow-button').checked) {
            this.randomizeCanvasItemColor(canvasItem);
        } else if (document.getElementById('eraser-button').checked) {
            this.resetCanvasItem(canvasItem);
        } else {
            canvasItem.style.setProperty('background', 'black');
        }
    }

    activateCanvasItem(canvasStatus, canvasItem) {
        /**Adds mouseover event listener calling colorCanvasItem() to all
         * canvas square passed.*/
        canvasStatus.textContent = "Active.";
        canvasItem.addEventListener(
            'mouseover', () => this.colorCanvasItem(canvasItem));
    }

    deactivateCanvasItem(canvasStatus, canvasItem) {
        /**Replaces canvas item passed with a copy of themselves without any
         * event listeners.*/
        canvasStatus.textContent = "Inactive.";
        canvasItem.replaceWith(canvasItem.cloneNode(true));
    }

    toggleCanvas(isCanvasActive) {
        /**Calls activateCanvas() if isCanvasActive is true. Otherwise, calls
         * deactivateCanvas().*/
        const canvasStatus = document.getElementById('canvas-status');
        const canvasItems = document.querySelectorAll('.canvas-item');
        for (let i = 0; i < canvasItems.length; i++) {
            if (isCanvasActive) {
                this.activateCanvasItem(canvasStatus, canvasItems[i]);
            } else {
                this.deactivateCanvasItem(canvasStatus, canvasItems[i]);
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

    displayNewCanvasSize(newCanvasSize) {
        /**Display current canvas size on user interface.*/
        const canvasSize = document.getElementById('canvas-size');
        canvasSize.textContent = (
            `${newCanvasSize}x${newCanvasSize}.`);
    }

    createNewCanvas(newCanvasSize) {
        /**Sets number of columns in grid container equal to this.canvasSize
         * and fills such up with (this.canvasSize)**2 divs that have 
         * canvas-item and canvas-item-border classes. Also calls upon
         * displayNewCanvasSize().*/
        this.canvasContainer.style.setProperty(
            'grid-template-columns', `repeat(${newCanvasSize}, 1fr)`);
        for (let i = 0; i < (newCanvasSize)**2; i++) {
            const canvasItem = document.createElement('div');
            canvasItem.classList.add('canvas-item', 'canvas-item-border');
            this.canvasContainer.appendChild(canvasItem);
        }
        this.displayNewCanvasSize(newCanvasSize);
    }

    run() {
        /**Runs the program. Configures buttons on user interface, configures
         * canvas toggling feature, and creates a 16x16 grid by default.*/
        this.configureButtons();
        this.configureCanvasToggling();
        this.createNewCanvas(this.defaultCanvasSize);
    }
}

main = new EtchASketch;
main.run();