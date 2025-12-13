fireflyCursor.addEventListener("click", (e) => onClick(e, fireflyCursor));

const slider = document.querySelector("#colorSlider");

const colorFromValue = (val) => {
  if (val <= 50) {
    const t = val / 50;
    const r = Math.round(150 + t * (255 - 150));
    const g = Math.round(200 + t * (255 - 200));
    const b = 255;
    return { r, g, b };
  } else {
    const t = (val - 50) / 50;
    const r = 255;
    const g = Math.round(255 - t * 155);
    const b = Math.round(255 - t * 255);
    return { r, g, b };
  }
};

const lightenColor = (color, factor = 0.2) => ({
  r: Math.min(255, Math.round(color.r + (255 - color.r) * factor)),
  g: Math.min(255, Math.round(color.g + (255 - color.g) * factor)),
  b: Math.min(255, Math.round(color.b + (255 - color.b) * factor)),
});

const applyColors = (val) => {
  const color = colorFromValue(val);
  const rgb = `rgb(${color.r}, ${color.g}, ${color.b}, 0.2)`;
  document.documentElement.style.setProperty("--pulse-from", rgb);

  const lighter = lightenColor(color, 0.3);
  const rgbLighter = `rgb(${lighter.r}, ${lighter.g}, ${lighter.b}, 0.3)`;
  document.documentElement.style.setProperty("--pulse-to", rgbLighter);

  chrome.storage.sync.set({
    temperature: val,
    pulseFrom: rgb,
    pulseTo: rgbLighter,
  });
};

const updateColor = () => {
  const val = Number(slider.value);
  applyColors(val);
};

chrome.storage.sync.get(["temperature"], (result) => {
  let savedVal = result.temperature;

  if (savedVal === undefined) {
    savedVal = 50;
  }

  slider.value = savedVal;
  applyColors(savedVal);
});

slider.addEventListener("input", updateColor);
