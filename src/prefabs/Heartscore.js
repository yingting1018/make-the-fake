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

        this.maxHearts = 3 // Maximum number of hearts
        this.hearts = []
        this.currentHeartIndex = 0
    }

    update() {
        // Add any specific update logic for the puppy here
    }

    ticklePuppy() {
        // Play the filling animation for the current heart
        this.hearts[this.currentHeartIndex].anims.play('filling-heart', true)

        // Move to the next heart
        this.currentHeartIndex++
        if (this.currentHeartIndex >= this.maxHearts) {
            this.currentHeartIndex = 0 // Reset to the first heart
        }
    }

    addHearts(numberOfHearts) {
        const heartSpacing = 80
        const startX = this.x - (heartSpacing * (numberOfHearts - 1) / 2)

        for (let i = 0; i < numberOfHearts; i++) {
            const heart = this.scene.add.sprite(startX + i * heartSpacing, this.y, 'heartscore')
            heart.setScale(3)
            heart.setFrame(0) // Set initial frame to empty heart
            this.hearts.push(heart)
        }
    }

    setHeartsPerTick(hearts) {
        // Set hearts per tick to the specified value
        this.heartsPerTick = hearts;
    }
}