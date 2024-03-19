// Vivian Kim & Yingting Huang
// Phaser's major components
// Physics system, text objects, animation manager, timers, 

'use strict'

let config = {
    type: Phaser.AUTO,
    height: 980,
    width: 1100,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        },
    },
    scene: [ Title, Play , Credits ]
}

let game = new Phaser.Game(config)

let keySPACE, keyRESET, keyCREDITS, keyUP, keyLEFT, keyRIGHT
let cursors

// global variables
let borderUIsize = game.config.height / 15
let borderPadding = borderUIsize / 3

const middleThirdHeight = game.config.height / 1.5
const middleThirdStartY = (game.config.height - middleThirdHeight) / 2
const leftBorderX = 115
const rightBorderX = game.config.width - 115

const cursorX = 50
const cursorY = 400