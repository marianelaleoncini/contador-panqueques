import '../src/styles.scss';
// Constants
const BOTTOM_INITIAL = 10;
const BOTTOM_MOVEMENT = 6;

// HTML Elements
const plateEl = document.getElementById('plate-inside');
const minusEl = document.getElementById('minus');
const plusEl = document.getElementById('plus');
const resetEl = document.getElementById('reset-button');
const containerEl = document.getElementById('container');
const pancakesEl = document.getElementById('pancakes');
const titleEl = document.getElementById('title');

// Initialization
let count = 0;
let bottom = BOTTOM_INITIAL;
let totalAdded = 0;
const totalSpace = containerEl.offsetHeight - pancakesEl.offsetHeight - titleEl.offsetHeight;

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
  const pancakeEl = document.getElementById(`pancake${count}`);
  if (pancakeEl) {
    totalAdded -= 6;
    bottom -= BOTTOM_MOVEMENT;
    plateEl.removeChild(pancakeEl);
  }
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
  if (availableSpaceForPancake()) {
    totalAdded += 6;
    addPancakeOnThePlate();
  }
  updateCountElement();
};

const reset = () => {
  count = 0;
  bottom = BOTTOM_INITIAL;
  totalAdded = 0; 
  updateCountElement();
  plateEl.innerHTML = '';
};

const availableSpaceForPancake = () => {
  return totalAdded < totalSpace;
}

// Listeners
minusEl.addEventListener('click', discount, false);
plusEl.addEventListener('click', add, false);
resetEl.addEventListener('click', reset, false);
