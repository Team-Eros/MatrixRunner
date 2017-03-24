'use strict';

var matrixEffectImg = document.getElementById('backgroundEffect');

class GameState {
    constructor(content, template, coords, backgroundCtx, speedY, image) {
        this._content = content; // #menu
        this.template = template; // #menu-template
        this.context = backgroundCtx; // // menu-backgound
        this.coordinates = coords || { x: 0, y: 0 };
        this.speedY = speedY || 1;
        this.image = matrixEffectImg; // backgroundEffect
    }

    get content() {
        return this._content;
    }

    get template() {
        return this._template;
    }

    set template(value) {
        this._template - value;
    }
    get context() {
        return this._context;
    }
    set context(value) {
        this._context = value;
    }
    get coordinates() {
        return this._coordinates;
    }

    set coordinates(value) {
        this._coordinates = value;
    }
    get speedY() {
        return this._speedY;
    }

    set speedY(value) {
        this._speedY = value;
    }

    render() {
        this.context.drawImage(
            this.image,
            0,
            this.coordinates.y
        );

        this.context.drawImage(
            this.image,
            0,
            this.image.height - Math.abs(this.coordinates.y)
        );

        return this;
    };

    update() {
        this.coordinates.y -= this.speedY; // options.sppedY

        if (Math.abs(this.coordinates.y) > this.image.height) {
            this.coordinates.y = 0;
        }

        return this;
    }


    menu() {
        // menu state
        // go to play, credits, score state
        // this.contentMenu.innerHTML = this.template;


    }
    credits() {

        // credits state
        // go to menu state
        this.contentMenu.appendChild(this.template);
    }
    score() {

        // score board state
        // go to menu state
        this.contentMenu.innerHTML = this.template;
    }
    pause() {
        // pause state
        // go to play state
    }
    play() {
        // play state
        // go to pause, win or lost state
    }
    lost() {
        // lost state
        // go to menu state
    }
    winner() {
        // win state
        // go to menu state
    }
}