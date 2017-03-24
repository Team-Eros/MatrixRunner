'use strict';

// define constants
const FIELD_WIDTH = 1024,
    FIELD_HEIGHT = 512,
    GLOBAL_FRICTION = 0.3,
    GLOBAL_GRAVITY = 0.5,
    COORDS = { x: 0, y: 0 };

window.addEventListener('load', function() {

    var width = window.innerWidth,
        height = window.innerHeight,
        templateMenu = document.getElementById('menu-template').innerHTML;
    // define variables
    var gameContainer = document.getElementById("game-play"),
        menuContainer = document.getElementById("menu");

    menuContainer.innerHTML = templateMenu;


    // create canvas and context (main, player, enemies)
    var gameCanvas = document.createElement("canvas"),
        playerCanvas = document.createElement("canvas"),
        enemyCanvas = document.createElement("canvas"),
        menuCanvas = document.createElement('canvas');

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

    menuCanvas.id = "menu-background";
    menuCanvas.width = width;
    menuCanvas.height = height;

    // add canvas to dom
    gameContainer.appendChild(gameCanvas);
    gameContainer.appendChild(playerCanvas);
    gameContainer.appendChild(enemyCanvas);
    menuContainer.appendChild(menuCanvas);

    // create contexts and load images
    var gameCtx = gameCanvas.getContext("2d"),
        playerCtx = playerCanvas.getContext("2d"),
        enemyCtx = enemyCanvas.getContext("2d"),
        menuCtx = menuCanvas.getContext('2d');

    // fill background
    menuCtx.beginPath();
    menuCtx.rect(0, 0, width, height);
    menuCtx.fillStyle = "black";
    menuCtx.fill();


    // TODO: create and update local storage
    // TODO: create game states
    // TODO: create keyboard control

    //create background
    var background = new Background(gameCtx);

    // create menu background
    var menu = new GameState(menuContainer, templateMenu, COORDS, menuCtx, 1);
    // player and player controls
    var hero = new Player(playerCtx),
        heroBody = hero.rigidBody,
        heroSprite = hero.sprite;

    control(heroBody);

    // TODO: create buildings spawner

    // TODO: create enemy spawner

    function gameLoop() {
        // render and update player
        var lastHeroCoords = heroBody
            .applyGravity(GLOBAL_GRAVITY) // pulls object down
            .decelerate(GLOBAL_FRICTION) // stops object horizontally
            .move();
        hero.switchHeroSprites();
        heroSprite
            .render(heroBody.coords, lastHeroCoords)
            .update();

        // render and update background based on hero speed
        background.speed = FRAME_SPEED + heroBody.speed.x;
        background.pan();

        // render and update menu 
        menu
            .menu()
            .render()
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