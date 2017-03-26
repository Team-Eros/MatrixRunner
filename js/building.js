// building extends entity

var buildSprite  = document.getElementById("building-sprite");

class Buildings {
    constructor(i, buildingContx, coords, speed){
        this.buildingContx = buildingContx;
        this.coords = coords || {x: FIELD_WIDTH, y: FIELD_HEIGHT - buildSprite.height};
        this.speed = speed || {x: -5 , y : 0};
        this.rigidBody = this.createRigidBody();
        this.sprite = this.createSprite(i);
    }

     createRigidBody() {
            return new RigidBody(
                this.coords,
                this.speed,
                buildSprite.height,
                buildSprite.width / 4
            )
        };

    createSprite(i) {
            return new Sprite(
                buildSprite,
                buildSprite.width / 4,
                buildSprite.height,
                this.buildingContx,
                 +i, // start frame in sheet
                 1, // number of frames
                 0
                );
        }
}


