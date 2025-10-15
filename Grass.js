function Grass(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
}

Grass.prototype.update = function(deltaTime) {
    // Grass update logic goes here
};

Grass.prototype.render = function(ctx, canvas) {
    // Convert world coordinates to screen coordinates
    var screenX = (canvas.width / 2) - state.player.x + this.x;
    var screenY = (canvas.height / 2) + state.player.y - this.y - this.height;
    
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    
    // Draw grass clumps from top-down view scattered across entire tile
    ctx.beginPath();
    
    // Dense grass clump positions covering most of the 64x64 tile
    var grassClumps = [
        // Top row
        {x: 8, y: 8}, {x: 16, y: 12}, {x: 24, y: 6}, {x: 32, y: 10}, {x: 40, y: 8}, {x: 48, y: 14}, {x: 56, y: 9},
        // Second row
        {x: 6, y: 18}, {x: 14, y: 22}, {x: 22, y: 16}, {x: 30, y: 20}, {x: 38, y: 18}, {x: 46, y: 24}, {x: 54, y: 19}, {x: 58, y: 17},
        // Third row  
        {x: 10, y: 28}, {x: 18, y: 32}, {x: 26, y: 26}, {x: 34, y: 30}, {x: 42, y: 28}, {x: 50, y: 34}, {x: 58, y: 29},
        // Fourth row
        {x: 4, y: 38}, {x: 12, y: 42}, {x: 20, y: 36}, {x: 28, y: 40}, {x: 36, y: 38}, {x: 44, y: 44}, {x: 52, y: 39}, {x: 60, y: 37},
        // Fifth row
        {x: 8, y: 48}, {x: 16, y: 52}, {x: 24, y: 46}, {x: 32, y: 50}, {x: 40, y: 48}, {x: 48, y: 54}, {x: 56, y: 49},
        // Bottom row
        {x: 6, y: 58}, {x: 14, y: 62}, {x: 22, y: 56}, {x: 30, y: 60}, {x: 38, y: 58}, {x: 46, y: 62}, {x: 54, y: 57}
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
    
    // Add some small dots for additional texture scattered around
    ctx.fillStyle = 'darkGreen';
    ctx.beginPath();
    ctx.arc(screenX + 15, screenY + 25, 0.5, 0, Math.PI * 2);
    ctx.arc(screenX + 35, screenY + 15, 0.5, 0, Math.PI * 2);
    ctx.arc(screenX + 45, screenY + 35, 0.5, 0, Math.PI * 2);
    ctx.arc(screenX + 25, screenY + 45, 0.5, 0, Math.PI * 2);
    ctx.arc(screenX + 55, screenY + 25, 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw bounding box if enabled
    if (showBoundingBoxes) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
};
