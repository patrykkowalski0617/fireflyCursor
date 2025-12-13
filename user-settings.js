const slider = document.getElementById("colorSlider");
const preview = document.getElementById("colorPreview");
const previewLighter = document.getElementById("colorPreviewLighter");

function colorFromValue(val) {
  if (val < 50) {
    const t = val / 50;
    return {
      r: Math.round(0 + t * (255 - 0)),
      g: Math.round(120 + t * (255 - 120)),
      b: Math.round(255 + t * (0 - 255)),
    };
  } else {
    const t = (val - 50) / 50;
    return {
      r: 255,
      g: Math.round(255 - t * 155),
      b: 0,
    };
  }
}

function lightenColor(color, factor = 0.2) {
  return {
    r: Math.min(255, Math.round(color.r + (255 - color.r) * factor)),
    g: Math.min(255, Math.round(color.g + (255 - color.g) * factor)),
    b: Math.min(255, Math.round(color.b + (255 - color.b) * factor)),
  };
}

function updateColor() {
  const val = Number(slider.value);
  const color = colorFromValue(val);
  const rgb = `rgb(${color.r}, ${color.g}, ${color.b}, 0.2)`;
  preview.style.background = rgb;
  document.documentElement.style.setProperty("--pulse-from", rgb);

  const lighter = lightenColor(color, 0.3);
  const rgbLighter = `rgb(${lighter.r}, ${lighter.g}, ${lighter.b}, 0.3)`;
  previewLighter.style.background = rgbLighter;
  document.documentElement.style.setProperty("--pulse-to", rgbLighter);

  chrome.storage.sync.set({
    pulseFrom: rgb,
    pulseTo: rgbLighter,
  });
}

slider.addEventListener("input", updateColor);
updateColor();
