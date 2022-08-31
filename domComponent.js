export default class DomComponent {
    constructor(element) {
        this.element = element;
        this.tag = element.type;
        this.props = element.props;
    }

    mount() {
        this.createElement();
        this.setAttribute();
        
        console.log(this.node);
        return this.node;
    }

    createElement() {
        this.node = document.createElement(this.tag);
    }

    setAttribute() {
        Object.keys(this.props).forEach(attribute => {
            if (attribute !== 'children') {
                if (attribute === 'className') {
                    this.node.setAttribute('class', this.props[attribute])
                } else {
                    this.node.setAttribute(attribute, this.props[attribute]);
                }
            }
        })
    }
}