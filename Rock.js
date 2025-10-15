function Rock(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
}

Rock.prototype.update = function(deltaTime) {
    // Rock update logic goes here
};

Rock.prototype.render = function(ctx, canvas) {
    // Convert world coordinates to screen coordinates
    var screenX = (canvas.width / 2) - state.player.x + this.x;
    var screenY = (canvas.height / 2) + state.player.y - this.y - this.height;
    
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    var centerX = screenX + 32;
    var baseY = screenY + 64;
    
    // Draw rock as irregular polygon outline
    ctx.beginPath();
    ctx.moveTo(screenX + 16, baseY - 8);
    ctx.lineTo(screenX + 12, baseY - 24);
    ctx.lineTo(screenX + 20, baseY - 40);
    ctx.lineTo(screenX + 36, baseY - 44);
    ctx.lineTo(screenX + 52, baseY - 36);
    ctx.lineTo(screenX + 56, baseY - 20);
    ctx.lineTo(screenX + 48, baseY - 8);
    ctx.closePath();
    ctx.stroke();
    
    // Add some texture lines
    ctx.beginPath();
    ctx.moveTo(screenX + 20, baseY - 16);
    ctx.lineTo(screenX + 28, baseY - 20);
    ctx.moveTo(screenX + 32, baseY - 12);
    ctx.lineTo(screenX + 40, baseY - 16);
    ctx.moveTo(screenX + 24, baseY - 32);
    ctx.lineTo(screenX + 32, baseY - 28);
    ctx.stroke();
    
    // Draw bounding box if enabled
    if (showBoundingBoxes) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
};