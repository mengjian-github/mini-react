import { instantiate } from "./instantiate";

export default class ReactDom {
    static render(element, container) {
        const controller = instantiate(element);
        controller.mount();
    }
}