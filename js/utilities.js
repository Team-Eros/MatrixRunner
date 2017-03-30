'use strict';

var matrixEffectImg = document.getElementById('backgroundEffect');

class GameState {
    constructor(content, template, coords, backgroundCtx, speedY, image) {
        this._content = content; // #menu
        this.template = template; // #menu-template
        this.context = backgroundCtx; // // menu-backgound
        this.coordinates = coords || { x: 0, y: 0 };
        this.speedY = speedY || 1;
        this.image = matrixEffectImg; // backgroundEffect
    }

    get content() {
        return this._content;
    }

    get template() {
        return this._template;
    }

    set template(value) {
        this._template = value;
    }
    get context() {
        return this._context;
    }
    set context(value) {
        this._context = value;
    }
    get coordinates() {
        return this._coordinates;
    }

    set coordinates(value) {
        this._coordinates = value;
    }
    get speedY() {
        return this._speedY;
    }

    set speedY(value) {
        this._speedY = value;
    }

    render() {
        this.context.drawImage(
            this.image,
            0,
            this.coordinates.y
        );

        this.context.drawImage(
            this.image,
            0,
            Math.abs(this.coordinates.y) - this.image.height
        );

        return this;
    };

    update() {
        this.coordinates.y += this.speedY; // options.sppedY

        if (Math.abs(this.coordinates.y) > this.image.height) {
            this.coordinates.y = 0;
        }

        return this;
    }


    menu() {
        // menu state
        // go to play, credits, score state

        // data 

        var data = {
            menu: [{
                    option: 'Load',
                    id: 'loadBtn',
                    state: 'hidden'
                },
                {
                    option: 'New Game',
                    id: 'startBtn',
                    state: 'btn-active menu-btn'
                },
                {
                    option: 'Credits',
                    id: 'creditsBtn',
                    state: 'menu-btn'
                },
                {
                    option: 'Scores',
                    id: 'scoreBtn',
                    state: 'menu-btn'
                },

                {
                    option: 'Easy',
                    id: 'easyLvl',
                    state: 'hidden level-btn'
                },

                {
                    option: 'Normal',
                    id: 'normaLvl',
                    state: 'hidden level-btn'
                },
                {
                    option: 'Hard',
                    id: 'hardLvl',
                    state: 'hidden level-btn'
                }
            ]
        };
        // compile template 
        var hbTemplate = Handlebars.compile(this.template);

        this.content.innerHTML = hbTemplate(data);

        // keyboards and mouse control
        controlMenu();

        return this;
    }
    credits() {

        // credits state
        // go to menu state
        var data = {
            code: [
                'Zahari Dimitrov',
                'Doroteya Nikolova',
                'Viliana Zhilkova',
                'Ivan Iliev',
                'Svetlomir Balevski',
                'Anna Yanakieva',
                'Cvetan Karadjov'
            ],
            art: [],
            produces: []
        };

        var content = document.getElementById('credits');
        var template = document.getElementById('credits-menu').innerHTML;

        // compile template 
        var hbTemplate = Handlebars.compile(template);

        content.innerHTML = hbTemplate(data);

        // keyboards and mouse control
        controlCredits('#credits');
    }

    // timer on game 
    timer() {
        var content = $('#timer');

        return new Clock(content, 0);
    }

    score() {
        var data = getObjectFromLocalStorage();

        // add helpers to start index from 1
        Handlebars.registerHelper("inc", function(value, options) {
            return parseInt(value) + 1;
        });

        // score board state
        // go to menu state
        var $content = $('#scoreboard'),
            $template = $('#scores-template').html();
        // compile template 
        var hbTemplate = Handlebars.compile($template);

        $content.html(hbTemplate(data));


        controlCredits('#scoreboard');


    }

    gameOver() {

        var data = getObjectFromLocalStorage();
        var $content = $('#game-over'),
            $template = $('#game-over-template').html();
        $content.html($template);

        if (!data) {
            data = [];
        }
        // Show results
        if (data.length !== 0) {
            $("#best-scores").html(data[0].playerScore);
        }


        var $lastTimer = $('#timer').html();
        $("#last-time").html($lastTimer);

        var $currentScore = $('#score').html();
        $('#current-score').html($currentScore);

        // hide gameover template
        $('#game-play').addClass('hidden');
        $('#menu').addClass('hidden');
        $('#menuContent').removeClass('hidden');
        $content.removeClass('hidden');

        // control enter input
        gameOverControl();

        //audio pause
        audio.pause();
    }
    pause() {
        // pause state
        // go to play state
    }
    play() {
        // play state
        // go to pause, win or lost state
    }
    lost() {
        // lost state
        // go to menu state
    }
    winner() {
        // win state
        // go to menu state
    }
}