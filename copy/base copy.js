//variables and array storage

let currentScore = 0;
let highScore = 0;
let gameSpeedMs = 200;
let snakeBody = [];
let snakeBodyCopy = [];
let segmentPush = null;
let direction = null;
let foodX = null;
let foodY = null;
let numberOfSegments = 0;


function drawSnake() {
    
    let snakeHead = document.getElementById("snake-head")
    if(direction !== null){
        snakeHead.style.gridColumnStart = snakeBody[0].x;
        snakeHead.style.gridRowStart = snakeBody[0].y;
        if(numberOfSegments > 0){
            for(let i = 1; i < snakeBody.length -1; i++){
                document.getElementById("snake"+ (i)).style.gridColumnStart = snakeBody[i].x
                document.getElementById("snake"+ (i)).style.gridRowStart = snakeBody[i].y
            } 
            
        }
    }
    handleSegmentShift();
    
}

function handleSegmentShift() {
    
    for(let i = 1; i < snakeBody.length; i++){
        snakeBody[i].x = snakeBodyCopy[i-1].x;
        snakeBody[i].y = snakeBodyCopy[i-1].y;
    }
    snakeBody[snakeBody.length - 1] = snakeBodyCopy[snakeBody.length - 1];
}

function addSegment() {
    let gameBoard = document.getElementById("game-board");
    const createSnakePiece = document.createElement('div');
    let xVal = snakeBody[snakeBody.length -1].x;
    let yVal = snakeBody[snakeBody.length -1].y;
    segmentPush = ({x: xVal, y: yVal});
    snakeBody.push(segmentPush);
    numberOfSegments += 1;
    createSnakePiece.style.gridColumnStart = snakeBody[numberOfSegments].x;
    createSnakePiece.style.gridRowStart = snakeBody[numberOfSegments].y;
    createSnakePiece.classList.add('snake');
    createSnakePiece.setAttribute('id', 'snake'+ (numberOfSegments));
    gameBoard.appendChild(createSnakePiece);
    console.log(JSON.stringify(snakeBody))
        
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
    snakeBodyCopy = [...snakeBody];
    if (direction === 'up'){
        snakeBody[0].x += 0
        snakeBody[0].y -= 1   
    }else if (direction === 'down'){
        snakeBody[0].x += 0
        snakeBody[0].y += 1   
    }else if (direction === 'right'){
        snakeBody[0].x += 1
        snakeBody[0].y += 0   
    }else if (direction === 'left'){
        snakeBody[0].x -= 1
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

export { currentScore, highScore, gameSpeedMs, snakeBody, foodX, foodY, numberOfSegments, direction, drawSnake, randomFood, snakeDirection, checkEvent};
