
import View from "./View.js";

class DifficultyView extends View {
    _parentElement = document.querySelector("#app");

    render(category) {
        this._data = category;
        this._parentElement.innerHTML = this._generateMarkup();
    }

    _generateMarkup() {
        const difficulties = [
            {
                name: "Easy",
                icon: "🌱",
                description: "A relaxed start. Perfect for beginners.",
                level: "BEGINNER",
                color: "easy-level"
            },
            {
                name: "Medium",
                icon: "⚡",
                description: "A little challenge to test your knowledge.",
                level: "INTERMEDIATE",
                color: "medium-level"
            },
            {
                name: "Hard",
                icon: "🔥",
                description: "Ready for a real brain workout?",
                level: "ADVANCED",
                color: "hard-level"
            }
        ];

        return `
            <section class="difficulty-screen">

                <header class="difficulty-nav">
                    <div class="brand">
                        <span class="brand-icon">Q</span>
                        <span>GENUSE<span class="brand-blue">APP</span></span>
                    </div>

                    <button class="selection-home"
                        data-action="start">
                        ← Back to Selection
                    </button>
                </header>

                <main class="difficulty-container">

                    <div class="difficulty-heading">
                        <span class="selection-badge">
                            ONE STEP CLOSER
                        </span>

                        <h1>Choose your <span>challenge.</span></h1>

                        <p>
                            Select the difficulty that matches
                            your confidence and knowledge.
                        </p>

                        <div class="selected-category">
                            <span>📚</span>
                            <span>Selected Quiz:</span>
                            <strong>${this._data}</strong>
                        </div>
                    </div>

                    <div class="difficulty-grid">
                        ${difficulties.map(item => `
                            <button
                                class="difficulty-card ${item.color}"
                                data-difficulty="${item.name}">

                                <span class="difficulty-icon">
                                    ${item.icon}
                                </span>

                                <span class="difficulty-level">
                                    ${item.level}
                                </span>

                                <h2>${item.name}</h2>

                                <p>${item.description}</p>

                                <span class="difficulty-select">
                                    Choose ${item.name} →
                                </span>
                            </button>
                        `).join("")}
                    </div>

                    <div class="difficulty-tip">
                        <span>💡</span>
                        <p>
                            Tip: Start with Easy if this is your first quiz.
                            You can always challenge yourself with a harder level!
                        </p>
                    </div>

                    <footer class="selection-footer">
                        <span>GENUSE © 2026</span>
                        <span>Learn. Practice. Improve.</span>
                    </footer>

                </main>
            </section>
        `;
    }
}

export default new DifficultyView();