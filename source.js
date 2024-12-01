let dataQuestions = {};
let dataCount = 0;
let dataQuestionsLength = 0;
let totalAnswered = 0;
let totalCorrect = 0;

function Porcetagem(number1, number2) {
  let total = (number1 / number2) * 100;

  return `${total.toFixed(1)}%`;
}

function shuffleArray(array) {
  const newArray = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function resetStyleButon(value) {
  const button = document.getElementById(`alternative${value}`);
  button.setAttribute("class", "alternative");
}

function nextQuestion() {
  const Hide = document.querySelector('.nextButton')
    Hide.remove()
    
  if (dataQuestionsLength <= dataCount) {
    
    return;
  }
  dataCount++;
  createAndRemoveExplanation("remove");
  document.getElementById("textCard").style.display = "block";

  setInformations(dataCount);
  for (let i = 1; i < 5; i++) {
    resetStyleButon(i);

  }
}

function createAndRemoveExplanation(operation) {
  if (operation === "create") {
    for (let i = 1; i < 4; i++) {
      const explanationParagraph = document.createElement("p");
      explanationParagraph.setAttribute("class", "explanation");
      explanationParagraph.innerHTML += `${
        dataQuestions[dataCount][`explanation${i}`]
      }`;
      document.getElementById("cardQuestion").appendChild(explanationParagraph);
    }
    return;
  }
  const textCard = document.getElementById("cardQuestion");
  const childs = textCard.childNodes;

  for (let i = childs.length - 1; i >= 0; i--) {
    if (childs[i].nodeName === "P" || childs[i].nodeName === "p") {
      textCard.removeChild(childs[i]);
    }
  }
}

function explanation() {
  document.getElementById("textCard").style.display = "none";
  createAndRemoveExplanation("create");
}

// Criar a função de próximo

function nButton() {
  const divNextBtn = document.createElement("div");
  divNextBtn.setAttribute("class", "divNextButton");

  const nextButton = document.createElement("button");
  nextButton.setAttribute("id", "nextButton");
  nextButton.setAttribute("class", "nextButton");
  nextButton.addEventListener("click", (event) => {
    const { valueDataCount } = event.target;

    nextQuestion(valueDataCount);
  });

  divNextBtn.appendChild(nextButton);

  document.getElementById("section").appendChild(divNextBtn);
}

// Função de bloquear os botões
const blockButton = (index) => {
  const buttonAlternative = document.getElementById(`alternative${index}`);
  const newButtonAlternative = buttonAlternative.cloneNode(true);
  buttonAlternative.parentNode.replaceChild(
    newButtonAlternative,
    buttonAlternative
  );
  newButtonAlternative.innerHTML = `${
    dataQuestions[dataCount][`alternative${index}`]
  }`;
};

// Função de definir os botões
const setInformationButtons = (index) => {
  const buttonAlternative = document.getElementById(`alternative${index}`);
  const newButtonAlternative = buttonAlternative.cloneNode(true);

  buttonAlternative.parentNode.replaceChild(
    newButtonAlternative,
    buttonAlternative
  );

  newButtonAlternative.innerHTML = `${
    dataQuestions[dataCount][`alternative${index}`]
  }`;
  newButtonAlternative.setAttribute(
    "value",
    `${dataQuestions[dataCount][`alternative${index}`]}`
  );
  newButtonAlternative.addEventListener("click", (event) => {
    const { id, value } = event.target;

    verifyAnswer(value, id);
  });

  const clearButton = document.getElementById(`alternative${index}`);
  const newClearButton = clearButton.cloneNode(true);

  clearButton.parentNode.replaceChild(newClearButton, clearButton);

  newClearButton.addEventListener("click", (event) => {
    const { id, value } = event.target;

    verifyAnswer(value, id);
  });

  newClearButton.setAttribute("class", "alternative");
  newClearButton.innerHTML = dataQuestions[dataCount][`alternative${index}`];
};

const setInformations = (questionNumber) => {
  const AnwserText = document.getElementById("textCard");
  const currentAnswer = dataQuestions[questionNumber];

  AnwserText.innerHTML = currentAnswer.question;

  for (let i = 1; i < 5; i++) {
    setInformationButtons(i);
    
    
  }
};
const getAnswers = async () => {
  const dataQuestionsUn = await fetch("./questions.json").then((res) =>
    res.json()
  );
  dataQuestions = shuffleArray(dataQuestionsUn);
  dataQuestionsLength = dataQuestions.length;
  setInformations(dataCount);
};

function resetButton(index) {
  const idButton = document.getElementById("alternative" + index);
  const newButton = idButton.cloneNode(true);

  idButton.parentNode.replaceChild(newButton, idButton);

  newButton.innerHTML = `${dataQuestions[dataCount][`alternative${index}`]}`;
  newButton.setAttribute(
    "value",
    `${dataQuestions[dataCount][`alternative${index}`]}`
  );
  newButton.addEventListener("click", (event) => {
    const { id, value } = event.target;

    verifyAnswer(value, id);
  });
}

function verifyAnswer(questionValue, questionId) {
  //revertStateButton();

  for (y = 1; y < 5; y++) {
    const clearButton = document.getElementById("alternative" + y);
    clearButton.setAttribute("class", "alternative");
    clearButton.innerHTML = dataQuestions[dataCount]["alternative" + y];

    resetButton(y);
  }
  const clickedButton = document.getElementById(`${questionId}`);
  clickedButton.innerHTML = "Tem certeza?";
  clickedButton.setAttribute("class", "checkButton");

  clickedButton.addEventListener("click", (event) => {
    const { id } = event.target;

    validateAnswer(questionValue, id);
  });
}

// Verificar a pergunta se esta correta.

function validateAnswer(value, idButton) {
  const clickedButton = document.getElementById(`${idButton}`);
  const correctAnwser = dataQuestions[dataCount].correctAnswer;
  totalAnswered++;

  console.log(`Botão clicado ${clickedButton.value}`);
  if (correctAnwser === value) {
    clickedButton.setAttribute("class", "correctButton");
    clickedButton.innerHTML = "Correto!";
    totalCorrect++;
  } else {
    clickedButton.setAttribute("class", "errorButton");
    clickedButton.innerHTML = "Errado!";
    showRightAnswer(correctAnwser);
  }
  for (let i = 1; i < 5; i++) {
    blockButton(i);
  }
  const showLabel = document.getElementById("totalCorrect");
  showLabel.innerText = `${totalCorrect} / ${totalAnswered} (${Porcetagem(totalCorrect,totalAnswered )})`;
  showLabel.style.display = "block";
  nButton();
  explanation();
}

const showRightAnswer = (correctAnwser) => {
  for (let i = 1; i < 5; i++) {
    const valueButton = document.getElementById(`alternative${i}`);
    if (correctAnwser === valueButton.value) {
      valueButton.setAttribute("class", "correctButton");
    }
  }
};

getAnswers();
