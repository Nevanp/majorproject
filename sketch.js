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
var tear;
var graphics;
var checkKey;
var keyA;
var keyW;
var keyD;
var keyS;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('isaac', 'assets/isaac.png');
    this.load.image('tear', 'assets/teardrop1.png');
    this.load.image('background', 'assets/room.png');
}

function create ()
{
    this.add.image(0,0,'backround')
    x = 300;
    y = 300;
    cursors = this.input.keyboard.createCursorKeys();
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    

    player = this.physics.add.image(x, y, 'isaac');
    player.displayOriginX = (40);
    player.displayOriginY = (20);

    player.setCollideWorldBounds(true);
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
}

function update ()
{
    player.setVelocity(0);

    if (cursors.left.isDown)
    {
        player.setVelocityX(-300);
        checkKey = "left";
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(300);
        checkKey = "right";
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-300);
        checkKey = "up";
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(300);
        checkKey = "down";
    }
    
    if(keyS.isDown){
        tear = this.physics.add.image(player.x, player.y, 'tear');
        tear.setVelocityY(500);

    }
    else if(keyW.isDown){
        tear = this.physics.add.image(player.x, player.y, 'tear');
        tear.setVelocityY(-500);
        
        }
    else if(keyA.isDown){
        tear = this.physics.add.image(player.x, player.y, 'tear');
        tear.setVelocityX(-500);

        }
    else if(keyD.isDown){
        tear = this.physics.add.image(player.x, player.y, 'tear');
        tear.setVelocityX(500);

        }
    
}
