class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    preload() {
    
    }

    create() {
        let creditsConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '28px',
            backgroundColor: '#FFC0CB',
            color: '#843605',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/3 - borderUIsize - borderPadding, 'CREDITS:', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.5, 'https://freesound.org/people/Seth_Makes_Sounds/sounds/685123/', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press up key to go to title', creditsConfig).setOrigin(0.5);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
     }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP))
              {
                this.scene.start("titleScene")
              }
    }
}