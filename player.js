var player = {
    width: 32,
    height: 48,
    
    render: function(ctx, canvas) {
        // Convert world coordinates to screen coordinates
        // World (0,0) = screen center, player coordinates are bottom-left of character
        var screenX = (canvas.width / 2) + state.player.x;
        var screenY = (canvas.height / 2) - state.player.y - this.height;
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        // Head (circle)
        ctx.beginPath();
        ctx.arc(screenX + 16, screenY + 8, 6, 0, Math.PI * 2);
        ctx.stroke();
        
        // Body (vertical line)
        ctx.beginPath();
        ctx.moveTo(screenX + 16, screenY + 14);
        ctx.lineTo(screenX + 16, screenY + 32);
        ctx.stroke();
        
        // Arms (horizontal line)
        ctx.beginPath();
        ctx.moveTo(screenX + 8, screenY + 22);
        ctx.lineTo(screenX + 24, screenY + 22);
        ctx.stroke();
        
        // Left leg
        ctx.beginPath();
        ctx.moveTo(screenX + 16, screenY + 32);
        ctx.lineTo(screenX + 8, screenY + 48);
        ctx.stroke();
        
        // Right leg
        ctx.beginPath();
        ctx.moveTo(screenX + 16, screenY + 32);
        ctx.lineTo(screenX + 24, screenY + 48);
        ctx.stroke();
    }
};