class GameState {
    menu() {
        // menu state
        // go to play, credits, score state
    }
    credits() {
        // credits state
        // go to menu state
    }
    score() {
        // score board state
        // go to menu state
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