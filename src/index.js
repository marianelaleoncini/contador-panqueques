import '../src/styles.scss';
// Constants
const BOTTOM_INITIAL = 10;
const BOTTOM_MOVEMENT = 6;

// HTML Elements
const plateEl = document.getElementById('plate-inside');
const minusEl = document.getElementById('minus');
const plusEl = document.getElementById('plus');
const resetEl = document.getElementById('reset-button');

// Initialization
let count = 0;
let bottom = BOTTOM_INITIAL;

// Methods
const createPancakeElement = () => {
  let pancakeEl = document.createElement('div');
  pancakeEl.id = `pancake${count}`;
  pancakeEl.classList = 'pancakes__pancake';
  pancakeEl.style = `bottom: ${bottom}px`;
  return pancakeEl;
};

const addPancakeOnThePlate = () => {
  bottom += BOTTOM_MOVEMENT;
  const pancakeEl = createPancakeElement();
  plateEl.appendChild(pancakeEl);
};

const removePancakeOfThePlate = () => {
  bottom -= BOTTOM_MOVEMENT;
  const pancakeEl = document.getElementById(`pancake${count}`);
  plateEl.removeChild(pancakeEl);
};

const updateCountElement = () => {
  const countEl = document.getElementById('count');
  countEl.innerHTML = count;
};

const discount = () => {
  if (count) {
    removePancakeOfThePlate();
    count--;
    updateCountElement();
  }
};

const add = () => {
  count++;
  addPancakeOnThePlate();
  updateCountElement();
};

const reset = () => {
  count = 0;
  bottom = BOTTOM_INITIAL;
  updateCountElement();
  plateEl.innerHTML = '';
};

// Listeners
minusEl.addEventListener('click', discount, false);
plusEl.addEventListener('click', add, false);
resetEl.addEventListener('click', reset, false);
