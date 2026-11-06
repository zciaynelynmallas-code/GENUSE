
import View from "./View.js";

class ResultsView extends View {
    _parentElement = document.querySelector("#app");

    _generateMarkup() {
        return `
            <section class="results-screen">
                <div class="results-card">

                    <div class="results-icon">🏆</div>

                    <p class="results-label">QUIZ COMPLETED</p>

                    <h1>Great job!</h1>

                    <p class="results-message">
                        You have completed your quiz.
                    </p>

                    <div class="results-score">
                        <h2>${this._data.score} / ${this._data.total}</h2>
                        <p>Your Score</p>
                    </div>

                    <div class="results-percentage">
                        <span>${this._data.percentage}%</span>
                        <p>Overall Performance</p>
                    </div>

                    <div class="results-progress">
                        <div
                            class="results-progress-fill"
                            style="width: ${this._data.percentage}%">
                        </div>
                    </div>

                    <div class="results-actions">
                        <button class="btn" data-action="play-again">
                            Play Again
                        </button>

                        <button class="btn secondary-btn"
                            data-action="home">
                            Back to Home
                        </button>
                    </div>

                </div>
            </section>
        `;
    }
}

export default new ResultsView();
