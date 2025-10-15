var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var lastTime = 0;

function update(deltaTime) {
    // Game logic updates go here
    statistics.update(deltaTime);
}

function render() {
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rendering code goes here

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

// Start the game loop
requestAnimationFrame(gameLoop);
