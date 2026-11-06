
import View from "./View.js";

class ModeView extends View {
    _parentElement = document.querySelector("#app");

    render(categories) {
        this._data = categories;
        this._parentElement.innerHTML = this._generateMarkup();
    }

    addHandlerFile(handler) {
        this._parentElement.addEventListener("change", event => {
            const fileInput = event.target.closest("#study-file");

            if (fileInput && fileInput.files.length > 0) {
                handler(fileInput.files[0]);
            }
        });
    }

    addHandlerRemoveFile(handler) {
        this._parentElement.addEventListener("click", event => {
            if (event.target.closest("#remove-file")) {
                handler();
            }
        });
    }

    _generateMarkup() {
        const categoryDetails = {
            Science: {
                icon: "🔬",
                description: "Discover science, nature, and the universe."
            },
            Technology: {
                icon: "💻",
                description: "Explore computers and modern innovations."
            },
            History: {
                icon: "📜",
                description: "Learn about important events and people."
            },
            Mathematics: {
                icon: "➗",
                description: "Practice numbers and problem-solving."
            },
            "General Knowledge": {
                icon: "🧠",
                description: "Challenge what you already know."
            },
            Geography: {
                icon: "🌍",
                description: "Explore countries and places around the world."
            },
            Sports: {
                icon: "⚽",
                description: "Test your knowledge of different sports."
            }
        };

        return `
            <section class="modern-mode-screen">

                <header class="mode-nav">
                    <div class="brand">
                        <span class="brand-icon">Q</span>
                        <span>GENUSE<span class="brand-blue">APP</span></span>
                    </div>

                    <button class="mode-home-button" data-action="home">
                        ← Home
                    </button>
                </header>

                <main class="modern-mode-container">

                    <div class="mode-welcome">
                        <span class="mode-badge">
                            ✨ LET'S GET STARTED
                        </span>

                        <h1>Choose your <span>quiz.</span></h1>

                        <p>
                            Pick a subject, try a random challenge,
                            or use your own study material.
                        </p>
                    </div>

                    <section class="random-quiz-section">

                        <div class="random-quiz-icon">🎲</div>

                        <div class="random-quiz-info">
                            <span class="recommended-label">
                                RECOMMENDED
                            </span>

                            <h2>Random Quiz</h2>

                            <p>
                                Mix things up! Answer questions
                                from different subjects.
                            </p>
                        </div>

                        <button class="random-quiz-button"
                            data-mode="Random">
                            Play Random Quiz
                            <span>→</span>
                        </button>

                    </section>

                    <section class="category-section">

                        <div class="mode-section-heading">
                            <div>
                                <span class="mode-section-label">
                                    EXPLORE AND LEARN
                                </span>

                                <h2>Choose a Category</h2>

                                <p>
                                    Select the subject you want to practice.
                                </p>
                            </div>

                            <span class="subject-count">
                                ${this._data.length} SUBJECTS
                            </span>
                        </div>

                        <div class="modern-category-grid">

                            ${this._data.map(category => {
                                const details = categoryDetails[category] || {
                                    icon: "📚",
                                    description: "Explore and learn something new."
                                };

                                return `
                                    <button
                                        class="modern-category-card"
                                        data-category="${category}">

                                        <span class="modern-category-icon">
                                            ${details.icon}
                                        </span>

                                        <h3>${category}</h3>

                                        <p>${details.description}</p>

                                        <span class="category-arrow">
                                            Start practicing →
                                        </span>

                                    </button>
                                `;
                            }).join("")}

                        </div>

                    </section>

                    <section class="modern-study-section">

                        <div class="study-section-icon">📄</div>

                        <div class="study-section-info">
                            <span class="mode-section-label">
                                YOUR OWN MATERIAL
                            </span>

                            <h2>Study Guide Quiz</h2>

                            <p>
                                Upload your notes or study materials
                                to practice using their extracted text.
                            </p>

                            <div class="study-supported">
                                PDF <span>•</span> DOCX <span>•</span>
                                TXT <span>•</span> PPTX
                            </div>

                        </div>

                        <div class="study-upload-area">

                            <label for="study-file"
                                class="study-upload-button">
                                <span>＋</span> Choose File
                            </label>

                            <input
                                type="file"
                                id="study-file"
                                accept=".pdf,.docx,.txt,.pptx">

                            <div id="file-preview">
                                <p>No file selected yet.</p>
                            </div>

                        </div>

                    </section>

                    <footer class="modern-mode-footer">
                        <span>GENUSE © 2026</span>
                        <span>Learn. Practice. Improve. 💙</span>
                    </footer>

                </main>
            </section>
        `;
    }
}

export default new ModeView();
