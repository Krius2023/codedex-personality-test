const questions = [
    {
        "question": "FrontEnd or BackEnd?",
        "answersSet": ["🎴 FrontEnd", "🌐 BackEnd"],
        "selected": null
    },
    {
        "question": "Sunrise or Sunset?",
        "answersSet": ["🌞 Sunrise", "🌄 Sunset"],
        "selected": null
    },
    {
        "question": "Beach or Mountains?",
        "answersSet": ["🏖️ Beach", "🏞️ Mountains"],
        "selected": null
    },
    {
        "question": "Tea or Coffee?",
        "answersSet": ["🍵 Tea", "☕ Coffee"],
        "selected": null
    },
    {
        "question": "Salad or Juice?",
        "answersSet": ["🥗 Salad", "🥤 Juice"],
        "selected": null
    }
]

let questionNumber = 0;

function handleOption(q, a) {
    questions[q].selected = a;
    showQuestion();
}

function showResults() {
    let prevBtn = document.querySelector(".pre_button");
    prevBtn.remove();
    let nextBtn = document.querySelector(".next_button");
    nextBtn.remove();

    const resultContainer = document.querySelector(".show-content");
    resultContainer.innerHTML = "";

    const shareContainer = document.querySelector(".share-links");
    shareContainer.style.display = "flex"

    const resultHeading = document.createElement("h3");
    resultHeading.textContent = "Here is the result!"

    const result = document.createElement("h4");
    let totalScore = questions.reduce((a, c) => {
        return a + c.selected
    }, 0)
    result.textContent = totalScore <= 2 ? "You are super relaxed!"
        : totalScore < 4 ? "You are very composed!" : "You are so cool!"
    totalScore = 0;
    result.style.textDecoration = "underline";
    resultContainer.appendChild(resultHeading);
    resultContainer.appendChild(result);
}

function showQuestion() {
    const arrowSection = document.querySelector(".show-arrows");
    arrowSection.style.display = "flex"

    const questionContainer = document.querySelector(".show-content");
    questionContainer.innerHTML = "";

    let prevBtn = document.querySelector(".pre_button");
    if (questionNumber == 0) {
        prevBtn.disabled = true
    } else {
        prevBtn.disabled = false
    }

    let selectedIndex = questions[`${questionNumber}`].selected

    let nextBtn = document.querySelector(".next_button");
    if (selectedIndex === null) {
        nextBtn.disabled = true
    } else {
        nextBtn.disabled = false
    }

    const questionHeading = document.createElement("h4");
    questionHeading.textContent = questions[`${questionNumber}`].question;


    const buttonContainer = document.createElement("div");

    const button1 = document.createElement("button");
    button1.textContent = questions[`${questionNumber}`].answersSet[0];
    button1.addEventListener("click", () => handleOption(questionNumber, 0));

    const button2 = document.createElement("button");
    button2.textContent = questions[`${questionNumber}`].answersSet[1];
    button2.addEventListener("click", () => handleOption(questionNumber, 1));

    if (selectedIndex === 0) {
        button1.classList.add("selected")
    } else if (selectedIndex === 1) {
        button2.classList.add("selected")
    }

    buttonContainer.appendChild(button1);
    buttonContainer.appendChild(button2);

    questionContainer.appendChild(questionHeading);
    questionContainer.appendChild(buttonContainer);
}

function showPre() {
    questionNumber--;
    showQuestion();
}

function showNext() {
    questionNumber++;
    if (questionNumber === 5) {
        showResults();
    } else {
        showQuestion();
    }
}

const shareAlert = () => {
    const copyContent = `Content Copied:: A fun personality test developed for Codedex"s April Month Challenge! Check it out here: https://krius2023.github.io/codedex-personality-test`;
    navigator.clipboard.writeText(`${copyContent}`);
    alert(copyContent);
}
