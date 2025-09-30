export function addMamButtonsToSeriesPage() {
    if (document.querySelector(".mam-search-button-series")) {
      console.log("[G+] Series buttons already added. Halting.");
      return;
    }
    console.log("[G+] Series page detected! Running script...");

    const allBooks = document.querySelectorAll(".responsiveBook");
    console.log(`[G+] Found ${allBooks.length} books on the page.`);

    for (const bookElement of allBooks) {
      try {
        const title = bookElement.querySelector<HTMLElement>('[itemprop="name"]')?.innerText ?? "";
        const author = bookElement.querySelector<HTMLElement>('[itemprop="author"] [itemprop="name"]')?.innerText ?? "";

        const actionsContainer = bookElement.querySelector(".objectLockupContent__actions");
        const buttonToClone = actionsContainer?.querySelector(".wantToReadButton button");

        if (title && author && actionsContainer && buttonToClone) {
          const encodedQuery = encodeURIComponent(`${title} ${author}`);
          const mamSearchUrl = `https://www.myanonamouse.net/tor/browse.php?tor[text]=${encodedQuery}`;

          const mamButton = buttonToClone.cloneNode(false) as HTMLButtonElement;

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
            cursor: "pointer",
          });

          const icon = document.createElement("img");
          icon.src = "https://i.postimg.cc/nzMcQpSF/my-Anona-Mouse-logo.png";
          icon.alt = "icon";
          icon.style.width = "16px";
          icon.style.height = "16px";
          icon.style.marginRight = "8px"; // space between image and text
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