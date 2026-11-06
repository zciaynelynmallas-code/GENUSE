
import FrontView from "./views/FrontView.js";
import ModeView from "./views/ModeView.js";
import DifficultyView from "./views/DifficultyView.js";
import GameView from "./views/GameView.js";
import SettingsView from "./views/SettingsView.js";
import AboutView from "./views/AboutView.js";
import ResultsView from "./views/ResultsView.js";
import HistoryView from "./views/HistoryView.js";

import * as model from "./model.js";
import { categories } from "./data.js";
import { readFileContent } from "./fileReader.js";
import {
    saveHistory,
    getHistory,
    clearHistory
} from "./history.js";

let answered = false;
let timerInterval = null;

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function startTimer() {
    stopTimer();

    let timeLeft = 30;

    const timerDisplay = document.querySelector("#timer");

    if (!timerDisplay) return;

    timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;

        const currentTimer = document.querySelector("#timer");

        if (currentTimer) {
            currentTimer.textContent = timeLeft;
        }

        if (timeLeft <= 0) {
            stopTimer();

            if (!answered) {
                answered = true;

                document.querySelectorAll(".answer").forEach(button => {
                    button.disabled = true;
                });

                const feedback = document.querySelector("#feedback");

                if (feedback) {
                    feedback.textContent = "Time is up! No answer selected.";
                    feedback.style.color = "#dc2626";
                }
            }
        }
    }, 1000);
}

function showWelcome() {
    stopTimer();
    FrontView.render(true);
}

function showMode() {
    stopTimer();
    ModeView.render(categories);
}

function showDifficulty() {
    stopTimer();
    DifficultyView.render(true);
}

function showSettings() {
    stopTimer();
    SettingsView.render(model.state.questionCount);
}

function showAbout() {
    stopTimer();
    AboutView.render(true);
}

function showGame() {
    const question =
        model.state.quizQuestions[model.state.currentQuestion];

    if (!question) {
        alert("No questions are available.");
        showMode();
        return;
    }

    answered = false;

    GameView.render({
        number: model.state.currentQuestion + 1,
        total: model.state.quizQuestions.length,
        question: question.question,
        answers: question.answers,
        score: model.state.score
    });

    startTimer();
}

async function handleFileUpload(file) {
    if (!file) return;

    const preview = document.querySelector("#file-preview");

    if (preview) {
        preview.textContent = "Reading your study guide...";
    }

    try {
        const content = await readFileContent(file);

        if (!content.trim()) {
            throw new Error("No readable text was found.");
        }

        const result = model.setUploadedFile(file, content);

        if (result !== "success") {
            throw new Error(result);
        }

        if (preview) {
            preview.innerHTML = `
                <div class="selected-file">
                    <strong class="file-name"></strong>
                    <p class="file-details"></p>
                    <span>File content extracted successfully</span>

                    <button class="btn" data-action="study-quiz">
                        Generate Quiz from Study Guide
                    </button>

                    <button class="remove-file" id="remove-file">
                        Remove
                    </button>
                </div>
            `;

            preview.querySelector(".file-name").textContent = file.name;

            preview.querySelector(".file-details").textContent =
                `${(file.size / 1024).toFixed(2)} KB`;
        }

    } catch (error) {
        alert("Unable to read file: " + error.message);

        model.removeUploadedFile();

        const fileInput = document.querySelector("#study-file");

        if (fileInput) fileInput.value = "";

        if (preview) {
            preview.textContent = "No file selected yet.";
        }
    }
}

function handleRemoveFile() {
    model.removeUploadedFile();

    const fileInput = document.querySelector("#study-file");
    const preview = document.querySelector("#file-preview");

    if (fileInput) fileInput.value = "";
    if (preview) preview.textContent = "No file selected yet.";
}

function handleClick(event) {
    const button = event.target.closest("button");

    if (!button) return;

    const action = button.dataset.action;

    if (
        action === "start" ||
        action === "settings" ||
        action === "about" ||
        action === "history" ||
        action === "home" ||
        action === "play-again" ||
        action === "study-quiz" ||
        button.dataset.mode ||
        button.dataset.category ||
        button.dataset.difficulty
    ) {
        stopTimer();
    }

    if (action === "start") showMode();

    if (action === "settings") showSettings();

    if (action === "about") showAbout();

    if (action === "history") {
        HistoryView.render(getHistory());
    }

    if (action === "clear-history") {
        if (confirm("Are you sure you want to clear your quiz history?")) {
            clearHistory();
            HistoryView.render(getHistory());
        }
    }

    if (action === "study-quiz") {
        const result = model.prepareStudyGuide();

        if (result !== "success") {
            alert(result);
            return;
        }

        model.setMode("Study Guide");
        showDifficulty();
    }

    if (action === "play-again") {
        model.resetQuiz();
        showMode();
    }

    if (action === "home") {
        model.resetQuiz();
        showWelcome();
    }

    if (button.dataset.count) {
        model.setQuestionCount(Number(button.dataset.count));
        showSettings();
    }

    if (button.dataset.mode) {
        model.setMode(button.dataset.mode);
        showDifficulty();
    }

    if (button.dataset.category) {
        model.setMode("Category");
        model.setCategory(button.dataset.category);
        showDifficulty();
    }

    if (button.dataset.difficulty) {
        model.setDifficulty(button.dataset.difficulty);
        model.startQuiz();

        if (model.state.quizQuestions.length > 0) {
            showGame();
        } else {
            alert("No questions available for this difficulty.");
        }
    }

    // CHECK ANSWER
    if (button.dataset.answer !== undefined && !answered) {
        stopTimer();

        const selectedAnswer = button.dataset.answer;
        const isCorrect = model.checkAnswer(selectedAnswer);

        answered = true;

        const currentQuestion =
            model.state.quizQuestions[model.state.currentQuestion];

        document.querySelectorAll(".answer").forEach(answerButton => {
            answerButton.disabled = true;

            if (
                answerButton.dataset.answer ===
                currentQuestion.correctAnswer
            ) {
                answerButton.style.backgroundColor = "#bbf7d0";
                answerButton.style.borderColor = "#16a34a";
            }

            if (
                answerButton.dataset.answer === selectedAnswer &&
                !isCorrect
            ) {
                answerButton.style.backgroundColor = "#fecaca";
                answerButton.style.borderColor = "#dc2626";
            }
        });

        const feedback = document.querySelector("#feedback");

        if (feedback) {
            feedback.textContent = isCorrect
                ? "Correct! Well done!"
                : "Wrong answer! The correct answer is " +
                  currentQuestion.correctAnswer;

            feedback.style.color = isCorrect ? "#16a34a" : "#dc2626";
        }

        const score = document.querySelector("#score");

        if (score) {
            score.textContent = "Score: " + model.state.score;
        }
    }

    // NEXT QUESTION
    if (button.dataset.next !== undefined) {
        if (!answered) {
            alert("Please select an answer first.");
            return;
        }

        stopTimer();

        if (
            model.state.currentQuestion + 1 <
            model.state.quizQuestions.length
        ) {
            model.nextQuestion();
            showGame();
        } else {
            model.saveResults();
            saveHistory(model.state.results);
            ResultsView.render(model.state.results);
        }
    }

    if (button.dataset.back !== undefined) {
        showWelcome();
    }
}

function init() {
    document.querySelector("#app").addEventListener("click", handleClick);

    ModeView.addHandlerFile(handleFileUpload);
    ModeView.addHandlerRemoveFile(handleRemoveFile);

    showWelcome();
}

init();
