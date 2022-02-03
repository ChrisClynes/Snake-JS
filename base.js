//variables and array storage

let currentScore = 0;
let highScore = 0;
let gameSpeedMs = 120;
let snakeBody = [];
let direction = null;
let foodX = null;
let foodY = null;

function drawSnake() {
    let snake = document.getElementById("snake-body");
    let gameBoard = document.getElementById("game-board");
    const CreateSnakePiece = document.createElement('div');
    for (let i = 0; i < snakeBody.length; i++) {
        CreateSnakePiece.style.gridColumnStart = snakeBody[i].x;
        CreateSnakePiece.style.gridRowStart = snakeBody[i].y;
        CreateSnakePiece.classList.add('snake');
        gameBoard.appendChild(CreateSnakePiece);

        // snake.style.gridColumnStart = snakeBody[i].x;
        // snake.style.gridRowStart = snakeBody[i].y;
    }
}

function randomFood() {
    let food = document.getElementById("food");
    let xVal = Math.floor((Math.random()* 40) + 1);
    let yVal = Math.floor((Math.random()* 40) + 1);
    for (let i = 0; i < snakeBody.length; i++ ) {
        if (snakeBody[i].x === xVal & snakeBody[i].y === yVal){
            console.log("random recalled");
            randomFood();
        }else {
            xVal
            food.style.gridColumnStart = xVal;
            food.style.gridRowStart = yVal;
            foodX = xVal;
            foodY = yVal;
        }
    }
}

//controls
function snakeDirection() {
    if (direction === 'up'){
        snakeBody[0].x += 0
        snakeBody[0].y += -1
    }else if (direction === 'down'){
        snakeBody[0].x += 0
        snakeBody[0].y += 1
    }else if (direction === 'right'){
        snakeBody[0].x += 1
        snakeBody[0].y += 0
    }else if (direction === 'left'){
        snakeBody[0].x += -1
        snakeBody[0].y += 0
    }
}

window.addEventListener('keydown', e => {
    if(e.key === 'ArrowUp' || e.key === 'w'){
        if(direction !== 'down'){
        direction = 'up';//move snake up direction 
        }
    }
    if(e.key === 'ArrowDown' || e.key === 's'){
        if(direction !== 'up'){
        direction = 'down';//move snake down direction 
        }
    }
    if(e.key === 'ArrowRight' || e.key === 'd'){
        if(direction !== 'left'){
        direction = 'right';//move snake right direction 
        }
    }    
    if(e.key === 'ArrowLeft' || e.key === 'a'){
        if(direction !== 'right'){
        direction = 'left';//move snake left direction 
        }
    }
    }); 
    
    function checkEvent() {
        let len = snakeBody.length - 1;
        if (foodX == snakeBody[0].x & foodY == snakeBody[0].y){
            document.getElementById('score').innerText =`SCORE: ${currentScore += 100}`;
                if(highScore <= currentScore){
                    document.getElementById('high-score').innerText =`HIGH SCORE: ${currentScore}`;
                }
                if (gameSpeedMs >= 60){
                    gameSpeedMs -= 2;
                }
                snakeBody.push({x: snakeBody[len].x, y: snakeBody[len].y});
            
            randomFood();
        }
    }


export { currentScore, highScore, gameSpeedMs, snakeBody, direction, drawSnake, randomFood, snakeDirection, checkEvent};
