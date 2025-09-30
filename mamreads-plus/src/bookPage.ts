// import 

export function addMamButtonToBookPage() {
    if (document.getElementById("mam-search-button-single")) {
      console.log("[G+] Button already exists. Halting.");
      return;
    }
    console.log("[G+] Book page detected! Running script...");

    let bookTitle = "",
      authorName = "";
    try {
      bookTitle = document.querySelector<HTMLElement>('[data-testid="bookTitle"]')?.innerText ?? "";
      authorName = document.querySelector<HTMLElement>('[data-testid="name"]')?.innerText ?? "";
      console.log(`[G+] Book title: ${bookTitle}\nAuthor name: ${authorName}`);
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
  }