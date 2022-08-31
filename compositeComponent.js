export default class CompositeComponent {
    constructor(element) {
        this.element = element;
    }

    mount() {
        console.log('开始执行mount');
    }
}