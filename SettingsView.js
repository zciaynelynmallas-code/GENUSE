import View from "./View.js";

class SettingsView extends View {
    _parentElement = document.querySelector("#app");

    render(questionCount = 10) {
        this._data = questionCount;
        this._parentElement.innerHTML = this._generateMarkup();
    }

    _generateMarkup() {
        return `
            <section class="modern-settings-screen">
                <div class="settings-container">

                    <header class="settings-header">
                        <div class="brand">
                            <span class="brand-icon">Q</span>
                            <span>GENUSE<span class="brand-blue">APP</span></span>
                        </div>
                        <span class="settings-badge">PERSONALIZE</span>
                    </header>

                    <div class="settings-heading">
                        <span class="settings-label">PREFERENCES</span>
                        <h1>Quiz Settings</h1>
                        <p>Customize your quiz experience.</p>
                    </div>

                    <div class="settings-card">
                        <div class="settings-option-icon">📝</div>

                        <h2>Number of Questions</h2>
                        <p>Choose your preferred number of questions per quiz.</p>

                        <div class="question-count-options">
                            ${[5, 10, 15, 20].map(count => `
                                <button
                                    class="count-btn ${this._data === count ? "active" : ""}"
                                    data-count="${count}">
                                    ${count}
                                </button>
                            `).join("")}
                        </div>

                        <div class="selected-setting">
                            Selected: <strong>${this._data} questions</strong>
                        </div>

                        <p class="settings-note">
                            Note: The number of available questions may be lower
                            depending on the selected category and difficulty.
                        </p>
                    </div>

                    <button class="settings-back-button" data-action="home">
                        ← Back to Home
                    </button>

                </div>
            </section>
        `;
    }
}

export default new SettingsView();