
// GET SAVED QUIZ HISTORY

export function getHistory() {
    return JSON.parse(
        localStorage.getItem("quizHistory") || "[]"
    );
}

// SAVE A QUIZ RESULT

export function saveHistory(result) {
    const history = getHistory();

    history.push({
        score: result.score,
        total: result.total,
        percentage: result.percentage,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "quizHistory",
        JSON.stringify(history)
    );
}

// CLEAR QUIZ HISTORY

export function clearHistory() {
    localStorage.removeItem("quizHistory");
}
