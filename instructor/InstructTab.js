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

    this.opt = Object.assign({ remember: false }, options);
    this._tabHTML = this.container.innerHTML;
    this._init();
}

Tabzy.prototype._init = function () {
    const hash = location.hash;
    console.log(`hash hiện tại: ${hash}`);
    const tabToActivate = (this.opt.remember && hash && this.tabs.find((tab) => tab.getAttribute("href") === hash)) || this.tabs[0];

    this._activateTab(tabToActivate);

    this.tabs.forEach((tab) => {
        tab.onclick = (event) => this._handleTabClick(event, tab);
    });
};

Tabzy.prototype._handleTabClick = function (event, tab) {
    event.preventDefault();

    this._activateTab(tab);
};

Tabzy.prototype._activateTab = function (tab) {
    this.tabs.forEach((tab) => tab.closest("li").classList.remove("Tabzy--active"));
    tab.closest("li").classList.add("Tabzy--active");

    this.panels.forEach((panel) => (panel.hidden = true));
    const panelActive = document.querySelector(tab.getAttribute("href"));
    panelActive.hidden = false;

    if (this.opt.remember) {
        console.log(`hash trên url tiếp theo: ${tab.getAttribute("href")}`);
        history.replaceState(null, null, tab.getAttribute("href"));
    }
};

Tabzy.prototype.switch = function (input) {
    let tabToActivate = null;

    if (typeof input === "string") {
        tabToActivate = this.tabs.find((tab) => tab.getAttribute("href") === input);
        if (!tabToActivate) {
            console.error("tab does not exits");
            return;
        }
    } else if (this.tabs.includes(tab)) {
        tabToActivate = input;
    }

    if (!tabToActivate) {
        console.error("Invalid tab input");
        return;
    }

    this._activateTab(tabToActivate);
};

Tabzy.prototype.destroy = function () {
    this.container.innerHTML = this._tabHTML;
    this.panels.forEach((panel) => (panel.hidden = false));
    this.container = null;
    this.tabs = null;
    this.panels = null;
};

const tabs = new Tabzy("#tabs", { remember: true });
const tabs1 = new Tabzy("#tabs1", { remember: true });
