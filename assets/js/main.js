// Walking snake behavior

const walkingSnake = document.querySelector("#walkingSnake");
let stepSize;

const INITIAL_SNAKE_STATE = "walking-snake ld ld-breath";

walkingSnake.style.left = "0px";
walkingSnake.style.top = "0px";
walkingSnake.className = INITIAL_SNAKE_STATE;


const moveUp = () => {
  walkingSnake.style.top = parseInt(walkingSnake.style.top) - stepSize + "px";
};

const moveDown = () => {
  walkingSnake.style.top = parseInt(walkingSnake.style.top) + stepSize + "px";
};

const moveLeft = () => {
  walkingSnake.style.left = parseInt(walkingSnake.style.left) - stepSize + "px";
};

const moveRight = () => {
  walkingSnake.style.left = parseInt(walkingSnake.style.left) + stepSize + "px";
};

const inspectToken = (token) => {
  console.log('token:: >> ', token);
}


document.body.onkeydown = (e) => {
  if (e.repeat) {
    stepSize++;
  } else {
    stepSize = 10;
  }

  switch (e.key) {
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowRight':
      moveRight();
      break;
    case 'ArrowDown':
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

    inspectToken(selection.toString());
  }
});
