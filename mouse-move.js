chrome.storage.sync.get(["pulseFrom", "pulseTo"], (data) => {
  if (data.pulseFrom) {
    document.documentElement.style.setProperty("--pulse-from", data.pulseFrom);
  }
  if (data.pulseTo) {
    document.documentElement.style.setProperty("--pulse-to", data.pulseTo);
  }
});

let currentMouseX = 0;
let currentMouseY = 0;
let rAF_ID = null;
let isFirstMouseMoveDone = false;

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

window.addEventListener("mousemove", onMousemove);
document.addEventListener("fullscreenchange", onFullscreenChange);
