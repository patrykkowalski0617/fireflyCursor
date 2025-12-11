(() => {
  document.body.insertAdjacentHTML("afterbegin", `<div id="cursor"></div>`);
  const cursor = document.querySelector("#cursor");

  const positionElement = (e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    cursor.style.top = `${mouseY}px`;
    cursor.style.left = `${mouseX}px`;
  };

  const getVibrantColor = () => {
    const brightLetters = "89ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += brightLetters[Math.floor(Math.random() * brightLetters.length)];
    }
    return color;
  };
  let timeoutId;

  const clickElement = () => {
    const randomColor = getVibrantColor();
    cursor.style.setProperty("--random-color", randomColor);

    cursor.classList.remove("click");
    clearTimeout(timeoutId);

    void cursor.offsetWidth;

    cursor.classList.add("click");
    timeoutId = setTimeout(() => {
      cursor.classList.remove("click");
    }, 600);
  };

  window.addEventListener("mousemove", positionElement);
  window.addEventListener("click", clickElement);
})();
