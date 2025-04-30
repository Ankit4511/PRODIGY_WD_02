let timer;
let isRunning = false;
let startTime;
let elapsed = 0;

function updateDisplay() {
  const now = Date.now();
  const time = isRunning ? now - startTime + elapsed : elapsed;
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  document.getElementById('display').textContent = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function start() {
  if (!isRunning) {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 1000);
    isRunning = true;
  }
}

function pause() {
  if (isRunning) {
    clearInterval(timer);
    elapsed += Date.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  clearInterval(timer);
  elapsed = 0;
  isRunning = false;
  updateDisplay();
  document.getElementById('laps').innerHTML = '';
}

function recordLap() {
  if (isRunning) {
    const lapTime = document.getElementById('display').textContent;
    const li = document.createElement('li');
    li.textContent = `Lap: ${lapTime}`;
    document.getElementById('laps').appendChild(li);
  }
}
