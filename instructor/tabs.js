function Tabzy(selector, options = {}) {
    this.pinHash = options.pinHash;
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
    this._activeTab(tabActive);

    this.tabs.forEach((tab) => {
        tab.onclick = (event) => this._handleTabClick(event, tab);
    });

    const panelActive = this.panels[0];
    this._activePanel(panelActive);
};

Tabzy.prototype._handleTabClick = function (event, tab) {
    event.preventDefault();
    const panelActive = document.querySelector(tab.getAttribute("href"));

    this._activeTab(tab);
    this._activePanel(panelActive);
};

// My code
Tabzy.prototype._activePanel = function (panelActive) {
    this.panels.forEach((panel) => (panel.hidden = true));
    panelActive.hidden = false;
};

Tabzy.prototype._activeTab = function (tab) {
    this.removeTabsActiveClasses();
    tab.closest("li").classList.add("Tabzy--active");
};

Tabzy.prototype.removeTabsActiveClasses = function () {
    this.tabs.forEach((tab) => tab.closest("li").classList.remove("Tabzy--active"));
};

Tabzy.prototype.switch = function (panelSelector) {
    let panel = panelSelector;
    if (typeof panelSelector === "object" && panelSelector) {
        panel = panelSelector.getAttribute("href");
    } else if (!document.querySelector(panelSelector)) {
        console.error("cannot find this tab!");
        return;
    }

    console.log("pass");
    this._activePanel(document.querySelector(panel));
    this._activeTab(document.querySelector(`[href="${panel}"]`));
};

Tabzy.prototype.destroy = function () {
    this.removeTabsActiveClasses();
    this.panels.forEach((panel) => (panel.hidden = false));
    this.container = null;
    this.tabs = null;
    this.panels = null;
};

const tabs = new Tabzy("#tabs", { pinHash: true });
// tabs.destroy();
