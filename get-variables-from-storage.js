const defaultSettings = {
  pulseFrom: "rgba(238, 246, 255, var(--opacity))",
  pulseTo: "rgba(243, 249, 255, var(--opacity))",
  intensity: 53,
  sizeValue: 39,
};

function applySetting(key, value) {
  let finalValue = value;

  if (value === undefined) {
    finalValue = defaultSettings[key];
    if (finalValue !== undefined) {
      chrome.storage.sync.set({ [key]: finalValue });
    }
  }

  if (key === "pulseFrom" && finalValue !== undefined) {
    document.documentElement.style.setProperty("--pulse-from", finalValue);
  } else if (key === "pulseTo" && finalValue !== undefined) {
    document.documentElement.style.setProperty("--pulse-to", finalValue);
  } else if (key === "intensity" && finalValue !== undefined) {
    const opacity = (finalValue / 100).toFixed(2);
    document.documentElement.style.setProperty("--opacity", opacity);
  } else if (key === "sizeValue" && finalValue !== undefined) {
    const multiplier = (finalValue / 50).toFixed(2);
    document.documentElement.style.setProperty("--size-multiplier", multiplier);
  }
}

chrome.storage.sync.get(
  ["pulseFrom", "pulseTo", "intensity", "sizeValue"],
  (data) => {
    for (const key of Object.keys(defaultSettings)) {
      applySetting(key, data[key]);
    }
  }
);

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace !== "sync") return;

  for (const [key, change] of Object.entries(changes)) {
    if (change.newValue === undefined) {
      applySetting(key, undefined);
    } else {
      applySetting(key, change.newValue);
    }
  }
});
