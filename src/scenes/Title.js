class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    preload() {
        this.load.audio('bg', './assets/audio/pupbgmusic.wav')
        this.load.image('titlebg', './assets/img/titlebg.png')
    }

    create() {
        // keyboard bindings
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)

        // background
        let bgmusic = this.sound.add('bg', {volume: 0.3})
            bgmusic.play()
            bgmusic.setLoop(true)
        this.titlebg = this.add.tileSprite(0, 0, 1100, 980, 'titlebg').setOrigin(0, 0)

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px'
        }

        this.add.text(game.config.width/2.5, game.config.height/1.45 - borderUIsize - borderPadding, 'PRESS ARROW UP\n TO START', menuConfig).setOrigin(0.5)
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start("playScene")
            this.sound.stopByKey('bg')
        }
    }
}