const styles = document.createElement('style');
styles.textContent = require('./entry-list.component.css');

const template = document.createElement('template');
template.innerHTML = require('./entry-list.component.html');

export class EntryListComponent extends HTMLElement {

    /**
     * Return an array containing the names of the attributes you want to observe.
     */
    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents
     * have been fully parsed
     */
    connectedCallback() {
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(styles.cloneNode(true));
            const element = document.importNode(template.content, true).firstElementChild;
            this.shadowRoot.appendChild(<Node>element);
        }
    }

    /**
     * Invoked each time the custom element is disconnected from the document's DOM.
     */
    disconnectedCallback() {

    }

    /**
     * Invoked each time one of the custom element's attributes is added, removed, or changed.
     * Which attributes to notice change for is specified in a static get observedAttributes method
     */
    attributeChangedCallback(name, oldValue, newValue) {

    }

}

customElements.define('entry-list-component', EntryListComponent);
