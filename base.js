//variables and array storage

let currentScore = 0;
let highScore = 0;
let gameSpeedMs = 200;
let snakeBody = [];
let direction = {x: 0, y: 0};
let foodX = null;
let foodY = null;
let numberOfSegments = 0;


function drawSnake() {
    const snakeHead = document.getElementById("snake-head");
        snakeBody[0].x += direction.x;
        snakeBody[0].y += direction.y;
        snakeHead.style.gridColumnStart = snakeBody[0].x;
        snakeHead.style.gridRowStart = snakeBody[0].y;
            if(numberOfSegments > 0){
                for(let i = 1; i < snakeBody.length ; i++){
                    document.getElementById(`snake${i}`).style.gridColumnStart = snakeBody[i].x
                    document.getElementById(`snake${i}`).style.gridRowStart = snakeBody[i].y
                } 
                for( let i = snakeBody.length - 2; i >= 0; i--){
                    snakeBody[i + 1] = {...snakeBody[i]};
                }
            }
}

function addSegment() {
    let xVal = snakeBody[numberOfSegments].x;//select values from last segment of snake
    let yVal = snakeBody[numberOfSegments].y;
    let gameBoard = document.getElementById("game-board");
    const createSnakePiece = document.createElement('div');
        snakeBody.push({x: xVal, y: yVal});// adds another object to the end of snakeBody array
        numberOfSegments += 1;
        createSnakePiece.style.gridColumnStart = xVal;
        createSnakePiece.style.gridRowStart = yVal;
        createSnakePiece.classList.add('snake');
        createSnakePiece.setAttribute('id', 'snake'+ (numberOfSegments));
        gameBoard.appendChild(createSnakePiece);//creates new div for new segment
}

function randomFood() {
    let food = document.getElementById("food");
    let xVal = Math.floor((Math.random()* 20) + 1);//get random x and y values for next food spawn
    let yVal = Math.floor((Math.random()* 20) + 1);
            if (snakeBody.some(snake => snake.x === xVal & snake.y === yVal)){
                console.log("random recalled");//if so recall function and log it
                randomFood();
            }else {
                food.style.gridColumnStart = xVal;
                food.style.gridRowStart = yVal;
                foodX = xVal;
                foodY = yVal;
            }
}

//controls
window.addEventListener('keydown', e => {
    if(e.key === 'ArrowUp' || e.key === 'w'){
        if(direction.y !== 1){//checks not equal to down
            direction = {x: 0, y: -1};//move snake up direction 
        }
    }
    if(e.key === 'ArrowDown' || e.key === 's'){
        if(direction.y !== -1){//checks not equal to up
            direction = {x: 0, y: 1};//move snake down direction 
        }
    }
    if(e.key === 'ArrowRight' || e.key === 'd'){
        if(direction.x !== -1){//checks not equal to left
            direction = {x: 1, y: 0};//move snake right direction 
        }
    }    
    if(e.key === 'ArrowLeft' || e.key === 'a'){
        if(direction.x !== 1){//checks not equal to right
            direction = {x: -1, y: 0};//move snake left direction 
        }
    }
    }); 
    
    function checkForEvent() {
        if (foodX === snakeBody[0].x & foodY === snakeBody[0].y){
            document.getElementById('score').innerText =`SCORE: ${currentScore += 100}`;
                if(highScore <= currentScore){
                    document.getElementById('high-score').innerText =`HIGH SCORE: ${currentScore}`;
                }
                if (gameSpeedMs >= 60){
                    gameSpeedMs -= 2;
                }
            addSegment();
            randomFood();
        }
    }


export { currentScore, highScore, gameSpeedMs, snakeBody, foodX, foodY, numberOfSegments, direction, drawSnake, randomFood, checkForEvent};
