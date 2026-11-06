
import View from "./View.js";

class HistoryView extends View {
    _parentElement = document.querySelector("#app");

    render(history) {
        this._data = history;
        this._parentElement.innerHTML = this._generateMarkup();
    }

    _generateMarkup() {
        const history = this._data;

        const totalGENUSEes = history.length;

        const averageScore = totalGENUSEes
            ? Math.round(
                history.reduce((sum, item) => sum + item.percentage, 0)
                / totalGENUSEes
            )
            : 0;

        return `
            <section class="modern-history-screen">

                <header class="history-nav">
                    <div class="brand">
                        <span class="brand-icon">Q</span>
                        <span>GENUSE<span class="brand-blue">APP</span></span>
                    </div>

                    <button class="selection-home"
                        data-action="home">
                        ← Back to Home
                    </button>
                </header>

                <main class="modern-history-container">

                    <div class="history-heading">
                        <span class="selection-badge">
                            YOUR LEARNING JOURNEY
                        </span>

                        <h1>Quiz <span>History</span></h1>

                        <p>
                            Keep track of your performance
                            and celebrate your progress.
                        </p>
                    </div>

                    <div class="history-summary">

                        <div class="history-summary-card">
                            <span>📝</span>
                            <div>
                                <small>TOTAL GENUSEES</small>
                                <strong>${totalGENUSEes}</strong>
                            </div>
                        </div>

                        <div class="history-summary-card">
                            <span>📊</span>
                            <div>
                                <small>AVERAGE SCORE</small>
                                <strong>${averageScore}%</strong>
                            </div>
                        </div>

                    </div>

                    <div class="history-content-card">

                        <div class="history-content-heading">
                            <div>
                                <h2>Previous Attempts</h2>
                                <p>Your completed quiz activities.</p>
                            </div>

                            <span>${totalGENUSEes} RECORDS</span>
                        </div>

                        ${
                            history.length === 0
                            ? `
                                <div class="history-empty">
                                    <span>📚</span>
                                    <h3>No quiz history yet</h3>
                                    <p>
                                        Complete your first quiz
                                        to see your results here.
                                    </p>
                                    <button class="history-start-button"
                                        data-action="start">
                                        Take Your First Quiz →
                                    </button>
                                </div>
                            `
                            : `
                                <div class="history-list">
                                    ${history.map((item, index) => `
                                        <div class="modern-history-item">

                                            <div class="history-item-icon">
                                                🏆
                                            </div>

                                            <div class="history-item-info">
                                                <h3>Quiz Attempt ${index + 1}</h3>
                                                <p>${item.date}</p>
                                            </div>

                                            <div class="history-item-score">
                                                <strong>
                                                    ${item.score}/${item.total}
                                                </strong>
                                                <span>${item.percentage}%</span>
                                            </div>

                                        </div>
                                    `).join("")}
                                </div>

                                <button class="history-clear-button"
                                    data-action="clear-history">
                                    🗑 Clear History
                                </button>
                            `
                        }

                    </div>

                    <footer class="history-footer">
                        <span>GENUSE © 2026</span>
                        <span>Every attempt makes you better.</span>
                    </footer>

                </main>
            </section>
        `;
    }
}

export default new HistoryView();
