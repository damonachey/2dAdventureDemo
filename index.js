var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var lastTime = 0;

function update(deltaTime) {
    // Game logic updates go here
    state.update(deltaTime);
    statistics.update(deltaTime);
}

function render() {
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rendering code goes here
    
    // Render player
    player.render(ctx, canvas);
    
    // Render grid overlay
    grid.render(ctx, canvas);
    
    // Render FPS counter
    statistics.render(ctx, canvas);
}

function gameLoop(currentTime) {
    var deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    update(deltaTime);
    render();
    requestAnimationFrame(gameLoop);
}

// Hide cursor initially and start the game loop
document.body.classList.add('hide-cursor');
requestAnimationFrame(gameLoop);
