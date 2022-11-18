let trends_moved = false;

function startup() {
    const observer = new MutationObserver((mutations) => {
        for (let i = 0; i < mutations.length; i++) {
            if (mutations[i].addedNodes.length) {
                observer.disconnect();
                
                const composeForm = document.querySelector('.compose-form')
                composeForm.style.display = 'none'

                // Move publish to inside compose
                const formButtons = document.querySelector(".compose-form__buttons-wrapper");
                const publishButton = document.querySelector(".compose-form__publish-button-wrapper")
                formButtons.appendChild(publishButton)

                // Move profile to bottom left
                const navigationPanel = document.querySelector(".navigation-panel")
                const navigationBar = document.querySelector(".navigation-bar")
                navigationPanel.appendChild(navigationBar)
                
                waitForScrollableDOM()
            }
        }
    })

    observer.observe(mastodon, { childList: true })
}

function waitForScrollableDOM() {
    const observer = new MutationObserver((mutations) => {
        for (let i = 0; i < mutations.length; i++) {
            if (mutations[i].addedNodes.length) {
                const trending = document.querySelector(".getting-started__trends")
                if (trending && trending.children.length > 1) {
                    observer.disconnect();
                    initialize();
                    return;
                }
            }
        }
    })

    observer.observe(mastodon, { childList: true, subtree: true })
}

function initialize() {
    const itemList = document.querySelector('.item-list')
    const composeForm = document.querySelector(".compose-form")
    const composePanel = document.querySelector(".compose-panel")
    const trending = document.querySelector(".getting-started__trends")

    // Move trending to the right
    composePanel.appendChild(trending)

    // add composeForm to the top of the itemList
    itemList.insertBefore(composeForm, itemList.firstChild)
    composeForm.style.display = 'block'
}

startup();
