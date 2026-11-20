function Tabzy(selector, options = {}) {
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

    this.panels = this._getPanels();
    if (this.panels.includes(null)) return;

    this.paramKey = this._removeSpecChar(selector);
    this.opt = Object.assign({ remember: false, onChange: null, activeClassName: "Tabzy--active" }, options);
    this._tabHTML = this.container.innerHTML;
    this._init();
}

Tabzy.prototype._init = function () {
    const params = new URLSearchParams(location.search);
    const tabSelector = params.get(this.paramKey);
    const tab = this._findTabs(tabSelector);

    this.currentTab = tab;
    this._activateTab(tab, false);

    this.tabs.forEach((tab) => {
        tab.onclick = (event) => {
            event.preventDefault();
            this._tryActivateTab(tab);
        };
    });

    this.activeClass = this.opt.activeClassName;
};

Tabzy.prototype._getPanels = function () {
    return this.tabs.map((tab) => {
        const panel = document.querySelector(tab.getAttribute("href"));
        if (!panel) {
            console.error(`No container found for selector ${tab.getAttribute("href")} "href"`);
            return null;
        }
        return panel;
    });
};

Tabzy.prototype._removeSpecChar = function (string) {
    return string.replace(/[^a-zA-Z0-9]/g, "");
};

Tabzy.prototype._findTabs = function (tabSelector) {
    return (this.opt.remember && tabSelector && this.tabs.find((tab) => this._removeSpecChar(tab.getAttribute("href")) === tabSelector)) || this.tabs[0];
};

Tabzy.prototype._tryActivateTab = function (tab) {
    if (this.currentTab !== tab) {
        this._activateTab(tab);
        this.currentTab = tab;
    }
};

Tabzy.prototype._activateTab = function (tab, triggerOnChange = true) {
    this.tabs.forEach((tab) => tab.closest("li").classList.remove(this.activeClass));
    tab.closest("li").classList.add(this.activeClass);

    this.panels.forEach((panel) => (panel.hidden = true));
    const panelActive = document.querySelector(tab.getAttribute("href"));
    panelActive.hidden = false;

    if (this.opt.remember) this._updateURL(tab);

    if (triggerOnChange && typeof this.opt.onChange === "function") {
        this.opt.onChange({
            tab,
            panel: panelActive,
        });
    }
};

Tabzy.prototype._updateURL = function (tab) {
    const params = new URLSearchParams(location.search);
    const paramsValue = this._removeSpecChar(tab.getAttribute("href"));
    params.set(this.paramKey, paramsValue);
    history.replaceState(null, null, `?${params}`);
};

Tabzy.prototype.switch = function (input) {
    const tabToActivate = typeof input === "string" ? this.tabs.find((tab) => tab.getAttribute("href") === input) : input;

    if (!this.tabs.includes(tabToActivate)) {
        console.error(`Invalid tab ${input}`);
        return;
    }

    this._tryActivateTab(tabToActivate);
};

Tabzy.prototype.destroy = function () {
    this.container.innerHTML = this._tabHTML;
    this.panels.forEach((panel) => (panel.hidden = false));
    this.container = null;
    this.tabs = null;
    this.panels = null;
    this.currentTab = null;
};

const tabs = new Tabzy("#tabs", {
    remember: true,
    activeClassName: "siuuu-active",
    onChange: (data) => {
        console.log(data);
    },
});
const tabs1 = new Tabzy("#tabs1", {
    remember: true,
    onChange: (data) => {
        console.log(data);
    },
});
