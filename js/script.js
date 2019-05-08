var canv = document.getElementById('canvas'),
  ctx = canv.getContext('2d'),
  isMouseDown = false,
  coords = [];

var saveLink = document.querySelector('.save-link'),
  replayLink = document.querySelector('.replay-link'),
  clearLink = document.querySelector('.clear-link');

canv.width = document.documentElement.clientWidth;
canv.height = document.documentElement.clientHeight - 60;

//code
ctx.lineWidth = 10 * 2;

canv.addEventListener('mousedown', function() {
  isMouseDown = true;
});

canv.addEventListener('mouseup', function() {
  isMouseDown = false;
  ctx.beginPath();
  coords.push('mouseup');
});

canv.addEventListener('mousemove', function(e) {
  if (isMouseDown) {
    coords.push([e.clientX, e.clientY]);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
});

function save() {
  localStorage.setItem('coords', JSON.stringify(coords));
}

function clear() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canv.width, canv.height);

  ctx.beginPath();
  ctx.fillStyle = 'black';
}

function replay() {
  var timer = setInterval(function() {
    if (!coords.length) {
      clearInterval(timer);
      ctx.beginPath();
      return;
    }

    var crd = coords.shift(),
      e = {
        clientX: crd['0'],
        clientY: crd['1']
      };

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }, 30);
}

saveLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  save();
  alert('Saved');
});

replayLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  coords = JSON.parse(localStorage.getItem('coords'));
  clear();
  replay();
});

clearLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  clear();
});
