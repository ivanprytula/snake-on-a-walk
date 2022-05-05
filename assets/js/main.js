// Walking snake behavior
const INITIAL_SNAKE_STATE = "walking-snake ld ld-breath";

const walkingSnake = document.querySelector("#walkingSnake");
const walkingContainer = document.querySelector("#walkingContainer");
const codeArea = document.querySelector('code.language-python');

// Select the node that will be observed for mutations
const fillableTooltip = document.querySelector('#tooltip');

// Options for the observer (which mutations to observe)
const config = {
  childList: true,
};

let walkingSnakeRect = {x: 0, y: 0};
let walkingContainerRect = walkingContainer.getBoundingClientRect();
let stepSize = 0;
let tooltipContent = {
  import: 'Try `import __hello__` in Python interpreter',
  from: 'from',
  as: 'as',
  def: 'ccc',
};

walkingSnake.style.left = "0px";
walkingSnake.style.top = "0px";
walkingSnake.className = INITIAL_SNAKE_STATE;


const moveUp = () => {
  // Hide the tooltip
  fillableTooltip.removeAttribute('data-show');

  walkingSnakeRect = walkingSnake.getBoundingClientRect();
  if (walkingSnakeRect.y <= walkingContainerRect.y) {
    return;
  }

  walkingSnake.style.top = parseInt(walkingSnake.style.top) - stepSize + "px";
};

const moveDown = () => {
  // Hide the tooltip
  fillableTooltip.removeAttribute('data-show');

  walkingSnakeRect = walkingSnake.getBoundingClientRect();
  if (walkingSnakeRect.bottom + walkingSnakeRect.height >= walkingContainerRect.bottom) {
    return;
  }

  walkingSnake.style.top = parseInt(walkingSnake.style.top) + stepSize + "px";
};

const moveLeft = () => {
  // Hide the tooltip
  fillableTooltip.removeAttribute('data-show');

  walkingSnakeRect = walkingSnake.getBoundingClientRect();
  if (walkingSnakeRect.x <= walkingContainerRect.x + walkingSnakeRect.width) {
    return;
  }

  walkingSnake.style.left = parseInt(walkingSnake.style.left) - stepSize + "px";
};

const moveRight = () => {
  // Hide the tooltip
  fillableTooltip.removeAttribute('data-show');

  walkingSnakeRect = walkingSnake.getBoundingClientRect();
  if (walkingSnakeRect.x >= walkingContainerRect.right - (walkingSnakeRect.width * 2)) {
    return;
  }

  walkingSnake.style.left = parseInt(walkingSnake.style.left) + stepSize + "px";
};

const dispatchTooltipContent = () => {
  let selection = window.getSelection();
  let tooltipText = '';

  selection.modify('move', 'backward', 'word');
  selection.modify('extend', 'forward', 'word');

  tooltipText = tooltipContent[selection.toString()];

  if (tooltipText === undefined) {
    fillableTooltip.innerHTML = 'Look more ;))';
    return;
  }

  fillableTooltip.innerHTML = tooltipText;
};


document.body.onkeydown = (e) => {
  if (e.repeat) {
    stepSize++;
  } else {
    stepSize = 10;
  }

  switch (e.key) {
    case 'ArrowLeft':
    case 'A':
    case 'a':
      moveLeft();
      break;
    case 'ArrowUp':
    case 'W':
    case 'w':
      moveUp();
      break;
    case 'ArrowRight':
    case 'D':
    case 'd':
      moveRight();
      break;
    case 'ArrowDown':
    case 'S':
    case 's':
      moveDown();
      break;
  }
}

const spinSnake = () => {
  walkingSnake.className = "";
  walkingSnake.className = "walking-snake ld ld-spin-fast";

  setTimeout(function () {
    walkingSnake.className = INITIAL_SNAKE_STATE;
  }, 1000);
};

document.body.addEventListener('click', (e) => {
  if (walkingSnake.contains(e.target)) {
    spinSnake();
  } else if (codeArea.contains(e.target)) {
    dispatchTooltipContent();
  } else {
    // Hide the tooltip
    fillableTooltip.removeAttribute('data-show');
  }
});

// Callback function to execute when mutations are observed
const callback = function (mutationsList) {

  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {

      // Make the tooltip visible
      fillableTooltip.setAttribute('data-show', '');
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(fillableTooltip, config);
