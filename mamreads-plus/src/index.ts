import { addMamButtonToBookPage } from "./bookPage";
import { addMamButtonsToSeriesPage } from "./seriesPage";
import { addMamButtonToAuthorPage } from "./authorPage";

let currentPage = "";

function runCheck() {
  const path = window.location.pathname;

  if (currentPage === path) return;

  if (
    path.includes("/book/show/") &&
    document.querySelector('[data-testid="bookTitle"]')
  ) {
    currentPage = path;
    addMamButtonToBookPage();
  } else if (
    path.includes("/series/") &&
    document.querySelector(".responsiveSeriesHeader__title")
  ) {
    currentPage = path;
    addMamButtonsToSeriesPage();
  } else if (
    path.includes("/author/show/") &&
    document.querySelector("h1.authorName")
  ) {
    currentPage = path;
    addMamButtonToAuthorPage();
  } else {
    currentPage = "";
  }
}

const observer = new MutationObserver(runCheck);
observer.observe(document.body, { childList: true, subtree: true });

runCheck();
