/* ==========================================================================
   CATCH MY LOVE - ARCADE GAME LOGIC
   - 15-second timer
   - Ordinary heart: +5 points
   - Bonus golden heart: +15 points
   - Score >= 81 unlocks the letter immediately; no retry needed
   - Victory screen with button to proceed to Birthday Letter
   ========================================================================== */

let score = 0;
let timeLeft = 15;
let gameInterval = null;
let spawnInterval = null;
let basketX = 50; // percentage position
let gameActive = false;

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const unlockBtn = document.getElementById('unlockBtn');

  if (startBtn) startBtn.addEventListener('click', startGame);
  if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
      window.location.href = 'birthday-letter.html';
    });
  }

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      basketX = Math.max(8, basketX - 6);
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      basketX = Math.min(92, basketX + 6);
    }
    updateBasket();
  });

  // Touch drag controls
  const field = document.getElementById('gameField');
  if (field) {
    field.addEventListener('touchmove', (e) => {
      if (!gameActive) return;
      const rect = field.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      basketX = Math.max(8, Math.min(92, (touchX / rect.width) * 100));
      updateBasket();
    });
  }
});

function updateBasket() {
  const basket = document.getElementById('basket');
  if (basket) basket.style.left = `${basketX}%`;
}

function startGame() {
  // Reset all game state
  score = 0;
  timeLeft = 15;
  basketX = 50;
  gameActive = true;

  document.getElementById('scoreVal').textContent = '0';
  document.getElementById('timerVal').textContent = '15';

  document.getElementById('startOverlay').style.display = 'none';
  document.getElementById('retryOverlay').style.display = 'none';
  document.getElementById('victoryOverlay').style.display = 'none';

  // Clear any leftover falling hearts
  document.querySelectorAll('.falling-heart-item').forEach(el => el.remove());

  // Clear previous timers
  clearInterval(gameInterval);
  clearInterval(spawnInterval);

  // Start countdown timer - 15 seconds
  gameInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timerVal').textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);

  // Start spawning hearts
  spawnInterval = setInterval(spawnHeart, 400);
}

function spawnHeart() {
  if (!gameActive) return;

  const field = document.getElementById('gameField');
  const heart = document.createElement('div');
  heart.className = 'falling-heart-item';

  // Bonus hearts appear more frequently toward the end
  const isBonus = Math.random() < (timeLeft <= 8 ? 0.4 : 0.2);
  heart.textContent = isBonus ? '💛' : '💗';
  heart.dataset.pts = isBonus ? 15 : 5;

  const left = Math.random() * 84 + 8;
  heart.style.left = `${left}%`;
  heart.style.top = '0px';

  field.appendChild(heart);

  // Fall speed is constant for the shorter game
  const fallSpeed = 5;

  const anim = setInterval(() => {
    if (!gameActive) {
      clearInterval(anim);
      if (heart.parentNode) heart.remove();
      return;
    }

    heart.style.top = `${parseFloat(heart.style.top) + fallSpeed}px`;

    // Catch collision check at basket level
    const topPos = parseFloat(heart.style.top);
    if (topPos >= 350 && topPos <= 410) {
      const heartX = parseFloat(heart.style.left);
      if (Math.abs(heartX - basketX) < 12) {
        score += parseInt(heart.dataset.pts);
        document.getElementById('scoreVal').textContent = score;
        clearInterval(anim);
        if (heart.parentNode) heart.remove();
        return;
      }
    }

    if (topPos > 430) {
      clearInterval(anim);
      if (heart.parentNode) heart.remove();
    }
  }, 20);
}

function endGame() {
  gameActive = false;
  clearInterval(gameInterval);
  clearInterval(spawnInterval);

  if (score >= 81) {
    document.getElementById('finalWinScore').textContent = score;
    document.getElementById('victoryOverlay').style.display = 'flex';
  } else {
    // Score too low - still show retry but only once, then go to letter
    document.getElementById('finalFailScore').textContent = score;
    document.getElementById('retryOverlay').style.display = 'flex';
    // After retry, still go to letter
    setTimeout(() => {
      document.getElementById('retryOverlay').style.display = 'none';
      window.location.href = 'birthday-letter.html';
    }, 2000);
  }
}