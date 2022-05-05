// Walking snake behavior

const walkingSnake = document.querySelector("#walkingSnake");
const walkingContainer = document.querySelector("#walkingContainer");

let walkingContainerRect = walkingContainer.getBoundingClientRect();

let stepSize = 0;

const INITIAL_SNAKE_STATE = "walking-snake ld ld-breath";

walkingSnake.style.left = "0px";
walkingSnake.style.top = "0px";
walkingSnake.className = INITIAL_SNAKE_STATE;


const moveUp = () => {

  const walkingSnakeRect = walkingSnake.getBoundingClientRect();
  if (walkingSnakeRect.y <= walkingContainerRect.y) {
    return;
  }

  walkingSnake.style.top = parseInt(walkingSnake.style.top) - stepSize + "px";
};

const moveDown = () => {

  const walkingSnakeRect = walkingSnake.getBoundingClientRect();
  if (walkingSnakeRect.bottom + walkingSnakeRect.height >= walkingContainerRect.bottom) {
    return;
  }

  walkingSnake.style.top = parseInt(walkingSnake.style.top) + stepSize + "px";
};

const moveLeft = () => {

  const walkingSnakeRect = walkingSnake.getBoundingClientRect();
  if (walkingSnakeRect.x <= walkingContainerRect.x + walkingSnakeRect.width) {
    return;
  }

  walkingSnake.style.left = parseInt(walkingSnake.style.left) - stepSize + "px";
};

const moveRight = () => {

  const walkingSnakeRect = walkingSnake.getBoundingClientRect();
  if (walkingSnakeRect.x >= walkingContainerRect.right - (walkingSnakeRect.width * 2)) {
    return;
  }

  walkingSnake.style.left = parseInt(walkingSnake.style.left) + stepSize + "px";
};

const showTitle = (token) => {
  console.log('token:: >> ', token);

  switch (token) {
    case 'from':
      walkingSnake.setAttribute('title', 'hello world');
      break;
    case 'import':
      walkingSnake.setAttribute('title', 'import');
      break;
    case 'def':
      walkingSnake.setAttribute('title', 'define');
      break;
    default:
      console.log('sdsd');
  }

  if (token === 'from') {
    // pass
  }

};


document.body.onkeydown = (e) => {
  if (e.repeat) {
    stepSize++;
  } else {
    stepSize = 10;
  }

  console.log(e.key);

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

document.body.addEventListener('click', (e) => {
  if (walkingSnake.contains(e.target)) {
    console.log('clicked inside');
    walkingSnake.className = "";
    walkingSnake.className = "walking-snake ld ld-spin-fast";

    setTimeout(function () {
      walkingSnake.className = INITIAL_SNAKE_STATE;
    }, 1000);


  } else {
    let selection = window.getSelection();
    selection.modify('move', 'backward', 'word');
    selection.modify('extend', 'forward', 'word');

    showTitle(selection.toString());
  }
});
