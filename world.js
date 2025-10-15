var world = {
    objects: [],
    loaded: false,
    
    loadMap: function() {
        if (this.loaded) return;
        
        // Load world.map file
        fetch('world.map')
            .then(response => response.text())
            .then(data => {
                var lines = data.split('\n');
                
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i].trim();
                    
                    // Skip comments and empty lines
                    if (line.startsWith('#') || line === '') continue;
                    
                    // Parse: x, y, Name
                    var parts = line.split(',');
                    if (parts.length >= 3) {
                        var x = parseInt(parts[0].trim()) * 64; // Convert grid to pixels
                        var y = parseInt(parts[1].trim()) * 64; // Convert grid to pixels
                        var objectName = parts[2].trim();
                        
                        // Create object based on name
                        var obj = this.createObject(objectName, x, y);
                        if (obj) {
                            this.objects.push(obj);
                        }
                    }
                }
                
                this.loaded = true;
                console.log('World loaded with', this.objects.length, 'objects');
            })
            .catch(error => {
                console.error('Error loading world.map:', error);
            });
    },
    
    createObject: function(name, x, y) {
        switch(name) {
            case 'Bush':
                return new Bush(x, y);
            case 'Tree':
                return new Tree(x, y);
            default:
                console.warn('Unknown object type:', name);
                return null;
        }
    },
    
    update: function(deltaTime) {
        // Update all world objects
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].update(deltaTime);
        }
    },
    
    render: function(ctx, canvas) {
        // Load map if not already loaded
        if (!this.loaded) {
            this.loadMap();
        }
        
        // Render all world objects
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].render(ctx, canvas);
        }
    }
};
