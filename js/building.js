var buildSprite = document.getElementById("building-sprite");

class Building {
    constructor(i, buildingContx, coords, speed) {
        this.context = buildingContx;
        this.coords = coords || { x: 0, y: FIELD_HEIGHT - buildSprite.height + this.getOffset() };
        this.speed = speed || { x: -globalSpeedX, y: 0 };
        this.rigidBody = this.createRigidBody();
        this.sprite = this.createSprite(i);
    }

    createRigidBody() {
        return new RigidBody(
            this.coords,
            this.speed,
            buildSprite.width / 4,
            buildSprite.height
        );
    }

    createSprite(i) {
        i = i || 0;
        return new Sprite(
            buildSprite,
            buildSprite.width / 4,
            buildSprite.height,
            this.context,
            i, // start frame in sheet
            1, // number of frames
            0
        );
    }

    move() {
        this.rigidBody.speed.x = -globalSpeedX;
        var oldCoords = this.rigidBody.move();
        this.sprite.render(this.rigidBody.coords, oldCoords);
    }

    getOffset() {
        return Math.round(Math.random() * 120) + 80;
    }
}

class BuildingRenderer {
    spawnBuildings(buildings, ctx) {
        let spriteChanse = Math.round(Math.random() * 3);
        let offsetX = Math.round(Math.random() * 30) + 10; // min: 10, max: 40
        let offsetY = Math.round(Math.random() * 30) + 20; // min: 10, max: 40
        buildings = buildings || [];

        if (buildings.length) {
            var lastBuilding = buildings[buildings.length - 1];
            var startingX = lastBuilding.rigidBody.coords.x + lastBuilding.rigidBody.width + offsetX;
            if (startingX > FIELD_WIDTH) {
                return;
            }
            var newBuilding = new Building(spriteChanse, ctx);
            newBuilding.coords.x = startingX;
            newBuilding.rigidBody.coords.x = startingX;
            buildings.push(newBuilding);

        } else {
            buildings.push(new Building(spriteChanse, ctx));
        }
    }
}