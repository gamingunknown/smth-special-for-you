document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const envelopeFlap = document.getElementById('envelopeFlap');
  const envelopeContainer = document.getElementById('envelopeContainer');
  const birthdayCard = document.getElementById('birthdayCard');
  const nextBtn = document.getElementById('nextBtn');

  if (envelope) {
    envelope.addEventListener('click', () => {
      envelopeFlap.style.transform = 'rotateX(180deg)';

      setTimeout(() => {
        envelopeContainer.style.transition = 'all 0.6s ease';
        envelopeContainer.style.opacity = '0';
        envelopeContainer.style.transform = 'translateY(30px)';

        setTimeout(() => {
          envelopeContainer.style.display = 'none';
          birthdayCard.style.display = 'block';
        }, 500);
      }, 500);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      birthdayCard.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      birthdayCard.style.transform = 'translateX(100vw) rotate(10deg)';
      birthdayCard.style.opacity = '0';

      setTimeout(() => {
        window.location.href = 'memories.html';
      }, 600);
    });
  }
});