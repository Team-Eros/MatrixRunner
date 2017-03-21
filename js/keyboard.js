// creates control functionality for any rigidBody object

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