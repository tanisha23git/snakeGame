let inputDir = {x:0, y:0};
const  musicSound = new Audio('./music/music.mp3');
const  foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
let Score =0;
let speed = 6;
let lastPainTime =0;
let snakeArr = [
    {x: 13,y: 15}
];
food = {x:6 , y: 7};
let scoreBox = document.querySelector('.scoreBox');

//game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPainTime ) /1000 < 1/speed){
        return;
    }
    lastPainTime = ctime;

gameEngine();
}
function isCollid(snake){
  // if snake bump into itself
  for(let i= 1; i<snakeArr.length; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    }
    
  }

  // if bump into a wall
  if(snake[0].x >= 18 || snake[0].x <=0  ||  snake[0].y >= 18 || snake[0].y <=0){
       return true; 
  }
  return false;



   
}

function gameEngine(){
    //part1: updating the snake array and food

    if(isCollid(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0 ,y:0};
        alert('game Over.press any key to play again')
        snakeArr = [{x : 13, y : 15}];                 
        Score =0;
    }

    //if you have eaten the food then increment the score and regenerate a snake element
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        snakeArr.unshift({x : snakeArr[0].x +inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a +(b-a) * Math.random()) ,  y: Math.round(a +(b-a) * Math.random())}
        Score++;
        scoreBox.innerHTML = ` score : ${Score}`;
        if(highscoreVal<Score){
            highscoreVal = Score;
            localStorage.setItem("Hiscore",JSON.stringify(highscoreVal))
            highScore.innerHTML = `HiScore: ${highscoreVal}`
        }
    }

    ///mooving the snake

    for(let i= snakeArr.length -2 ; i>=0; i--){
        
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

     const board = document.querySelector('.board');
    //part2: display the snake and food
    board.innerHTML ="";
    snakeArr.forEach((e,index)=>{
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            if(index == 0){
                snakeElement.classList.add('head');
            }else{
            snakeElement.classList.add('snake');
            }
            board.appendChild(snakeElement);
    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

//main logic
let highScore = document.querySelector('.highScore')
let hiScore = localStorage.getItem("hiScore");
if(hiScore === null){
    highscoreVal =0;
    localStorage.setItem("hiScore" , JSON.stringify(highscoreVal))
}
else{
    highscoreVal =JSON.parse(hiScore)
    highScore.innerHTML = `HiScore: ${hiScore}`
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir ={x:0 ,y:1} //start the game
    moveSound.play();
    musicSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1 ;
            break;

        case "ArrowDown" :
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft" :
            inputDir.x =  -1;
            inputDir.y =  0;
            break;

        case "ArrowRight" :
            inputDir.x = 1;
            inputDir.y = 0;
            break;   

    } 
    
})



