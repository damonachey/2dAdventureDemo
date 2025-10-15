var grid = {
    visible: false,
    squareSize: 64,
    
    toggle: function() {
        this.visible = !this.visible;
    },
    
    render: function(ctx, canvas) {
        if (!this.visible) return;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.lineWidth = 1;
        
        var cols = Math.ceil(canvas.width / this.squareSize);
        var rows = Math.ceil(canvas.height / this.squareSize);
        
        // Calculate center offsets for world coordinates
        var centerX = Math.floor(cols / 2);
        var centerY = Math.floor(rows / 2);
        
        // Draw vertical lines
        for (var x = 0; x <= cols; x++) {
            var xPos = x * this.squareSize;
            ctx.beginPath();
            ctx.moveTo(xPos, 0);
            ctx.lineTo(xPos, canvas.height);
            ctx.stroke();
        }
        
        // Draw horizontal lines
        for (var y = 0; y <= rows; y++) {
            var yPos = y * this.squareSize;
            ctx.beginPath();
            ctx.moveTo(0, yPos);
            ctx.lineTo(canvas.width, yPos);
            ctx.stroke();
        }
        
        // Draw coordinates (world coordinates with 0,0 at center)
        for (var x = 0; x < cols; x++) {
            for (var y = 0; y < rows; y++) {
                var pixelX = x * this.squareSize + 2;
                var pixelY = y * this.squareSize + 14;
                var worldX = x - centerX;
                var worldY = centerY - y; // Flip Y to match bottom-left origin
                ctx.fillText(worldX + ',' + worldY, pixelX, pixelY);
            }
        }
    }
};