chrome.storage.sync.get(
  ["pulseFrom", "pulseTo", "intensity", "sizeValue"],
  (data) => {
    if (data.pulseFrom) {
      document.documentElement.style.setProperty(
        "--pulse-from",
        data.pulseFrom
      );
    }
    if (data.pulseTo) {
      document.documentElement.style.setProperty("--pulse-to", data.pulseTo);
    }
    if (data.intensity !== undefined) {
      const opacity = (data.intensity / 100).toFixed(2);
      console.log("opacity", opacity);
      document.documentElement.style.setProperty("--opacity", opacity);
    }
    if (data.sizeValue !== undefined) {
      const multiplier = (data.sizeValue / 50).toFixed(2);
      document.documentElement.style.setProperty(
        "--size-multiplier",
        multiplier
      );
    }
  }
);
