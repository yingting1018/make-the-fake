class Cursor extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setScale(1.5)
        this.body.setCollideWorldBounds(true)
        this.body.setSize(20, 30).setOffset(35, 60)

        this.isColliding = false
        this.moveSpeed = 4
        this.spaceKeyIsDown = false
    }
    
    update() {
        if (!this.isColliding) {
            if (keyLEFT.isDown && this.x >= borderUIsize + this.width && !this.spaceKeyIsDown) {
                this.x -= this.moveSpeed
            }
            if (keyRIGHT.isDown && this.x <= game.config.width - borderUIsize - this.width && !this.spaceKeyIsDown) {
                this.x += this.moveSpeed
            }
        }
            if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isColliding) {
                this.spaceKeyIsDown = true
            }
            if (this.spaceKeyIsDown && this.y <= game.config.height - 200) {
                this.y += this.moveSpeed // Move downward until it hits border
            }
            if (this.y >= game.config.height - 200) {
                this.reset() // Reset when it hits the border
        }
    }
    
        reset() {
            this.isFiring = false
            this.spaceKeyIsDown = false
            this.y = game.config.height / 3
        }
}