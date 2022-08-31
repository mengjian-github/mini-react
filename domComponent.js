import EventListener from "./event";
import { instantiate } from "./instantiate";

export default class DomComponent {
    constructor(element) {
        this.element = element;
        this.tag = element.type;
        this.props = element.props;
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
        children.forEach(childElement => {
            const node = instantiate(childElement).mount();
            if (node) {
                nodeList.push(node);
            }
        });
        // 挂载子节点
        nodeList.forEach(node => {
            this.node.appendChild(node);
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