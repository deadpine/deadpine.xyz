// Script - Toggle Navigation Work <>About 
function work() {
  document.getElementById('work').style.display = 'flex';
  document.getElementById('about').style.display = 'none';
  window.scrollTo(0, 0);
}

function about() {
  document.getElementById('work').style.display = 'none';
  document.getElementById('about').style.display = 'block';
  window.scrollTo(0, 0);
}

// Mouse over cards

const projects = document.querySelector('.projects');
const followDiv = projects.querySelector('.follow-div');
let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
let velocityX = 0, velocityY = 0;
const k = 0.005; // Spring constant
const beta = 0.1; // Damping factor

const updatePosition = () => {
  const dx = targetX - currentX;
  const dy = targetY - currentY;

  const ax = dx * k - beta * velocityX;
  const ay = dy * k - beta * velocityY;

  velocityX += ax;
  velocityY += ay;

  currentX += velocityX;
  currentY += velocityY;

  followDiv.style.transform = `translate(${currentX}px, ${currentY}px)`;
  requestAnimationFrame(updatePosition);
};

projects.addEventListener('mousemove', (e) => {
  const rect = projects.getBoundingClientRect();
  targetX = e.clientX - rect.left - followDiv.offsetWidth / 2;
  targetY = e.clientY - rect.top - followDiv.offsetHeight / 2;
});

projects.addEventListener('mouseleave', () => {
  followDiv.style.display = 'none';
});

document.querySelectorAll('.card').forEach(card => {
  const text = card.querySelector('span').textContent.trim();

  card.addEventListener('mouseenter', () => {
    followDiv.textContent = text;
    followDiv.style.display = 'block';
  });
});

updatePosition();
