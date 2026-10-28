/* ==========================================================================
   BIRTHDAY LETTER - TYPEWRITER EFFECT
   - Reveals the letter gradually character by character
   - Respects reduced-motion preferences
   - Provides a "Reveal Full Letter" button for instant display
   ========================================================================== */

const letterText = `Happy Birthday, Kriya! 🎂💗✨

Today is a special day, not just because it's your birthday, but because the world was blessed with someone as beautiful, strong, caring, and incredible as you! 🥹💕 Today, the most amazing person I know was born, and words will never be enough to express how deeply grateful I am to have you in my life. ❤️

I never imagined that I would meet someone as incredible as you, someone who could become so special to me in such a beautiful way. 🫶🏻💖

Spending time with you has already become one of my favourite parts of my days. Whether it's us playing games 🎮, sending each other reels 😂💕, or simply talking, every little moment with you means more to me! I know that sometimes I do dumb things and make mistakes, but you still tolerate all of that! 😭❤️ And honestly, I'm so grateful for your patience with me.

When I'm with you, everything feels more fun and brighter. 🥹✨ I love being around you, making memories with you, and sharing these little moments of us! Sometimes, words just fail to capture how special you truly are to me! 💗

No matter what life brings your way, I want you to know that I'll always be there to support you, care for you, cheer you on, and remind you of how amazing you are. 🫂❤️ Please, never forget how special you are. You genuinely deserve the world and every beautiful thing it has to offer. 🌎💖 You bring me a kind of happiness that no one else ever could! I love you more than words could ever explain. 🥹💞

As you begin another year of your life, I hope it brings you endless happiness, beautiful memories, countless reasons to smile, and everything you've been working towards. May you achieve all your dreams, overcome every challenge, and always find reasons to be proud of yourself. ✨🌷 And whenever you have a difficult day, I hope you remember that there's someone here who believes in you and wants to see you happy. ❤️‍🩹💗

Happy Birthday once again! ♡ 🎂💖

Forever & Always, 
Your Dumbo Mona! 💗`;

let charIdx = 0;
let timer = null;

document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementById('typewriterBody');
  const revealBtn = document.getElementById('revealBtn');
  const nextBtn = document.getElementById('nextBtn');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeNext() {
    if (charIdx < letterText.length) {
      body.textContent += letterText.charAt(charIdx);
      charIdx++;
      // Use a faster delay if the user prefers reduced motion
      timer = setTimeout(typeNext, prefersReducedMotion ? 1 : 30);
    } else {
      revealBtn.style.display = 'none';
      nextBtn.style.display = 'inline-flex';
    }
  }

  typeNext();

  revealBtn.addEventListener('click', () => {
    clearTimeout(timer);
    body.textContent = letterText;
    revealBtn.style.display = 'none';
    nextBtn.style.display = 'inline-flex';
  });

  nextBtn.addEventListener('click', () => {
    window.location.href = 'final-surprise.html';
  });
});