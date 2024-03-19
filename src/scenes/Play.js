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
        this.load.image('tummybonustext', './assets/img/tummybonus.png')
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
        
        this.heartscore = new Heartscore(this, game.config.width / 4, game.config.height / 12 + 100, 'heartscore')
        this.heartscore.addHearts(3)

        // Score/HeartCounter
        this.heartCounter = 0
        this.heartCounterText = this.add.text(
            game.config.width / 6, 
            game.config.height / 12 + 150, 
            `Hearts Ticked: ${this.heartCounter}`,
            { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' }
        )
        
        this.time.addEvent( {
            delay: Phaser.Math.Between(10000, 20000),
            callback: this.activateAngryMode,
            callbackScope: this,
            loop: true
        })
        // temp instructions
        // this.add.text(game.config.width / 2, game.config.height / 12 + 100, 'Press arrow keys to move and space to tickle the puppy', this.scoreConfig).setOrigin(0.5).setFontSize(25)
    }

    update() {
        let puppyVector = new Phaser.Math.Vector2(0, 0)
        this.puppy.update()


        // Puppy movement
        if (!this.isTickling && !this.gameOver) {
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
        } else {
            this.puppy.setVelocity(0)
        }

        // When puppy is being tickled/collision
        if (!this.isTickling && this.checkCollision(this.puppy, this.cursor)) {
            if (!this.puppy.isAngry) {
                this.isTickling = true
                this.puppy.setVelocityX(0)
                this.puppy.anims.play('tummy-pet', true)
                
                this.cursor.moveSpeed = 0

                // Increment the heartscore/counter
                this.heartscore.ticklePuppy()

                this.heartCounter++
                this.updateHeartCounterText()
                
                this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.puppy.anims.play('idle', true)
                        this.puppy.setVelocityX(150)
                        this.isTickling = false
                        this.cursor.reset()
                        this.cursor.moveSpeed = 4
                    },
                    callbackScope: this,
                    loop: false
                })
            }
        }

        puppyVector.normalize()
        if (!this.gameOver) {
            this.cursor.update()
        }
        
        // Check if cursor is off screen
        if (!this.gameOver) {
            if (this.cursor.y >= game.config.height - 250 && !this.checkCollision(this.puppy, this.cursor)) {
                this.gameOver = true
                this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', this.scoreConfig).setOrigin(0.5).setFontSize(60).setBackgroundColor('#fb67df')
                this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Keep tickling the puppy!\nPress (R) to Reset and (C) for Credits', this.scoreConfig).setOrigin(0.5).setFontSize(30).setBackgroundColor('#fb67df')

            }
            if (this.puppy.isAngry && this.checkCollision(this.puppy, this.cursor)) {
                this.puppy.setVelocityX(0)
                this.gameOver = true
                this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', this.scoreConfig).setOrigin(0.5).setFontSize(60).setBackgroundColor('#fb67df')
                this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Do not tickle the puppy when angry!\nPress (R) to Reset and (C) for Credits', this.scoreConfig).setOrigin(0.5).setFontSize(30).setBackgroundColor('#fb67df')
            }
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
        const puppyBounds = puppy.getBounds()
        const cursorBounds = cursor.getBounds()

        const cursorX = cursorBounds.x + cursorBounds.width
        const cursorY = cursorBounds.y + cursorBounds.height - 150

        return puppyBounds.contains(cursorX, cursorY)
    }

    updateHeartCounterText() {
        this.heartCounterText.setText(`Hearts Ticked: ${this.heartCounter}`)
    }

    activateAngryMode() {
        // Set the puppy to angry mode
        this.puppy.isAngry = true
        this.puppy.anims.play('angry', true)

        // Set a timer to return the puppy to normal state after 3 to 5 seconds
        const duration = Phaser.Math.Between(3000, 5000) // Random duration between 3 to 5 seconds
        this.time.addEvent({
            delay: duration,
            callback: this.deactivateAngryMode,
            callbackScope: this
        })

        this.time.addEvent({
            delay: Phaser.Math.Between(10000, 20000),
            callback: this.activateAngryMode,
            callbackScope: this
        })
    }

    deactivateAngryMode() {
        // Return the puppy to normal state
        this.puppy.isAngry = false
        this.puppy.anims.play('idle', true)
    }

}