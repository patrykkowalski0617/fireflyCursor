function applySetting(key, value) {
  if (key === "pulseFrom" && value !== undefined) {
    document.documentElement.style.setProperty("--pulse-from", value);
  } else if (key === "pulseTo" && value !== undefined) {
    document.documentElement.style.setProperty("--pulse-to", value);
  } else if (key === "intensity" && value !== undefined) {
    const opacity = (value / 100).toFixed(2);
    document.documentElement.style.setProperty("--opacity", opacity);
  } else if (key === "sizeValue" && value !== undefined) {
    const multiplier = (value / 50).toFixed(2);
    document.documentElement.style.setProperty("--size-multiplier", multiplier);
  }
}

chrome.storage.sync.get(
  ["pulseFrom", "pulseTo", "intensity", "sizeValue"],
  (data) => {
    for (const [key, value] of Object.entries(data)) {
      applySetting(key, value);
    }
  }
);

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace !== "sync") return;

  for (const [key, change] of Object.entries(changes)) {
    if (change.newValue !== undefined) {
      applySetting(key, change.newValue);
    }
  }
});
