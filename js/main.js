// define constants
const FIELD_WIDTH = 1024,
    FIELD_HEIGHT = 512,
    GLOBAL_FRICTION = 0.3,
    GLOBAL_GRAVITY = 0.5;

window.addEventListener('load', function() {

    // define variables
    var gameContainer = document.getElementById("game-play")

    // create canvas and context (main, player, enemies)
    var gameCanvas = document.createElement("canvas"),
        playerCanvas = document.createElement("canvas"),
        enemyCanvas = document.createElement("canvas");

    // setup canvas nodes
    gameCanvas.id = "game-canvas";
    gameCanvas.width = FIELD_WIDTH;
    gameCanvas.height = FIELD_HEIGHT;

    playerCanvas.id = "player-canvas";
    playerCanvas.width = FIELD_WIDTH;
    playerCanvas.height = FIELD_HEIGHT;

    enemyCanvas.id = "enemy-canvas";
    enemyCanvas.width = FIELD_WIDTH;
    enemyCanvas.height = FIELD_HEIGHT;

    // add canvas to dom
    gameContainer.appendChild(gameCanvas);
    gameContainer.appendChild(playerCanvas);
    gameContainer.appendChild(enemyCanvas);

    // create contexts and load images
    var gameCtx = gameCanvas.getContext("2d"),
        playerCtx = playerCanvas.getContext("2d"),
        enemyCtx = enemyCanvas.getContext("2d"),
        buildingSheet = document.getElementById("building-sprite");


    // create and update local storage
    // create game states
    // create keyboard control

    // create background
    // create player and player controls

    let hero = new Player(0, 0, 0, 0, 7, 10, playerCtx),
        heroBody = hero.rigidBody,
        heroSprite = hero.sprite;

    control(heroBody);

    function switchHeroSprites() {
        if (heroBody.speed.x > 0 && heroBody.speed.y === 0) {
            heroSprite = hero.changeSprite("run");
        } else if (heroBody.speed.x < 0.5 && heroBody.speed.y === 0) {
            heroSprite = hero.changeSprite("walk");
        } else if (heroBody.speed.y !== 0) {
            heroSprite = hero.changeSprite("jump");
        }
    }

    // create buildings spawner
    // create enemy spawner

    function gameLoop() {

        // render and update background
        // render and update player

        let lastHeroCoords = heroBody
            .applyGravity(GLOBAL_GRAVITY) // pulls object down
            .decelerate(GLOBAL_FRICTION) // stops object horizontally
            .move();
        switchHeroSprites();
        heroSprite
            .render(heroBody.coords, lastHeroCoords)
            .update();

        // spawn buildings
        //     render and update buildings
        // spawn enemies
        //     render and update enemies
        // check for collision and change states

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});