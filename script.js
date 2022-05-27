// Mouse click listener
let clickVar;
window.addEventListener('mousedown', () => { clickVar = true; });
window.addEventListener('mouseup', () => { clickVar = false; });

// Declarations
const palette = document.querySelectorAll('.color');
const pixelBoard = document.querySelector('#pixel-board');
const eraseAllButton = document.querySelector('#clear-board');
const input = document.querySelector('#board-size');
const vqvButton = document.querySelector('#generate-board');
const newColors = document.querySelector('#new-colors');

// Functions
function changeColor(event) {
  const thenSelected = document.querySelector('.selected');
  thenSelected.classList.remove('selected');
  event.target.classList.add('selected');
}

function putColor(event) {
  if (!clickVar) return;
  const { target } = event;
  const selected = document.querySelector('.selected');
  const colorFrom = window.getComputedStyle(selected, null).getPropertyValue('background-color');
  target.style.backgroundColor = colorFrom;
}

function eraseAll() {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    const item = pixel;
    item.style.backgroundColor = 'rgb(255, 255, 255)';
  });
}

function clearPixels() {
  const pixelsToDelete = document.querySelectorAll('.pixel');
  if (pixelsToDelete.length > 0) {
    for (let i = pixelsToDelete.length - 1; i >= 0; i -= 1) {
      pixelsToDelete[i].remove();
    }
  }
}

function addListenerPixels() {
  const pixelsT = document.querySelectorAll('.pixel');
  pixelsT.forEach((item) => {
    item.addEventListener('mousemove', putColor);
    item.addEventListener('click', putColor);
  });
}

function generateBoard() {
  clearPixels();
  const pixelBoardToAdd = document.querySelector('#pixel-board');
  let number = input.value;
  if (number < 1) {
    alert('Board inválido!');
  }
  if (number < 5) {
    number = 5;
  } else if (number > 50) {
    number = 50;
  }
  for (let i = 1; i <= number * number; i += 1) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('pixel');
    pixelBoardToAdd.appendChild(newDiv);
  }
  pixelBoard.style.width = `${44 * number}px`;
  addListenerPixels();
}

function generateRandomColors() {
  const color1 = Math.ceil(Math.random() * 255);
  const color2 = Math.ceil(Math.random() * 255);
  const color3 = Math.ceil(Math.random() * 255);
  const rgb = `rgb(${color1}, ${color2}, ${color3})`;
  return rgb;
}

function setRandomColors() {
  for (let i = 1; i < palette.length - 1; i += 1) {
    if (!palette[i].classList.contains('lock-color')) {
      palette[i].style.backgroundColor = generateRandomColors();
    }
  }
}

function lockColor(event) {
  const { target } = event;
  if (target.classList.contains('lock-color')) {
    target.classList.remove('lock-color')
  } else {
    target.classList.add('lock-color');
  }
}

// Usage
palette.forEach((item) => {
  item.addEventListener('click', changeColor);
  item.addEventListener('dblclick', lockColor);
});

addListenerPixels();
setRandomColors();

eraseAllButton.addEventListener('click', eraseAll);
vqvButton.addEventListener('click', generateBoard);
newColors.addEventListener('click', setRandomColors);
