class Puppy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setScale(1.5)
        this.body.setCollideWorldBounds(true)
        this.body.setSize(115, 120).setOffset(12, 4)

        // Animations for the puppy
        scene.anims.create({
            key: 'idle',
            frameRate: 0,
            repeat: -1,
            frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 0 })
        })

        scene.anims.create({
            key: 'lay',
            frameRate: 1,
            repeat: 5 * Phaser.Math.MAX_SAFE_INTEGER,
            frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 1 })
        })

        scene.anims.create({
            key: 'tummy-pet',
            frameRate: 2,
            repeat: -1,
            frames: scene.anims.generateFrameNumbers(texture, { start: 1, end: 2 })
        })

        // Set default animation
        this.anims.play('idle', true)
    }

    update() {
        // Add any specific update logic for the puppy here
    }
}