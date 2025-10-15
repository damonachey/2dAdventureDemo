var state = {
    player: {
        x: 0,  // World coordinates (0,0 = center of screen)
        y: 0
    },

    update: function(deltaTime) {
        // Player movement at 60 pixels per second
        var moveSpeed = 200; // pixels per second
        var moveDistance = (moveSpeed * deltaTime) / 1000; // convert deltaTime from ms to seconds

        if (keys['ArrowLeft']) {
            this.player.x -= moveDistance;
        }
        if (keys['ArrowRight']) {
            this.player.x += moveDistance;
        }
        if (keys['ArrowUp']) {
            this.player.y += moveDistance;
        }
        if (keys['ArrowDown']) {
            this.player.y -= moveDistance;
        }
    }
};
