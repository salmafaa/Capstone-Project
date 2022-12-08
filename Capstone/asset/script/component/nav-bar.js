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
                <li><a href="homePage.html">Home</a></li>
                <li><a href="detection.html">Detection</a></li>
                <li><a href="reference.html">Reference</a></li>
                <li><a href="myLibrary.html">My Library</a></li>
            </ul>
            </div>
        </nav>
        `;
    }
}

customElements.define('nav-bar', NavBar);
