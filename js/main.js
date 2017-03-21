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


    // TODO: create and update local storage
    // TODO: create game states
    // TODO: create keyboard control

    // TODO: create background

    // player and player controls
    let hero = new Player(playerCtx),
        heroBody = hero.rigidBody,
        heroSprite = hero.sprite;

    control(heroBody);

    // TODO: create buildings spawner

    // TODO: create enemy spawner

    function gameLoop() {

        // TODO: render and update background

        // render and update player
        let lastHeroCoords = heroBody
            .applyGravity(GLOBAL_GRAVITY) // pulls object down
            .decelerate(GLOBAL_FRICTION) // stops object horizontally
            .move();
        hero.switchHeroSprites();
        heroSprite
            .render(heroBody.coords, lastHeroCoords)
            .update();

        // TODO: spawn buildings
        //     render and update buildings
        // TODO: spawn enemies
        //     render and update enemies
        // check for collision and change states

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});