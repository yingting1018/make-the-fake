class Title extends Phaser.Scene 
{
    constructor()
    {
        super("titleScene")
    }
    preload()
    {
        this.load.audio('bg', './assets/audio/pupbgmusic.wav')
        this.load.image('titlebg', './assets/img/titlebg.png');
    }
    create()
    {
        this.sprite = this.add.tileSprite(0, 0, 1100, 980, 'titlebg').setOrigin(0,0);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        let bgmusic = this.sound.add('bg', { volume: 0.3});
        bgmusic.play();
        bgmusic.setLoop(true);
    }
    update()
    {
        if (Phaser.Input.Keyboard.JustDown(keyUP))
        {
            this.scene.start("playScene");
            this.sound.stopByKey('bg');
        }
    }
    
}