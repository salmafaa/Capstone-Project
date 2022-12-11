class NavBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <nav>
            <div class="menu">
            <p>Pneumonia</p>
            <ul>
                <li><a href="{{ url_for('index') }}">Home</a></li>
                <li><a href="{{ url_for('detection') }}">Detection</a></li>
                <li><a href="{{ url_for('myLibrary') }}">Reference</a></li>
                <li><a href="{{ url_for('reference') }}">My Library</a></li>
            </ul>
            </div>
        </nav>
        `;
    }
}

customElements.define('nav-bar', NavBar);
