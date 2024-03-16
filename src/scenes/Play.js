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
        this.load.spritesheet('heartscore', './assets/img/heartscore.png', {
            frameWidth: 30,
            frameHeight: 30
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
        this.isLaying = false
        this.isTickling = false


        this.puppy = new Puppy(this, game.config.width / 2, game.config.height / 1.5, 'puppy')
        this.cursor = new Cursor(this, game.config.width / 2, game.config.height / 3, 'cursor', keyLEFT, keyRIGHT).setOrigin(0.5, 0.5)
        this.heartscore = new Heartscore(this, game.config.width / 2, game.config.height / 12 + 100, 'heartscore')

        // temp instructions
        // this.add.text(game.config.width / 2, game.config.height / 12 + 100, 'Press arrow keys to move and space to tickle the puppy', this.scoreConfig).setOrigin(0.5).setFontSize(25)
    }

    update() {
        let puppyVector = new Phaser.Math.Vector2(0, 0)
        this.puppy.update()


        // Puppy movement
        if (!this.isTickling) {
            switch (this.moveDirection) {
                case "right":
                    this.puppy.setVelocityX(150) // Move right
                    this.puppy.flipX = false
                    if (this.puppy.x >= 890) { // 874 (rightmost position)
                        this.moveDirection = 'left' // Change direction to left
                    }
                    break
        
                case "left":
                    this.puppy.setVelocityX(-150) // Move left
                    this.puppy.flipX = true
                    if (this.puppy.x <= 205) { // Leftmost position
                        this.moveDirection = 'right' // Change direction to right
                    }
                    break
            }
        }

        // When puppy is being tickled/collision
        if (!this.isTickling && this.checkCollision(this.puppy, this.cursor)) {
            this.isTickling = true
            this.puppy.setVelocityX(0)
            this.puppy.anims.play('tummy-pet', true)
            this.cursor.reset()

            // Increment the heartscore
            this.heartscore.anims.play('filling-heart', true)

            
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.puppy.anims.play('idle', true)
                    this.puppy.setVelocityX(150)
                    this.isTickling = false
                },
                callbackScope: this,
                loop: false
            })
        }

        puppyVector.normalize()
        if (!this.gameOver) {
            this.cursor.update()
        }
        
        // Check if cursor is off screen
        if (this.cursor.y >= game.config.height - 210 && !this.checkCollision(this.puppy, this.cursor)) {
            this.gameOver = true
            this.puppy.setVelocityX(0)
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', this.scoreConfig).setOrigin(0.5).setFontSize(60)
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Reset and (C) for Credits', this.scoreConfig).setOrigin(0.5).setFontSize(45)
        }

        // Change scenes
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