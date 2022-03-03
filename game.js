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

let previousRenderTime = 0;//keeps track of timestamp for requestAimationFrame

export function startGameLoop(currentTime) {
    window.requestAnimationFrame(startGameLoop);//recursive loop to keep requesting new frame
    const timeBetweenRender = currentTime - previousRenderTime;//get time between last time frame was rendered
    if (timeBetweenRender < gameSpeedMs ) return;// if time is less than set gamespeed in ms, break out of function
    previousRenderTime = currentTime;// if time between is greater than 
    renderFrame();
}
export function renderFrame() {
    checkForEvent();
    drawSnake();  
}

window.requestAnimationFrame(startGameLoop);