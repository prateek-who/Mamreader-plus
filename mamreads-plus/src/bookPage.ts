export function addMamButtonToBookPage() {
  if (document.querySelector(".mam-book-page-button")) {
    console.log("[G+] Book page button already exists. Halting.");
    return;
  }
    console.log("[G+] Book page detected! Running script...");

    const bookTitle = document.querySelector<HTMLElement>('[data-testid="bookTitle"]')?.innerText;
    const authorNameElement = document.querySelector<HTMLElement>('[data-testid="name"]');
    const authorName = authorNameElement?.innerText;

    if (!bookTitle || !authorName) {
        console.error("[G+] Could not find title or author elements.");
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

    const mamButton = buttonToClone.cloneNode(true) as HTMLButtonElement;
    mamButton.id = "mam-search-button-single";
    mamButton.innerText = "Search MAM";
    mamButton.onclick = () => window.open(mamSearchUrl, "_blank");

    Object.assign(mamButton.style, {
      marginTop: "8px",
      marginBottom: "8px",
      backgroundColor: "#ebc210",
      color: "black",
      borderColor: "#ebc210",
    });

    const icon = document.createElement("img");
    icon.src = "https://i.postimg.cc/nzMcQpSF/my-Anona-Mouse-logo.png";
    icon.alt = "icon";
    icon.style.width = "22px";
    icon.style.height = "22px";
    icon.style.marginRight = "12px"; // space between image and text
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
      // If for some reason we can't find it, back back to end
      buttonContainer.appendChild(mamButton);
    }

  console.log("[G+] 'Search MAM' button added!");

  // Author search button
  console.log("we are getting to adding the author follo button part..");
  const encodedAuthorQuery = encodeURIComponent(authorName);
  const mamAuthorSearchUrl = `https://www.myanonamouse.net/tor/browse.php?tor[text]=${encodedAuthorQuery}`;

  const followButtonContainer = document.querySelector(".AuthorFollowButton");
  if (!followButtonContainer) {
    console.log("[G+] Could not find follow button container for author search.");
    return;
  }

  const parentContainer = followButtonContainer.parentElement;
  if (!parentContainer) {
    console.log("[G+] Could not find parent container.");
    return;
  }

  parentContainer.style.display = "flex";
  parentContainer.style.alignItems = "center";
  parentContainer.style.gap = "8px";

  const authorButton = buttonToClone.cloneNode(true) as HTMLButtonElement;
  authorButton.classList.add("mam-author-search-button");
  authorButton.innerText = "Search Author";
  authorButton.onclick = () => window.open(mamAuthorSearchUrl, "_blank");

  Object.assign(authorButton.style, {
    backgroundColor: "#ebc210",
    color: "black",
    borderColor: "#ebc210",
    whiteSpace: "normal",
    lineHeight: "1.1",
  });

  const authorIcon = document.createElement("img");
  authorIcon.src = "https://i.postimg.cc/nzMcQpSF/my-Anona-Mouse-logo.png";
  authorIcon.alt = "icon";
  authorIcon.style.width = "22px";
  authorIcon.style.height = "22px";
  authorIcon.style.marginRight = "12px";
  authorIcon.style.verticalAlign = "middle";
  authorButton.prepend(authorIcon);

  authorIcon.style.transition = "all 0.2s ease-in-out";
  authorButton.addEventListener("mouseenter", () => {
    authorButton.style.backgroundColor = hoverColor;
    authorIcon.style.filter = "brightness(1.1)";
  });
  authorButton.addEventListener("mouseleave", () => {
    authorButton.style.backgroundColor = originalColor;
    authorIcon.style.filter = "brightness(1)";
  });

  parentContainer.insertBefore(authorButton, followButtonContainer);
  console.log("[G+] 'Search Author' button added!");
}