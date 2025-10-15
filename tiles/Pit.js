function Pit(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
}

Pit.prototype.update = function(deltaTime) {
    // Pit update logic goes here
};

Pit.prototype.render = function(ctx, canvas) {
    // Convert world coordinates to screen coordinates
    var screenX = (canvas.width / 2) - state.player.x + this.x;
    var screenY = (canvas.height / 2) + state.player.y - this.y - this.height;
    
    var centerX = screenX + 32;
    var centerY = screenY + 32;
    
    // Draw grass around the pit (avoiding center hole)
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.beginPath();
    
    // Grass clump positions around the edges, avoiding center
    var grassClumps = [
        // Top edge
        {x: 8, y: 8}, {x: 16, y: 12}, {x: 24, y: 6}, {x: 40, y: 8}, {x: 48, y: 14}, {x: 56, y: 9},
        // Left edge
        {x: 6, y: 18}, {x: 4, y: 28}, {x: 8, y: 38}, {x: 6, y: 48}, {x: 10, y: 58},
        // Right edge
        {x: 58, y: 17}, {x: 60, y: 27}, {x: 58, y: 37}, {x: 56, y: 47}, {x: 54, y: 57},
        // Bottom edge
        {x: 14, y: 62}, {x: 22, y: 56}, {x: 30, y: 60}, {x: 38, y: 58}, {x: 46, y: 62},
        // Scattered around pit (but not too close to center)
        {x: 14, y: 22}, {x: 50, y: 20}, {x: 12, y: 42}, {x: 52, y: 44},
        {x: 18, y: 16}, {x: 46, y: 18}, {x: 16, y: 48}, {x: 48, y: 46}
    ];
    
    // Draw each grass clump, but skip if too close to center hole
    for (var i = 0; i < grassClumps.length; i++) {
        var clump = grassClumps[i];
        var clumpX = screenX + clump.x;
        var clumpY = screenY + clump.y;
        
        // Check distance from center - skip if too close to pit
        var distFromCenter = Math.sqrt(
            Math.pow(clump.x - 32, 2) + Math.pow(clump.y - 32, 2)
        );
        
        if (distFromCenter > 18) { // Only draw grass outside pit radius
            // Draw small radiating lines for grass
            ctx.moveTo(clumpX, clumpY);
            ctx.lineTo(clumpX - 2, clumpY - 3);
            ctx.moveTo(clumpX, clumpY);
            ctx.lineTo(clumpX + 2, clumpY - 3);
            ctx.moveTo(clumpX, clumpY);
            ctx.lineTo(clumpX, clumpY + 3);
            if (i % 2 === 0) {
                ctx.moveTo(clumpX, clumpY);
                ctx.lineTo(clumpX - 3, clumpY + 1);
            } else {
                ctx.moveTo(clumpX, clumpY);
                ctx.lineTo(clumpX + 3, clumpY + 1);
            }
        }
    }
    ctx.stroke();
    
    // Draw the pit hole in center
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    
    // Outer pit rim
    ctx.beginPath();
    ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
    ctx.stroke();
    
    // Inner darkness rings
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    ctx.stroke();
    
    // Center darkness (filled)
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Add some small texture dots in grass areas
    ctx.fillStyle = 'darkGreen';
    ctx.beginPath();
    // Only add dots away from center pit
    ctx.arc(screenX + 15, screenY + 15, 0.5, 0, Math.PI * 2);
    ctx.arc(screenX + 45, screenY + 15, 0.5, 0, Math.PI * 2);
    ctx.arc(screenX + 15, screenY + 45, 0.5, 0, Math.PI * 2);
    ctx.arc(screenX + 45, screenY + 45, 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw bounding box if enabled
    if (showBoundingBoxes) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
};
