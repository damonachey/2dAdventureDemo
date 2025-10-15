var world = {
    objects: [],
    loaded: false,
    tilesLoaded: {},
    tilesLoading: {},
    
    loadTileScript: function(tileName) {
        return new Promise((resolve, reject) => {
            // If already loaded, resolve immediately
            if (this.tilesLoaded[tileName]) {
                resolve();
                return;
            }
            
            // If already loading, wait for existing promise
            if (this.tilesLoading[tileName]) {
                this.tilesLoading[tileName].then(resolve).catch(reject);
                return;
            }
            
            // Start loading the script
            this.tilesLoading[tileName] = new Promise((scriptResolve, scriptReject) => {
                var script = document.createElement('script');
                script.src = 'tiles/' + tileName + '.js';
                script.onload = () => {
                    this.tilesLoaded[tileName] = true;
                    delete this.tilesLoading[tileName];
                    scriptResolve();
                };
                script.onerror = () => {
                    delete this.tilesLoading[tileName];
                    scriptReject(new Error('Failed to load ' + tileName + '.js'));
                };
                document.head.appendChild(script);
            });
            
            this.tilesLoading[tileName].then(resolve).catch(reject);
        });
    },
    
    loadMap: function() {
        if (this.loaded) return;
        
        // Load world.map file
        fetch('world.map')
            .then(response => response.text())
            .then(data => {
                var lines = data.split('\n');
                var uniqueTiles = new Set();
                var objectsToCreate = [];
                
                // First pass: collect unique tile types and object data
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
                        
                        uniqueTiles.add(objectName);
                        objectsToCreate.push({ x: x, y: y, name: objectName });
                    }
                }
                
                // Load all required tile scripts
                var tilePromises = Array.from(uniqueTiles).map(tileName => 
                    this.loadTileScript(tileName)
                );
                
                return Promise.all(tilePromises).then(() => {
                    // Create objects after all scripts are loaded
                    for (var i = 0; i < objectsToCreate.length; i++) {
                        var objData = objectsToCreate[i];
                        var obj = this.createObject(objData.name, objData.x, objData.y);
                        if (obj) {
                            this.objects.push(obj);
                        }
                    }
                    
                    this.loaded = true;
                    console.log('World loaded with', this.objects.length, 'objects');
                    console.log('Loaded tile types:', Array.from(uniqueTiles));
                });
            })
            .catch(error => {
                console.error('Error loading world.map:', error);
            });
    },

    createObject: function(name, x, y) {
        switch(name) {
            case 'Bush':
                return new Bush(x, y);
            case 'Rock':
                return new Rock(x, y);
            case 'Water':
                return new Water(x, y);
            case 'Bridge':
                return new Bridge(x, y);
            case 'Grass':
                return new Grass(x, y);
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
