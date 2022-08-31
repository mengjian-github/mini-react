import EventListener from "./event";
import { instantiate } from "./instantiate";

export default class DomComponent {
    constructor(element) {
        this.element = element;
        this.tag = element.type;
        this.props = element.props;
    }

    getHostNode() {
        return this.node;
    }

    mount() {
        this.createElement();
        this.setAttribute();
        this.mountChildren();

        return this.node;
    }

    mountChildren() {
        let children = this.props.children || [];

        if (!Array.isArray(children)) {
            children = [children];
        }

        
        const nodeList = [];
        const childComopnents = [];
        children.forEach(childElement => {
            const component = instantiate(childElement);
            if (component) {
                childComopnents.push(component);
            }
            const node = component.mount();
            if (node) {
                nodeList.push(node);
            }
        });

        this.childComponents = childComopnents;

        // 挂载子节点
        nodeList.forEach(node => {
            this.node.appendChild(node);
        });
    }

    unmount() {
        this.childComponents.forEach(child => {
            child.unmount();
        });
    }

    createElement() {
        this.node = document.createElement(this.tag);
    }

    setAttribute() {
        Object.keys(this.props).forEach(attribute => {
            if (attribute !== 'children') {
                if (attribute === 'className') {
                    this.node.setAttribute('class', this.props[attribute])
                } else if (EventListener.isEventAttribute(attribute)) {
                    EventListener.listen(attribute, this.props[attribute], this.node);
                } else {
                    this.node.setAttribute(attribute, this.props[attribute]);
                }
            }
        })
    }
}