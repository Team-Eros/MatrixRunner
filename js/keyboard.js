// creates control functionality for any rigidBody object
'use strict';

// control menu

function controlMenu() {
    var active = $('.btn-active') ||
        $('.dropdownItemContainer li');

    $(document).on('keydown', handler);
    $(document).on('mouseover', handler);
    $('#startBtn').on('click', function() {
        $('#menu').addClass('hidden');
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
            if (active.is('#startBtn')) {
                $('#menu').addClass('hidden');
                $('#game-play').removeClass('hidden');
            }
        } else {

            active = $(e.target);
        }
        active.addClass('btn-active');
    }
}

function control(body) {
    window.addEventListener('keydown', function(ev) {
        console.log(ev.which);
        switch (ev.which) {
            case 37:
                if (body.coords.x <= 0) {
                    body.coords.x = 0;
                    body.speed.x = 0;
                    return;
                }
                body.speed.x = -body.impulse.x;
                break;
            case 38:
                jump();
                break;
            case 32:
                jump();
                break;
            case 39:
                body.speed.x = body.impulse.x;
                break;
            case 40:
                body.speed.y = body.impulse.y;
                break;
            default:
                body.speed.x = 0;
                body.speed.y = 0;
                break;
        }
    });

    function jump() {
        let floor = FIELD_HEIGHT - body.height - 26;
        if (body.coords.y < floor - body.height || body.speed.y > 0) {
            return;
        }
        body.speed.y = -body.impulse.y;
    }

    // window.addEventListener('keyup', function(ev) {
    //     if (ev.which !== 38 && body.y >= floor - 26) {
    //         friction = GLOBAL_FRICTION;
    //     }
    // });
}