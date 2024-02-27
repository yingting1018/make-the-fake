'use strict';
let config = {
    type: Phaser.AUTO,
    height: 980,
    width: 1100,
    render:
    {
        pixelArt: true
    },
    scene: [ Title, Play ]
}
let game = new Phaser.Game(config)