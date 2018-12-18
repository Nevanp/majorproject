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

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('block', 'assets/a.png');
}

function create ()
{
    cursors = this.input.keyboard.createCursorKeys();

    player = this.physics.add.image(400, 300, 'block');

    player.setCollideWorldBounds(true);
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
}
