// extends entity
'use strict';
// create background sprites
// create background renderer
// update backgroundtates

// optional
// create bullets (extend entity)
// bullet sprite
// bullet rigidbody

const ENEMY_IMG_ID = "smith-sprite",
    ENEMY_ALL_FRAMES = 8,
    AIM_INDEX_ENEMY = 0,
    AIM_FRAMES_ENEMY = 4,
    SHOOT_INDEX_ENEMY = 3,
    SHOOT_FRAMES_ENEMY = 4,
    CYCLES_PER_FRAME_WALK_ENEMY = 8,
    DEFAULT_IMPULSE_ENEMY_X = 0,
    DEFAULT_IMPULSE_ENEMY_Y = 0,
    DEFAUT_START_COORDS = { x: FIELD_WIDTH + 50, y: FIELD_HEIGHT - 64 },
    BULLET_SIZE = 30;



var enemySheet = document.getElementById(ENEMY_IMG_ID),
    bulletSheet = document.getElementById("bullet-sprite");

class Bullet {
    constructor(context, coords, speed, image) {
        this.context = context;
        this.coords = coords || { x: 100, y: 100 };
        this.speed = speed || { x: 0, y: 0 };
        this.image = image || bulletSheet;
        this.sprite = this.createBullet();
    }

    createBullet() {
        return new Sprite(
            this.image,
            this.image.width,
            this.image.height,
            this.context,
            0,
            1,
            0
        );
    }

    fly() {
        // clear
        var lastCoords = { x: this.coords.x, y: this.coords.y };
        // update
        this.coords.x += this.speed.x;
        this.coords.y += this.speed.y;
        // draw
        this.sprite
            .render(this.coords, lastCoords)
            .update();
        return this;
    }
}

class Enemy {
    constructor(enemyCtx, coords, speed, impulse) {
        this.enemyCtx = enemyCtx;
        this.coords = coords || DEFAUT_START_COORDS;
        this.speed = speed || { x: -1, y: 0 };
        this.rigidBody = this.createRigidBody(impulse);
        this.sprite = this.createSprite();
        this.bullet = new Bullet(this.enemyCtx, { x: 2000, y: 0 });
        this.bulletShot = false;
    }

    translateContext() {
        this.enemyCtx.translate(enemySheet.width, 0);
        //this.enemyCtx.scale(-1, 1);
    }

    createRigidBody(impulse) {
        impulse = impulse || { x: DEFAULT_IMPULSE_ENEMY_X, y: DEFAULT_IMPULSE_ENEMY_Y };
        return new RigidBody(
            this.coords,
            this.speed,
            enemySheet.width / ENEMY_ALL_FRAMES,
            enemySheet.height,
            impulse);
    }

    createSprite() {
        return new Sprite(
            enemySheet,
            enemySheet.width / ENEMY_ALL_FRAMES,
            enemySheet.height,
            this.enemyCtx,
            AIM_INDEX_ENEMY, // start frame in sheet
            AIM_FRAMES_ENEMY, // number of frames
            CYCLES_PER_FRAME_WALK_ENEMY);
    }

    aim() {
        this.sprite.frameIndex = AIM_INDEX_ENEMY;
        this.sprite.framesCount = AIM_FRAMES_ENEMY;
        return this;
    }

    shoot() {
        this.sprite.frameIndex = SHOOT_INDEX_ENEMY;
        this.sprite.framesCount = SHOOT_FRAMES_ENEMY;
        return this;
    }

    move() {
        var lastCoords = this.rigidBody
            .applyGravity(GLOBAL_GRAVITY)
            .move();
        this.sprite
            .render(this.rigidBody.coords, lastCoords)
            .update();

        var aimProbability = Math.round(Math.random() * 10) + 1;
        var shootProbability = Math.round(Math.random() * 1000) + 1;

        if (aimProbability < 2) {
            this.aim();
        } else {
            this.shoot();
        }

        var bullet;
        if (
            this.sprite.frameIndex >= SHOOT_INDEX_ENEMY &&
            shootProbability > 993 &&
            this.rigidBody.coords.x < FIELD_WIDTH - 100 &&
            !this.bulletShot) {
            this.bulletShot = true;
            var gunCoords = { x: this.rigidBody.coords.x + 12, y: this.rigidBody.coords.y + 5 };
            this.bullet.coords = { x: gunCoords.x, y: gunCoords.y };
            this.bullet.speed.x = -20;
        }

        this.bullet.fly();

        if (this.bullet.coords.x < -BULLET_SIZE) {
            this.bulletShot = false;
            this.bullet.speed.x = 0;
        }

        /*
        let oldFirstPosition = { x: this.coords.x, y: this.coords.y };
        //oldSecondPosition = { x: oldFirstPosition.x + enemySheet.width, y: oldFirstPosition.y + enemySheet.y };

        // move enemy
        this.coords.x -= this.speed;

        // save new position
        let newFirstPosition = { x: this.coords.x, y: this.coords.y };

        // render (with sprite.render method)
        this.sprite.render(newFirstPosition, oldFirstPosition).update();

        // reset position (first goes after second)
*/
        /*
          if (this.rigidBody.coords.x < -this.rigidBody.width) {
              this.rigidBody.coords.x = DEFAUT_START_COORDS.x;
              this.bulletShot = false;
          }
          */
        return this;
    }
}