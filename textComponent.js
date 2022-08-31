export default class TextComponent {
    constructor(element) {
        this.text = element;
    }

    getHostNode() {
        return this.node;
    }

    mount() {
        this.createElement();

        return this.node;
    }

    unmount() {
        this.node = null;
    }
    
    createElement() {
        this.node = document.createTextNode(this.text);
    }
}