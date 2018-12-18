var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var cursors;
var player;
var x;
var y;
var keySpace;
var rect;
var graphics;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('block', 'assets/a.png');
}

function create ()
{
    x = 300;
    y = 300;
    cursors = this.input.keyboard.createCursorKeys();

    player = this.physics.add.image(x, y, 'block');

    player.setCollideWorldBounds(true);
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    rect = new Phaser.Geom.Rectangle(player.x, player.y, 50, 50);
    graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
}

function update ()
{
    player.setVelocity(0);

    if (cursors.left.isDown)
    {
        player.setVelocityX(-300);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(300);
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-300);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(300);
    }
    if(keySpace.isDown){
        rect = new Phaser.Geom.Rectangle(player.x, player.y, 50, 50);
        graphics.fillRectShape(rect);
    }
}
