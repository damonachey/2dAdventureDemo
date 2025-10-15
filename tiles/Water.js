function Water(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
}

Water.prototype.update = function(deltaTime) {
    // Water update logic goes here
};

Water.prototype.render = function(ctx, canvas, deltaTime) {
    // Convert world coordinates to screen coordinates
    var screenX = (canvas.width / 2) - state.player.x + this.x;
    var screenY = (canvas.height / 2) + state.player.y - this.y - this.height;
    
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    var centerX = screenX + 32;
    var baseY = screenY + 64;
    
    // Create time-based animation for wave movement
    var time = Date.now() * 0.002; // Convert to slower time scale
    var waveOffset = Math.sin(time) * 2; // Oscillate between -2 and +2
    
    // Draw water as animated wavy horizontal lines
    ctx.beginPath();
    // Top water line (animated)
    ctx.moveTo(screenX + 8, baseY - 48 + waveOffset);
    ctx.quadraticCurveTo(screenX + 16, baseY - 52 + waveOffset, screenX + 24, baseY - 48 + waveOffset);
    ctx.quadraticCurveTo(screenX + 32, baseY - 44 + waveOffset, screenX + 40, baseY - 48 + waveOffset);
    ctx.quadraticCurveTo(screenX + 48, baseY - 52 + waveOffset, screenX + 56, baseY - 48 + waveOffset);
    ctx.stroke();
    
    // Middle water line (animated with offset)
    ctx.beginPath();
    ctx.moveTo(screenX + 12, baseY - 32 - waveOffset);
    ctx.quadraticCurveTo(screenX + 20, baseY - 36 - waveOffset, screenX + 28, baseY - 32 - waveOffset);
    ctx.quadraticCurveTo(screenX + 36, baseY - 28 - waveOffset, screenX + 44, baseY - 32 - waveOffset);
    ctx.quadraticCurveTo(screenX + 52, baseY - 36 - waveOffset, screenX + 60, baseY - 32 - waveOffset);
    ctx.stroke();
    
    // Bottom water line (animated)
    ctx.beginPath();
    ctx.moveTo(screenX + 8, baseY - 16 + waveOffset * 0.5);
    ctx.quadraticCurveTo(screenX + 16, baseY - 20 + waveOffset * 0.5, screenX + 24, baseY - 16 + waveOffset * 0.5);
    ctx.quadraticCurveTo(screenX + 32, baseY - 12 + waveOffset * 0.5, screenX + 40, baseY - 16 + waveOffset * 0.5);
    ctx.quadraticCurveTo(screenX + 48, baseY - 20 + waveOffset * 0.5, screenX + 56, baseY - 16 + waveOffset * 0.5);
    ctx.stroke();
    
    // Draw bounding box if enabled (but not for traversable objects)
    if (showBoundingBoxes && !this.traversable) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
};