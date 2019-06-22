const styles = document.createElement('style');
styles.textContent = require('./nav.component.css');

const template = document.createElement('template');
template.innerHTML = require('./nav.component.html');

export class NavComponent extends HTMLElement {

    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    get shroot() {
        if (!this.shadowRoot) {
            throw new Error('shadowRoot is required');
        }
        return this.shadowRoot;
    }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents
     * have been fully parsed
     */
    connectedCallback() {
        this.shroot.appendChild(styles.cloneNode(true));
        this.shroot.appendChild(<Node>document.importNode(template.content, true).firstElementChild);
        this.shroot.addEventListener('click', this);
    }

    /**
     * Invoked each time the custom element is disconnected from the document's DOM.
     */
    disconnectedCallback() {
        this.shroot.removeEventListener('click', this);
    }

    /**
     * Invoked each time one of the custom element's attributes is added, removed, or changed.
     * Which attributes to notice change for is specified in a static get observedAttributes method
     */
    attributeChangedCallback(name, oldValue, newValue) {

    }

    handleEvent(event: Event) {
        const anchor = (event.target as HTMLAnchorElement);
        if (event.type === 'click' && anchor && anchor.nodeName === 'A') {
            event.preventDefault();
            const detail = { href: anchor.href };
            window.dispatchEvent(new CustomEvent('navigate', { composed: true, bubbles: true, detail }));
        }
    }

}

customElements.define('nav-component', NavComponent);
