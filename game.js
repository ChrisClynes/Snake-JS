import { currentScore, highScore, gameSpeedMs, snakeBody, randomFood, direction, drawSnake, snakeDirection, checkEvent } from './base.js' 

//on page load 
document.getElementById('score').innerText =`SCORE: ${currentScore}`;
document.getElementById('high-score').innerText =`HIGH SCORE: ${highScore}`;

function randomSnakeStart() {
    let xVal = Math.floor((Math.random()* 40) + 1);
    let yVal= Math.floor((Math.random()* 40) + 1);
    let snake = document.getElementById("snake-body");

    snake.style.gridColumnStart = xVal;
    snake.style.gridRowStart = yVal;
    snakeBody.push({x: xVal, y: yVal});
}
randomSnakeStart()
randomFood();

function gameLoop() {
    setInterval(()=> {
        renderFrame();
    }, gameSpeedMs); 
}

function renderFrame() {
    snakeDirection();
    checkEvent();
    drawSnake();
}

gameLoop();