class FooterBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="footer"> 
            <p> More Info </p>
        </div>
        `;
    }
}

customElements.define('footer-bar', FooterBar);