'use strict';

/* GLOBAL VARIABLES */
var scorePlayersKey = "scorePlayersKey";

/*  METHODS */

// Put the object into storage
function setObjectToLocalStorage(value, objectKey) {
    var key = objectKey || scorePlayersKey;
    localStorage.setItem(key, JSON.stringify(value));
}

// Retrieve the object from storage
function getObjectFromLocalStorage(objectKey) {
    var key = objectKey || scorePlayersKey;
    var retrievedObject = localStorage.getItem(key);
    return JSON.parse(retrievedObject);
}