// extends entity

// create background sprites
// create background renderer
// update background


const FRAME_SPEED = 4,
    VERTICAL_TOP_POSITION = 50;

var backgroundImg = document.getElementById("background-sprite");

class Background {
    constructor(backgroundCtx, coords, speed, image) {
        this.ctx = backgroundCtx;
        this.coords = coords || { x: 0, y: VERTICAL_TOP_POSITION };
        this.speed = speed || FRAME_SPEED;
        this.image = backgroundImg;
        this.firstSprite = this.createSprite();
        this.secondSprite = this.createSprite();
    }

    get speed() {
        return this._speed;
    }

    set speed(val) {
        // validate
        this._speed = val;
    }

    createSprite() {
        return new Sprite(
            this.image,
            this.image.width,
            this.image.height,
            this.ctx,
            0,
            1,
            0
        );
    }

    /*
        render() {
            this.backgroundCtx.drawImage(
                this.image,
                this.coords.x,
                this.coords.y
            );
            this.backgroundCtx.drawImage(
                this.image,
                this.image.width - Math.abs(this.coords.x),
                this.coords.y
            );
            return this;
        };
    */

    pan() {
        let oldFirstPosition = { x: this.coords.x, y: this.coords.y },
            oldSecondPosition = { x: oldFirstPosition.x + this.image.width, y: oldFirstPosition.y + this.image.y };

        // move background
        this.coords.x -= this.speed;

        // save new position
        let newFirstPosition = { x: this.coords.x, y: this.coords.y },
            newSecondPosition = { x: newFirstPosition.x + this.image.width, y: newFirstPosition.y + this.image.y };;

        // render (with sprite.render method)
        this.firstSprite.render(newFirstPosition, oldFirstPosition);
        this.secondSprite.render(newSecondPosition, oldSecondPosition);

        // reset position (first goes after second)
        if (Math.abs(this.coords.x) > this.image.width) {
            this.coords.x = 0;
        }

        return this;
    };
};