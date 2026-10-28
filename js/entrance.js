document.addEventListener('DOMContentLoaded', () => {
  const enterBtn = document.getElementById('enterBtn');
  const hiddenMessage = document.getElementById('hiddenMessage');
  const card = document.getElementById('entranceCard');

  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      hiddenMessage.classList.add('show');

      setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = 'scale(0.9) translateY(-30px)';
        card.style.opacity = '0';

        setTimeout(() => {
          window.location.href = 'birthday-wish.html';
        }, 700);
      }, 900);
    });
  }
});
