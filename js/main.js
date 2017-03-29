'use strict';

// define constants
const FIELD_WIDTH = 1024,
    FIELD_HEIGHT = 512,
    GLOBAL_FRICTION = 0.3,
    GLOBAL_GRAVITY = 0.4,
    COORDS = { x: 0, y: 0 },
    REAR_BG_POSITION_Y = 35,
    FRONT_BG_POSITION_Y = 80,
    WALKING_SPEED = 3,
    RUNNING_SPEED = 6;

var globalSpeedX = WALKING_SPEED;

window.addEventListener('load', function() {

    var width = window.innerWidth,
        height = window.innerHeight,
        gameTimer = 0;

    // templates
    var templateMenu = document.getElementById('menu-template').innerHTML,
        templateGameMenu = document.getElementById('game-play-menu').innerHTML;

    // Handlebars 
    // define variables
    var gameContainer = document.getElementById("game-play"),
        menuWrapper = document.getElementById('menuContent'),
        menuContainer = document.getElementById("menu");

    // menuContainer.innerHTML = templateMenu;
    gameContainer.innerHTML = templateGameMenu;

    // create canvas and context (main, player, enemies)
    var gameCanvas = document.createElement("canvas"),
        frontBgCanvas = document.createElement("canvas"),
        playerCanvas = document.createElement("canvas"),
        enemyCanvas = document.createElement("canvas"),
        buildingsCanvas = document.createElement('canvas'),
        menuCanvas = document.createElement('canvas');

    // setup canvas nodes
    gameCanvas.id = "game-canvas";
    gameCanvas.width = FIELD_WIDTH;
    gameCanvas.height = FIELD_HEIGHT;

    frontBgCanvas.id = "frontbg-canvas";
    frontBgCanvas.width = FIELD_WIDTH;
    frontBgCanvas.height = FIELD_HEIGHT;

    playerCanvas.id = "player-canvas";
    playerCanvas.width = FIELD_WIDTH;
    playerCanvas.height = FIELD_HEIGHT;

    enemyCanvas.id = "enemy-canvas";
    enemyCanvas.width = FIELD_WIDTH;
    enemyCanvas.height = FIELD_HEIGHT;

    buildingsCanvas.id = "buildings-canvas";
    buildingsCanvas.width = FIELD_WIDTH;
    buildingsCanvas.height = FIELD_HEIGHT;

    menuCanvas.id = "menu-background";
    menuCanvas.width = width;
    menuCanvas.height = height;

    // add canvas to dom
    gameContainer.appendChild(gameCanvas);
    gameContainer.appendChild(frontBgCanvas);
    gameContainer.appendChild(playerCanvas);
    gameContainer.appendChild(buildingsCanvas);
    gameContainer.appendChild(enemyCanvas);

    // create contexts and load images
    var gameCtx = gameCanvas.getContext("2d"),
        frontBgCtx = frontBgCanvas.getContext("2d"),
        playerCtx = playerCanvas.getContext("2d"),
        enemyCtx = enemyCanvas.getContext("2d"),
        buildingsCtx = buildingsCanvas.getContext("2d"),
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
    var rearBgImg = document.getElementById("background-sprite");
    var rearBgPosition = { x: 0, y: REAR_BG_POSITION_Y };
    var background = new Background(
        gameCtx,
        rearBgPosition,
        (globalSpeedX - 2),
        rearBgImg);

    var frontBgImg = document.getElementById("front-background");
    var frontBgPosition = { x: 0, y: FRONT_BG_POSITION_Y };
    var frontBackground = new Background(
        frontBgCtx,
        frontBgPosition,
        (globalSpeedX - 1),
        frontBgImg);

    // create menu background
    var menu = new GameState(menuContainer, templateMenu, COORDS, menuCtx, 1);
    menu.menu();
    menu.credits();
    menu.score();

    // start timer game
    if (menuContainer.className === '') {
        gameTimer = menu.timer();
        gameTimer.start();

    }

    // add canvas to dom
    menuWrapper.appendChild(menuCanvas);


    // player and player controls
    var hero = new Player(playerCtx),
        heroBody = hero.rigidBody,
        heroSprite = hero.sprite;
    let heroFloor = FIELD_HEIGHT - heroBody.height;
    controlPlayer(heroBody, heroFloor);

    gameMenu(gameTimer);

    // TODO: create buildings spawner
    var buildings = [];
    var buildingRenderer = new BuildingRenderer();

    // TODO: create enemy spawner

    let enemy = new Enemy(enemyCtx),
        enemyBody = enemy.rigidBody,
        enemySprite = enemy.sprite;

    // TODO: create enemies Pool
    var enemiesPool = [];
    enemiesPool.push(enemy);

    function gameLoop() {
        // render and update menu 
        if (menuContainer.className === '') {
            menu
                .render()
                .update();
        }
        // render and update player
        // check if gamecontainer is visible    
        if (gameContainer.className === '') {

            for (let i = 0; i < buildings.length; i += 1) {
                let building = buildings[i];
                building.move();
                if (building.rigidBody.coords.x < -building.rigidBody.width) {
                    buildings.splice(i, 1);
                    i -= 1;
                    continue;
                }
            }

            // for (let j = 0; j < buildings.length; j += 1) {
            //     if (heroBody.isOnTopOf(buildings[j].rigidBody)) {
            //         heroFloor = buildings[j].rigidBody.coords.y - heroBody.height;
            //     } else {
            //         heroFloor = FIELD_HEIGHT - heroBody.height;
            //     }
            // }

            var lastHeroCoords = heroBody
                .applyGravity(GLOBAL_GRAVITY, heroFloor) // pulls down
                .decelerate(GLOBAL_FRICTION) // stops object horizontally
                .move();
            hero.switchHeroSprites();
            heroSprite
                .render(heroBody.coords, lastHeroCoords)
                .update();

            // render and update background based on hero speed
            if (globalSpeedX >= 0) {
                background.speed = globalSpeedX > 0 ? ((globalSpeedX - 2) + heroBody.speed.x) : 0;
                frontBackground.speed = globalSpeedX > 0 ? ((globalSpeedX - 1) + heroBody.speed.x) : 0;
            } else {
                background.speed = globalSpeedX < 0 ? ((globalSpeedX + 2) - heroBody.speed.x) : 0;
                frontBackground.speed = globalSpeedX < 0 ? ((globalSpeedX + 1) - heroBody.speed.x) : 0;
            }

            background.pan();
            frontBackground.pan();

            // TODO: spawn enemies
            // render and update enemies
            let enemiesInterval = 5,
                newSpeed = 0.5;

            enemiesPool[0].move();
            if (enemiesPool[0].coords.x <= -100) {
                enemiesPool.shift();
            } else if (gameTimer._seconds == enemiesInterval) {
                let newEnemy = new Enemy(enemyCtx);
                enemiesPool.push(new Enemy(enemyCtx));
                enemiesPool[enemiesPool.length - 1].speed += newSpeed;
                enemiesPool[enemiesPool.length - 1].move();
                enemiesInterval += enemiesInterval;
                //console.log("interval", enemiesInterval);
                newSpeed += 0.5;
            }
        }

        if (heroBody.collidesWith(enemyBody)) {
            //hero.sprite = null;
            // return to menu
            $('#game-play').addClass('hidden');
            $('#menu').removeClass('hidden');

            //console.log(true);
            return;
        } else {
            //console.log(false);
            //console.log(enemiesPool[enemiesPool.length - 1].coords.x);
            //console.log("length ", enemiesPool.length);
            //console.log("speed", enemiesPool[enemiesPool.length - 1].speed );
            //console.log(gameTimer);
            //console.log(enemiesPool[enemiesPool.length - 1]);
            //console.log("hero y", heroBody.coords.y);
            //console.log("enemy y ", enemy.coords.y - enemyBody.height/2);
            //console.log("hero x - width", heroBody.coords.x - heroBody.width)
            //console.log("enemy coords x", enemy.coords.x)
        }

        buildingRenderer.spawnBuildings(buildings, buildingsCtx);

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});