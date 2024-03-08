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

let borderUIsize = game.config.height / 15
let borderPadding = borderUIsize / 3

let keySPACE, keyRESET, keyCREDITS, keyUP
let cursors