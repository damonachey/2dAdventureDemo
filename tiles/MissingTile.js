function MissingTile(x, y, originalName) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
    this.originalName = originalName || 'Unknown';
}

MissingTile.prototype.update = function(deltaTime) {
    // No update logic needed for missing tile
};

MissingTile.prototype.render = function(ctx, canvas) {
    // Convert world coordinates to screen coordinates
    var screenX = (canvas.width / 2) - state.player.x + this.x;
    var screenY = (canvas.height / 2) + state.player.y - this.y - this.height;

    // Draw a large red X to indicate missing tile
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    // Draw X from corner to corner
    ctx.beginPath();
    // Top-left to bottom-right
    ctx.moveTo(screenX + 8, screenY + 8);
    ctx.lineTo(screenX + 56, screenY + 56);
    // Top-right to bottom-left
    ctx.moveTo(screenX + 56, screenY + 8);
    ctx.lineTo(screenX + 8, screenY + 56);
    ctx.stroke();

    // Draw bounding box if enabled (but not for traversable objects)
    if (showBoundingBoxes && !this.traversable) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
};