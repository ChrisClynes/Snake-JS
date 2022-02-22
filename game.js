import { currentScore, highScore, gameSpeedMs, snakeBody, randomFood, drawSnake, checkForEvent } from './base.js' 

//on page load 
document.getElementById('score').innerText =`SCORE: ${currentScore}`;
document.getElementById('high-score').innerText =`HIGH SCORE: ${highScore}`;

function randomSnakeStart() {
    let xVal = Math.floor((Math.random()* 20) + 1);
    let yVal= Math.floor((Math.random()* 20) + 1);
    let snake = document.getElementById("snake-head");
        snake.style.gridColumnStart = xVal;
        snake.style.gridRowStart = yVal;
        snakeBody.push({x: xVal, y: yVal});
    }
window.onload = randomSnakeStart(), randomFood();

export const gameLoop = setInterval(renderFrame, gameSpeedMs);

function renderFrame() {
    checkForEvent();
    drawSnake();
}

