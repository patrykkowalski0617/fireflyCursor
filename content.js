(() => {
  const FIREFLY_ID = "fireflyCursor";
  const CLICK_DURATION_MS = 850;

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div id="${FIREFLY_ID}"></div>`
  );
  const fireflyCursor = document.querySelector(`#${FIREFLY_ID}`);

  let currentMouseX = 0;
  let currentMouseY = 0;
  let rAF_ID = null;
  let timeoutId;
  let isFirstMouseMoveDone = false;

  const getCalmColor = () => {
    const highLetters = "ABCDEF";
    const getRandomHex = () =>
      highLetters[Math.floor(Math.random() * highLetters.length)];

    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += getRandomHex() + getRandomHex();
    }
    return color;
  };

  const updateFireflyPosition = () => {
    fireflyCursor.style.transform = `translate(${currentMouseX}px, ${currentMouseY}px)`;
    rAF_ID = null;
  };

  const onMousemove = (e) => {
    currentMouseY = e.clientY;
    currentMouseX = e.clientX;
    if (!isFirstMouseMoveDone) {
      isFirstMouseMoveDone = true;
      fireflyCursor.style.opacity = "1";
    }

    if (!rAF_ID) {
      rAF_ID = requestAnimationFrame(updateFireflyPosition);
    }
  };

  const onFullscreenChange = () => {
    if (document.fullscreenElement) {
      fireflyCursor.style.visibility = "hidden";
    } else {
      fireflyCursor.style.visibility = "visible";
    }
  };

  const onClick = () => {
    const randomColor = getCalmColor();
    fireflyCursor.style.setProperty("--random-color", randomColor);

    fireflyCursor.classList.remove("click");
    clearTimeout(timeoutId);

    void fireflyCursor.offsetWidth;

    fireflyCursor.classList.add("click");

    timeoutId = setTimeout(() => {
      fireflyCursor.classList.remove("click");
    }, CLICK_DURATION_MS);
  };

  window.addEventListener("mousemove", onMousemove);
  window.addEventListener("click", onClick);
  document.addEventListener("fullscreenchange", onFullscreenChange);
})();
