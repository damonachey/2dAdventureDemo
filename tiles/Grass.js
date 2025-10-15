function Grass(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
}

Grass.prototype.update = function(deltaTime) {
    // Grass update logic goes here
};

Grass.prototype.render = function(ctx, canvas, deltaTime) {
    // Convert world coordinates to screen coordinates
    var screenX = (canvas.width / 2) - state.player.x + this.x;
    var screenY = (canvas.height / 2) + state.player.y - this.y - this.height;

    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    // Draw grass clumps from top-down view scattered across entire tile
    ctx.beginPath();

    // Sparser grass clump positions for cleaner look
    var grassClumps = [
        // Top row
        {x: 12, y: 8}, {x: 28, y: 12}, {x: 44, y: 6}, {x: 58, y: 10},
        // Second row
        {x: 8, y: 22}, {x: 24, y: 18}, {x: 40, y: 24}, {x: 54, y: 20},
        // Third row
        {x: 16, y: 32}, {x: 32, y: 28}, {x: 48, y: 34}, {x: 60, y: 30},
        // Fourth row
        {x: 6, y: 42}, {x: 22, y: 38}, {x: 38, y: 44}, {x: 52, y: 40},
        // Fifth row
        {x: 14, y: 52}, {x: 30, y: 48}, {x: 46, y: 54}, {x: 58, y: 50},
        // Bottom row
        {x: 10, y: 62}, {x: 26, y: 58}, {x: 42, y: 60}, {x: 56, y: 56}
    ];

    // Draw each grass clump as small radiating lines (top-down view)
    for (var i = 0; i < grassClumps.length; i++) {
        var clump = grassClumps[i];
        var clumpX = screenX + clump.x;
        var clumpY = screenY + clump.y;

        // Draw 3-4 small lines radiating from center point
        // Up-left
        ctx.moveTo(clumpX, clumpY);
        ctx.lineTo(clumpX - 2, clumpY - 3);
        // Up-right
        ctx.moveTo(clumpX, clumpY);
        ctx.lineTo(clumpX + 2, clumpY - 3);
        // Down
        ctx.moveTo(clumpX, clumpY);
        ctx.lineTo(clumpX, clumpY + 3);
        // Side (alternating left/right)
        if (i % 2 === 0) {
            ctx.moveTo(clumpX, clumpY);
            ctx.lineTo(clumpX - 3, clumpY + 1);
        } else {
            ctx.moveTo(clumpX, clumpY);
            ctx.lineTo(clumpX + 3, clumpY + 1);
        }
    }

    ctx.stroke();

    // Draw bounding box if enabled (but not for traversable objects)
    if (showBoundingBoxes && !this.traversable) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
};
