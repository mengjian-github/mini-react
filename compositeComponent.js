export default class CompositeComponent {
    constructor(element) {
        this.element = element;
        this.component = element.type;
        this.props = element.props;
    }

    mount() {
        this.instantiate();
    }

    instantiate() {
        if (this.component.isClassComponent) {
            this.instance = new this.component(props);
        } else {
            this.instance = null;   // 函数组件不需要实例化
        }
    }
}