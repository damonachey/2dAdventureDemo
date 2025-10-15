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
    
    // Draw bush as smooth cloud outline with 5 lobes (taller and better centered)
    var centerX = screenX + 32;
    var centerY = screenY + 32;
    
    // Draw cloud-like bush with 5 connected lobes
    ctx.beginPath();
    
    // Start from bottom left
    ctx.moveTo(screenX + 16, centerY + 19);
    
    // Far left lobe
    ctx.quadraticCurveTo(screenX + 8, centerY + 3, screenX + 16, centerY - 5);
    
    // Left to center-left transition
    ctx.quadraticCurveTo(screenX + 20, centerY - 11, screenX + 24, centerY - 9);
    
    // Center-left lobe
    ctx.quadraticCurveTo(screenX + 22, centerY - 17, screenX + 28, centerY - 15);
    
    // Center-left to center transition
    ctx.quadraticCurveTo(screenX + 30, centerY - 21, centerX, centerY - 19);
    
    // Center to center-right transition
    ctx.quadraticCurveTo(screenX + 34, centerY - 21, screenX + 36, centerY - 15);
    
    // Center-right lobe
    ctx.quadraticCurveTo(screenX + 42, centerY - 17, screenX + 40, centerY - 9);
    
    // Center-right to right transition
    ctx.quadraticCurveTo(screenX + 44, centerY - 11, screenX + 48, centerY - 5);
    
    // Far right lobe
    ctx.quadraticCurveTo(screenX + 56, centerY + 3, screenX + 48, centerY + 19);
    
    // Bottom connection
    ctx.lineTo(screenX + 16, centerY + 19);
    
    ctx.stroke();
    
    // Draw bounding box if enabled (but not for traversable objects)
    if (showBoundingBoxes && !this.traversable) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
};
