import CompositeComponent from "./compositeComponent";
import DomComponent from "./domComponent";

export function instantiate(element) {
    if (typeof element.type === 'string') {
        return new DomComponent(element);
    }
    return new CompositeComponent(element);
}