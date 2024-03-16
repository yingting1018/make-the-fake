class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    preload() {
        this.load.image('credsbg', './assets/img/defaultbg.png')
    }

    create() {
        let creditsConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '28px',
            color: '#843605',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // background
        this.credsbg = this.add.tileSprite(0, 0, 1100, 980, 'credsbg').setOrigin(0, 0)
        this.add.text(game.config.width/2, game.config.height/3 - borderUIsize - borderPadding, 'CREDITS:', creditsConfig).setOrigin(0.5).setScale(2);
        this.add.text(game.config.width/2, game.config.height/2.9, 'Art created by Vivian Kim & Yingting Huang', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.5, 'Starting Sound:', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.3, 'https://freesound.org/people/Seth_Makes_Sounds/sounds/685123/', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.36, 'PRESS UP KEY TO PLAY AGAIN', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.3, 'Thank you for playing! <3', creditsConfig).setOrigin(0.5);
        
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
     }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP))
              {
                this.scene.start("titleScene")
              }
    }
}