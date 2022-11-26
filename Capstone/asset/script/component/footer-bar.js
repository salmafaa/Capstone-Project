class FooterBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        
        `;
    }
}

customElements.define('footer-bar', FooterBar);