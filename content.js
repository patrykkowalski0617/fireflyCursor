(() => {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div id="fireflyCursor"></div>`
  );
  const fireflyCursor = document.querySelector("#fireflyCursor");

  const positionElement = (e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    fireflyCursor.style.top = `${mouseY}px`;
    fireflyCursor.style.left = `${mouseX}px`;
  };

  const getCalmColor = () => {
    const calmLetters = "9ABCDEF";
    let color = "#";
    let component1 =
      calmLetters[Math.floor(Math.random() * calmLetters.length)];
    let component2 =
      calmLetters[Math.floor(Math.random() * calmLetters.length)];

    const lowLetters = "6789";
    let lowComponent =
      lowLetters[Math.floor(Math.random() * lowLetters.length)];

    const parts = [
      component1 + component1,
      component2 + component2,
      lowComponent + lowComponent,
    ].sort(() => Math.random() - 0.5);

    color += parts.join("");
    return color;
  };

  let timeoutId;

  const clickElement = () => {
    const randomColor = getCalmColor();
    fireflyCursor.style.setProperty("--random-color", randomColor);

    fireflyCursor.classList.remove("click");
    clearTimeout(timeoutId);

    void fireflyCursor.offsetWidth;

    fireflyCursor.classList.add("click");

    timeoutId = setTimeout(() => {
      fireflyCursor.classList.remove("click");
    }, 850);
  };
  window.addEventListener("mousemove", positionElement);
  window.addEventListener("click", clickElement);
})();
