// extends entity

// create background sprites
// create background renderer
// update backgroundtates

// optional
// create bullets (extend entity)
// bullet sprite
// bullet rigidbody

const ENEMY_IMG_ID = "enemy-sprite",
    ENEMY_ALL_FRAMES = 110;
    RUN_INDEX_ENEMY = 0,
    RUN_FRAMES_ENEMY = 7,
    CYCLES_PER_FRAME_WALK_ENEMY = 7,
    DEFAULT_IMPULSE_ENEMY_X = 0,
    DEFAULT_IMPULSE_ENEMY_Y = 0,
    DEFAUT_START_COORDS = {x: 1200, y: 390};



var enemySheet = document.getElementById(ENEMY_IMG_ID);

    class Enemy {
        constructor(enemyCtx, coords, speed, impulse) {
            this.enemyCtx = enemyCtx;
            this.coords = coords || DEFAUT_START_COORDS;
            this.speed = speed || 1;
            this.rigidBody = this.createRigidBody(impulse);
            this.sprite = this.createSprite();
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
                enemySheet.height,
                enemySheet.width / ENEMY_ALL_FRAMES,
                impulse);
        }

        createSprite() {
            return new Sprite(
                enemySheet,
                enemySheet.width / ENEMY_ALL_FRAMES + 120,
                enemySheet.height,
                this.enemyCtx,
                RUN_INDEX_ENEMY, // start frame in sheet
                RUN_FRAMES_ENEMY, // number of frames
                CYCLES_PER_FRAME_WALK_ENEMY);
        }

        move() {
             let oldFirstPosition = { x: this.coords.x, y: this.coords.y };
                //oldSecondPosition = { x: oldFirstPosition.x + enemySheet.width, y: oldFirstPosition.y + enemySheet.y };

            // move enemy
            this.coords.x -= this.speed;

            // save new position
            let newFirstPosition = { x: this.coords.x, y: this.coords.y };             

            // render (with sprite.render method)
            this.sprite.render(newFirstPosition, oldFirstPosition).update();

            // reset position (first goes after second)
            
            if (this.coords.x < -this.rigidBody.width) {
                this.coords.x = 1200;
            }

            return this;
        }
    }
