var c = document.querySelector(`canvas`);
var spear = document.getElementById("spear");
var ctx = c.getContext(`2d`);
var fps = 1000/60;
var states = [];
var state;
var timer = setInterval(state, fps);

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
startPlatform.color = `dark gray`;

// Set player to start on the platform
avatar.x = startPlatform.x;
avatar.y = startPlatform.y - 30;

// Obstacles (Array for multiple)
var obstacles = [];
var obstacleCount = 3;
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

// Jumping Platforms
var platforms = [];
var platCount = 10;
for(var i = 0; i < platCount; i++)
{
    platforms[i] = new gameObject();
    platforms[i].color = `dark grey`;
    platforms[i].w = 80;
    platforms[i].h = 15;
    platforms[i].y = rand(300, c.height - 40);
    platforms[i].x = rand(150, c.width - 50);
    platforms[i].y = rand(300, c.height - 40);
}

// End Goal
var goal = new gameObject();
goal.color = `gold`;
goal.x = 750;
goal.y = 250;
goal.w = 50;
goal.h = 50;
var spear = document.getElementById("spear");

// Set player to start on the platform
avatar.x = startPlatform.x;
avatar.y = startPlatform.y - 30;

// Obstacles (Array for multiple)
var obstacles = [];
var obstacleCount = 3;
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

// Jumping Platforms
var platforms = [];
var platCount = 10;
for(var i = 0; i < platCount; i++)
{
    platforms[i] = new gameObject();
    platforms[i].color = `dark grey`;
    platforms[i].w = 80;
    platforms[i].h = 15;
    platforms[i].y = rand(300, c.height - 40);
    platforms[i].x = rand(150, c.width - 50);
    platforms[i].y = rand(300, c.height - 40);
}

// End Goal
var goal = new gameObject();
goal.color = `gold`;
goal.x = 750;
goal.y = 250;
goal.w = 50;
goal.h = 50;

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



/*---------------Game Screens (states)----------------*/
states["menu"] = function()
{
    if(enter)
    {
        state = "main";
        
        //timer = setInterval(state, fps);
        
    }
    menu.renderSprite();
    mainMenuGraphic.render();
    ctx.fillStyle ="blue"; 
    ctx.font = "30px arial"; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Jumpman surivor", c.width / 2, (c.height / 2) - 40);
    ctx.fillStyle ="#04D9FF";
    ctx.fillText("press eneter", c.width / 2, (c.height / 2) + 40);

    
}

states["win"] = function()
{
    // Set player to start on the platform
    avatar.x = startPlatform.x;
    avatar.y = startPlatform.y - 30;
    setTimeout(function(){state = "menu"}, 2000);
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
            avatar.x = startPlatform.x;
            avatar.y = startPlatform.y - 100;
        }
        obstacles[i].renderSprite();
    }
    //Hitting the gound(reset to start)
    if (playerY >= groundY) { 
        resetGame();


    // Render Platforms
    startPlatform.render();
    for(var i = 0; i < platforms.length; i++)
    {
        platforms[i].render();
    }

    // Win Detection
   if (avatar.overlaps(goal)) {
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
        avatar.y = c.height - avatar.h/2; 
        
        if(space == true)
        {
            avatar.vy = -20;
            
        }
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
                avatar.vy = -10;
                
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

    states[state]();
}

function rand(_low, _high) 
{
    return Math.random()*(_high - _low) + _low;
    }
}
