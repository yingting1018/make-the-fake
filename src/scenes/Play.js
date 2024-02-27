class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene")
    };

    preload()
    {
        this.load.image('bg', './assets/img/tummybg.png');
        this.load.spritesheet('puppy', './assets/img/puppy.png',
        {
            frameWidth: 300,
            frameHeight: 300
        });
    }

    create()
    {
        this.physics.world.drawDebug = false;
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.sprite = this.add.tileSprite(0, 0, 1100, 980, 'bg').setOrigin(0, 0);

        this.anims.create({
            key: 'idle-Stand', 
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('puppy', {
            start: 0,
            end: 0
            })
            })
    
            this.anims.create({
                key: 'lay-down', 
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('puppy', {
                start: 1,
                end: 1
                })
            })
                this.anims.create({
                key: 'tummy-pet', 
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('puppy', {
                start: 1,
                end: 2
              })
            })
            this.player = this.physics.add.sprite(game.config.width/12, game.config.height/2, 'puppy', 1).setScale(1.5)
              this.player.body.setCollideWorldBounds(true)
              const middleThirdHeight = game.config.height / 2.5;
              const middleThirdStartY = (game.config.height - middleThirdHeight) / 2;
              this.physics.world.setBounds(0, middleThirdStartY, game.config.width, middleThirdHeight);
              this.player.body.setSize(30, 30).setOffset(4, 4)
              cursors = this.input.keyboard.createCursorKeys()
    }
}