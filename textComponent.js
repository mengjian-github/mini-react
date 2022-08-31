export default class TextComponent {
    constructor(element) {
        this.text = element;
    }

    mount() {
        this.createElement();

        console.log(this.node);
        return this.node;
    }
    
    createElement() {
        this.node = document.createTextNode(this.text);
    }
}