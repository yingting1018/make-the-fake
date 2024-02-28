class Title extends Phaser.Scene 
{
    constructor()
    {
        super("titleScene")
    }
    create()
    {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141'
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUIsize - borderPadding, 'woof', menuConfig).setOrigin(0.5);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }
    update()
    {
        if (Phaser.Input.Keyboard.JustDown(keyUP))
        {
            this.scene.start("playScene");
        }
    }
    
}