// extends entity

// create background sprites
// create background renderer
// update background


const FRAME_SPEED = 6;

var backgroundImg = document.getElementById("background-sprite");

class Background {
    constructor(backgroundCtx, image, coords, speed) {
        this.backgroundCtx = backgroundCtx;
        this.image = backgroundImg;
        this.coords = coords || {x: 0, y: 0};
        this.speed = FRAME_SPEED;
        this.renderBackground = this.render();
        this.updateBackground = this.update();
    }

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

    update() {
        this.coords.x -= this.speed;

        if (Math.abs(this.coords.x) > this.image.width) {
            this.coords.x = 0;
        }
        return this;
    };
};