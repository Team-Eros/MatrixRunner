    // player extends entity

    // create player sprites
    // create player rigidBody 
    // switches between sprites for different states
    const HERO_ALL_FRAMES = 31,
        FALL_INDEX = 0,
        FALL_FRAMES = 1,
        JUMP_INDEX = 1,
        JUMP_FRAMES = 1,
        RUN_INDEX = 2,
        RUN_FRAMES = 14,
        WALK_INDEX = 16,
        WALK_FRAMES = 15,
        CYCLES_PER_FRAME_RUN = 3,
        CYCLES_PER_FRAME_WALK = 6;

    var heroSheet = document.getElementById("hero-sprite");

    class Player {
        constructor(x, y, dx, dy, ix, iy, playerCtx) {
            this.coords = { x: x, y: y };
            this.speed = { x: dx, y: dy };
            this.playerCtx = playerCtx;
            this.rigidBody = this.createRigidBody(ix, iy);
            this.sprite = this.createSprite();
        }

        createRigidBody(ix, iy) {
            let impulse = { x: ix, y: iy };
            return new RigidBody(
                this.coords,
                this.speed,
                heroSheet.height,
                heroSheet.width / HERO_ALL_FRAMES,
                impulse);
        }

        createSprite() {
            return new Sprite(
                heroSheet,
                heroSheet.width / HERO_ALL_FRAMES,
                heroSheet.height,
                this.playerCtx,
                WALK_INDEX, // start frame in sheet
                WALK_FRAMES, // number of frames
                CYCLES_PER_FRAME_WALK);
        }

        changeSprite(name) {
            switch (name) {
                case "walk":
                    this.sprite.frameIndex = WALK_INDEX;
                    this.sprite.framesCount = WALK_FRAMES;
                    break;
                case "run":
                    this.sprite.frameIndex = RUN_INDEX;
                    this.sprite.framesCount = RUN_FRAMES;
                    break;
                case "jump":
                    this.sprite.frameIndex = JUMP_INDEX;
                    this.sprite.framesCount = JUMP_FRAMES;
                    break;
                case "fall":
                    this.sprite.frameIndex = FALL_INDEX;
                    this.sprite.framesCount = FALL_FRAMES;
                    break;
            }
            return this.sprite;
        }

        /*
                run() {
                    return new Sprite(
                        heroSheet,
                        heroSheet.width / HERO_ALL_FRAMES,
                        heroSheet.height,
                        this.playerCtx,
                        RUN_INDEX, // start frame in sheet
                        RUN_FRAMES, // number of frames
                        CYCLES_PER_FRAME_RUN);
                }

                jump() {
                    return new Sprite(
                        heroSheet,
                        heroSheet.width / HERO_ALL_FRAMES,
                        heroSheet.height,
                        this.playerCtx,
                        JUMP_INDEX, // start frame in sheet
                        JUMP_FRAMES, // number of frames
                        CYCLES_PER_FRAME_WALK);
                }

                fall() {
                    return new Sprite(
                        heroSheet,
                        heroSheet.width / HERO_ALL_FRAMES,
                        heroSheet.height,
                        this.playerCtx,
                        FALL_INDEX, // start frame in sheet
                        FALL_FRAMES, // number of frames
                        CYCLES_PER_FRAME_WALK);
                }
        */
        // shoot
        // escape bullets
    }