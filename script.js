const oButton = document.getElementById("o-button");
const xButton = document.getElementById("x-button");
const nextButton = document.getElementById("next-button");
const questionElement = document.getElementById("question");
const authorElement = document.getElementById("author");

let currentQuestionIndex = 0;
let correctCount = 0;

const questions = [
  { text: "어머니는 아들이 글을 짓는다는 것을 자랑스러워하며 주인 아낙네에게 아들이 치마를 해준 것을 자랑했다.", isCorrect: false, explanation: "어머니는 글쓰는것보다 월급쟁이가 몇 곱절 낫다고 생각하고, 아들이 글을 쓰는 것을 자랑스러워하지는 않는다. 어머니가 자랑스러워하는것은 아들이 어머니 생각을 해서 치마를 해준 일이다.", author: "옹씌" },
  { text: "구보는 십칠 년 전 그 일 때문에 자신의 현재 상황이 이렇게 되었다고 생각했지만, 다가올 미래에 대해선 현재와 다를 것이라는 막연한 기대를 품었다.", isCorrect: false, explanation: "마지막 4번째줄에서 구보는 '십칠 년 전의 그것들이, 뒤에 온, 그리고 또 올, 온갖 것의 근원이었을지도 모른다.' 라며 미래의 일도 이 일에 영향을 받아 현재와 비슷할 것이라고 추측한다.", author: "옹씌" }
];

function loadQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    questionElement.innerHTML = `<span class="question-prefix">Q.</span> ${question.text}`;
    authorElement.textContent = `제작자: ${question.author}`;
    nextButton.style.display = "none";
    resetFocus();
    enableButtons(); // 버튼 초기화
  } else {
    showFinalResult();
  }
}

function checkAnswer(isCorrect, button) {
  disableButtons(); // 버튼 비활성화
  setFocus(button);

  const question = questions[currentQuestionIndex];
  const isAnswerCorrect = isCorrect === question.isCorrect;

  showToast(isAnswerCorrect);

  if (isAnswerCorrect) {
    correctCount++;
    button.classList.add("correct");
    setTimeout(() => {
      button.classList.remove("correct");
      showExplanationModal(question.explanation);
      nextButton.style.display = "block";
    }, 1600);
  } else {
    setTimeout(() => {
      showExplanationModal(question.explanation);
      nextButton.style.display = "block";
    }, 1600);
  }
}

function disableButtons() {
  oButton.disabled = true;
  xButton.disabled = true;
}

function enableButtons() {
  oButton.disabled = false;
  xButton.disabled = false;
}

function showToast(isCorrect) {
  Swal.fire({
    title: isCorrect ? '정답!' : '오답!',
    icon: isCorrect ? 'success' : 'error',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  });
}

function showExplanationModal(explanation) {
  Swal.fire({
    title: '풀이',
    html: `<p style="font-size: 1.1em; margin: 0; line-height: 1.6;">${explanation}</p>`,
    icon: 'info',
    confirmButtonText: '확인',
    confirmButtonColor: '#007bff',
  });
}

function showFinalResult() {
  questionElement.innerHTML = `
  <div style="text-align: center; padding: 20px;">
    <h2 style="font-size: 1.8em; color: #333; margin-bottom: 10px;">퀴즈 종료!</h2>
    <p style="font-size: 1.2em; margin-bottom: 10px;">총 맞춘 문제 수</p>
    <strong style="font-size: 2em; color: #007bff;">${correctCount}/${questions.length}</strong>
    <h4 style="font-size: 0.9em; color: #333; margin-bottom: 10px;">풀어주셔서 감사합니다</h4>

  </div>
`;
  authorElement.textContent = "";

  // 모든 버튼 비활성화
  oButton.style.display = "none";
  xButton.style.display = "none";
  nextButton.style.display = "none";

  Swal.fire({
    title: '퀴즈 종료!',
    html: `
      <p>총 <strong>${questions.length}</strong>문제 중</p>
      <p><strong style="font-size: 1.5em; color: #008000;">${correctCount}</strong> 문제를 맞추셨습니다!</p>
    `,
    icon: 'success',
    confirmButtonText: '확인',
    confirmButtonColor: '#008000',
  });
}

function setFocus(button) {
  resetFocus();
  button.classList.add("focused");
}

function resetFocus() {
  oButton.classList.remove("focused");
  xButton.classList.remove("focused");
}

oButton.addEventListener("click", () => checkAnswer(true, oButton));
xButton.addEventListener("click", () => checkAnswer(false, xButton));
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  loadQuestion();
});

loadQuestion();
