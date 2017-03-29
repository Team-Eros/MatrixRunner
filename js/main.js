'use strict';

// define constants
const FIELD_WIDTH = 1024,
    FIELD_HEIGHT = 512,
    GLOBAL_FRICTION = 0.3,
    GLOBAL_GRAVITY = 0.4,
    COORDS = { x: 0, y: 0 },
    REAR_BG_SPEED = 1,
    REAR_BG_POSITION_Y = 35,
    FRONT_BG_SPEED = 2,
    FRONT_BG_POSITION_Y = 80;

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
        menuCanvas = document.createElement('canvas'),
        buildingsCanvas = document.createElement('canvas');

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

    menuCanvas.id = "menu-background";
    menuCanvas.width = width;
    menuCanvas.height = height;

    buildingsCanvas.id = "buildings-canvas";
    buildingsCanvas.width = FIELD_WIDTH;
    buildingsCanvas.height = FIELD_HEIGHT;

    // add canvas to dom
    gameContainer.appendChild(gameCanvas);
    gameContainer.appendChild(frontBgCanvas);
    gameContainer.appendChild(playerCanvas);
    gameContainer.appendChild(enemyCanvas);
    gameContainer.appendChild(buildingsCanvas);

    // create contexts and load images
    var gameCtx = gameCanvas.getContext("2d"),
        frontBgCtx = frontBgCanvas.getContext("2d"),
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
    var rearBgImg = document.getElementById("background-sprite");
    var rearBgPosition = { x: 0, y: REAR_BG_POSITION_Y };
    var background = new Background(
        gameCtx,
        rearBgPosition,
        REAR_BG_SPEED,
        rearBgImg);
    var frontBgImg = document.getElementById("front-background");
    var frontBgPosition = { x: 0, y: FRONT_BG_POSITION_Y };
    var frontBackground = new Background(
        frontBgCtx,
        frontBgPosition,
        FRONT_BG_SPEED,
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

    function addEnemy() {
        if(enemiesPool.length) {
            let currentEnemy = enemiesPool[enemiesPool.length - 1];
            if(currentEnemy.rigidBody.coords.x == 600) {
            let newEnemy = new Enemy(enemyCtx);

            enemiesPool.push(newEnemy);
            }

        } else {
            enemiesPool.push(new Enemy(enemyCtx));
        }
    }

    /* // collision function - enemy and hero (use rigidBody.collideWith(otherRigidBody))
     function collides(firstObjectCoords, firstObjectSize, secondObjectCoords, secondObjectSize) {
         return (firstObjectCoords.x > secondObjectCoords.x - secondObjectSize.width + 80 &&
             firstObjectCoords.x - firstObjectSize.width / 2 < secondObjectCoords.x &&
             firstObjectCoords.y > secondObjectCoords.y - secondObjectSize.height / 2)
     }*/

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
            background.speed = REAR_BG_SPEED + heroBody.speed.x;
            background.pan();
            frontBackground.speed = FRONT_BG_SPEED + heroBody.speed.x;
            frontBackground.pan();                

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
            

            // TODO: spawn enemies
            // render and update enemies

            addEnemy();
            for(let i = 0; i < enemiesPool.length; i++) {
                let currentEnemy = enemiesPool[i];
                currentEnemy.move();
                if(currentEnemy.rigidBody.coords.x < -currentEnemy.rigidBody.width) {
                    enemiesPool.shift();
                    i--;
                    continue;
                }
                //collision
                if (currentEnemy && heroBody.collidesWith(currentEnemy.rigidBody)) {

                // return to menu
                $('#game-play').addClass('hidden');
                $('#menu').removeClass('hidden');

                console.log(true);               

                return;
                } /*else {
                    console.log(enemiesPool.length);
                    console.log(currentEnemy.rigidBody.coords.x);
                    console.log(currentEnemy.rigidBody.width);
                }*/
            }
        }
        // check for collision and change states
        // check for collision - enemy and hero

        /*if (heroBody.coords, { width: heroBody.width, height: heroBody.height }, enemy.coords, { width: enemyBody.width, height: enemyBody.height }))*/
 

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});