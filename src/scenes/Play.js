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

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // mouse bindings
        cursors = this.input.keyboard.createCursorKeys()
        this.moveDirection = 'right'

        // background
        this.playbg = this.add.tileSprite(0, 0, 1100, 980, 'playbg').setOrigin(0, 0)

        this.physics.world.setBounds(leftBorderX, middleThirdStartY, rightBorderX - leftBorderX, middleThirdHeight)
        this.physics.world.drawDebug = true
        this.gameOver = false

        // puppy sprite
        this.puppy = this.physics.add.sprite(game.config.width/2, game.config.height/1.5, 'puppy').setScale(1.5)
            this.puppy.body.setCollideWorldBounds(true)
            this.puppy.body.setSize(115, 120).setOffset(12, 4)

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
        this.cursor = new Cursor(this, game.config.width / 2, game.config.height / 3, 'cursor', keyLEFT, keyRIGHT).setOrigin(0.5, 0.5)

        // temp instructions
        this.add.text(game.config.width / 2, game.config.height / 12 + 100, 'Press arrow keys to move and space to tickle the puppy', this.scoreConfig).setOrigin(0.5).setFontSize(25)

        // tickle counter
        this.tickleCount = 0
        this.tickleCountText = this.add.text(
            game.config.width / 2,
            game.config.height / 12,
            'Tickle Count: 0',
            {
                fontFamily: 'Arial',
                fontSize: '25px',
                color: '#ffffff',
                align: 'center',
            }
        ).setOrigin(0.5);
    }


    update() {
        let puppyVector = new Phaser.Math.Vector2(0, 0)

        switch (this.moveDirection) {
            case "right":
                this.puppy.setVelocityX(150) // Move right
                if (this.puppy.x >= 890) { // 874 (rightmost position)
                    this.moveDirection = 'left' // Change direction to left
                }
            break

            case "left":
                this.puppy.setVelocityX(-150) // Move left
                if (this.puppy.x <= 205) { // Leftmost position
                    this.moveDirection = 'right' // Change direction to right
                }
            break
        }

        if (this.puppy.x >= game.config.width - 115) {
            this.puppyDirection = 'lay' // Set puppy direction to lay when at right boundary
        } else {
            this.puppyDirection = 'idle' // Set puppy direction to idle otherwise
        }
        
        if(this.checkCollision(this.puppy, this.cursor)) {
            console.log('puppy touched')
            this.cursor.reset()

            // increment the tickle count
            this.tickleCount++
            this.tickleCountText.setText(`Tickle Count: ${this.tickleCount}`)
        }

        puppyVector.normalize()
        if (!this.gameOver) {
            this.cursor.update()
        }
        
        // check if cursor is 
        if (this.cursor.y >= game.config.height - 210 && !this.checkCollision(this.puppy, this.cursor)) {
            this.gameOver = true
            this.puppy.setVelocityX(0)
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', this.scoreConfig).setOrigin(0.5).setFontSize(60)
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Reset and (C) for Credits', this.scoreConfig).setOrigin(0.5).setFontSize(45)
        }

        // change scenes
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {
            this.scene.start("creditsScene")
        }
        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.start("titleScene")
        }
    }

    checkCollision(puppy, cursor) {
        if (puppy.x < cursor.x + cursor.width && 
          puppy.x + puppy.width > cursor.x && 
          puppy.y + 100 < cursor.y + cursor.height &&
          puppy.height + puppy.y + 100 > cursor.y) {
          return true
        } else {
          return false
        }
    }
}