function JSTabs(tabsId, options = {}) {
    this._tabs = document.querySelector(tabsId);

    if (!this._tabs) {
        console.error(`${tabsId} is not defined`);
        return;
    }

    this._currentLink;
    this._beforeLink;
    this._handleClick = function (e) {
        if (e.target.tagName === "UL") {
            return;
        }

        this._originTab = document.querySelector(".JSTabs--active");
        if (this._originTab) {
            this._beforeLink = this._originTab.firstElementChild;
            this._currentLink = this._originTab.firstElementChild;

            this._clickedTab = e.target.closest("li");
            this._clickedLink = e.target.closest("[href]");
        } else {
            console.error("khong tim thay tab mac dinh");
            return;
        }

        if (this._originTab !== this._clickedTab) {
            this._clickedTab.classList.add("JSTabs--active");
            this._originTab.classList.remove("JSTabs--active");
            this._currentLink = this._clickedLink;
        }

        handleTab(this._currentLink, this._beforeLink);
    };

    handleTab = (clickedLink, beforeLink) => {
        const thisTabId = clickedLink.getAttribute("href");
        const beforeTabId = beforeLink.getAttribute("href");

        if (clickedLink !== beforeLink) {
            const thisTab = document.querySelector(thisTabId);
            const beforeTab = document.querySelector(beforeTabId);

            thisTab.removeAttribute("hidden");
            beforeTab.setAttribute("hidden", "");
        }
    };

    this.toggle = function (tabId) {
        const thisLink = document.querySelector(`[href="${tabId}"]`);
        const thisBeforeTab = document.querySelector(".JSTabs--active");

        if (thisBeforeTab) {
            const thisBeforeLink = thisBeforeTab.firstElementChild;
            thisBeforeTab.classList.remove("JSTabs--active");
            thisLink.closest("li").classList.add("JSTabs--active");

            handleTab(thisLink, thisBeforeLink);
        }
    };

    this._tabs.onclick = this._handleClick;

    this.destroy = function () {
        this._tabs.onclick = null;
        this.toggle = null;
        this._handleClick = null;
        handleTab = null;
    };
}

const tabs = new JSTabs("#tabs");
// tabs.toggle("#tab2");
// tabs.destroy();
