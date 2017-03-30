const VERTICAL_TOP_POSITION = 50;

class Background {
    constructor(backgroundCtx, coords, speed, image) {
        this.ctx = backgroundCtx;
        this.coords = coords || { x: 0, y: VERTICAL_TOP_POSITION };
        this.speed = speed || globalSpeedX - 1;
        this.image = image || backgroundImg;
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

    pan() {
        var oldFirstPosition,
            oldSecondPosition;

        oldFirstPosition = { x: this.coords.x, y: this.coords.y };
        if (this.speed >= 0) {
            oldSecondPosition = { x: oldFirstPosition.x + this.image.width, y: oldFirstPosition.y + this.image.y };
        } else {
            oldSecondPosition = { x: oldFirstPosition.x - this.image.width, y: oldFirstPosition.y + this.image.y };
        }
        // move background
        this.coords.x -= this.speed;

        var newFirstPosition,
            newSecondPosition;

        // save new position

        newFirstPosition = { x: this.coords.x, y: this.coords.y };
        if (this.speed >= 0) {
            newSecondPosition = { x: newFirstPosition.x + this.image.width, y: newFirstPosition.y + this.image.y };
        } else {
            newSecondPosition = { x: newFirstPosition.x - this.image.width, y: newFirstPosition.y + this.image.y };
        }
        // render (with sprite.render method)
        this.firstSprite.render(newFirstPosition, oldFirstPosition);
        this.secondSprite.render(newSecondPosition, oldSecondPosition);

        // reset position (first goes after second)
        if (this.speed >= 0) {
            if (Math.abs(this.coords.x) > this.image.width) {
                this.coords.x = 0;
            }
        } else {
            if (this.coords.x < -this.image.width + FIELD_WIDTH) {
                this.coords.x = FIELD_WIDTH;
            }
        }
        return this;
    }
}