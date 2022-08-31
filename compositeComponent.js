import { InstanceMap } from "./instanceMap";
import { instantiate } from "./instantiate";
export default class CompositeComponent {
    constructor(element) {
        this.element = element;
        this.component = element.type;
        this.props = element.props;
    }

    getHostNode() {
        return this.renderedComponent?.getHostNode();
    }

    mount() {
        this.instantiate();
        this.render();
        // 递归执行mount
        if (this.renderedElement) {
            this.renderedComponent = instantiate(this.renderedElement);
            return this.renderedComponent.mount();
        }
        return null;
    }

    update(state) {
        // 更新state
        this.instance.state = {...this.instance.state, ...state};
        // 重新触发render
        this.render();
        // 先挂载
        this.unmount();

    }

    unmount() {
        this.renderedComponent?.unmount();
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
            InstanceMap.set(this.instance, this);
        } else {
            this.instance = null;   // 函数组件不需要实例化
        }
    }
}