import { currentScore, snakeBody } from './base.js' 
document.getElementById('scoreboard').innerText =`SCORE: ${currentScore}`;

function randomSnakeStart() {
    let xVal = Math.floor(Math.random()* 4);
    let yVal= Math.floor(Math.random()* 4);
    let snake = document.getElementById("snake-body");

    snake.style.gridColumn = xVal + " / " + (xVal + 1);
    snake.style.gridRow = yVal + " / " + (yVal + 1);
    snakeBody.push({x: xVal, y: yVal});
    console.log("Snake Starting Point (x:" + snakeBody[0].x + ', y:' +snakeBody[0].y + ")");
}
randomSnakeStart();

function randomFood() {
    let food = document.getElementById("food");
    let xVal = Math.floor(Math.random()* 4);
    let yVal = Math.floor(Math.random()* 4);
    console.log("Food Position (x:" + xVal + ', y:' + yVal + ")");
    for (let i = 0; i < snakeBody.length; i++ ) {
        if (snakeBody[i].x === xVal & snakeBody[i].y === yVal){
            console.log("random recalled");
            randomFood();
        }else {
            food.style.gridColumnStart = xVal;
            food.style.gridRowStart = yVal;
        }
    }
}
randomFood();


