export function addMamButtonToAuthorPage() {
  if (document.querySelector(".mam-search-button-author")) {
    console.log("[G+] Author button already added. Halting.");
    return;
  }

  const followButton = document.querySelector<HTMLButtonElement>(
    ".authorFollowButtonContainer"
  );
  if (!followButton) return;

  const authorNameElem = document.querySelector<HTMLElement>(
    ".authorName span[itemprop='name']"
  );
  if (!authorNameElem) return;

  const authorName = authorNameElem.innerText.trim();

  const mamSearchUrl = `https://www.myanonamouse.net/tor/browse.php?tor[text]=${encodeURIComponent(
    authorName
  )}`;

  const mamButton = followButton.cloneNode(true) as HTMLButtonElement;

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
    cursor: "pointer",
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

  // Now for the books in the author's page
  // --- Per-book "Search MAM" buttons ---
  const allBooks = document.querySelectorAll<HTMLTableRowElement>(
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
      const mainButtonContainer = bookRow.querySelector<HTMLDivElement>(
        ".wtrButtonContainer"
      );
      if (!mainButtonContainer) continue;

      if (mainButtonContainer.querySelector(".mam-search-button")) continue;

      const title = bookRow
        .querySelector<HTMLElement>('a.bookTitle span[itemprop="name"]')
        ?.innerText.trim();
      const author = bookRow
        .querySelector<HTMLElement>('a.authorName span[itemprop="name"]')
        ?.innerText.trim();

      if (!title || !author) continue;

      const encodedQuery = encodeURIComponent(`${title} ${author}`);
      const mamSearchUrl = `https://www.myanonamouse.net/tor/browse.php?tor[text]=${encodedQuery}`;

      const mamButton = document.createElement("button");

      mamButton.className = "mam-search-button";
      mamButton.innerText = "Search MAM";

      const icon = document.createElement("img");
      icon.src = "https://i.postimg.cc/nzMcQpSF/my-Anona-Mouse-logo.png";
      icon.alt = "icon";
      icon.style.width = "10px";
      icon.style.height = "10px";
      icon.style.lineHeight = "10px";
      icon.style.marginRight = "8px";
      icon.style.verticalAlign = "middle";

      mamButton.prepend(icon);

      mamButton.addEventListener("mouseenter", () => {
        icon.style.filter = "brightness(0.87)";
      });
      mamButton.addEventListener("mouseleave", () => {
        icon.style.filter = "brightness(1)";
      });

      mamButton.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(mamSearchUrl, "_blank");
      };

      const ratingDiv = mainButtonContainer.querySelector(".ratingStars");
      if (ratingDiv) {
        ratingDiv.insertAdjacentElement("afterend", mamButton);
      } else {
        mainButtonContainer.appendChild(mamButton);
      }
    } catch (e) {
      console.error("Could not process a book row, skipping.", { bookRow, e });
    }
  }
  console.log("[G+] Finished adding author page buttons!");
}
