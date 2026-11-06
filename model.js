
import { questions } from "./data.js";

// LOAD SAVED QUESTION COUNT
function getSavedQuestionCount() {
    const savedCount = Number(localStorage.getItem("questionCount"));

    return [5, 10, 15, 20].includes(savedCount)
        ? savedCount
        : 10;
}

export const state = {
    mode: "Random",
    category: "",
    difficulty: "",
    currentQuestion: 0,
    score: 0,
    quizQuestions: [],
    uploadedFile: null,
    studyGuideSentences: [],
    questionCount: getSavedQuestionCount(),
    results: null
};

// SHUFFLE ARRAY
function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

export function setMode(mode) {
    state.mode = mode;
}

export function setCategory(category) {
    state.category = category;
}

export function setDifficulty(difficulty) {
    state.difficulty = difficulty;
}

// SAVE QUESTION COUNT
export function setQuestionCount(count) {
    if (![5, 10, 15, 20].includes(count)) return;

    state.questionCount = count;

    localStorage.setItem("questionCount", count);
}

export function setUploadedFile(file, content = "") {
    const allowedExtensions = ["pdf", "docx", "txt", "pptx"];
    const extension = file.name.toLowerCase().split(".").pop();

    if (!allowedExtensions.includes(extension)) {
        return "Unsupported file format.";
    }

    state.uploadedFile = {
        name: file.name,
        size: file.size,
        type: extension
    };

    state.studyGuideSentences = content
        .split(/[.!?]+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 15);

    return "success";
}

export function removeUploadedFile() {
    state.uploadedFile = null;
    state.studyGuideSentences = [];
}

export function prepareStudyGuide() {
    const sentences = [...new Set(state.studyGuideSentences)];

    if (sentences.length < 4) {
        return "Your study guide needs at least 4 readable sentences.";
    }

    state.studyGuideSentences = sentences;
    return "success";
}

function createStudyGuideQuestions() {
    const sentences = shuffleArray(state.studyGuideSentences);

    return sentences.map(sentence => {
        const wrongAnswers = shuffleArray(
            sentences.filter(item => item !== sentence)
        ).slice(0, 3);

        return {
            question: "Which statement is included in your study guide?",
            answers: shuffleArray([sentence, ...wrongAnswers]),
            correctAnswer: sentence
        };
    });
}

export function startQuiz() {
    let availableQuestions = [];

    if (state.mode === "Study Guide") {
        availableQuestions = createStudyGuideQuestions();
    } else {
        availableQuestions = questions.filter(question => {
            const matchesDifficulty =
                question.difficulty === state.difficulty;

            const matchesMode =
                state.mode === "Random" ||
                (
                    state.mode === "Category" &&
                    question.category === state.category
                );

            return matchesDifficulty && matchesMode;
        });
    }

    state.quizQuestions = shuffleArray(availableQuestions)
        .slice(0, state.questionCount)
        .map(question => ({
            ...question,
            answers: shuffleArray(question.answers)
        }));

    state.currentQuestion = 0;
    state.score = 0;
    state.results = null;
}

export function checkAnswer(answer) {
    const currentQuestion =
        state.quizQuestions[state.currentQuestion];

    if (answer === currentQuestion.correctAnswer) {
        state.score++;
        return true;
    }

    return false;
}

export function nextQuestion() {
    if (state.currentQuestion < state.quizQuestions.length - 1) {
        state.currentQuestion++;
    }
}

export function saveResults() {
    const total = state.quizQuestions.length;

    const percentage = total > 0
        ? Math.round((state.score / total) * 100)
        : 0;

    state.results = {
        score: state.score,
        total,
        percentage
    };
}

export function resetQuiz() {
    state.currentQuestion = 0;
    state.score = 0;
    state.quizQuestions = [];
    state.results = null;
}
