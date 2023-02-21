const gameContainer = document.getElementById("gameContainer");
const pointsEarned = document.getElementById("pointsEarned");
const gameOver = document.getElementById("gameOver");
const startNew = document.getElementById("startNew");

const makeGameBoard = ()=>{
    for(let i=1; i<=1600; i++){
        const div = document.createElement("div");
        div.id = `pixel${i}`;
        div.classList.add("pixel");
        gameContainer.append(div);
    }
}

const food = document.createElement("div");
food.classList.add("food");
gameContainer.append(food);

const snake = document.createElement("div");
snake.classList.add("snakeBodyPixel");
snake.textContent = "''";
gameContainer.append(snake);

function createFood(){
    let xRanNum = Math.floor(Math.random()*391);
    let yRanNum = Math.floor(Math.random()*391);
    food.id = (parseInt(xRanNum/10)+1) + (parseInt(yRanNum/10)*40);
    food.style.transform = `translate(${xRanNum}px, ${yRanNum}px)`;
}


let snakeMove;
clearInterval(snakeMove);
let x;
let y;
let currAxis;
let rotateDeg;
let snakeLength;

function startSnakeMove(direction){
    
    snakeMove = setInterval(()=>{
        snake.id = (parseInt(x/10)+1) + (parseInt(y/10)*40);

        if(snake.id == food.id){
            pointsEarned.textContent = parseInt(pointsEarned.textContent)+1;
            snakeLength += 1;
            snake.style.height = `${snakeLength}px`;
            createFood();
        }

        
        if(currAxis == "xAxis"){
            if(direction == "+"){
                x++;
                rotateDeg = 90;
                if(x==400) x = 0;
            }
            if(direction == "-"){
                x--;
                rotateDeg = 270;
                if(x==0) x = 400;
            }
        }else if(currAxis == "yAxis"){
            if(direction == "+"){
                y++;
                rotateDeg = 180;
                if(y==400) y = 0;
            }
            if(direction == "-"){
                y--;
                rotateDeg = 0;
                if(y==0) y = 400;
            }
        }

        snake.style.transform = `translate(${x}px, ${y}px) rotate(${rotateDeg}deg)`;
    },100);
}

document.body.addEventListener("keydown", (event)=>{

    let key = event.key;

    if(currAxis!="yAxis" && key == "ArrowUp"){
        currAxis = "yAxis";
        clearInterval(snakeMove);
        startSnakeMove("-");
    }
    else if(currAxis!="yAxis" && key == "ArrowDown"){
        currAxis = "yAxis";
        clearInterval(snakeMove);
        startSnakeMove("+");
    }
    else if(currAxis!="xAxis" && key == "ArrowLeft"){
        currAxis = "xAxis";
        clearInterval(snakeMove);
        startSnakeMove("-");
    }
    else if(currAxis!="xAxis" && key == "ArrowRight"){
        currAxis = "xAxis";
        clearInterval(snakeMove);
        startSnakeMove("+");
    }
})


function startGame(){
    pointsEarned.textContent = 0;
    makeGameBoard();
    createFood();

    x = 200;
    y = 190;
    currAxis = "xAxis"
    snakeLength = 10;
    snake.style.boxShadow = "0px 4px 0px 6px rgba(255, 255, 255, 0.322)";
    startSnakeMove("-");
}
startGame();


// startNew.addEventListener("click", ()=>{
//     gameOver.style.display = "none";
//     startGame();
// })




// snake.addEventListener("click", ()=>{
//     alert("xAxis: "+ x+ " & yAxis: "+ y+ " & snake id: "+ snake.id);
// })
// food.addEventListener("click",()=>{
//     createFood();
// })