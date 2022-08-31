import { instantiate } from "./instantiate";

export default class ReactDom {
    static render(element, container) {
        const controller = instantiate(element);
        const domElement = controller.mount();
        container.appendChild(domElement);
    }
}