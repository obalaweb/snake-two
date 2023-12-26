// Define html elements
const board = document.getElementById("game-board");
const gridSize = 20;
const instuctionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');

// Game variables
let snake = [{x:10, y:10}];
let food = generateFood();
let direction = 'left';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw snake and food
function draw() {
    board.innerHtml = '';
    drawSnake();
    drawFood();
}

// Draw snake 
function drawSnake() {
    snake.forEach(segment => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);

        board.appendChild(snakeElement);
    });
}

// Create snake or food cube/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;

    return element;
}

// Set the position of the snake or the food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}


// Draw food function
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement)
}

// Generate food 
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;

    return {x, y};
}

// Moving the snake
function move() {
    const head = { ...snake[0] }

    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
    }

    snake.unshift(head);

    if(head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed()
        clearInterval(gameInterval);

        gameInterval = setInterval(() => {
            move();
            // checkCollision();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }

}


// Start game function
function startGame() {
    gameStarted = true; //keep track of running game
    instuctionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        // checkCollision();
        draw();
    }, gameSpeedDelay);
}


// Keypress event listener
function handyKeyPress(event) {
    if((!gameStarted && event.code === 'space') || (!gameStarted && event.key === ' ')) {
        startGame();
    } else {
        switch(event.key) {
            case 'ArrowUp':
                direction = 'up';
            break
            case 'ArrowDown':
                direction = 'down';
            break
            case 'ArrowLeft':
                direction = 'left';
            break
            case 'ArrowRight':
                direction = 'right';
            break
     }
    }

}


function increaseSpeed() {
    console.log(gameSpeedDelay)
    if(gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    }
}
document.addEventListener('keydown', handyKeyPress);

// test moving
// setInterval(() => {
//     move();
//     draw()
// }, 300);