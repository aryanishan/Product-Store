const historyList = document.getElementById("historyList");

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function renderHistory() {
    historyList.innerHTML = "";

    if (searchHistory.length === 0) {
        historyList.innerHTML = `
            <p class="empty-history">No search history found.</p>
        `;
        return;
    }

    searchHistory.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "history-item";

        div.innerHTML = `
            <div class="history-text">${index + 1}. ${item.text}</div>
            <div class="history-time">${item.time || ""}</div>
        `;

        historyList.appendChild(div);
    });
}

function clearHistory() {
    localStorage.removeItem("searchHistory");
    searchHistory = [];
    renderHistory();
}

renderHistory();
