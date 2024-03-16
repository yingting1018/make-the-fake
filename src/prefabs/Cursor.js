class Cursor extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)

        this.isColliding = false
        this.moveSpeed = 4
        this.spaceKeyIsDown = false
        this.setScale(1.5)
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