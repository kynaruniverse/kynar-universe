/**
 * QUIET FORGE SATCHEL LOGIC
 * Role: Manage the collection of artifacts
 */

const Satchel = {
    
    getKey() {
        return 'kynar_cart';
    },

    getContents() {
        return JSON.parse(localStorage.getItem(this.getKey()) || '[]');
    },

    add(artifact) {
        const contents = this.getContents();
        
        // Prevent duplicates (Quiet Forge rule: One of each tool is enough)
        if (!contents.find(item => item.id === artifact.id)) {
            contents.push(artifact);
            this.save(contents);
            return true; // Added
        }
        return false; // Already exists
    },

    remove(artifactId) {
        let contents = this.getContents();
        contents = contents.filter(item => item.id !== artifactId);
        this.save(contents);
    },

    clear() {
        localStorage.removeItem(this.getKey());
        this.updateUI();
    },

    save(contents) {
        localStorage.setItem(this.getKey(), JSON.stringify(contents));
        this.updateUI();
    },

    total() {
        const contents = this.getContents();
        return contents.reduce((sum, item) => sum + item.price, 0);
    },

    // Signals the UI to update numbers (Ghost Nav)
    updateUI() {
        if (window.ForgeUtils) {
            window.ForgeUtils.updateSatchelCount();
        }
    }
};

// Expose to window for global access
window.Satchel = Satchel;
