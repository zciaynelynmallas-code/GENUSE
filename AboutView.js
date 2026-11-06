import View from "./View.js";

class AboutView extends View {
    _parentElement = document.querySelector("#app");

    _generateMarkup() {
        const features = [
            {
                icon: "📚",
                title: "Multiple Categories",
                description: "Explore different subjects and topics."
            },
            {
                icon: "🎯",
                title: "Different Difficulties",
                description: "Choose a difficulty that suits your level."
            },
            {
                icon: "📄",
                title: "Study Guide Quiz",
                description: "Upload learning materials to create practice questions."
            },
            {
                icon: "🏆",
                title: "Quiz History",
                description: "Review your previous scores and performance."
            }
        ];

        return `
            <section class="modern-about-screen">

                <header class="about-nav">
                    <div class="brand">
                        <span class="brand-icon">Q</span>
                        <span>GENUSE<span class="brand-blue">APP</span></span>
                    </div>

                    <span class="about-badge">ABOUT US</span>
                </header>

                <main class="about-container">

                    <div class="about-hero">
                        <div class="about-main-icon">📘</div>

                        <span class="about-label">GET TO KNOW US</span>

                        <h1>Learning made <span>fun.</span></h1>

                        <p>
                            GENUSE is an interactive quiz application
                            designed to help students test their knowledge,
                            practice lessons, and improve their learning.
                        </p>
                    </div>

                    <div class="about-features-heading">
                        <h2>What GENUSE offers</h2>
                        <p>Explore the features designed for your learning.</p>
                    </div>

                    <div class="modern-about-features">
                        ${features.map(feature => `
                            <div class="modern-about-feature">
                                <div class="about-feature-icon">
                                    ${feature.icon}
                                </div>

                                <div>
                                    <h3>${feature.title}</h3>
                                    <p>${feature.description}</p>
                                </div>
                            </div>
                        `).join("")}
                    </div>

                    <div class="about-bottom">
                        <div>
                            <strong>GENUSE</strong>
                            <span>Version 1.0 · Learn. Practice. Improve.</span>
                        </div>

                        <button class="about-back-button" data-action="home">
                            ← Back to Home
                        </button>
                    </div>

                </main>
            </section>
        `;
    }
}

export default new AboutView();