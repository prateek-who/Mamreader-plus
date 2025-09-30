// ==UserScript==
// @name         Mamreader Plus
// @namespace    https://github.com/prateek-who/Mamreader-plus
// @version      0.9.0
// @description  Adds buttons on Goodreads pages to search authors/books/series on MAM
// @author       prateek-who
// @match        *://www.goodreads.com/*
// @updateURL    https://USERNAME.github.io/REPO/mamreads-plus.user.js
// @downloadURL  https://USERNAME.github.io/REPO/mamreads-plus.user.js
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';

  function addMamButtonToBookPage() {
    if (document.getElementById("mam-search-button-single")) {
      console.log("[G+] Button already exists. Halting.");
      return;
    }
    console.log("[G+] Book page detected! Running script...");
    let bookTitle = "", authorName = "";
    try {
      bookTitle = document.querySelector('[data-testid="bookTitle"]')?.innerText ?? "";
      authorName = document.querySelector('[data-testid="name"]')?.innerText ?? "";
      console.log(`[G+] Book title: ${bookTitle}
Author name: ${authorName}`);
    } catch (e) {
      console.error("[G+] Could not find title or author.", e);
      return;
    }
    const encodedQuery = encodeURIComponent(`${bookTitle} ${authorName}`);
    const mamSearchUrl = `https://www.myanonamouse.net/tor/browse.php?tor[text]=${encodedQuery}`;
    const buttonContainer = document.querySelector(".BookActions");
    if (!buttonContainer) {
      console.error("[G+] Could not find a container to add the button to.");
      return;
    }
    const buttonToClone = buttonContainer.querySelector("button");
    if (!buttonToClone) {
      console.error("[G+] Could not find a button to clone for styling.");
      return;
    }
    const mamButton = buttonToClone.cloneNode(true);
    mamButton.id = "mam-search-button-single";
    mamButton.innerText = "Search MAM";
    mamButton.onclick = () => window.open(mamSearchUrl, "_blank");
    Object.assign(mamButton.style, {
      marginTop: "8px",
      marginBottom: "8px",
      backgroundColor: "#ebc210",
      color: "black",
      borderColor: "#ebc210"
    });
    const icon = document.createElement("img");
    icon.src = "https://i.postimg.cc/nzMcQpSF/my-Anona-Mouse-logo.png";
    icon.alt = "icon";
    icon.style.width = "22px";
    icon.style.height = "22px";
    icon.style.marginRight = "12px";
    icon.style.verticalAlign = "middle";
    mamButton.prepend(icon);
    const originalColor = "#ebc210";
    const hoverColor = "#fbd011";
    icon.style.transition = "all 0.2s ease-in-out";
    mamButton.addEventListener("mouseenter", () => {
      mamButton.style.backgroundColor = hoverColor;
      icon.style.filter = "brightness(1.1)";
    });
    mamButton.addEventListener("mouseleave", () => {
      mamButton.style.backgroundColor = originalColor;
      icon.style.filter = "brightness(1)";
    });
    const wantToReadButtonContainer = buttonContainer.querySelector(
      ".BookActions__button"
    );
    if (wantToReadButtonContainer) {
      wantToReadButtonContainer.insertAdjacentElement("afterend", mamButton);
    } else {
      buttonContainer.appendChild(mamButton);
    }
    console.log("[G+] 'Search MAM' button added!");
  }

  function addMamButtonsToSeriesPage() {
    if (document.querySelector(".mam-search-button-series")) {
      console.log("[G+] Series buttons already added. Halting.");
      return;
    }
    console.log("[G+] Series page detected! Running script...");
    const allBooks = document.querySelectorAll(".responsiveBook");
    console.log(`[G+] Found ${allBooks.length} books on the page.`);
    for (const bookElement of allBooks) {
      try {
        const title = bookElement.querySelector('[itemprop="name"]')?.innerText ?? "";
        const author = bookElement.querySelector('[itemprop="author"] [itemprop="name"]')?.innerText ?? "";
        const actionsContainer = bookElement.querySelector(".objectLockupContent__actions");
        const buttonToClone = actionsContainer?.querySelector(".wantToReadButton button");
        if (title && author && actionsContainer && buttonToClone) {
          const encodedQuery = encodeURIComponent(`${title} ${author}`);
          const mamSearchUrl = `https://www.myanonamouse.net/tor/browse.php?tor[text]=${encodedQuery}`;
          const mamButton = buttonToClone.cloneNode(false);
          mamButton.innerText = "Search MAM";
          mamButton.className = " mam-search-button-series";
          Object.assign(mamButton.style, {
            marginTop: "4px",
            marginLeft: "8px",
            paddingTop: "2px",
            paddingLeft: "8px",
            paddingRight: "8px",
            backgroundColor: "#ebc210",
            color: "black",
            borderRadius: "0.25rem",
            border: "none",
            fontFamily: '"Lato", "Helvetica Neue", "Helvetica", sans-serif',
            fontSize: "14px",
            lineHeight: "1",
            height: "31px",
            width: "150px",
            cursor: "pointer"
          });
          const icon = document.createElement("img");
          icon.src = "https://i.postimg.cc/nzMcQpSF/my-Anona-Mouse-logo.png";
          icon.alt = "icon";
          icon.style.width = "16px";
          icon.style.height = "16px";
          icon.style.marginRight = "8px";
          icon.style.verticalAlign = "middle";
          mamButton.prepend(icon);
          const originalColor = "#ebc210";
          const hoverColor = "#d1a80e";
          mamButton.addEventListener("mouseenter", () => {
            mamButton.style.backgroundColor = hoverColor;
            icon.style.filter = "brightness(0.87)";
          });
          mamButton.addEventListener("mouseleave", () => {
            mamButton.style.backgroundColor = originalColor;
            icon.style.filter = "brightness(1)";
          });
          mamButton.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(mamSearchUrl, "_blank");
          };
          actionsContainer.appendChild(mamButton);
        }
      } catch (e) {
        console.error("Could not process a book entry, skipping.", bookElement);
      }
    }
    console.log("[G+] Finished adding series buttons!");
  }

  function addMamButtonToAuthorPage() {
    if (document.querySelector(".mam-search-button-author")) {
      console.log("[G+] Author button already added. Halting.");
      return;
    }
    const followButton = document.querySelector(
      ".authorFollowButtonContainer"
    );
    if (!followButton) return;
    const authorNameElem = document.querySelector(
      ".authorName span[itemprop='name']"
    );
    if (!authorNameElem) return;
    const authorName = authorNameElem.innerText.trim();
    const mamSearchUrl = `https://www.myanonamouse.net/tor/browse.php?tor[text]=${encodeURIComponent(
    authorName
  )}`;
    const mamButton = followButton.cloneNode(true);
    mamButton.innerText = "Search Author";
    mamButton.className = "mam-search-button";
    Object.assign(mamButton.style, {
      padding: "8px 12px",
      backgroundColor: "#ebc210",
      color: "black",
      borderColor: "black",
      marginTop: "8px",
      borderRadius: "3px",
      border: "1px solid #969696ff",
      boxSizing: "border-box",
      display: "inline-block",
      fontFamily: '"Lato", "Helvetica Neue", "Helvetica", sans-serif',
      fontSize: "14px",
      height: "32px",
      width: "140px",
      lineHeight: "1",
      cursor: "pointer"
    });
    const icon = document.createElement("img");
    icon.src = "https://i.postimg.cc/nzMcQpSF/my-Anona-Mouse-logo.png";
    icon.alt = "icon";
    icon.style.width = "16px";
    icon.style.height = "16px";
    icon.style.marginRight = "8px";
    icon.style.verticalAlign = "middle";
    mamButton.prepend(icon);
    const hoverColor = "#d1a80e";
    mamButton.addEventListener("mouseenter", () => {
      mamButton.style.backgroundColor = hoverColor;
      icon.style.filter = "brightness(0.87)";
    });
    mamButton.addEventListener("mouseleave", () => {
      mamButton.style.backgroundColor = "#ebc210";
      icon.style.filter = "brightness(1)";
    });
    mamButton.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(mamSearchUrl, "_blank");
    };
    followButton.appendChild(mamButton);
    console.log("[G+] 'Search Author' button added!");
    const allBooks = document.querySelectorAll(
      'tr[itemscope][itemtype="http://schema.org/Book"]'
    );
    const styles = `
        html.desktop .wtrButtonContainer {
            height: 80px !important;
            width: 140px !important;
        }

        .wtrButtonContainer .wtrUp {
            margin-top: 0px !important;
            padding: 0 !important;
            height: 20px !important;
            text-align: center; !important
        }

        .wtrToRead, .wtrExclusiveShelf, .wtrShelfButton {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;

            margin-top: 0px !important;
            height: 18px !important;
            line-height: 18px !important; 
            padding: 0 !important;
            padding-bottom: 0 !important;
            font-size: 11px !important;
            text-align: center;
        }

        .wtrButtonContainer .ratingStars {
            margin-top: 0px !important;
        }

        .mam-search-button {
            background-color: #ebc210;
            border: 1px solid #969696ff;
            border-radius: 3px;
            box-sizing: border-box;
            color: black;
            cursor: pointer;
            display: block;
            font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
            font-size: 11px;
            font-weight: bold;
            height: 20px;
            line-height: 18px;
            margin-top: 0px;
            padding: 0 12px;
            text-align: center;
            width: 100%;
            text-decoration: none;
        }

        .mam-search-button:hover {
            background-color: #d1a80e;
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    for (const bookRow of allBooks) {
      try {
        const mainButtonContainer = bookRow.querySelector(
          ".wtrButtonContainer"
        );
        if (!mainButtonContainer) continue;
        if (mainButtonContainer.querySelector(".mam-search-button")) continue;
        const title = bookRow.querySelector('a.bookTitle span[itemprop="name"]')?.innerText.trim();
        const author = bookRow.querySelector('a.authorName span[itemprop="name"]')?.innerText.trim();
        if (!title || !author) continue;
        const encodedQuery = encodeURIComponent(`${title} ${author}`);
        const mamSearchUrl2 = `https://www.myanonamouse.net/tor/browse.php?tor[text]=${encodedQuery}`;
        const mamButton2 = document.createElement("button");
        mamButton2.className = "mam-search-button";
        mamButton2.innerText = "Search MAM";
        const icon2 = document.createElement("img");
        icon2.src = "https://i.postimg.cc/nzMcQpSF/my-Anona-Mouse-logo.png";
        icon2.alt = "icon";
        icon2.style.width = "10px";
        icon2.style.height = "10px";
        icon2.style.lineHeight = "10px";
        icon2.style.marginRight = "8px";
        icon2.style.verticalAlign = "middle";
        mamButton2.prepend(icon2);
        mamButton2.addEventListener("mouseenter", () => {
          icon2.style.filter = "brightness(0.87)";
        });
        mamButton2.addEventListener("mouseleave", () => {
          icon2.style.filter = "brightness(1)";
        });
        mamButton2.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(mamSearchUrl2, "_blank");
        };
        const ratingDiv = mainButtonContainer.querySelector(".ratingStars");
        if (ratingDiv) {
          ratingDiv.insertAdjacentElement("afterend", mamButton2);
        } else {
          mainButtonContainer.appendChild(mamButton2);
        }
      } catch (e) {
        console.error("Could not process a book row, skipping.", { bookRow, e });
      }
    }
    console.log("[G+] Finished adding author page buttons!");
  }

  let currentPage = "";
  function runCheck() {
    const path = window.location.pathname;
    if (currentPage === path) return;
    if (path.includes("/book/show/") && document.querySelector('[data-testid="bookTitle"]')) {
      currentPage = path;
      addMamButtonToBookPage();
    } else if (path.includes("/series/") && document.querySelector(".responsiveSeriesHeader__title")) {
      currentPage = path;
      addMamButtonsToSeriesPage();
    } else if (path.includes("/author/show/") && document.querySelector("h1.authorName")) {
      currentPage = path;
      addMamButtonToAuthorPage();
    } else {
      currentPage = "";
    }
  }
  const observer = new MutationObserver(runCheck);
  observer.observe(document.body, { childList: true, subtree: true });
  runCheck();

})();
