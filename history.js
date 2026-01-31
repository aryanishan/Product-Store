const historyList = document.getElementById("historyList");
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
let currentFilter = 'all';

function renderHistory() {
    historyList.innerHTML = "";

    // Add header with stats
    const headerHTML = `
        <div class="history-header">
            <h1>Search History</h1>
            <div class="history-stats">
                <span>📊 Total Searches: ${searchHistory.length}</span>
                <span>🔍 Today: ${getTodaySearchCount()}</span>
                <span>⏱️ Last 7 days: ${getLastWeekSearchCount()}</span>
            </div>
        </div>
        
        <div class="history-filter">
            <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" onclick="setFilter('all')">All Searches</button>
            <button class="filter-btn ${currentFilter === 'today' ? 'active' : ''}" onclick="setFilter('today')">Today</button>
            <button class="filter-btn ${currentFilter === 'week' ? 'active' : ''}" onclick="setFilter('week')">Last 7 Days</button>
            <button class="filter-btn ${currentFilter === 'month' ? 'active' : ''}" onclick="setFilter('month')">This Month</button>
        </div>
    `;
    
    historyList.innerHTML = headerHTML;

    // Filter history based on current filter
    let filteredHistory = filterHistory(searchHistory);

    if (filteredHistory.length === 0) {
        const emptyHTML = `
            <div class="empty-history">
                <div class="empty-history-icon">🔍</div>
                <h3>No search history found</h3>
                <p>Your search history will appear here after you search for products.</p>
                <p style="color: #888; font-size: 14px;">Try searching for sports equipment like "cricket", "football", or "badminton".</p>
            </div>
        `;
        historyList.innerHTML += emptyHTML;
        return;
    }

    filteredHistory.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.setAttribute("data-index", index + 1);

        const searchDate = new Date(item.time);
        const formattedDate = searchDate.toLocaleDateString('en-GB');
        const formattedTime = searchDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });

        div.innerHTML = `
            <div class="history-content">
                <div class="history-text">
                    Searched for: <span class="search-query">${item.text}</span>
                </div>
                <div class="history-meta">
                    <div class="history-date">${formattedDate}</div>
                    <div class="history-time">${formattedTime}</div>
                </div>
            </div>
            <div class="history-actions">
                <button class="btn-search-again" onclick="searchAgain('${item.text}')">
                    🔍 Search Again
                </button>
                <button class="btn-remove" onclick="removeItem('${item.text}')">
                    ✕ Remove
                </button>
            </div>
        `;

        historyList.appendChild(div);
    });

    // Add export button
    const exportHTML = `
        <div class="view">
            <button class="btn-export" onclick="exportHistory()">
                📥 Export History
            </button>
            <button class="btn1" onclick="clearHistory()">
                🗑️ Clear All History
            </button>
        </div>
    `;
    historyList.innerHTML += exportHTML;
}

function filterHistory(history) {
    const now = new Date();
    switch(currentFilter) {
        case 'today':
            return history.filter(item => {
                const itemDate = new Date(item.time);
                return itemDate.toDateString() === now.toDateString();
            });
        case 'week':
            const weekAgo = new Date(now);
            weekAgo.setDate(now.getDate() - 7);
            return history.filter(item => new Date(item.time) > weekAgo);
        case 'month':
            const monthAgo = new Date(now);
            monthAgo.setMonth(now.getMonth() - 1);
            return history.filter(item => new Date(item.time) > monthAgo);
        default:
            return history;
    }
}

function setFilter(filter) {
    currentFilter = filter;
    renderHistory();
}

function getTodaySearchCount() {
    const today = new Date().toDateString();
    return searchHistory.filter(item => {
        const itemDate = new Date(item.time);
        return itemDate.toDateString() === today;
    }).length;
}

function getLastWeekSearchCount() {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return searchHistory.filter(item => new Date(item.time) > weekAgo).length;
}

function searchAgain(term) {
    // Save the search
    const searchItem = {
        text: term,
        time: new Date().toISOString()
    };
    
    // Remove duplicate if exists
    searchHistory = searchHistory.filter(item => item.text !== term);
    searchHistory.unshift(searchItem);
    
    if (searchHistory.length > 50) searchHistory.pop();
    
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    
    // Redirect to home page with search term
    sessionStorage.setItem('autoSearch', term);
    window.location.href = 'index.html';
}

function removeItem(term) {
    searchHistory = searchHistory.filter(item => item.text !== term);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    renderHistory();
    
    // Show notification
    showNotification(`Removed "${term}" from history`);
}

function clearHistory() {
    if (searchHistory.length === 0) {
        showNotification("History is already empty");
        return;
    }
    
    if (confirm("Are you sure you want to clear all search history? This action cannot be undone.")) {
        localStorage.removeItem("searchHistory");
        searchHistory = [];
        showNotification("All search history cleared");
        renderHistory();
    }
}

function exportHistory() {
    if (searchHistory.length === 0) {
        showNotification("No history to export");
        return;
    }
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Search Term,Date,Time\n"
        + searchHistory.map(item => {
            const date = new Date(item.time);
            return `"${item.text}",${date.toLocaleDateString()},${date.toLocaleTimeString()}`;
        }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "search_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification("History exported successfully");
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize page
renderHistory();

// Check for back navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        renderHistory();
    }
});