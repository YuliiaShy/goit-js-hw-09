function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

let timerId = null;

buttonStart.addEventListener('click', () => {
  buttonStart.disabled = true;
  timerId = setInterval(() => {
      bodyEl.style.backgroundColor = getRandomHexColor();
      
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  buttonStart.disabled = false;
});