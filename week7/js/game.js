var c = document.querySelector(`canvas`);
var ctx = c.getContext(`2d`);
var fps = 1000/60;
var timer = setInterval(main, fps);

// Player / Avatar setup
var avatar = new GameObject();
avatar.color = `blue`;
avatar.w = 40;
avatar.h = 40;
avatar.vx = 4;
avatar.vy = 4;

// Starting Platform
var startPlatform = new GameObject();
startPlatform.x = 50;
startPlatform.y = 250;
startPlatform.w = 100;
startPlatform.h = 20;
startPlatform.color = `gray`;

// Set player to start on the platform
avatar.x = startPlatform.x;
avatar.y = startPlatform.y - 30;

// Obstacles (Array for multiple)
var obstacles = [];
var obstacleCount = 3;
for(var i = 0; i < obstacleCount; i++)
{
    obstacles[i] = new GameObject();
    obstacles[i].color = `red`;
    obstacles[i].w = 30;
    obstacles[i].h = 30;
    obstacles[i].x = 200 + (i * 150);
    obstacles[i].y = rand(100, 400);
}

// Jumping Platforms
var platforms = [];
var platCount = 4;
for(var i = 0; i < platCount; i++)
{
    platforms[i] = new GameObject();
    platforms[i].color = `green`;
    platforms[i].w = 80;
    platforms[i].h = 15;
    platforms[i].x = 150 + (i * 150);
    platforms[i].y = rand(150, 350);
}

// End Goal
var goal = new GameObject();
goal.color = `gold`;
goal.x = 750;
goal.y = 250;
goal.w = 50;
goal.h = 50;

function main() 
{
    ctx.clearRect(0,0,c.width,c.height);

    // WASD Movement
    if(d == true)
    {
        avatar.x += avatar.vx;
    }
    if(a == true)
    {
        avatar.x += -avatar.vx;
    }
    if(w == true)
    {
        avatar.y += -avatar.vy;
    }
    if(s == true)
    {
        avatar.y += avatar.vy; 
    }

    // Space to change player color
    if(space == true)
    {
        avatar.color = `yellow`;
    }
    else
    {
        avatar.color = `blue`;
    }

    // Screen Bounds
    if(avatar.x < 0 + avatar.w/2) { avatar.x = 0 + avatar.w/2; }
    if(avatar.x > c.width - avatar.w/2) { avatar.x = c.width - avatar.w/2; }
    if(avatar.y < 0 + avatar.h/2) { avatar.y = 0 + avatar.h/2; }
    if(avatar.y > c.height - avatar.h/2) { avatar.y = c.height - avatar.h/2; }

    // Collision with Obstacles (Reset to Start)
    for(var i = 0; i < obstacles.length; i++)
    {
        if(avatar.overlaps(obstacles[i]))
        {
            avatar.x = startPlatform.x;
            avatar.y = startPlatform.y - 30;
        }
        obstacles[i].render();
    }

    // Render Platforms
    startPlatform.render();
    for(var i = 0; i < platforms.length; i++)
    {
        platforms[i].render();
    }

    // Win Detection
    if(avatar.overlaps(goal))
    {
        ctx.fillStyle = `black`;
        ctx.font = `50px Arial`;
        ctx.textAlign = `center`;
        ctx.fillText(`YOU WIN!`, c.width/2, c.height/2);
    }

    goal.render();
    avatar.render();
}

function rand(_low, _high) 
{
    return Math.random()*(_high - _low) + _low;
}
