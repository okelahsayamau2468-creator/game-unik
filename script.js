const questions = [
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/640px-Lion_waiting_in_Namibia.jpg",
    options: ["Singa", "Harimau", "Kucing", "Serigala"],
    answer: "Singa"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/640px-African_Bush_Elephant.jpg",
    options: ["Jerapah", "Gajah", "Badak", "Kuda Nil"],
    answer: "Gajah"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/640px-Giraffe_Mikumi_National_Park.jpg",
    options: ["Zebra", "Rusa", "Jerapah", "Unta"],
    answer: "Jerapah"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/640px-Grosser_Panda.JPG",
    options: ["Beruang", "Panda", "Koala", "Kucing"],
    answer: "Panda"
  }
];

let currentIndex = 0;
let score = 0;

// Navigasi Tampilan dengan Animasi
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

// Suara Sintesis
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
    currentIndex = 0; // Ulangi soal jika habis
  }

  const q = questions[currentIndex];
  document.getElementById("animal-img").src = q.image;

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
