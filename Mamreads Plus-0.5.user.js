// ==UserScript==
// @name         Mamreads Plus
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Adds a "Search MAM" button to Goodreads book and series pages.
// @author       wh04m1Ev32
// @match        *://www.goodreads.com/book/show/*
// @match        *://www.goodreads.com/series/*
// @grant        none
// @license      MIT
// ==/UserScript==

// Originally made by Slengpung, later modified by me!

(function() {
    'use strict';
    console.log("The script is loaded... now we check...");

    // Individual Book Page Logic
    function addMamButtonToBookPage() {
        if (document.getElementById('mam-search-button-single')) {
            console.log("[G+] Button already exists. Halting.");
            return;
        }
        console.log("[G+] Book page detected! Running script...");

        let bookTitle = "", authorName = "";
        try {
            bookTitle = document.querySelector('[data-testid="bookTitle"]').innerText;
            authorName = document.querySelector('[data-testid="name"]').innerText;
            console.log(`[G+] Book title: ${bookTitle}\nAuthor name: ${authorName}`);
        } catch (e) {
            console.error("[G+] Could not find title or author.", e);
            return;
        }

        const encodedQuery = encodeURIComponent(`${bookTitle} ${authorName}`);
        const mamSearchUrl = `https://www.myanonamouse.net/tor/browse.php?tor[text]=${encodedQuery}`;
        const buttonContainer = document.querySelector('.BookActions');
        if (!buttonContainer) {
            console.error("[G+] Could not find a container to add the button to.");
            return;
        }

        const buttonToClone = buttonContainer.querySelector('button');
        if (!buttonToClone) {
            console.error("[G+] Could not find a button to clone for styling.");
            return;
        }

        const mamButton = buttonToClone.cloneNode(true);
        mamButton.id = 'mam-search-button-single';
        mamButton.innerText = "Search MAM";
        mamButton.onclick = () => window.open(mamSearchUrl, '_blank');

        Object.assign(mamButton.style, {
            marginTop: '8px',
            marginBottom: '8px',
            backgroundColor: '#ebc210',
            color: 'black',
            borderColor: '#ebc210'
        });

        const icon = document.createElement('img');
        icon.src = 'https://i.postimg.cc/nzMcQpSF/my-Anona-Mouse-logo.png';
        icon.alt = 'icon';
        icon.style.width = '22px';
        icon.style.height = '22px';
        icon.style.marginRight = '12px'; // space between image and text
        icon.style.verticalAlign = 'middle';

        mamButton.prepend(icon);

        const originalColor = '#ebc210';
        const hoverColor = '#d1a80e';

        icon.style.transition = 'all 0.2s ease-in-out';

        mamButton.addEventListener('mouseenter', () => {
            mamButton.style.backgroundColor = hoverColor;
            icon.style.filter = 'brightness(0.87)';
        });

        mamButton.addEventListener('mouseleave', () => {
            mamButton.style.backgroundColor = originalColor;
            icon.style.filter = 'brightness(1)';
        });

        const wantToReadButtonContainer = buttonContainer.querySelector('.BookActions__button');

        if (wantToReadButtonContainer) {
            wantToReadButtonContainer.insertAdjacentElement('afterend', mamButton);
        } else {
            // If for some reason we can't find it, back back to end
            buttonContainer.appendChild(mamButton);
        }
        console.log("[G+] 'Search MAM' button added!");
    }

    // Series Page Logic
    function addMamButtonsToSeriesPage() {
        if (document.querySelector('.mam-search-button-series')) {
            console.log("[G+] Series buttons already added. Halting.");
            return;
        }
        console.log("[G+] Series page detected! Running script...");

        const allBooks = document.querySelectorAll('.responsiveBook');
        console.log(`[G+] Found ${allBooks.length} books on the page.`);

        for (const bookElement of allBooks) {
            try {
                const title = bookElement.querySelector('[itemprop="name"]').innerText;
                const author = bookElement.querySelector('[itemprop="author"] [itemprop="name"]').innerText;

                const actionsContainer = bookElement.querySelector('.objectLockupContent__actions');
                const buttonToClone = actionsContainer.querySelector('.wantToReadButton button');

                if (title && author && actionsContainer && buttonToClone) {
                    const encodedQuery = encodeURIComponent(`${title} ${author}`);
                    const mamSearchUrl = `https://www.myanonamouse.net/tor/browse.php?tor[text]=${encodedQuery}`;

                    const mamButton = buttonToClone.cloneNode(false);

                    mamButton.innerText = "Search MAM";
                    mamButton.className = ' mam-search-button-series';

                    Object.assign(mamButton.style, {
                        marginTop: '4px',
                        marginLeft: '8px',
                        paddingTop: '2px',
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        backgroundColor: '#ebc210',
                        color: 'black',
                        borderRadius: '0.25rem',
                        border: 'none',
                        fontFamily: '"Lato", "Helvetica Neue", "Helvetica", sans-serif',
                        fontSize: '14px',
                        lineHeight: '1',
                        height: '31px',
                        width: '150px',
                        cursor: 'pointer'
                    });

                    const icon = document.createElement('img');
                    icon.src = 'https://i.postimg.cc/nzMcQpSF/my-Anona-Mouse-logo.png';
                    icon.alt = 'icon';
                    icon.style.width = '16px';
                    icon.style.height = '16px';
                    icon.style.marginRight = '8px'; // space between image and text
                    icon.style.verticalAlign = 'middle';


                    mamButton.prepend(icon);

                    const originalColor = '#ebc210';
                    const hoverColor = '#d1a80e';

                    mamButton.addEventListener('mouseenter', () => {
                        mamButton.style.backgroundColor = hoverColor;
                        icon.style.filter = 'brightness(0.87)';
                    });

                    mamButton.addEventListener('mouseleave', () => {
                        mamButton.style.backgroundColor = originalColor;
                        icon.style.filter = 'brightness(1)';
                    });

                    mamButton.onclick = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(mamSearchUrl, '_blank');
                    }

                    actionsContainer.appendChild(mamButton);
                }
            } catch (e) {
                console.error("Could not process a book entry, skipping.", bookElement);
            }
        }
        console.log("[G+] Finished adding series buttons!");
    }


    let currentPage = '';

    function runCheck() {
        const path = window.location.pathname;

        if (currentPage === path) {
            return;
        }

        if (path.includes('/book/show/')) {
            if (document.querySelector('[data-testid="bookTitle"]')) {
                console.log("[G+] Running check for Book Page.");
                currentPage = path;
                addMamButtonToBookPage();
            }
        } else if (path.includes('/series/')) {
            if (document.querySelector('.responsiveSeriesHeader__title')) {
                console.log("[G+] Running check for Series Page.");
                currentPage = path;
                addMamButtonsToSeriesPage();
            }
        } else {
            currentPage = '';
        }
    }

    const observer = new MutationObserver(runCheck);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    runCheck();

})();