function Rock(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
}

Rock.prototype.update = function(deltaTime) {
    // Rock update logic goes here
};

Rock.prototype.render = function(ctx, canvas, deltaTime) {
    // Convert world coordinates to screen coordinates
    var screenX = (canvas.width / 2) - state.player.x + this.x;
    var screenY = (canvas.height / 2) + state.player.y - this.y - this.height;
    
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    var centerX = screenX + 32;
    var centerY = screenY + 32;
    
    // Draw rock as irregular polygon outline (centered vertically)
    ctx.beginPath();
    ctx.moveTo(screenX + 16, centerY + 18);
    ctx.lineTo(screenX + 12, centerY + 2);
    ctx.lineTo(screenX + 20, centerY - 14);
    ctx.lineTo(screenX + 36, centerY - 18);
    ctx.lineTo(screenX + 52, centerY - 10);
    ctx.lineTo(screenX + 56, centerY + 6);
    ctx.lineTo(screenX + 48, centerY + 18);
    ctx.closePath();
    ctx.stroke();
    
    // Add some texture lines (centered)
    ctx.beginPath();
    ctx.moveTo(screenX + 20, centerY + 10);
    ctx.lineTo(screenX + 28, centerY + 6);
    ctx.moveTo(screenX + 32, centerY + 14);
    ctx.lineTo(screenX + 40, centerY + 10);
    ctx.moveTo(screenX + 24, centerY - 6);
    ctx.lineTo(screenX + 32, centerY - 2);
    ctx.stroke();
    
    // Draw bounding box if enabled (but not for traversable objects)
    if (showBoundingBoxes && !this.traversable) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
};