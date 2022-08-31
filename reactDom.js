export default class ReactDom {
    static render(element, container) {
        console.log('触发了render', element, container);
    }
}