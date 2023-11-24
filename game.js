const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "uma camisa azul de algodão",
    choice1: "A cotton blue shirt",
    choice2: "A blue cotton shirt",
    choice3: "A shirt blue cotton",
    choice4: "A shirt cotton blue",
    answer: 2
  },
  {
    question:
      "um carro vermelho italiano",
    choice1: "An Italian red car",
    choice2: "A car red Italian",
    choice3: "A red Italian car",
    choice4: "A car Italian red",
    answer: 3
  },
  {
    question: "um livro interessante de história",
    choice1: "A history interesting book",
    choice2: "An interesting history book",
    choice3: "A book interesting history",
    choice4: "A book history interesting",
    answer: 2
  },
  {
    question: " um cachorro pequeno e fofo",
    choice1: "A cute and small dog",
    choice2: "A dog small and cute",
    choice3: "A dog cute and small",
    choice4: "A small and cute dog",
    answer: 4
  },
  {
    question: "um vestido longo e verde",
    choice1: "A green and long dress",
    choice2: "A dress long and green",
    choice3: "A long and green dress",
    choice4: "A dress green and long",
    answer: 3
  },
  {
    question: "um quadro antigo e bonito",
    choice1: "An old and beautiful painting",
    choice2: "A beautiful and old painting",
    choice3: "A painting old and beautiful",
    choice4: "A painting beautiful and old",
    answer: 1
  },
  {
    question: "um sofá grande e confortável",
    choice1: "A comfortable and big couch",
    choice2: "A big and comfortable couch",
    choice3: "A couch big and comfortable ",
    choice4: "A couch comfortable and big",
    answer: 2
  },
  {
    question: "um bolo delicioso de chocolate",
    choice1: "A cake chocolate delicious",
    choice2: "A chocolate delicious cake",
    choice3: "A delicious chocolate cake",
    choice4: "A cake delicious chocolate",
    answer: 3
  },
  {
    question: " um relógio caro e elegante",
    choice1: "An expensive and elegant watch",
    choice2: "An elegant and expensive watch",
    choice3: "A watch expensive and elegant",
    choice4: "A watch elegant and expensive",
    answer: 1
  },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
