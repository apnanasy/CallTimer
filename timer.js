const States = Object.freeze({
  EXTHOLD: 360000,
  REGHOLD: 180000,
  INITIAL: 'INITIAL'
});
var state = States.INITIAL;
var callback;
var ctr;
function regClick() {
  if(state == States.INITIAL) {
    state = States.REGHOLD;
    regBtn.innerHTML = "STOP";
    extBtn.innerHTML = "Extended Hold"
    timeAnimate();
  } else if(state == States.REGHOLD) {
    clearInterval(callback);
    animClear();
    regBtn.innerHTML = "Regular Hold";
    state = States.INITIAL;
  } else if(state == States.EXTHOLD) {
    clearInterval(callback);
    animClear();
    state = States.REGHOLD;
    regBtn.innerHTML = "STOP";
    extBtn.innerHTML = "Extended Hold"
    timeAnimate();

  }
}


function extClick() {
  if(state == States.INITIAL) {
    state = States.EXTHOLD;
    extBtn.innerHTML = "Stop";
    timeAnimate();
  } else if(state == States.EXTHOLD) {
    clearInterval(callback);
    animClear();
    extBtn.innerHTML = "Extended Hold";
    state = States.INITIAL;
  } else if(state == States.REGHOLD) {
    clearInterval(callback);
    animClear();
    state = States.EXTHOLD;
    regBtn.innerHTML = "Regular Hold";
    extBtn.innerHTML = "Stop"
    timeAnimate();
  }
}
function animClear() {
  if(regBtn.classList.contains("animDone")) {
    regBtn.classList.remove("animDone");
  }
  if(regBtn.classList.contains("animWarning")) {
    regBtn.classList.remove("animWarning");
  }
  if(extBtn.classList.contains("animDone")) {
    extBtn.classList.remove("animDone");
  }
  if(extBtn.classList.contains("animWarning")) {
    extBtn.classList.remove("animWarning")
  }
  if(timerP.classList.contains("txtAnimDone")) {
    timerP.classList.remove("txtAnimDone")
  }
  if(timerP.classList.contains("txtAnimWarning")) {
    timerP.classList.remove("txtAnimWarning")
  }
}
function animDone() {
  if(regBtn.classList.contains("animDone") != true) {
    animClear();
    regBtn.classList.add("animDone");
    extBtn.classList.add("animDone");
    timerP.classList.add("txtAnimDone");
  }
}
function animWarning() {
  if(regBtn.classList.contains("animWarning") != true) {
    regBtn.classList.add("animWarning");
    extBtn.classList.add("animWarning");
    timerP.classList.add("txtAnimWarning");
  }
}
function timeAnimate(){
  ctr = state;
  callback = setInterval(function() {animate()}, 300);
}

function animate() {
  if(ctr >= 0){
    mins = Math.floor(ctr/1000/60)
    secs = Math.floor(((ctr/1000/60/60) *60 - mins) *60)
    if(secs < 10) {
      secs = "0" + secs.toString();
    }
    timerP.innerHTML = mins + ":" + secs;
    if(ctr <= 30000) {
      animWarning();
    }
  } else {
    animDone();
  }
    ctr = ctr - 300;
}
const regBtn = document.getElementById('regular');
const extBtn = document.getElementById('extended');
const timerP = document.getElementById('timer');
regBtn.addEventListener('mousedown', function () {regClick()});
extBtn.addEventListener('mousedown', function () {extClick()});
