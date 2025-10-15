// Handle window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

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
    statistics.setCurrentKey('');
});