import { currentScore, highScore, gameSpeedMs, snakeBody, randomFood, drawSnake, checkForEvent } from './base.js' 

//on page load 
document.getElementById('score').innerText =`SCORE: ${currentScore}`;
document.getElementById('high-score').innerText =`HIGH SCORE: ${highScore}`;

export function randomSnakeStart() {
    let xVal = Math.floor((Math.random()* 18) + 2);
    let yVal= Math.floor((Math.random()* 18) + 2);
    let snake = document.getElementById("snake-head");
        snake.style.gridColumnStart = xVal;
        snake.style.gridRowStart = yVal;
        snakeBody.push({x: xVal, y: yVal});
    }
window.onload = randomSnakeStart(), randomFood();

export let gameLoop = setInterval(renderFrame, gameSpeedMs);

export function renderFrame() {
    checkForEvent();
    drawSnake();
}

