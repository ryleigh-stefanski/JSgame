<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
canvas {
    border:2px solid black;
    background-color: #87ceeb;
}
</style>
</head>
<body>
    <div id="canvas"></div>
    <body onload="startGame()">
        <h1>Block Hopper</h1>
        <script>
            // Canvas variables
            var canvasWidth = 600;
            var canvasHeight = 400;

            // Player variables
            var player;
            var moveSpeed = 10;

            var interval = setInterval(updateCanvas, 20);

            //enemies
            var enemy;

            //score label
            var scoreLabel;
            var score = 0;

            //health label
            var healthLabel;

            function startGame(){
                gameCanvas.start();
                player = new createPlayer(20, 50, 5);
                enemy = new createEnemy();
                scoreLabel = new drawText(canvasWidth - 100, 30);
                healthLabel = new drawText(10, 30);
            }

            // Canvas
            var gameCanvas = {
                canvas: document.createElement("canvas"),
                start: function() {
                    this.canvas.width = canvasWidth;
                    this.canvas.height = canvasHeight;
                    this.context = this.canvas.getContext("2d");
                    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                }
            }

            // Creates player object
            function createPlayer(width, height, x){
                this.width = width;
                this.height = height;

                var maxHealth = 100;
                this.health = maxHealth;

                this.x = x;
                this.y = canvasHeight - this.height;
                this.moving = false;
                this.direction = 1;     //set to 1 for facing right, to -1 for facing left

                this.draw = function(){
                    ctx = gameCanvas.context;
                    ctx.fillStyle = "gray";
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }

                //moveMod is -1 if moving left, and 1 if moving right
                this.move = function(){
                    if(this.moving){
                        this.x += (moveSpeed * direction);
                    }
                }

                this.attack = function(){
                    enemy.health -= 10;
                }
            }

            function createEnemy(){
                var width = 20;
                var height = 50;
                var speed = randomNumber(2, 5);

                var maxHealth = 100;
                this.health = maxHealth;
                var alive = true;

                this.x = randomNumber(0, canvasWidth);
                this.y = canvasHeight - height;

                this.checkState = function(){
                    if(this.health <= 0){
                        alive = false;
                    }
                }

                this.draw = function(){
                    if(alive){
                        ctx = gameCanvas.context;
                        ctx.fillStyle = "green";
                        ctx.fillRect(this.x, this.y, width, height);

                        ctx.fillStyle = "black";
                        ctx.font = "10px Marker Felt";
                        ctx.fillText(this.health, this.x + (width / 8), this.y - 5);
                    }
                }

                this.move = function(){
                    if(this.x - player.x < 0){
                        //move right
                        this.x += speed;
                    }
                    else{
                        //move left
                        this.x -= speed;
                    }
                }
            }

            function drawText(x, y){
                this.x = x;
                this.y = y;

                this.draw = function(text){
                    ctx = gameCanvas.context;
                    ctx.font = "25px Marker Felt";
                    ctx.fillStyle = "black";
                    ctx.fillText(text, this.x, this.y);
                }
            }

            function randomNumber(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min)
            }

            function updateCanvas(){
                ctx = gameCanvas.context;
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);

                player.move();
                player.draw();

                enemy.checkState();
                enemy.move();
                enemy.draw();

                scoreLabel.draw("Score: " + score);
                healthLabel.draw("Health: " + player.health);
            }

            document.body.onkeyup = function(e){
                if(e.keyCode == 68 || e.keyCode == 65){
                    //player stopped moving
                    player.moving = false;
                }
            }

            document.body.onkeydown = function(e){
                if(e.keyCode == 68){
                    player.direction = 1;
                    player.moving = true;
                }
                else if(e.keyCode == 65){
                    player.direction = -1;
                    player.moving = true;
                }
                else if(e.keyCode == 32){
                    player.attack();
                }
            }
        </script>
</body>
