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

  receive(nextElement) {
    this.text = nextElement;
    // 直接更改文本内容
    this.node.textContent = this.text;
  }

  unmount() {
    this.node = null;
  }

  createElement() {
    this.node = document.createTextNode(this.text);
  }
}
