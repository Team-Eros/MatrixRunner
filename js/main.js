'use strict';

// define constants
const FIELD_WIDTH = 1024,
    FIELD_HEIGHT = 512,
    GLOBAL_FRICTION = 0.3,
    GLOBAL_GRAVITY = 0.4,
    COORDS = { x: 0, y: 0 },
    REAR_BG_POSITION_Y = 35,
    FRONT_BG_POSITION_Y = 80,
    SLOW_TIME_SPEED = 1,
    WALKING_SPEED = 3,
    RUNNING_SPEED = 6,
    NORMAL_BULLET_SPEED = 10,
    SLOW_BULLET_SPEED = 3,
    PIXELS_FOR_METER = 50;

var globalSpeedX = WALKING_SPEED,
    globalRunSpeed = RUNNING_SPEED,
    gloabalBulletSpeed = NORMAL_BULLET_SPEED,
    pixelsRun = 0,
    multiplier = 1;

window.addEventListener('load', function() {

    var width = window.innerWidth,
        height = window.innerHeight,
        gameTimer = 0,
        lastTimer = 0;

    // templates
    var templateMenu = document.getElementById('menu-template').innerHTML,
        templateGameMenu = document.getElementById('game-play-menu').innerHTML;

    // define variables
    var gameContainer = document.getElementById("game-play"),
        menuWrapper = document.getElementById('menuContent'),
        menuContainer = document.getElementById("menu"),
        audio = document.getElementById('audio');

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
    gameContainer.appendChild(buildingsCanvas);

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

    // stop timer if some button is clicked
    stopTimer(gameTimer);

    // add canvas to dom
    menuWrapper.appendChild(menuCanvas);


    // player and player controls
    var hero = new Player(playerCtx),
        heroBody = hero.rigidBody,
        heroSprite = hero.sprite;
    var heroFloor = FIELD_HEIGHT - heroBody.height;
    controlPlayer(heroBody, heroFloor);

    gameMenu(gameTimer);

    // TODO: create buildings spawner
    var buildings = [];
    var buildingRenderer = new BuildingRenderer();

    // TODO: create enemy spawner

    var enemy = new Enemy(enemyCtx),
        enemyBody = enemy.rigidBody,
        enemySprite = enemy.sprite;

    // TODO: create enemies Pool
    var enemiesPool = [];
    enemiesPool.push(enemy);
    var startInterval = 300;

    function addEnemy() {
        if (enemiesPool.length) {
            var currentEnemy = enemiesPool[enemiesPool.length - 1];

            if (currentEnemy.rigidBody.coords.x < startInterval) {
                var newEnemy = new Enemy(enemyCtx);
                enemiesPool.push(newEnemy);
                if (startInterval < 700) {
                    startInterval += 25;
                }
            }
        } else {
            enemiesPool.push(new Enemy(enemyCtx));
        }
    };

    // call storage on enter Name field
    storage(saveScore);

    // storage
    function saveScore() {

        var input = document.querySelector("#playerName input");
        var name = input.value;
        var getTime = document.getElementById('timer').innerHTML;

        var scoresHolder = document.getElementById("score");

        var playerScores = getObjectFromLocalStorage();
        if (!playerScores) {
            playerScores = [];
        }

        playerScores.push({ "name": name, "playerScore": pixelsRun / PIXELS_FOR_METER + 'm', 'totalSeconds': lastTimer, 'time': getTime });
        playerScores.sort(function(a, b) {
            return parseInt(b.playerScore) - parseInt(a.playerScore);
        });

        setObjectToLocalStorage(playerScores);

    }

    function gameLoop() {
        // render and update menu 
        if (menuContainer.className === '') {
            menu
                .render()
                .update();
        }
        if (gameContainer.className === '') {
            //load audio
            audio.play();
            // render and update buildings
            for (var i = 0; i < buildings.length; i += 1) {
                var building = buildings[i];
                building.move();
                if (building.rigidBody.coords.x < -building.rigidBody.width) {
                    buildings.splice(i, 1);
                    i -= 1;
                    continue;
                }
            }

            // render and update player
            var lastHeroCoords = heroBody
                .applyGravity(GLOBAL_GRAVITY, heroFloor) // pulls down
                .decelerate(GLOBAL_FRICTION) // stops object horizontally
                .move();
            hero.switchHeroSprites();
            heroSprite
                .render(heroBody.coords, lastHeroCoords)
                .update();

            // update meters run
            pixelsRun += globalSpeedX;
            var scoreContaner = document.getElementById('score');
            scoreContaner.innerHTML = (pixelsRun / PIXELS_FOR_METER).toFixed(0) + 'm';
            if (pixelsRun > 1000 * multiplier) {
                globalRunSpeed += 1;
                multiplier += 3;
            }

            // render and update background 
            background.speed = globalSpeedX > 0 ? ((globalSpeedX - globalSpeedX * 0.4)) : 0;
            frontBackground.speed = globalSpeedX > 0 ? ((globalSpeedX - globalSpeedX * 0.2)) : 0;

            background.pan();
            frontBackground.pan();

            addEnemy();
            for (var i = 0; i < enemiesPool.length; i++) {
                var currentEnemy = enemiesPool[i];
                currentEnemy.move();

                if (currentEnemy.rigidBody.coords.x < -currentEnemy.rigidBody.width) {
                    enemiesPool.shift();
                    i--;
                    continue;
                }
                //collision

                if (currentEnemy && heroBody.collidesWith(currentEnemy.rigidBody) ||
                    (currentEnemy.bullet && heroBody.collidesWith(currentEnemy.bullet))) {
                    // save in locale storage
                    // clean timer
                    lastTimer = gameTimer.minutes + ':' + gameTimer.seconds;

                    gameTimer.pause();
                    gameTimer.totalSeconds = 0;
                    // return to menu
                    menu.gameOver();
                    return;
                }
            }
        }

        // spawn buildings
        buildingRenderer.spawnBuildings(buildings, buildingsCtx);
        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();

});