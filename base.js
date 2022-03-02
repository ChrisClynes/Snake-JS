import { randomSnakeStart } from './game.js'; 

//-----------Variables, could have made this an object------------

let currentScore = 0;
let highScore = 0;
let gameSpeedMs = 150;
let snakeBody = [];
let direction = {x: 0, y: 0};
let foodX = null;
let foodY = null;
let numberOfSegments = 0;
let directionFlag = 0;
let difficulty = "medium";
let difficultySpeed = 0; 

//---------------------------Game functions---------------------------

function drawSnake() {
    const S = document.getElementById("snake-head");
        snakeBody[0].x += direction.x;//set new snake head coordinates
        snakeBody[0].y += direction.y;
        directionFlag = 0;//reset flag to allow new input direction
     S.style.gridColumnStart = snakeBody[0].x;
     S.style.gridRowStart = snakeBody[0].y;
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

function checkForEvent() {
    switch(true) {
        case (snakeBody[0].x > 20):
        return stopGame(`You lose! Your score is: ${currentScore}`);//check if right wall collision
        break;
        case (snakeBody[0].y > 20):
        return stopGame(`You lose! Your score is: ${currentScore}`);//check if bottom wall collision
        break;
        case (snakeBody[0].x < 1):
        return stopGame(`You lose! Your score is: ${currentScore}`);//check if left wall collision
        break;
        case (snakeBody[0].y < 1):
        return stopGame(`You lose! Your score is: ${currentScore}`);//check if top wall collision
        break;
    }
    for(let i = 2; i < snakeBody.length; i++) {
        if (snakeBody[0].x == snakeBody[i].x & snakeBody[0].y == snakeBody[i].y){
            stopGame(`You lose! Your score is: ${currentScore}`);//check if snake collision with self
        }
    }
    if (foodX === snakeBody[0].x & foodY === snakeBody[0].y){
        document.getElementById('score').innerText =`SCORE: ${currentScore += 100}`;
            if(currentScore >= highScore){
                highScore = currentScore;//set high score if current score is higher than previous high score
                document.getElementById('high-score').innerText =`HIGH SCORE: ${highScore}`;
            }
            if (gameSpeedMs >= 100){
                gameSpeedMs -= difficultySpeed;// adjusted by difficulty, increase game speed after each segment is added.
            }
        addSegment();
        randomFood();
    }
}


//-----------------Controls-----------------------------------------------

window.addEventListener('keydown', e => {
    if(e.key === 'ArrowUp'){
        if(direction.y !== 1 & directionFlag == 0){//checks not equal to down
            direction = {x: 0, y: -1};//move snake up direction 
            directionFlag = 1; //prevents against multiple moves between frames
        }
    }
    if(e.key === 'ArrowDown'){
        if(direction.y !== -1 & directionFlag == 0){//checks not equal to up
            direction = {x: 0, y: 1};//move snake down direction
            directionFlag = 1; //prevents against multiple moves between frames
        }
    }
    if(e.key === 'ArrowRight'){
        if(direction.x !== -1 & directionFlag == 0){//checks not equal to left
            direction = {x: 1, y: 0};//move snake right direction 
            directionFlag = 1; //prevents against multiple moves between frames
        }
    }    
    if(e.key === 'ArrowLeft'){
        if(direction.x !== 1 & directionFlag == 0){//checks not equal to right
            direction = {x: -1, y: 0};//move snake left direction
            directionFlag = 1; //prevents against multiple moves between frames
        }
    }
    }); 

    
//--------------------------DOM Manipulation-----------------------------


document.getElementById("menu").addEventListener('click', toggleMenu);

//this fuction expands a menu with additional options
function toggleMenu() {
    const menu = document.getElementById("menu-container");
    const container = document.getElementById("controls");
    const reset = document.getElementById("reset-btn");
    if(menu.style.display == "none" || menu.style.display == "") {// second condition needed to not have to click button twice
        menu.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.height = "70px"; 
        reset.style.display = "none";
    }else {
        menu.style.display = "none";
        container.style.height = "35px";
        reset.style.display = "flex"; 
        container.style.flexDirection = "initial";
    }
}
    

function resetDiv(){
    for (let i = 1; i <= numberOfSegments; i++) {
        document.getElementById("snake" + i).remove();//remove all snake body segements from previous game
    }
}

//----------------------End Game and Reset-------------------------------------

function stopGame(alertMsg) {
    alert(alertMsg);
    resetDiv();
    resetState();
    document.getElementById('score').innerText =`SCORE: ${currentScore}`;
    randomSnakeStart();
    randomFood();
}

function resetState(){
    currentScore = 0;//reset current score but keep high score
    gameSpeedMs = 150;
    snakeBody = [];
    direction = {x: 0, y: 0};
    foodX = null;
    foodY = null;
    numberOfSegments = 0;
}


export { currentScore, highScore, gameSpeedMs, snakeBody, foodX, foodY, numberOfSegments, direction, drawSnake, randomFood, checkForEvent };
