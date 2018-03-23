var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0, // Black
    physics: {
        default: 'arcade',
        /*arcade: {
            gravity: { y: 0 },
            debug: false
        }*/
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.image('bar', 'assets/bar.png');
    this.load.image('ball', 'assets/ball.png');
}

var bar;
var enemy;
var ball;

var score = 0;
var scoreText;


function create () {


    var bars = this.physics.add.staticGroup();

    var width = 30;
    bar = bars.create(width, config.height/2, 'bar');
    bar.velY = 0;
    enemy = bars.create(config.width - width, config.height/2, 'bar');

    ball = this.physics.add.sprite(100, 450, 'ball');

    ball.setBounce(1.025);
    ball.setVelocityX(150);
    ball.setVelocityY(100);
    ball.speedAdd = 0;
    ball.rotation = 0;

    // Players and platforms will collide
    this.physics.add.collider(bars, ball);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFFFFF' });
}

function update () {
    var cursors = this.input.keyboard.createCursorKeys();
    if (cursors.up.isDown) {
        bar.velY = -8;
    } else if (cursors.down.isDown) {
        bar.velY = 8;
    } else {
        bar.velY *= 0.6;
    }

    bar.y += bar.velY;
    bar.refreshBody();


    scoreText.setText((ball.y - enemy.y));

    if (enemy.y < ball.y) {
        enemy.y += Math.min(3.5, ball.y - enemy.y);
        enemy.refreshBody();
    } else {
        enemy.y -= Math.min(3.5, enemy.y - ball.y);
        enemy.refreshBody();
    }

    if (ball.y < ball.height/2) {
        ball.y = ball.height/2;
        ball.setVelocityY(100 + ball.speedAdd);
        ball.speedAdd += 5;
    } else if (ball.y > config.height - ball.height/2) {
        ball.y = config.height - ball.height/2;
        ball.setVelocityY(-(100 + ball.speedAdd));
        ball.speedAdd += 5;
    }
    ball.rotation += 0.01;
    if (ball.x < 0
        || ball.x > config.width - ball.width/2) {
        ball.x = config.width/2;
        ball.y = config.height/2;
        ball.setVelocityX(200);
        ball.setVelocityY(100);
        ball.speedAdd = 0;
    }
}
