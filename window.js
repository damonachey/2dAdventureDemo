// Handle window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Track pressed keys for movement
var keys = {};
var pressedKeys = []; // Track all currently pressed keys for display

// Handle keyboard events
window.addEventListener('keydown', function(e) {
    var keyName = e.key === ' ' ? 'Space' : e.key;
    
    // Check if the key is a modifier key itself
    var isModifierKey = keyName === 'Control' || keyName === 'Alt' || keyName === 'Shift' || keyName === 'Meta';
    
    if (isModifierKey) {
        // For modifier keys, just show the key name
        statistics.setCurrentKey(keyName);
    } else {
        // Build modifier string for non-modifier keys
        var modifiers = [];
        if (e.ctrlKey) modifiers.push('CTRL');
        if (e.altKey) modifiers.push('ALT');
        if (e.shiftKey) modifiers.push('SHIFT');
        if (e.metaKey) modifiers.push('META');
        
        // Combine modifiers with key
        if (modifiers.length > 0) {
            keyName = modifiers.join('-') + '-' + keyName;
        }
        
        statistics.setCurrentKey(keyName);
    }
    
    // Track arrow keys for movement
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys[e.key] = true;
    }
    
    // Add key to pressed keys list if not already there
    var displayKey = keyName;
    if (pressedKeys.indexOf(displayKey) === -1) {
        pressedKeys.push(displayKey);
    }
    
    // Update statistics with all pressed keys
    statistics.setCurrentKey(pressedKeys.join(', '));
    
    // Handle CTRL+s to toggle statistics
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        statistics.toggle();
    }
    
    // Handle CTRL+g to toggle grid
    if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        grid.toggle();
    }
});

window.addEventListener('keyup', function(e) {
    // Release arrow keys
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys[e.key] = false;
    }
    
    // Remove key from pressed keys list
    var keyName = e.key === ' ' ? 'Space' : e.key;
    var index = pressedKeys.indexOf(keyName);
    if (index > -1) {
        pressedKeys.splice(index, 1);
    }
    
    // Update statistics with remaining pressed keys
    statistics.setCurrentKey(pressedKeys.length > 0 ? pressedKeys.join(', ') : '');
});
