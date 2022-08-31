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

  formatChildren(children) {
    children = children || [];

    if (!Array.isArray(children)) {
      children = [children];
    }

    return children;
  }

  mountChildren() {
    const children = this.formatChildren(this.props.children);

    const nodeList = [];
    const childComopnents = [];
    children.forEach((childElement) => {
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
    nodeList.forEach((node) => {
      this.node.appendChild(node);
    });
  }

  receive(nextElement) {
    this.updateAttribute(nextElement.props);
    this.updateChildren(nextElement.props);

    this.element = nextElement;
    this.tag = nextElement.type;
    this.props = nextElement.props;
  }

  updateChildren(nextProps) {
    const prevChildren = this.formatChildren(this.props.children);
    const nextChildren = this.formatChildren(nextProps.children);


    for (let i = 0; i < nextChildren.length; i++) {
        const prevChild = prevChildren[i];
        const nextChild = nextChildren[i];
        const prevComponent = this.childComponents[i];
        const nextComponent = instantiate(nextChild);
        
        if (!nextComponent) {
            continue;
        }

        if (prevChild == null) {
            // 旧的child不存在，说明是新增的场景
            this.node.appendChild(nextComponent.mount())
        } else if (prevChild.type === nextChild.type) {
            // 相同类型的元素，可以直接更新
            prevComponent.receive(nextChild);
        } else {
            // 销毁重建
            const prevNode = prevComponent.getHostNode();
            prevComponent.unmount();
            this.node.replaceChild(nextComponent.mount(), prevNode);
        }
    }

    for (let i = nextChildren.length; i < prevChildren.length; i++) {
        // next里面不存在的，要删除
        const prevComponent = this.childComponents[i];
        const prevNode = prevComponent.getHostNode();
        prevComponent.unmount();
        this.node.removeChild(prevNode);
    }
  }

  updateAttribute(nextProps) {
    const prevProps = this.props;

    // 更新新的属性
    Object.keys(nextProps).forEach((attribute) => {
      if (attribute !== "children") {
        if (attribute === "className") {
          this.node.setAttribute("class", this.props[attribute]);
        } else if (EventListener.isEventAttribute(attribute)) {
          EventListener.remove(attribute, this.node);
          EventListener.listen(attribute, this.props[attribute], this.node);
        } else {
          this.node.setAttribute(attribute, this.props[attribute]);
        }
      }
    });

    // 删除旧的属性
    Object.keys(prevProps).forEach((attribute) => {
        if (attribute !== "children") {
          if (!nextProps.hasOwnProperty(attribute)) {
            this.node.removeAttribute(attribute);
          }
        }
      });
  }

  unmount() {
    this.childComponents.forEach((child) => {
      child.unmount();
    });
    this.node = null;
  }

  createElement() {
    this.node = document.createElement(this.tag);
  }

  setAttribute() {
    Object.keys(this.props).forEach((attribute) => {
      if (attribute !== "children") {
        if (attribute === "className") {
          this.node.setAttribute("class", this.props[attribute]);
        } else if (EventListener.isEventAttribute(attribute)) {
          EventListener.listen(attribute, this.props[attribute], this.node);
        } else {
          this.node.setAttribute(attribute, this.props[attribute]);
        }
      }
    });
  }
}
