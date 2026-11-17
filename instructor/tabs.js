function Tabzy(selector) {
    this.container = document.querySelector(selector);
    if (!this.container) {
        console.error(`No container found for selector ${selector}`);
        return;
    }

    this.tabs = Array.from(this.container.querySelectorAll("li a"));
    if (!this.tabs.length) {
        this.tabs = [];
        console.error(`No tabs found inside the container`);
        return;
    }

    let hasError = false;
    this.panels = this.tabs.map((tab) => {
        const panel = document.querySelector(tab.getAttribute("href"));
        if (!panel) {
            console.error(`No container found for selector ${tab.getAttribute("href")} "href"`);
            hasError = true;
        }
        return panel;
    });

    if (hasError) return;

    this._init();
}

Tabzy.prototype._init = function () {
    const tabActive = this.tabs[0];
    tabActive.closest("li").classList.add("Tabzy--active");

    this.panels.forEach((panel) => (panel.hidden = true));

    this.tabs.forEach((tab) => {
        tab.onclick = (event) => this._handleTabClick(event, tab);
    });

    const panelActive = this.panels[0];
    panelActive.hidden = false;
};

Tabzy.prototype._handleTabClick = function (event, tab) {
    event.preventDefault();

    this.tabs.forEach((tab) => tab.closest("li").classList.remove("Tabzy--active"));
    tab.closest("li").classList.add("Tabzy--active");

    this.panels.forEach((panel) => (panel.hidden = true));
    const panelActive = document.querySelector(tab.getAttribute("href"));
    panelActive.hidden = false;
};

const tabs = new Tabzy("#tabs");
