var c = document.querySelector(`canvas`);
var spear = document.getElementById("spear");
var ctx = c.getContext(`2d`);
var fps = 1000/60;
var states = [];
var state;
var timer = setInterval(gameLoop, fps);
var deathSoundFX = document.getElementById("deathFX");
var WinFX = document.getElementById("WinFX");
var amienceFX =document.getElementById("amienceFX");

var gravity = 1.0;

var mainMenuGraphic = new gameObject();

// Player / Avatar setup
var avatar = new gameObject();
avatar.color = `blue`;
avatar.w = 40;
avatar.h = 40;
avatar.vx = 4;
avatar.vy = 4;
avatar.f= 4;

// Starting Platform
var startPlatform = new gameObject();
startPlatform.x = 50;
startPlatform.y = 250;
startPlatform.w = 100;
startPlatform.h = 20;
startPlatform.color = `grey`;

// Set player to start on the platform
avatar.x = startPlatform.x;
avatar.y = startPlatform.y - 30;

var spear = document.getElementById("spear");

// Set player to start on the platform
avatar.x = startPlatform.x;
avatar.y = startPlatform.y - 30;

// Obstacles (Array for multiple)
var obstacles = [];
var obstacleCount = 3;


// Jumping Platforms
var platforms = [];
var platCount = 10;


// End Goal
var goal = new gameObject();


function rollLevel(){


    //Rolls Obstacles
    for(var i = 0; i < obstacleCount; i++)
    {
        obstacles[i] = new gameObject();
        obstacles[i].color = `red`;
        obstacles[i].sprite = spear;
        obstacles[i].w = 30;
        obstacles[i].h = 30;
        obstacles[i].x = 200 + (i * 150);
        obstacles[i].y = rand(100, 400);
    }

    //Rolls Platforms
    for(var i = 0; i < platCount; i++)
    {
        platforms[i] = new gameObject();
        platforms[i].color = `grey`;
        platforms[i].w = 80;
        platforms[i].h = 15;
        platforms[i].y = rand(300, c.height - 40);
        platforms[i].x = rand(150, c.width - 50);
        platforms[i].y = rand(300, c.height - 40);
    }
    //Rolls Goal
    goal.color = `gold`;
    goal.x = 750;
    goal.y = 250;
    goal.w = 50;
    goal.h = 50;
}

var menuimage=document.getElementById("menu");
var menu = new gameObject();
menu.sprite = menuimage;
menu.x = c.width/2;
menu.y = c.height/2;
menu.w = c.width;
menu.h = c.height;

var gameimage = document.getElementById("game");
var gamebg = new gameObject();
gamebg.sprite = gameimage;
gamebg.x = c.width/2;
gamebg.y = c.height/2;
gamebg.w = c.width; 
gamebg.h = c.height;

var gameOver = false;


/*---------------Game Screens (states)----------------*/
var textColor;
var on;
setInterval(()=>{on = !on; if(on){textColor = toggleColor("#04D9FF")}else{textColor = toggleColor("rgba(4, 217, 255, 0)")}} , 1000);

function toggleColor(color){
    
    return color;
}

states["menu"] = function()
{
    if(enter)
    {
        amienceFX.play();
        rollLevel();
        state = "main";
        
        WinFX.pause();
        WinFX.currentTime = 0;
        //timer = setInterval(state, fps);
        
    }
    menu.renderSprite();
    ctx.fillStyle ="blue"; 
    ctx.font = "bold 30px GameFont"; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Jumpman Surivor", c.width / 2, (c.height / 2) - 40);
    ctx.fillStyle =textColor;
    //ctx.fillStyle ="#04D9FF";
    
    ctx.fillText("press enter", c.width / 2, (c.height / 2) + 40);

    
}


states["win"] = function()
{
      
    // Set player to start on the platform
    avatar.x = startPlatform.x;
    avatar.y = startPlatform.y - 30;
    if(gameOver){
        gameOver = false;
        setTimeout(function(){state = "menu"}, 2000);
    }
     gamebg.renderSprite();
    ctx.fillStyle ="blue"; 
    ctx.font = "bold 30px GameFont"; 
    ctx.fillText("YOU WIN!", c.width / 2, c.height / 2);
    //mainMenuGraphic.render();
    
}


function rand(_low, _high) 
{
    return Math.random()*(_high - _low) + _low;
}

states["main"] = function()
{
    gamebg.renderSprite();
    

    // Movement
    if(d == true)
    {
        avatar.x += avatar.vx;
    }
    if(a == true)
    {
        avatar.x += -avatar.vx;
    }
    

    // Screen Bounds
   if (avatar.x < 1 + avatar.h / 2) {avatar.x = 0 + avatar.h / 2;}
    if(avatar.x > c.width - avatar.w/2) { avatar.x = c.width - avatar.w/2; }
    if(avatar.y < 0 + avatar.h/2) { avatar.y = 0 + avatar.h/2; }

    

    // Collision with Obstacles (Reset to Start)
    for(var i = 0; i < obstacles.length; i++)

    
    {
        if(avatar.overlaps(obstacles[i]))
        {
            deathSoundFX.play();
            avatar.x = startPlatform.x;
            avatar.y = startPlatform.y - 100;
        }
        obstacles[i].renderSprite();
    }
    //Hitting the gound(reset to start)
    //if (playerY >= groundY) { 
        //resetGame();


    // Render Platforms
    ctx.fillStyle = startPlatform.color;
    startPlatform.render();
    for(var i = 0; i < platforms.length; i++)
    {
        
        platforms[i].render();
    }

    // Win Detection
   if (avatar.overlaps(goal)) {

    amienceFX.pause();
    amienceFX.currentTime = 0;
    
     WinFX.play();
    gameOver = true;
    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Set player to start on the platform
    avatar.x = startPlatform.x;
    avatar.y = startPlatform.y - 30;
    state = "win";
    //avatar.overlaps = function() { return true; };
    }


    if(avatar.y > c.height - avatar.h/2) { 
        avatar.vy = 0;
        deathSoundFX.play();
        //resets player
        avatar.x = startPlatform.x;
        avatar.y = startPlatform.y - 30;
        
        // avatar.y = c.height - avatar.h/2; 
        
        // if(space == true)
        // {
        //     avatar.vy = -20;
            
        // }

    }
   //collision with platforms 
    for(var i = 0; i< platforms.length; i++){
        while(platforms[i].overlaps(avatar) && avatar.vy >= 0){
            avatar.vy = 0;
            avatar.y--;
            if(space == true)
            {
                avatar.vy = -20;
                
            }
        }
    }

    //collision with start platform
    if(startPlatform.overlaps(avatar) && avatar.vy >= 0){
            avatar.y = startPlatform.y - 10 - 10;
            avatar.vy = 0;
            avatar.y--;
            if(space == true)
            {
                avatar.vy = -20;
                
            }
    }
    avatar.vy += gravity;
    avatar.y += avatar.vy;
    goal.render();
    avatar.render();
}
state = "menu";
function gameLoop(){
    ctx.clearRect(0,0,c.width,c.height);
    //call the gamestate
    //console.log(state);
    states[state]();
}

function rand(_low, _high) 
{
    return Math.random()*(_high - _low) + _low;
}
