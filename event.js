export const EventMap = {
    'onClick': 'click'
}

const callbackMap = new Map();

export default class EventListener {
    static isEventAttribute(attribute) {
        return !!EventMap[attribute];
    }

    static listen(attribute, callback, dom) {
        dom.addEventListener(EventMap[attribute], callback);

        // 存储callback
        if (!callbackMap.has(dom)) {
            callbackMap.set(dom, {});
        }
        callbackMap.get(dom)[attribute] = callback;
    }

    static remove(attribute, dom) {
        dom.removeEventListener(EventMap[attribute], callbackMap.get(dom)[attribute])
    }
}