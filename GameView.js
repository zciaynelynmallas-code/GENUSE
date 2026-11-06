
import View from "./View.js";

class GameView extends View {
    _parentElement = document.querySelector("#app");

    _generateMarkup() {
        const progress = (this._data.number / this._data.total) * 100;

        return `
            <section class="modern-game-screen">

                <header class="game-nav">
                    <div class="brand">
                        <span class="brand-icon">Q</span>
                        <span>GENUSE<span class="brand-blue">APP</span></span>
                    </div>

                    <span class="game-live-badge">
                        ● QUIZ IN PROGRESS
                    </span>
                </header>

                <main class="modern-game-container">

                    <div class="game-top-info">
                        <div>
                            <span class="game-small-label">YOUR CHALLENGE</span>
                            <h2>Test your knowledge</h2>
                        </div>

                        <div class="game-question-number">
                            <strong>${this._data.number}</strong>
                            <span>/ ${this._data.total}</span>
                        </div>
                    </div>

                    <div class="modern-progress-track">
                        <div class="modern-progress-fill"
                            style="width: ${progress}%"></div>
                    </div>

                    <div class="modern-timer">
                        <span class="timer-icon">⏱️</span>
                        <span>Time remaining</span>
                        <strong id="timer">30</strong>
                        <span>seconds</span>
                    </div>

                    <div class="modern-question-card">

                        <span class="question-label">
                            QUESTION ${this._data.number}
                        </span>

                        <h1>${this._data.question}</h1>

                        <p class="answer-instruction">
                            Select the correct answer below.
                        </p>

                        <div class="modern-answer-list">
                            ${this._data.answers.map((answer, index) => `
                                <button class="modern-answer"
                                    data-answer="${answer.replace(/"/g, "&quot;")}">

                                    <span class="modern-answer-letter">
                                        ${String.fromCharCode(65 + index)}
                                    </span>

                                    <span class="modern-answer-text">
                                        ${answer}
                                    </span>

                                    <span class="answer-check">○</span>
                                </button>
                            `).join("")}
                        </div>

                        <div class="modern-feedback" id="feedback">
                            Choose your answer to continue.
                        </div>

                        <div class="modern-game-bottom">
                            <div class="modern-score">
                                <span>🏆</span>
                                <div>
                                    <small>CURRENT SCORE</small>
                                    <strong id="score">${this._data.score}</strong>
                                </div>
                            </div>

                            <button class="modern-next-button" data-next>
                                Next Question →
                            </button>
                        </div>

                    </div>

                    <p class="game-encouragement">
                        Take your time and do your best. You've got this!
                    </p>

                </main>
            </section>
        `;
    }
}

export default new GameView();
