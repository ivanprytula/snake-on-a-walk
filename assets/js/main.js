// Walking snake behavior

const STEP_SIZE = 10;

//init object globally
let objImage = null;


const init = () => {
  //getting the image node
  objImage = document.querySelector("#walkingSnake");
  objImage.style.left = "0px";
  objImage.style.top = "0px";
};


const moveUp = () => {
  objImage.style.top = parseInt(objImage.style.top) - STEP_SIZE + "px";
  objImage.className = ""
  objImage.className = "walking-snake ld ld-float"
};

const moveDown = () => {
  objImage.style.top = parseInt(objImage.style.top) + STEP_SIZE + "px";
  objImage.className = ""
  objImage.className = "walking-snake ld ld-pulse"
};

const moveLeft = () => {
  objImage.style.left = parseInt(objImage.style.left) - STEP_SIZE + "px";
  objImage.className = ""
  objImage.className = "walking-snake ld ld-jelly"
};

const moveRight = () => {
  objImage.style.left = parseInt(objImage.style.left) + STEP_SIZE + "px";
  objImage.className = ""
  objImage.className = "walking-snake ld ld-jingle"
};


document.body.onkeydown = (e) => {
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

window.onload = init;
