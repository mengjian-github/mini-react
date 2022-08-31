import { instantiate } from "./instantiate";
export default class CompositeComponent {
    constructor(element) {
        this.element = element;
        this.component = element.type;
        this.props = element.props;
    }

    mount() {
        this.instantiate();
        this.render();
        // 递归执行mount
        if (this.renderedElement) {
            return instantiate(this.renderedElement).mount();
        }
        return null;
    }

    render() {
        if (this.instance) {
            this.renderedElement = this.instance.render();
        } else {
            this.renderedElement = this.component(this.props);
        }
    }

    instantiate() {
        if (this.component.isClassComponent) {
            this.instance = new this.component(this.props);
        } else {
            this.instance = null;   // 函数组件不需要实例化
        }
    }
}