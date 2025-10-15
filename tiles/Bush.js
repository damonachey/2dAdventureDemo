function Bush(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
}

Bush.prototype.update = function(deltaTime) {
    // Bush update logic goes here
};

Bush.prototype.render = function(ctx, canvas) {
    // Convert world coordinates to screen coordinates
    var screenX = (canvas.width / 2) - state.player.x + this.x;
    var screenY = (canvas.height / 2) + state.player.y - this.y - this.height;
    
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    // Draw bush as simple curved lines (stick figure style)
    var centerX = screenX + 32;
    var baseY = screenY + 64;
    
    // Main bush outline (curved bumpy shape)
    ctx.beginPath();
    ctx.moveTo(screenX + 16, baseY - 16);
    ctx.quadraticCurveTo(screenX + 8, baseY - 32, screenX + 20, baseY - 40);
    ctx.quadraticCurveTo(centerX, baseY - 48, screenX + 44, baseY - 40);
    ctx.quadraticCurveTo(screenX + 56, baseY - 32, screenX + 48, baseY - 16);
    ctx.stroke();
    
    // Add a few simple leaf details
    ctx.beginPath();
    ctx.moveTo(screenX + 24, baseY - 24);
    ctx.lineTo(screenX + 28, baseY - 28);
    ctx.moveTo(screenX + 36, baseY - 30);
    ctx.lineTo(screenX + 40, baseY - 34);
    ctx.stroke();
    
    // Draw bounding box if enabled
    if (showBoundingBoxes) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
};
