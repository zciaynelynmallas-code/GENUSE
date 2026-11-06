
import View from "./View.js";

class FrontView extends View {
    _parentElement = document.querySelector("#app");

    _generateMarkup() {
        return `
            <section class="home-page">

                <nav class="home-navbar">
                    <a href="#" class="home-brand">
                        <span class="brand-icon">Q</span>
                        <span>GENUSE</span>
                    </a>

                    <div class="home-nav-links">
                        <button data-action="history">History</button>
                        <button data-action="settings">Settings</button>
                        <button data-action="about">About</button>
                    </div>
                </nav>

                <main class="home-main">

                    <section class="home-hero">
                        <div class="hero-content">
                            <span class="hero-tag">✨ YOUR LEARNING JOURNEY STARTS HERE</span>

                            <h1>
                                Make learning
                                <span>fun and exciting.</span>
                            </h1>

                            <p>
                                Challenge yourself, discover what you know,
                                and learn something new with every quiz.
                            </p>

                            <div class="hero-buttons">
                                <button class="hero-start-btn" data-action="start">
                                    Start a Quiz <span>→</span>
                                </button>

                                <button class="hero-history-btn" data-action="history">
                                    View Quiz History
                                </button>
                            </div>

                            <div class="hero-note">
                                <span>✓</span> Learn at your own pace
                                <span>✓</span> Improve every day
                            </div>
                        </div>

                        <div class="hero-visual">
                            <div class="visual-circle"></div>

                            <div class="visual-card">
                                <div class="visual-card-top">
                                    <span>🧠</span>
                                    <span class="visual-live">READY TO PLAY</span>
                                </div>

                                <h2>Quiz Time!</h2>
                                <p>Are you ready to test your knowledge?</p>

                                <div class="visual-answer correct-answer">
                                    <span>A</span> Absolutely!
                                    <strong>✓</strong>
                                </div>

                                <div class="visual-answer">
                                    <span>B</span> Let's find out!
                                </div>

                                <div class="visual-answer">
                                    <span>C</span> I'm ready to learn!
                                </div>

                                <div class="visual-card-footer">
                                    <span>⭐</span> Every answer counts!
                                </div>
                            </div>

                            <div class="floating-icon floating-book">📚</div>
                            <div class="floating-icon floating-star">⭐</div>
                            <div class="floating-icon floating-bulb">💡</div>
                        </div>
                    </section>

                    <section class="home-features">
                        <div class="section-heading">
                            <span>WHY GENUSE?</span>
                            <h2>Learning made enjoyable.</h2>
                            <p>Everything you need to practice and improve.</p>
                        </div>

                        <div class="feature-grid">
                            <article class="feature-card">
                                <div class="feature-icon blue-icon">📚</div>
                                <h3>Different Subjects</h3>
                                <p>Explore different topics and test your knowledge.</p>
                            </article>

                            <article class="feature-card">
                                <div class="feature-icon purple-icon">⏱️</div>
                                <h3>Timed Challenges</h3>
                                <p>Challenge yourself with exciting timed questions.</p>
                            </article>

                            <article class="feature-card">
                                <div class="feature-icon yellow-icon">🏆</div>
                                <h3>Track Your Progress</h3>
                                <p>Review your scores and see how much you improve.</p>
                            </article>
                        </div>
                    </section>

                </main>

                <footer class="home-footer" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 8px;">
                    <p>Learn. Play. Improve.</p>
                    <small>© 2026 GENUSE. Learn something new every day.</small>
                </footer>

            </section>
        `;
    }
}

export default new FrontView();
