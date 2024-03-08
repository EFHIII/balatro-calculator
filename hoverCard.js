let constrain = 5;
let mouseOverContainer = document.getElementById("ex1-layer");

function transforms(x, y, el) {
  el.style.transform = '';
  let box = el.getBoundingClientRect();

  let calcX = -(y - box.y - (box.height / 2)) / (el.dataset.scale == 2 ? constrain * 2 : constrain);
  let calcY = (x - box.x - ((box.width ? box.width : 71) / 2)) / (el.dataset.scale == 2 ? constrain * 2 : constrain);

  if(box.width === 0) {
    return `translate(35.5px) perspective(${94}px) ` +
    `rotateX(${calcX}deg) ` +
    `rotateY(${calcY}deg) translate(-35.5px)`;
  }

  return `perspective(${94}px) ` +
  `rotateX(${calcX}deg) ` +
  `rotateY(${calcY}deg)`;
};

//mousemove
function hoverCard(e) {
  let target = e.target;
  let position = [e.clientX, e.clientY, e.target];

  target.style.transform = transforms.apply(null, position);
}

// mouseout
function noHoverCard(e) {
  e.target.style.transform = '';
}

// onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'
