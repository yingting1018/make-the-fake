class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene")
    };

    preload()
    {
        this.load.image('bg', './assets/img/tummybg.png')
        this.load.spritesheet('puppy', './assets/img/puppy.png', {
            frameWidth: 140,
            frameHeight: 124
        })
        this.load.spritesheet('cursor', './assets/img/cursor.png', {
            frameWidth: 67,
            frameHeight: 91
        })
    }

    create()
    {
        this.physics.world.drawDebug = false;
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.sprite = this.add.tileSprite(0, 0, 1100, 980, 'bg').setOrigin(0, 0);

        this.anims.create({
            key: 'idle', 
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('puppy', {
                start: 0,
                end: 0
            })
        })
    
        this.anims.create({
            key: 'lay', 
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('puppy', {
                start: 0,
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

        this.cursor = this.physics.add.sprite(game.config.width/12, game.config.height/2, 'cursor', 1).setScale(1.5)

            this.player = this.physics.add.sprite(game.config.width/12, game.config.height/2, 'puppy', 1).setScale(1.5)
            this.player.body.setCollideWorldBounds(true)
            const middleThirdHeight = game.config.height / 2.5
            const middleThirdStartY = (game.config.height - middleThirdHeight) / 2
            const leftBorderX = 115
            const rightBorderX = game.config.width - 115
            this.physics.world.setBounds(leftBorderX, middleThirdStartY, rightBorderX - leftBorderX, middleThirdHeight)
            this.player.body.setSize(140, 124).setOffset(4, 4)
            cursors = this.input.keyboard.createCursorKeys()
            //this.moveDirection = 'right'; // Change this to your desired initial direction
            this.moveDirection = 'right';
            
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0)
        switch (this.moveDirection) {
            case 'right':
                this.player.setVelocityX(100); // Move right
                if (this.player.x >= game.config.width - 115) {
                    this.moveDirection = 'left'; // Change direction to left
                }
                break;
            case 'left':
                this.player.setVelocityX(-100); // Move left
                if (this.player.x <= 115) {
                    this.moveDirection = 'right'; // Change direction to right
                }
                break;
        }
        if (this.player.x >= game.config.width - 115) {
            this.playerDirection = 'lay'; // Set player direction to lay when at right boundary
        } else {
            this.playerDirection = 'idle'; // Set player direction to idle otherwise
        }
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS))
        {
          this.scene.start("creditsScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRESET))
        {
          this.scene.start("titleScene");
        }
        // playerVector.normalize()

        // this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        // let playerMovement
        // playerVector.length() ? playerMovement = 'lay' : playerMovement = 'idle'
        // this.player.play(playerMovement + '-' + playerDirection, true)

    }
}