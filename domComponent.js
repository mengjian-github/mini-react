export default class DomComponent {
    constructor(element) {
        this.element = element;
    }

    mount() {
        console.log('dom mount开始执行');
    }
}