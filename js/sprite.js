// create sprites from spriteSheet image
class Sprite {
    constructor(spriteSheet, width, height, context, startIndex, framesCount, cyclesPerFrame) {
        this.spriteSheet = spriteSheet;
        this.width = width;
        this.height = height;
        this.context = context;
        this.frameIndex = startIndex;
        this.framesCount = framesCount;
        this.cyclesPerFrame = cyclesPerFrame;
        this.usedIndex = this.frameIndex;
        this.cycles = 0;
    }

    // renders loop animation
    render(drawCoord, clearCoord) {
        this.context.clearRect(
            clearCoord.x,
            clearCoord.y,
            this.width,
            this.height
        );

        this.context.drawImage(
            this.spriteSheet,
            this.usedIndex * this.width,
            0,
            this.width,
            this.height,
            drawCoord.x,
            drawCoord.y,
            this.width,
            this.height
        );

        return this;
    }

    // updates frame
    update() {
        this.cycles += 1;
        if (this.cycles >= this.cyclesPerFrame) {
            this.cycles = 0;
            this.usedIndex += 1;
            if (this.usedIndex >= this.framesCount + this.frameIndex) {
                this.usedIndex = this.frameIndex;
            }
        }
        return this;
    }
}