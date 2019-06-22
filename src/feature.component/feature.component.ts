customElements.define('feature-component', class FeatureComponent extends HTMLElement {

    static get observedAttributes() {
        return ['name'];
    }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents
     * have been fully parsed
     */
    connectedCallback() {
        this.innerHTML = `Feature ${this.getAttribute('name')}`;
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
        console.log('attributeChangedCallback', name, newValue);
    }

});
