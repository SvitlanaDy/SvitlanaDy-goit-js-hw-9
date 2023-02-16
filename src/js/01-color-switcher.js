function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  const bodyElement = document.querySelector('body');
  const btnStart = document.querySelector("button[data-start]");
  const btnStop = document.querySelector("button[data-stop]");
//   let backgroundColorChange = getRandomHexColor();
  let timerId = null;

  function backgroundColorChange() {
    let color = getRandomHexColor();
    bodyElement.style.backgroundColor = color;
  }

  btnStart.addEventListener("click", () => {
    timerId = setInterval(backgroundColorChange, 1000);
    btnStart.disabled = true;
    btnStop.disabled = false;
    }, 1000);

    btnStop.addEventListener("click", () => {
        clearInterval(timerId);
        btnStart.disabled = false;
        btnStop.disabled = true;
        },);

  
//   function onBtnClick(event) {
//     event.preventDefault();
//     bodyElement.style.backgroundColor = getRandomHexColor();
//     spanElement.textContent = bodyElement
//       .getAttribute("style")
//       .replace("background-color:", "");
//   }




