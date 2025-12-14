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
    fireflyCursor.classList.add("visible");
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
