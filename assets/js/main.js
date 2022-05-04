// Walking snake behavior

const walkingSnake = document.querySelector("#walkingSnake");
let stepSize;


walkingSnake.style.left = "0px";
walkingSnake.style.top = "0px";

const moveUp = () => {
  walkingSnake.style.top = parseInt(walkingSnake.style.top) - stepSize + "px";
  walkingSnake.className = ""
  walkingSnake.className = "walking-snake ld ld-float"
};

const moveDown = () => {
  walkingSnake.style.top = parseInt(walkingSnake.style.top) + stepSize + "px";
  walkingSnake.className = ""
  walkingSnake.className = "walking-snake ld ld-pulse"
};

const moveLeft = () => {
  walkingSnake.style.left = parseInt(walkingSnake.style.left) - stepSize + "px";
  walkingSnake.className = ""
  walkingSnake.className = "walking-snake ld ld-jelly"
};

const moveRight = () => {
  walkingSnake.style.left = parseInt(walkingSnake.style.left) + stepSize + "px";
  walkingSnake.className = ""
  walkingSnake.className = "walking-snake ld ld-jingle"
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
  } else {
    let selection = window.getSelection();
    selection.modify('move', 'backward', 'word');
    selection.modify('extend', 'forward', 'word');

    inspectToken(selection.toString());
  }
});
