chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace !== "sync") return;

  if (changes.pulseFrom) {
    document.documentElement.style.setProperty(
      "--pulse-from",
      changes.pulseFrom.newValue
    );
  }
  if (changes.pulseTo) {
    document.documentElement.style.setProperty(
      "--pulse-to",
      changes.pulseTo.newValue
    );
  }
  if (changes.intensity) {
    const opacity = (changes.intensity.newValue / 100).toFixed(2);
    document.documentElement.style.setProperty("--opacity", opacity);
  }
  if (changes.sizeValue) {
    const multiplier = (changes.sizeValue.newValue / 50).toFixed(2);
    document.documentElement.style.setProperty("--size-multiplier", multiplier);
  }
});
