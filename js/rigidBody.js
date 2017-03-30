class RigidBody {
    constructor(coords, speed, width, height, impulse) {
        this.coords = { x: coords.x, y: coords.y };
        this.speed = speed || { x: 0, y: 0 };
        this.width = width;
        this.height = height;
        this.impulse = impulse || { x: 1, y: 1 };
    }

    move() {
        let lastPosition = { x: this.coords.x, y: this.coords.y };
        this.coords.x += this.speed.x;
        this.coords.y += this.speed.y;
        return lastPosition;
    }

    decelerate(friction) {
        if (this.speed.y === 0) {
            if (this.coords.x < 0) {
                this.coords.x = 0;
            }
            if (this.coords.x > FIELD_WIDTH - this.width) {
                this.coords.x = FIELD_WIDTH - this.width;
            }
            if (this.speed.x > 0) {
                this.speed.x -= friction;
                if (this.speed.x < 0) {
                    this.speed.x = 0;
                }
            }
            if (this.speed.x < 0) {
                this.speed.x += friction;
                if (this.speed.x > 0) {
                    this.speed.x = 0;
                }
            }
        }
        return this;
    }

    applyGravity(gravity, floor) {
        floor = floor || FIELD_HEIGHT - this.height;

        if (this.coords.y > floor) {
            this.coords.y = floor;
            this.speed.y = 0;
            return this;
        }

        if (this.coords.y < floor) {
            this.speed.y += gravity;
        }
        return this;
    }

    collidesWith(otherBody) {
        // needs refactoring
        var thisRadius = (this.width + this.height) / 6,
            otherRadius = (otherBody.width + otherBody.height) / 6,
            x1 = this.coords.x + this.width / 2,
            y1 = this.coords.y + this.height / 2,
            x2 = otherBody.coords.x + otherBody.width / 2,
            y2 = otherBody.coords.y + otherBody.height / 2,
            distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        return distance <= thisRadius + otherRadius;
    }

    isOnTopOf(b) {
        return b.coords.x <= this.coords.x && this.coords.x <= b.coords.x + b.width;
    }
}