const isUserSettingPage = Boolean(
  document.querySelector(".fireflyCursorUserSettings")
);

const insertionElement = isUserSettingPage
  ? document.querySelector(".cursorWrapper")
  : document.body;

insertionElement.insertAdjacentHTML(
  "afterbegin",
  `<div class="fireflyCursor ${
    isUserSettingPage ? "userSettingsCursor" : ""
  }"></div>`
);

const fireflyCursor = document.querySelector(`.fireflyCursor`);
