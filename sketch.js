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
var counter = 0;
var playerSpeed = 250;
var enemyspeed = 50;
var counter2 = 0;
var state = 1;
var enemyHealth = 3;
var playerHealth = 10;
var heart = [];

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('isaac', 'assets/isaac.png');
    this.load.image('tear', 'assets/teardrop1.png');
    this.load.image('background', 'assets/room.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('blood', 'assets/blooddrop.png');
    this.load.image('heart', 'assets/heart.png');
}

function create ()
{
    blood = this.physics.add.image(0, 0, 'blood');
    tear = this.physics.add.image(0, 0, 'tear');
    background = this.add.image(config.width / 2, config.height / 2 ,'background');
    background.scaleX = .6;
    background.scaleY = 0.8;
    x = 400;
    y = 400;
    cursors = this.input.keyboard.createCursorKeys();
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    
    enemy = this.physics.add.image(100, 100, 'enemy');
    player = this.physics.add.image(x, y, 'isaac');
    
    // player.displayOriginX = (10);
    // player.displayOriginY = (1);

    // enemy.displayOriginX = (10);
    // enemy.displayOriginY = (1);

    player.setCollideWorldBounds(true);
    player.scaleX = 0.5;
    player.scaleY = 0.5;
    enemy.setCollideWorldBounds(true);
    enemy.scaleX = 0.5;
    enemy.scaleY = 0.5;
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    // this.physics.add.collider(enemy, 'tear');
    this.physics.add.collider(player, enemy);
    for(let i = playerHealth; i > 0; i --){
        heart[i] = this.add.image(20*i, 20, 'heart');
        heart[i].scaleX = 0.5;
        heart[i].scaleY = 0.5;
    }
    
    
}

function update ()
{
    if(state === 1){
        counter2 ++;
        player.setVelocity(0);

        if (cursors.left.isDown)
        {
            player.setVelocityX(-playerSpeed);
            checkKey = "left";
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(playerSpeed);
            checkKey = "right";
        }

        if (cursors.up.isDown)
        {
            player.setVelocityY(-playerSpeed);
            checkKey = "up";
        }
        else if (cursors.down.isDown)
        {
            player.setVelocityY(playerSpeed);
            checkKey = "down";
        }
        if(counter % 45 === 0){
            tear.disableBody(true, true);
            if(keyS.isDown){
                tear = this.physics.add.image(player.x, player.y, 'tear');
                tear.setVelocityY(500);
                this.physics.add.collider(tear, enemy, ouch);
            }
            else if(keyW.isDown){
                tear.disableBody(true, true);
                tear = this.physics.add.image(player.x, player.y, 'tear');
                tear.setVelocityY(-500);
                this.physics.add.collider(tear, enemy, ouch);
                }
            else if(keyA.isDown){
                tear = this.physics.add.image(player.x, player.y, 'tear');
                tear.setVelocityX(-500);
                this.physics.add.collider(tear, enemy, ouch);
                }
            else if(keyD.isDown){
                tear = this.physics.add.image(player.x, player.y, 'tear');
                tear.setVelocityX(500);
                this.physics.add.collider(tear, enemy, ouch);
                }
                
            }
            //shoot timer
            if(keyA.isDown || keyS.isDown || keyD.isDown || keyW.isDown ){
                counter ++;
            }
            else{
                counter = 0;
            }
            if(enemyHealth > 0){
    //enemy movement
                if (player.x < enemy.x)
                {
                    enemy.setVelocityX(-enemyspeed);
                    checkKey = "left";
                }
                else if (player.x > enemy.x)
                {
                    enemy.setVelocityX(enemyspeed);
                    checkKey = "right";
                }

                if (player.y < enemy.y)
                {
                    enemy.setVelocityY(-enemyspeed);
                    checkKey = "up";
                }
                else if (player.y > enemy.y)
                {
                    enemy.setVelocityY(enemyspeed);
                    checkKey = "down";
                }
                //enemy fire
                
                if(counter2 % 45 === 0){
                    bloodRemover();
                if(player.y < enemy.y && dist(enemy.x, player.x) < dist(enemy.y, player.y)){
                    blood = this.physics.add.image(enemy.x, enemy.y, 'blood');
                    blood.setVelocityY(-400);
                    this.physics.add.collider(blood, player, gameover, bloodRemover, this);
                }
                if(player.x > enemy.x && dist(enemy.x, player.x) > dist(enemy.y, player.y)){
                    blood = this.physics.add.image(enemy.x, enemy.y, 'blood');
                    blood.setVelocityX(400);
                    this.physics.add.collider(blood, player, gameover, bloodRemover, this);
                }
                if(player.x < enemy.x && dist(enemy.x, player.x) > dist(enemy.y, player.y)){
                    blood = this.physics.add.image(enemy.x, enemy.y, 'blood');
                    blood.setVelocityX(-400);
                    this.physics.add.collider(blood, player, gameover, bloodRemover, this);
                }
                if(player.y > enemy.y && dist(enemy.x, player.x) < dist(enemy.y, player.y)){
                    blood = this.physics.add.image(enemy.x, enemy.y, 'blood');
                    blood.setVelocityY(400);
                    this.physics.add.collider(blood, player, gameover, bloodRemover, this);
                }
               
              
            }
        }
    }
}


function gameover(){
    if (playerHealth > 0){
        
        playerHealth --;
        heart[playerHealth + 1].destroy();
        
    }
    if (playerHealth <= 0){
    state = 2;
    this.add.image(config.width / 2, config.height / 2 ,'background');
    
    text = this.add.text(config.width/6, config.height / 2, "You Lose", { font: "74px Times New Roman", fill: "#f00" } );
    }
}


function dist(p1, p2){
    var ans = p1 - p2;
    if(ans < 0){
        ans = ans * -1;
        return ans;
    }
    else{
        return ans;
    }
}

function ouch(){
    tear.disableBody(true, true);
    enemyHealth --;
    if(enemyHealth <= 0){
        enemy.disableBody(true, true);
    }
}


function bloodRemover(){
    blood.disableBody(true, true); 
}
