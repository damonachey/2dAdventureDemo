var statistics = {
    frameCount: 0,
    lastFpsTime: 0,
    currentFps: 0,
    currentKey: '',
    
    update: function(deltaTime) {
        this.frameCount++;
        this.lastFpsTime += deltaTime;
        
        if (this.lastFpsTime >= 1000) {
            this.currentFps = this.frameCount;
            this.frameCount = 0;
            this.lastFpsTime = 0;
        }
    },
    
    setCurrentKey: function(key) {
        this.currentKey = key;
    },
    
    render: function(ctx, canvas) {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('FPS: ' + this.currentFps, 10, 30);
        ctx.fillText('Key: ' + this.currentKey, 10, 60);
    }
};