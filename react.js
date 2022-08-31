import { InstanceMap } from "./instanceMap";

export class Component {
    static isClassComponent = true;

    constructor(props) {
        this.props = props;
    }

    setState(state) {
        const controller = InstanceMap.get(this);
        controller.update(state);
    }
}