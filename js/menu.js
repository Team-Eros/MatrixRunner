'use strict';


window.addEventListener('load', function() {
    // Menu

    var contentMenu = document.getElementById('menu'),
        templateMenu = document.getElementById('menu-template').innerHTML;

    contentMenu.innerHTML = templateMenu;

    // Create Title 
    var menuBackground = document.getElementById('menu-background'),
        context = menuBackground.getContext('2d'),
        matrixEffectImg = document.getElementById('backgroundEffect');

    var width = window.innerWidth,
        height = window.innerHeight;

    // caanvas size
    menuBackground.width = width;
    menuBackground.height = height;

    // fill background
    context.beginPath();
    context.rect(0, 0, width, height);
    context.fillStyle = "black";
    context.fill();

    // image
    context.drawImage(
        matrixEffectImg,
        0,
        0,
        width - 10,
        height - 10
    );

    function render() {
        context.drawImage(
            this.image,
            0,
            this.coordinates.y
        );

        context.drawImage(
            this.image,
            0,
            this.image.height - Math.abs(this.coordinates.y)
        )
    }

    function update() {
        this.coordinates.y -= 1; // options.sppedY

        if (Math.abs(this.coordinates.y) > this.image.height) {
            this.coordinates.y = 0;
        }
    }

    var menuBackground = {
        image: matrixEffectImg,
        speedY: 1, //  options.speedY
        coordinates: { x: 0, y: 0 },
        render: render,
        update: update
    }

    // return menuBackground;

    function gameLoop() {
        menuBackground.render();
        menuBackground.update();

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();

});