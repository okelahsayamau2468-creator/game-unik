let num1, num2, correctAnswer;
let score = 0;

function generateQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1; // Angka acak 1-10
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 + num2;
    document.getElementById("question").innerText = `Berapa ${num1} + ${num2}?`;
    document.getElementById("answer").value = "";
}

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer").value);
    if (userAnswer === correctAnswer) {
        score += 10;
        document.getElementById("result").innerText = "🎉 Benar!";
        document.getElementById("result").style.color = "green";
    } else {
        document.getElementById("result").innerText = "❌ Coba lagi!";
        document.getElementById("result").style.color = "red";
    }
    document.getElementById("score").innerText = score;
    generateQuestion();
}

// Jalankan soal pertama saat halaman dimuat
generateQuestion();