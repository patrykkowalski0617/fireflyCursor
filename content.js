(() => {
  const FIREFLY_ID = "fireflyCursor";
  const CLICK_DURATION_MS = 1050;

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="${FIREFLY_ID}"></div>`
  );
  const fireflyCursor = document.querySelector(`.${FIREFLY_ID}`);

  chrome.storage.sync.get(["pulseFrom", "pulseTo"], (data) => {
    if (data.pulseFrom) {
      document.documentElement.style.setProperty(
        "--pulse-from",
        data.pulseFrom
      );
    }
    if (data.pulseTo) {
      document.documentElement.style.setProperty("--pulse-to", data.pulseTo);
    }
  });

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

  const getVibrantColor = () => {
    let r, g, b;

    do {
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);

      const lightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const saturation = max === 0 ? 0 : (max - min) / max;

      if (lightness >= 0.3 && lightness <= 0.7 && saturation >= 0.4) {
        break;
      }
    } while (true);

    return `#${r.toString(16).padStart(2, "0").toUpperCase()}${g
      .toString(16)
      .padStart(2, "0")
      .toUpperCase()}${b.toString(16).padStart(2, "0").toUpperCase()}`;
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
    const randomColor = getVibrantColor();
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
