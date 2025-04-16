const letters = [
  "Hey beautiful, press the next letter button!",
  "Your smile sets my heart on fire!",
  "Every love story is beautiful, but ours is my favourite.",
  "Every day with you is like Valentine's Day.",
  "Your eyes are big, brown, and the prettiest I've seen!",
  "Your hugs feel like home.",
  "You're the sweetest part of my life. ",
    "Even on my worst days, you make everything better.",
    "I fall in love with you more every single day.",
    "I promise to love you today, tomorrow, and always.",
    "I still get butterflies every time I think of you. ",
    "You make the most ordinary things so special.",
    "In your arms, I find the comfort of a place I never want to leave."

];

let currentIndex = 0;
let showingFront = true;

const card = document.querySelector('.card');
const frontText = document.getElementById('letterTextFront');
const backText = document.getElementById('letterTextBack');
const buttons = document.querySelectorAll('.nextLetter');

let typingTimeout;

function typeText(element, text, callback) {
  // clear any leftover typing timeouts
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  element.textContent = '';
  let i = 0;
  const speed = 30;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      // store this timeout, so we can clear it later
      typingTimeout = setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}


// Initial message
typeText(frontText, letters[currentIndex]);

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Move to next letter
    currentIndex = (currentIndex + 1) % letters.length;

    // Flip the card
    card.classList.toggle('flipped');
    showingFront = !showingFront;

    // Immediately update the hidden side
    if (showingFront) {
      typeText(frontText, letters[currentIndex]);
    } else {
      typeText(backText, letters[currentIndex]);
    }
  });
});

const heartsContainer = document.querySelector('.hearts-container');

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');

  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (4 + Math.random() * 2) + 's';
  heart.style.opacity = 0.6 + Math.random() * 0.4;
  heart.style.transform = `scale(${0.7 + Math.random() * 0.6}) rotate(45deg)`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

// Show the first heart immediately
createHeart();

// Then keep spawning gently
setInterval(createHeart, 800);

const music = document.getElementById('bg-music');
const toggleMusicFront = document.getElementById('toggleMusic');
const toggleMusicBack = document.getElementById('toggleMusicBack');

function toggleMusic() {
  if (music.paused) {
    music.currentTime = 0; // restart when toggled on
    music.play();
    toggleMusicFront.textContent = 'Pause Music 🔇';
    toggleMusicBack.textContent = 'Pause Music 🔇';
  } else {
    music.pause();
    toggleMusicFront.textContent = 'Play Music 🎶';
    toggleMusicBack.textContent = 'Play Music 🎶';
  }
}

// Add event listeners to both front and back buttons
toggleMusicFront.addEventListener('click', toggleMusic);
toggleMusicBack.addEventListener('click', toggleMusic);
