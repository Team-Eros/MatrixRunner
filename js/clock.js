'use strict';

class Clock {
    constructor(content, totalSeconds, minutes, seconds) {
        this.content = content;
        this.totalSeconds = totalSeconds || 0;
        this.minutes = minutes || 0;
        this.seconds = seconds || 0;
    }
    get content() {
        return this._content;
    }
    set content(value) {
        this._content = value;
    }

    get totalSeconds() {
        return this._totalSeconds;
    }

    set totalSeconds(value) {
        this._totalSeconds = value;
    }

    get minutes() {
        return this._minutes;
    }

    set minutes(value) {
        this._minutes = value;
    }

    get seconds() {
        return this._seconds;
    }

    set seconds(value) {
        this._seconds = value;
    }
    start() {
        var self = this;

        this.interval = setInterval(function() {
            self.totalSeconds += 1;

            self.minutes = parseInt(self.totalSeconds / 60, 10)
            self.seconds = parseInt(self.totalSeconds % 60, 10);

            self.minutes = self.minutes < 10 ? "0" + self.minutes : self.minutes;
            self.seconds = self.seconds < 10 ? "0" + self.seconds : self.seconds;

            self.content.text(self.minutes + ":" + self.seconds);
        }, 1000);

        return this;

    }

    pause() {
        clearInterval(this.interval);
        delete this.interval;

        return this;
    }

    resume() {
        if (!this.interval) this.start();

        return this;
    }
}