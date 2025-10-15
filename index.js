var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var lastTime = 0;

function update(deltaTime) {
    // Game logic updates go here
    state.update(deltaTime);
    world.update(deltaTime);
    statistics.update(deltaTime);
}

function render() {
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rendering code goes here
    world.render(ctx, canvas); // Render world objects
    player.render(ctx, canvas); // Render player
    grid.render(ctx, canvas); // Render grid overlay
    statistics.render(ctx, canvas); // Render statistics
}

function gameLoop(currentTime) {
    var deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    update(deltaTime);
    render();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
