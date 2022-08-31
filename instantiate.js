import CompositeComponent from "./compositeComponent";
import DomComponent from "./domComponent";
import TextComponent from "./textComponent";

export function instantiate(element) {
    if (typeof element === 'string' || typeof element === 'number') {
        return new TextComponent(element);
    }
    if (typeof element.type === 'string') {
        return new DomComponent(element);
    }
    if (typeof element.type === 'object' || typeof element.type == 'function') {
        return new CompositeComponent(element);
    }

    return null;
}