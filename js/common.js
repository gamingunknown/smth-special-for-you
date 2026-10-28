/* ==========================================================================
   BIRTHDAY WEBSITE - COMMON JAVASCRIPT
   Handles ambient music toggle, particle spawner, and navigation helpers.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticleBackground();
  initMusicToggle();
});

/* Ambient Floating Particles Spawner */
function initParticleBackground() {
  let container = document.querySelector('.floating-particles-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'floating-particles-container';
    document.body.prepend(container);
  }

  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    createParticle(container, true);
  }
}

function createParticle(container, isInitial = false) {
  const particle = document.createElement('div');
  const isHeart = Math.random() > 0.35;
  particle.className = `particle ${isHeart ? 'particle-heart' : 'particle-star'}`;

  const size = isHeart ? Math.floor(Math.random() * 16) + 10 : Math.floor(Math.random() * 10) + 6;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${Math.random() * 100}%`;

  const duration = Math.random() * 12 + 10;
  const delay = isInitial ? Math.random() * duration : 0;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${delay}s`;

  container.appendChild(particle);

  particle.addEventListener('animationiteration', () => {
    particle.style.left = `${Math.random() * 100}%`;
  });
}

/* Background Music Controller - Seamless across pages */
function initMusicToggle() {
  if (document.querySelector('.music-toggle')) return;

  const btn = document.createElement('button');
  btn.className = 'music-toggle';
  btn.setAttribute('aria-label', 'Toggle background music');
  btn.innerHTML = '<span class="icon">🎵</span><span class="text">Music: Off</span>';
  document.body.appendChild(btn);

  let audio = window.birthdayAudioInstance;
  if (!audio) {
    audio = new Audio('assets/audio/birthday-music.mp3');
    audio.loop = true;
    audio.volume = 0.45;
    window.birthdayAudioInstance = audio;
  }

  // Handle seamless playback timing
  const savedTime = sessionStorage.getItem('musicTime');
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  // Constantly update saved time
  audio.addEventListener('timeupdate', () => {
    sessionStorage.setItem('musicTime', audio.currentTime);
  });

  const isPlaying = sessionStorage.getItem('musicPlaying') === 'true';
  if (isPlaying) {
    audio.play().then(() => {
      btn.innerHTML = '<span class="icon">🎶</span><span class="text">Music: On</span>';
    }).catch(() => {
      sessionStorage.setItem('musicPlaying', 'false');
    });
  }

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        btn.innerHTML = '<span class="icon">🎶</span><span class="text">Music: On</span>';
        sessionStorage.setItem('musicPlaying', 'true');
      }).catch(err => {
        console.warn('Audio playback prevented:', err);
        btn.innerHTML = '<span class="icon">💗</span><span class="text">Playing</span>';
      });
    } else {
      audio.pause();
      btn.innerHTML = '<span class="icon">🔇</span><span class="text">Music: Off</span>';
      sessionStorage.setItem('musicPlaying', 'false');
    }
  });

  // Save state and time before page leaves
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('musicTime', audio.currentTime);
    sessionStorage.setItem('musicPlaying', !audio.paused);
  });
}
