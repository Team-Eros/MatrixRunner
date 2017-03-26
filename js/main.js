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
        playerCanvas = document.createElement("canvas"),
        enemyCanvas = document.createElement("canvas"),
        menuCanvas = document.createElement('canvas'),
        buildingsCanvas = document.createElement('canvas');

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

    buildingsCanvas.id = "buildings-canvas";
    buildingsCanvas.width = FIELD_WIDTH;
    buildingsCanvas.height = FIELD_HEIGHT;

    // add canvas to dom
    gameContainer.appendChild(gameCanvas);
    gameContainer.appendChild(playerCanvas);
    gameContainer.appendChild(enemyCanvas);

    // create contexts and load images
    var gameCtx = gameCanvas.getContext("2d"),
        playerCtx = playerCanvas.getContext("2d"),
        enemyCtx = enemyCanvas.getContext("2d"),
        menuCtx = menuCanvas.getContext('2d'),
        buildingsContex = buildingsCanvas.getContext('2d');

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
    menu.menu();
    menu.credits();
    menu.score()

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
    control(heroBody);
    gameMenu(gameTimer);

    // TODO: create buildings spawner
    var buildingArray = [],
        buildingTime = 0,
        sheetNumber = 0,
        buildingHeight = 2,
        building1 = new Buildings(3, buildingsContex, { x: FIELD_WIDTH / 4, y: FIELD_HEIGHT - buildSprite.height / 2 }),
        buildingTwoImages = 1;

    // TODO: create enemy spawner

    let enemy = new Enemy(enemyCtx),
        enemyBody = enemy.rigidBody,
        enemySprite = enemy.sprite;

    // TODO: create enemies Pool
    var enemiesPool = [];
    enemiesPool.push(enemy);
    // collision function - enemy and hero
    function collides(firstObjectCoords, firstObjectSize, secondObjectCoords, secondObjectSize) {
        return (firstObjectCoords.x > secondObjectCoords.x - secondObjectSize.width + 80 &&
            firstObjectCoords.x - firstObjectSize.width / 2 < secondObjectCoords.x &&
            firstObjectCoords.y > secondObjectCoords.y - secondObjectSize.height / 2)
    }


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
                //enemiesPool[enemiesPool.length - 1].move();
                enemiesInterval += enemiesInterval;
                console.log("interval", enemiesInterval);
                newSpeed += 0.5;
            }
        }


        // TODO: spawn buildings
        //     render and update buildings

        for (let i = 0; i < buildingArray.length; i += 1) {

            let building = buildingArray[i];

            var lastBuildingCoordinates = building.rigidBody.move();

            building.sprite
                .render(building.rigidBody.coords, lastBuildingCoordinates)
                .update();
        }
        //spawn Buildings
        if (buildingTime === 0) {

            if (buildingTwoImages = 2) {
                buildingArray.push(building1)
                buildingTwoImages - +1;
            }


            buildingArray.push(new Buildings(sheetNumber, buildingsContex, { x: FIELD_WIDTH, y: FIELD_HEIGHT - buildSprite.height / buildingHeight }))

            // Making random buildings height
            if (Math.random() <= 0.5) {
                buildingHeight += 0.5
            } else {
                buildingHeight -= 0.5
            }

            if (buildingHeight > 3.5) {
                buildingHeight = 1.5
            }

            if (buildingHeight < 1.4) {
                buildingHeight = 1.5
            }

            //switch building sheets
            sheetNumber += 1;
            if (sheetNumber > 3) {
                sheetNumber = 0;
            }
        }

        // buildingTime = space between buildings
        buildingTime += 1;
        if (buildingTime === 150) {
            buildingTime = 0;
        }


        // check for collision and change states
        // check for collision - enemy and hero
        if (collides(heroBody.coords, { width: heroBody.width, height: heroBody.height }, enemy.coords, { width: enemyBody.width, height: enemyBody.height })) {
            //hero.sprite = null;

            // return to menu
            $('#game-play').addClass('hidden');
            $('#menu').removeClass('hidden');

            console.log(true);

            return;
        } else {
            console.log(false);

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

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});