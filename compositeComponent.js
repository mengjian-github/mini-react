import { InstanceMap } from "./instanceMap";
import { instantiate } from "./instantiate";
export default class CompositeComponent {
  constructor(element) {
    this.element = element;
    this.component = element.type;
    this.props = element.props;
  }

  execHook(name, ...args) {
    if (this.instance?.[name]) {
        this.instance[name].call(this.instance, ...args);
    }
  }

  getHostNode() {
    return this.renderedComponent?.getHostNode();
  }

  mount() {
    this.instantiate();
    this.execHook('componentWillMount');
    this.render();

    return this.toMount();
  }

  toMount() {
    // 递归执行mount
    let result = null;
    if (this.renderedElement) {
      this.renderedComponent = instantiate(this.renderedElement);
      result = this.renderedComponent.mount();
    }

    this.execHook('componentDidMount');
    return result;
  }


  receive(nextElement) {
    this.execHook('componetWillReceiveProps', nextElement.props);
    const prevProps = this.props;

    this.element = nextElement;
    this.component = nextElement.type;
    this.props = nextElement.props;
    this.instance.props = this.props; // 更新组件的props

    this.update({}, prevProps); // 递归执行子组件更新
    this.execHook('componentDidUpdate');
  }

  update(state, prevProps = this.props) {
    const prevState = this.instance.state;
    const nextState = { ...this.instance.state, ...state };
    this.execHook('componentWillUpdate', this.props, nextState);

    if (state) {
      // 更新state
      this.instance.state = nextState;
    }

    const prevElement = this.renderedElement;
    this.render();
    const nextElement = this.renderedElement;


    if (prevElement.type === nextElement.type) {
      // 可以进行增量更新
      this.renderedComponent?.receive(nextElement)
    } else {
      // 销毁重建
      const hostNode = this.getHostNode();
      this.unmount();
      const newNode = this.toMount();
      // 替换DOM节点（这里简便起见将更新DOM操作写在这里，理论上React组件和平台无关，应该依赖注入）
      hostNode.parentNode.replaceChild(newNode, hostNode);
    }

    this.execHook('componentDidUpdate', prevProps, prevState);
  }

  unmount() {
    this.execHook('componentWillUnmount');
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
      this.instance = null; // 函数组件不需要实例化
    }
  }
}
