document.addEventListener('DOMContentLoaded', () => {
  const capsuleOrb = document.getElementById('capsuleOrb');
  const capsuleStage = document.getElementById('capsuleStage');
  const videoStage = document.getElementById('videoStage');
  const video = document.getElementById('birthdayVideo');
  const finale = document.getElementById('grandFinale');

  function openCapsule() {
    capsuleStage.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    capsuleStage.style.opacity = '0';
    capsuleStage.style.transform = 'scale(1.2)';

    setTimeout(() => {
      capsuleStage.style.display = 'none';
      videoStage.style.display = 'flex';
    }, 800);
  }

  if (capsuleOrb) {
    capsuleOrb.addEventListener('click', openCapsule);
    capsuleOrb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCapsule();
      }
    });
  }

  if (video) {
    // Stop background music when video starts playing
    video.addEventListener('play', () => {
      const bgMusic = window.birthdayAudioInstance;
      if (bgMusic && !bgMusic.paused) {
        bgMusic.pause();
        // Update toggle UI if it exists
        const musicToggleText = document.querySelector('.music-toggle .text');
        const musicToggleIcon = document.querySelector('.music-toggle .icon');
        if (musicToggleText) musicToggleText.textContent = 'Music: Off';
        if (musicToggleIcon) musicToggleIcon.innerHTML = '🔇';
        sessionStorage.setItem('musicPlaying', 'false');
      }
    });

    video.addEventListener('ended', () => {
      videoStage.style.transition = 'all 1.2s ease';
      videoStage.style.opacity = '0';

      setTimeout(() => {
        videoStage.style.display = 'none';
        finale.style.display = 'flex';
      }, 1200);
    });
  }
});