customElements.define('home-component', class HomeComponent extends HTMLElement {

    static get observedAttributes() {
        return [];
    }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents
     * have been fully parsed
     */
    connectedCallback() {
        this.innerHTML = `<h4>Home</h4>
        <p>
            <a href="#/home/feature1">Feature 1</a>
            <a href="#/home/feature2">Feature 2</a>
        </p>
        <div data-role="outlet">Home routes</div>
        `;
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

});
