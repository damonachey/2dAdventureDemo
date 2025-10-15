function Tree(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
}

Tree.prototype.update = function(deltaTime) {
    // Tree update logic goes here
};

Tree.prototype.render = function(ctx, canvas) {
    // Convert world coordinates to screen coordinates
    var screenX = (canvas.width / 2) - state.player.x + this.x;
    var screenY = (canvas.height / 2) + state.player.y - this.y - this.height;
    
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    var centerX = screenX + 32;
    var baseY = screenY + 64;
    
    // Draw tree trunk (brown line)
    ctx.strokeStyle = 'brown';
    ctx.beginPath();
    ctx.moveTo(centerX, baseY);
    ctx.lineTo(centerX, baseY - 32);
    ctx.stroke();
    
    // Draw tree foliage (green circle outline)
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.arc(centerX, baseY - 40, 20, 0, Math.PI * 2);
    ctx.stroke();
    
    // Add simple branch lines inside foliage
    ctx.beginPath();
    ctx.moveTo(centerX - 12, baseY - 40);
    ctx.lineTo(centerX + 12, baseY - 40);
    ctx.moveTo(centerX, baseY - 52);
    ctx.lineTo(centerX, baseY - 28);
    ctx.moveTo(centerX - 8, baseY - 48);
    ctx.lineTo(centerX + 8, baseY - 32);
    ctx.stroke();
    
    // Draw bounding box if enabled
    if (showBoundingBoxes) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
};
