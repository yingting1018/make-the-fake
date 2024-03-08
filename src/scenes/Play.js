class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {
        this.load.image('playbg', './assets/img/playbg.png')
        this.load.spritesheet('puppy', './assets/img/puppy.png', {
            frameWidth: 140,
            frameHeight: 124
        })
        this.load.spritesheet('cursor', './assets/img/cursor.png', {
            frameWidth: 67,
            frameHeight: 91
        })
    }

    create() {
        // keyboard bindings
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // mouse bindings
        cursors = this.input.keyboard.createCursorKeys()
        this.moveDirection = 'right'

        // background
        this.playbg = this.add.tileSprite(0, 0, 1100, 980, 'playbg').setOrigin(0, 0)

        this.physics.world.drawDebug = false
        this.physics.world.setBounds(leftBorderX, middleThirdStartY, rightBorderX - leftBorderX, middleThirdHeight)

        // puppy sprite
        this.puppy = this.physics.add.sprite(game.config.width/4, game.config.height/1.65, 'puppy').setScale(2)
            this.puppy.body.setCollideWorldBounds(true)
            this.puppy.body.setSize(120, 120).setOffset(12, 4)

            // animation of puppy
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

        // cursor sprite
        this.cursor = this.physics.add.sprite(game.config.width/12, game.config.height/2, 'cursor', 1).setScale(1.5) 
    }

    update() {
        let puppyVector = new Phaser.Math.Vector2(0, 0)

    switch (this.moveDirection) {
        case "right":
            this.puppy.setVelocityX(100) // Move right
            if (this.puppy.x === 874) { // 874 (rightmost position)
                console.log("swapped")
                this.moveDirection = 'left' // Change direction to left
            }
           break
        case "left":
            this.puppy.setVelocityX(-100) // Move left
            console.log("Left movement triggered") // Check if left case is triggered
            if (this.puppy.x === 214) { // Leftmost position
                this.moveDirection = 'right' // Change direction to right
            }
    }
        if (this.puppy.x >= game.config.width - 115) {
            this.puppyDirection = 'lay' // Set player direction to lay when at right boundary
        } else {
            this.puppyDirection = 'idle' // Set player direction to idle otherwise
        }
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS))
        {
          this.scene.start("creditsScene")
        }
        if (Phaser.Input.Keyboard.JustDown(keyRESET))
        {
          this.scene.start("titleScene")
        }
        puppyVector.normalize()

        // this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        // let playerMovement
        // playerVector.length() ? playerMovement = 'lay' : playerMovement = 'idle'
        // this.player.play(playerMovement + '-' + playerDirection, true)

    }
}