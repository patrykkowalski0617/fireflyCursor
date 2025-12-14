fireflyCursor.addEventListener("click", (e) => onClick(e, fireflyCursor));

// ==================== BLOCK: TEMPERATURE (COLOR) ====================
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
  const rgb = `rgba(${color.r}, ${color.g}, ${color.b}, var(--opacity))`;
  document.documentElement.style.setProperty("--pulse-from", rgb);

  const lighter = lightenColor(color, 0.3);
  const rgbLighter = `rgba(${lighter.r}, ${lighter.g}, ${lighter.b}, var(--opacity))`;
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

// ==================== BLOCK: INTENSITY (OPACITY) ====================
const intensitySlider = document.getElementById("intensitySlider");

const applyIntensity = (val) => {
  const opacity = (val / 100).toFixed(2);
  document.documentElement.style.setProperty("--opacity", opacity);

  chrome.storage.sync.set({ intensity: val });
};

const updateIntensity = () => {
  const val = Number(intensitySlider.value);
  applyIntensity(val);
};

// ==================== BLOCK: SIZE (EFFECT SIZE) ====================
const sizeSlider = document.getElementById("sizeSlider");

const applySize = (val) => {
  const multiplier = (val / 50).toFixed(2);
  document.documentElement.style.setProperty("--size-multiplier", multiplier);

  chrome.storage.sync.set({ sizeValue: val });
};

const updateSize = () => {
  const val = Number(sizeSlider.value);
  applySize(val);
};

// ==================== BLOCK: VIBRANT CLICK COLOR (CHECKBOX) ====================
const vibrantCheckbox = document.getElementById("vibrantClickColor");

if (vibrantCheckbox) {
  chrome.storage.sync.get(["clickVibrantColor"], (result) => {
    vibrantCheckbox.checked = result.clickVibrantColor === true;
  });

  vibrantCheckbox.addEventListener("change", () => {
    const enabled = vibrantCheckbox.checked;
    chrome.storage.sync.set({ clickVibrantColor: enabled });
  });
}

// ==================== BLOCK: PREVIEW LIGHT MODE (CHECKBOX) ====================
// Funkcja zmieniająca tło podglądu w panelu ustawień
const updatePreviewBackground = (isLightMode) => {
  const preview = document.querySelector(".cursorWrapper");
  if (preview) {
    if (isLightMode) {
      preview.style.backgroundColor = "#cacacaff"; // jasne tło
    } else {
      preview.style.backgroundColor = "#0d0d0d"; // ciemne tło (domyślne)
    }
  }
};

const previewLightModeCheckbox = document.getElementById("previewLightMode");

if (previewLightModeCheckbox) {
  // Wczytaj zapisany stan przy otwarciu ustawień
  chrome.storage.sync.get(["previewLightMode"], (result) => {
    const isLight = result.previewLightMode === true;
    previewLightModeCheckbox.checked = isLight;
    updatePreviewBackground(isLight);
  });

  // Zapisz przy zmianie + zaktualizuj podgląd
  previewLightModeCheckbox.addEventListener("change", () => {
    const enabled = previewLightModeCheckbox.checked;
    chrome.storage.sync.set({ previewLightMode: enabled });
    updatePreviewBackground(enabled);
  });
}

// ==================== LOADING SAVED SETTINGS ====================
chrome.storage.sync.get(
  [
    "temperature",
    "intensity",
    "sizeValue",
    "clickVibrantColor",
    "previewLightMode",
  ],
  (result) => {
    const savedTemp = result.temperature ?? 50;
    const savedIntensity = result.intensity ?? 50;
    const savedSize = result.sizeValue ?? 50;
    const savedVibrantClick = result.clickVibrantColor === true;
    const savedPreviewLight = result.previewLightMode === true;

    // Suwaki
    slider.value = savedTemp;
    intensitySlider.value = savedIntensity;
    sizeSlider.value = savedSize;

    // Checkboxy
    if (vibrantCheckbox) {
      vibrantCheckbox.checked = savedVibrantClick;
    }
    if (previewLightModeCheckbox) {
      previewLightModeCheckbox.checked = savedPreviewLight;
    }

    // Zastosuj wartości suwaków
    applyColors(savedTemp);
    applyIntensity(savedIntensity);
    applySize(savedSize);
  }
);

// ==================== on Mouse Preview Leave ====================

fireflyCursor.classList.add("center-cursor");
const onSettingsLeave = () => {
  fireflyCursor.classList.add("center-cursor");
};

const onSettingsEnter = () => {
  fireflyCursor.classList.remove("center-cursor");
};

const cursorWrapper = document.querySelector(".cursorWrapper");

cursorWrapper.addEventListener("mouseleave", onSettingsLeave);
cursorWrapper.addEventListener("mouseenter", onSettingsEnter);

// ==================== EVENT LISTENERS FOR SLIDERS ====================
slider.addEventListener("input", updateColor);
intensitySlider.addEventListener("input", updateIntensity);
sizeSlider.addEventListener("input", updateSize);
