// creates control functionality for any rigidBody object
'use strict';

// control menu
function controlMenu() {
    var active = $('.btn-active') ||
        $('.dropdownItemContainer li');

    $(document).on('keydown', handler);
    $('.dropdownItemContainer').on('mouseover', handler);
    $('.menu-btn').on('click', function() {
        var $active = $(this);
        if ($active.is('#creditsBtn')) {
            $('#menu').addClass('hidden');
            $('#credits').removeClass('hidden');
        }

        if ($active.is('#startBtn')) {
            $('.menu-btn').addClass('hidden');
            $('.level-btn').removeClass('hidden');
        }

        if ($active.is('#scoreBtn')) {
            $('#menu').addClass('hidden');
            $('#scoreboard').removeClass('hidden');
        }

    });

    // click load btn 
    $('#loadBtn').on('click', function() {
        $(this).trigger('startTimer');
        $('#menuContent').addClass('hidden');
        $('#game-play').removeClass('hidden');

    });

    // click on level btn 

    $(".level-btn").on('click', function() {
        var $active = $(this);

        // TODO: add speed for buildings on click
        if ($active.is('#easyLvl')) {}
        if ($active.is('#normaLvl')) {}
        if ($active.is('#normaLvl')) {}

        $('#menuContent').addClass('hidden');
        $('#game-play').removeClass('hidden');
    });
    // up - down hover 
    function handler(e) {
        active.removeClass('btn-active');

        if (e.which === 40) {
            active = active.next() || active;
        } else if (e.which === 38) {
            active = active.prev() || active;
        } else if (e.which === 13) {

            // New Game 
            if (active.is('#startBtn')) {
                $('.menu-btn').addClass('hidden');
                $('.level-btn').removeClass('hidden');
            }

            // Credits
            if (active.is('#creditsBtn')) {
                $('#menu').addClass('hidden');
                $('#credits').removeClass('hidden');
            }

            // Easy
            if (active.is('#easyLvl')) {
                // TODO: add speed on buildings
                $('#menuContent').addClass('hidden');
                $('#game-play').removeClass('hidden');
            }

            // Normal
            if (active.is('#normaLvl')) {

                // TODO: add speed on buildings
                $('#menuContent').addClass('hidden');
                $('#game-play').removeClass('hidden');
            }

            // Hard
            if (active.is('#hardLvl')) {

                // TODO: add speed on buildings
                $('#menuContent').addClass('hidden');
                $('#game-play').removeClass('hidden');
            }

            // Load
            if (active.is('#loadBtn')) {

                $('#menuContent').addClass('hidden');
                $('#game-play').removeClass('hidden');
            }

        } else {

            active = $(e.target);
        }
        active.addClass('btn-active');
    }
}

// credits 

function controlCredits(element) {
    $('.back-menu').on('click', function() {
        $(element).addClass('hidden');
        $('#menu').removeClass('hidden');
    })

    //exit
    $(document).on('keydown', function(e) {
        if (e.which === 27) {
            $(element).addClass('hidden');
            $('#menu').removeClass('hidden');
        }
    });
}
// game menu
function gameMenu(timer) {
    var timerId = timer;
    // play/pause button
    $('.pause-game').on('click', function() {
        var $this = $(this);
        if ($('#game-play').hasClass('pause-loop')) {
            $('#game-play').removeClass('pause-loop');
            $this
                .find('img')
                .attr('src', './assets/images/pause.png');
            timer.resume();
        } else {
            $('#game-play').addClass('pause-loop');
            $this
                .find('img')
                .attr('src', './assets/images/play.png');
            timer.pause();
        }
    });

    // back menu
    $('.back-menu').on('click', function() {
        $(this).trigger('stopTimer');
        // hide level menu
        $('.menu-btn').removeClass('hidden');
        $('.level-btn').addClass('hidden');
        $('#loadBtn').removeClass('hidden');

        // hide game-play window
        $('#game-play').addClass('hidden');
        $('#menuContent').removeClass('hidden');
    });

    //exit
    $(document).on('keydown', function(e) {
        if (e.which === 27) {
            $('#game-play').addClass('hidden');
            $('#menuContent').removeClass('hidden');
        }
    });
}


function gameOverControl() {
    $(document).on('keydown', function(e) {
        if (e.which === 13) {

            $(this).trigger('onEnter');
            var value = $('#playerName input').val();
            $('#playerName').addClass('hidden');
            $('#getPlayerName').html(value).removeClass('hidden');

            // clean 
            $('#playerName input').val('');
        }
    });

    $('.try-again').on('click', function() {
        window.location.reload();
    });

    $('.scores-result').on('click', function() {
        $('#game-over').addClass('hidden');
        $('#scoreboard').removeClass('hidden');
    })
}

// check if back in menu
function stopTimer(callback) {
    $(document).on('stopTimer', function() {
        callback.pause();
    });

    $(document).on('stopTimer', function() {
        callback.resume();
    });
}

function storage(callback) {
    $(document).on('onEnter', function() {
        callback();
    });
}


function controlPlayer(body, floor) {
    window.addEventListener('keydown', function(ev) {
        switch (ev.which) {
            case 37:
                // if (body.coords.x <= 0) {
                //     body.coords.x = 0;
                //     body.speed.x = 0;
                //     return;
                // }
                //body.speed.x = -body.impulse.x;
                gloabalBulletSpeed = SLOW_BULLET_SPEED;
                globalSpeedX = SLOW_TIME_SPEED;
                break;
            case 38:
                jump();
                break;
            case 32:
                jump();
                break;
            case 39:
                //body.speed.x = body.impulse.x;
                globalSpeedX = globalRunSpeed;
                gloabalBulletSpeed = NORMAL_BULLET_SPEED + globalRunSpeed - RUNNING_SPEED;
                break;
            case 40:
                globalSpeedX = 0;
                break;
            default:
                body.speed.x = 0;
                body.speed.y = 0;
                break;
        }
    });

    function jump() {
        if (body.coords.y < floor - 2 * body.height || body.speed.y > 0) {
            return;
        }
        body.speed.y = -body.impulse.y;
    }

    window.addEventListener('keyup', function(ev) {
        if (ev.which === 39) {
            globalSpeedX = WALKING_SPEED;
        }
        if (ev.which === 37) {
            gloabalBulletSpeed = NORMAL_BULLET_SPEED;
            globalSpeedX = WALKING_SPEED;
        }
        //if (ev.which !== 38 && body.y >= floor - 26) {
        //    friction = GLOBAL_FRICTION;
        //}
    });
}