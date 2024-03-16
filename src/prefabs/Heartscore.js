class Heartscore extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        scene.add.existing(this)
        this.setScale(3)

        // Animations
        scene.anims.create({
            key: 'filling-heart',
            frameRate: 20,
            repeat: 0,
            frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 9 })
        })
    }

    update() {
        // Add any specific update logic for the puppy here
    }
}