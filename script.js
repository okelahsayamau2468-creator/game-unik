const questions = [
  {
    emoji: "🦁",
    options: ["Singa", "Harimau", "Kucing", "Serigala"],
    answer: "Singa"
  },
  {
    emoji: "🐘",
    options: ["Jerapah", "Gajah", "Badak", "Kuda Nil"],
    answer: "Gajah"
  },
  {
    emoji: "🦒",
    options: ["Zebra", "Rusa", "Jerapah", "Unta"],
    answer: "Jerapah"
  },
  {
    emoji: "🐼",
    options: ["Beruang", "Panda", "Koala", "Kucing"],
    answer: "Panda"
  },
  {
    emoji: "🐵",
    options: ["Monyet", "Kucing", "Anjing", "Kelinci"],
    answer: "Monyet"
  },
  {
    emoji: "🐸",
    options: ["Ular", "Katak", "Buaya", "Ikan"],
    answer: "Katak"
  }
];

let currentIndex = 0;
let score = 0;

function startGame() {
  score = 0;
  document.getElementById("score-display").textContent = `Skor: ${score}`;
  
  const homeScreen = document.getElementById("home-screen");
  const gameScreen = document.getElementById("game-screen");

  homeScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  gameScreen.classList.add("fade-in");

  loadQuestion();
}

function goToHome() {
  const homeScreen = document.getElementById("home-screen");
  const gameScreen = document.getElementById("game-screen");

  gameScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
  homeScreen.classList.add("fade-in");
}

function toggleInfo() {
  const infoBox = document.getElementById("info-box");
  infoBox.classList.toggle("hidden");
}

function playAudio(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

function loadQuestion() {
  const messageEl = document.getElementById("message");
  const nextBtn = document.getElementById("btn-next");
  
  messageEl.textContent = "";
  messageEl.className = "message";
  nextBtn.classList.add("hidden");

  if (currentIndex >= questions.length) {
    currentIndex = 0;
  }

  const q = questions[currentIndex];
  document.getElementById("animal-emoji").textContent = q.emoji;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "btn-option";
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, q.answer);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  const messageEl = document.getElementById("message");
  const buttons = document.querySelectorAll(".btn-option");

  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    score += 10;
    document.getElementById("score-display").textContent = `Skor: ${score}`;
    messageEl.textContent = "Hebat! Jawabanmu Benar! 🎉";
    messageEl.classList.add("correct-msg");
    playAudio("Hebat, jawabanmu benar!");
  } else {
    messageEl.textContent = `Kurang Tepat! Jawaban: ${correct}`;
    messageEl.classList.add("wrong-msg");
    playAudio("Tetot, jawaban salah!");
  }

  document.getElementById("btn-next").classList.remove("hidden");
  currentIndex++;
}
