class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene")
        
    };

    preload()
    {
        this.load.image('bg', './assets/img/tummybg.png');
        this.load.image('cursor', './assets/img/cursor.png');
        this.load.spritesheet('puppy', './assets/img/puppy.png',
        {
            frameWidth: 140,
            frameHeight: 124
        });
    }

    create()
    {
        this.physics.world.drawDebug = false;
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.sprite = this.add.tileSprite(0, 0, 1100, 980, 'bg').setOrigin(0, 0);
        this.cursor = new Cursor(this, game.config.width / 2, game.config.height / 2, 'cursor', keyLEFT, keyRIGHT).setOrigin(0.5, 0.5);
        this.gameOver = false;
    
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
            key: 'idle-switch', 
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('puppy', {
            start: 1,
            end: 1
            })
        })
        this.anims.create({
            key: 'angry', 
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('puppy', {
            start: 5,
            end: 5
            })
        })
        this.anims.create({
            key: 'angry-switch', 
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('puppy', {
            start: 4,
            end: 4
            })
        })       
        this.anims.create({
            key: 'lay', 
            frameRate: 1,
            repeat: 5 * Phaser.Math.MAX_SAFE_INTEGER,
            frames: this.anims.generateFrameNumbers('puppy', {
            start: 2,
            end: 2
            })
        })
            this.anims.create({
            key: 'tummy-pet', 
            frameRate: 5,
            repeat: 1,
            frames: this.anims.generateFrameNumbers('puppy', {
            start: 2,
            end: 3
            }) 
         })
           
            this.player = this.physics.add.sprite(game.config.width/2, game.config.height*30, 'puppy', 0).setScale(1.5)
              this.player.body.setCollideWorldBounds(true)
              const middleThirdHeight = game.config.height / 1.5;
              const middleThirdStartY = (game.config.height - middleThirdHeight) / 2;
              const leftBorderX = 115;
              const rightBorderX = game.config.width - 115
              this.physics.world.setBounds(leftBorderX, middleThirdStartY, rightBorderX - leftBorderX, middleThirdHeight);
              this.player.body.setSize(140, 124).setOffset(4, 4)
              cursors = this.input.keyboard.createCursorKeys()
              this.moveDirection = 'right';
        
    }       

    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0);
    switch (this.moveDirection) {
        case "right":
            this.player.setVelocityX(100); // Move right
            if (this.player.x === 874) { // 874 (rightmost position)
                this.moveDirection = 'left'; // Change direction to left
                this.player.anims.play('idle-switch', true);
            }
           break;
        case "left":
            this.player.setVelocityX(-100); // Move left
            if (this.player.x === 214) { // Leftmost position
                this.moveDirection = 'right'; // Change direction to right
            }
            break;
    }
    if (!this.isLaying && Phaser.Math.Between(1, 75) === 1) {
        this.player.setVelocityX(0);
        this.player.anims.play('lay', true);
        this.isLaying = true;
        this.time.addEvent({
            delay: 1500,
            callback: () => {
                this.isLaying = false;
                if (this.moveDirection === 'left') {
                    this.player.anims.play('idle-switch', true);
                } else {
                    this.player.anims.play('idle', true);
                }
                this.player.setVelocityX(0);
            },
            callbackScope: this
        });
        }
        if (!this.isAngry && Phaser.Math.Between(1, 100) === 1)
        {
            if (this.moveDirection === 'right') {
                this.player.setVelocityX(0);
                this.player.anims.play('angry-switch', true);
                this.isAngry = true;
            }
            else {
                this.player.setVelocityX(0);
                this.player.anims.play('angry', true);
                this.isAngry = true;
            }
            
            this.time.addEvent({
                delay: 1500,
                callback: () => {
                    this.isAngry = false;
                    if (this.moveDirection === 'left') {
                        this.player.anims.play('idle-switch', true);
                    } else {
                        this.player.anims.play('idle', true);
                    }
                    this.player.setVelocityX(0);
                },
                callbackScope: this
            });
        }
    
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS))
        {
          this.scene.start("creditsScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRESET))
        {
          this.scene.start("titleScene");
        }
        
        if (this.checkCollision(this.player, this.cursor)) {
            if (this.player.anims.currentAnim && this.player.anims.currentAnim.key === 'lay') {
                this.player.anims.play('tummy-pet', true);
                this.cursor.reset();
        }
        this.player.update();
            if (this.player.anims.currentAnim && this.player.anims.currentAnim.key === 'angry') {
                this.gameOver = true;
                this.player.setVelocityX(0);
                this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', this.scoreConfig).setOrigin(0.5).setFontSize(60);
                this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Reset and (C) for Credits', this.scoreConfig).setOrigin(0.5).setFontSize(45);
                return;
        }
    
    }
        playerVector.normalize()
        if (!this.gameOver) {
            this.cursor.update();
        }
        if (this.cursor.y >= game.config.height - 210 && !this.checkCollision(this.player, this.cursor)) {
            this.gameOver = true;
            this.player.setVelocityX(0);
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', this.scoreConfig).setOrigin(0.5).setFontSize(60);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Reset and (C) for Credits', this.scoreConfig).setOrigin(0.5).setFontSize(45);
            return;
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