function Bridge(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
}

Bridge.prototype.update = function(deltaTime) {
    // Bridge update logic goes here
};

Bridge.prototype.render = function(ctx, canvas, deltaTime) {
    // Convert world coordinates to screen coordinates
    var screenX = (canvas.width / 2) - state.player.x + this.x;
    var screenY = (canvas.height / 2) + state.player.y - this.y - this.height;

    ctx.strokeStyle = 'brown';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    var centerX = screenX + 32;
    var baseY = screenY + 64;

    // Draw bridge planks (horizontal lines)
    ctx.beginPath();
    var plankY = baseY - 40;
    for (var i = 0; i < 5; i++) {
        ctx.moveTo(screenX + 12, plankY + (i * 8 - 4));
        ctx.lineTo(screenX + 52, plankY + (i * 8 - 4));
    }
    ctx.stroke();

    // Draw bridge support posts
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(screenX + 16, baseY - 8);
    ctx.lineTo(screenX + 16, baseY - 48);
    ctx.moveTo(screenX + 48, baseY - 8);
    ctx.lineTo(screenX + 48, baseY - 48);
    ctx.stroke();

    // Draw bounding box if enabled (but not for traversable objects)
    if (showBoundingBoxes && !this.traversable) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
};
