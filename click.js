const CLICK_DURATION_MS = 2550;

let timeoutId;
let clickVibrantColor = false;

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

const hexToRgbComponents = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
};

const onClick = (e, fireflyCursor) => {
  const randomHexColor = clickVibrantColor ? getVibrantColor() : getCalmColor();

  const rgb = hexToRgbComponents(randomHexColor);

  fireflyCursor.style.setProperty("--random-color-r", rgb.r);
  fireflyCursor.style.setProperty("--random-color-g", rgb.g);
  fireflyCursor.style.setProperty("--random-color-b", rgb.b);

  fireflyCursor.classList.remove("click");
  clearTimeout(timeoutId);

  void fireflyCursor.offsetWidth;

  fireflyCursor.classList.add("click");

  timeoutId = setTimeout(() => {
    fireflyCursor.classList.remove("click");
  }, CLICK_DURATION_MS);
};

window.addEventListener("click", (e) => onClick(e, fireflyCursor));
