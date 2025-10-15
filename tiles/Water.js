function Water(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
}

Water.prototype.update = function(deltaTime) {
    // Water update logic goes here
};

Water.prototype.render = function(ctx, canvas) {
    // Convert world coordinates to screen coordinates
    var screenX = (canvas.width / 2) - state.player.x + this.x;
    var screenY = (canvas.height / 2) + state.player.y - this.y - this.height;
    
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    var centerX = screenX + 32;
    var baseY = screenY + 64;
    
    // Draw water as wavy horizontal lines
    ctx.beginPath();
    // Top water line
    ctx.moveTo(screenX + 8, baseY - 48);
    ctx.quadraticCurveTo(screenX + 16, baseY - 52, screenX + 24, baseY - 48);
    ctx.quadraticCurveTo(screenX + 32, baseY - 44, screenX + 40, baseY - 48);
    ctx.quadraticCurveTo(screenX + 48, baseY - 52, screenX + 56, baseY - 48);
    ctx.stroke();
    
    // Middle water line
    ctx.beginPath();
    ctx.moveTo(screenX + 12, baseY - 32);
    ctx.quadraticCurveTo(screenX + 20, baseY - 36, screenX + 28, baseY - 32);
    ctx.quadraticCurveTo(screenX + 36, baseY - 28, screenX + 44, baseY - 32);
    ctx.quadraticCurveTo(screenX + 52, baseY - 36, screenX + 60, baseY - 32);
    ctx.stroke();
    
    // Bottom water line
    ctx.beginPath();
    ctx.moveTo(screenX + 8, baseY - 16);
    ctx.quadraticCurveTo(screenX + 16, baseY - 20, screenX + 24, baseY - 16);
    ctx.quadraticCurveTo(screenX + 32, baseY - 12, screenX + 40, baseY - 16);
    ctx.quadraticCurveTo(screenX + 48, baseY - 20, screenX + 56, baseY - 16);
    ctx.stroke();
    
    // Draw bounding box if enabled
    if (showBoundingBoxes) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
};