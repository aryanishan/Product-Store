const searchInput = document.querySelector(".search-box input");
const productCards = document.querySelectorAll(".product-card");
const historyBox = document.getElementById("searchHistory");

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

/* SEARCH FUNCTION */
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();
    filterProducts(value);
});

/* SAVE SEARCH ON ENTER */
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && searchInput.value.trim() !== "") {
        saveSearch(searchInput.value.trim().toLowerCase());
    }
});

/* FILTER + RECOMMEND */
function filterProducts(value) {
    let matched = [];
    productCards.forEach(card => {
        const name = card.dataset.name;
        if (name.includes(value)) {
            card.style.display = "block";
            matched.push(card);
        } else {
            card.style.display = "none";
        }
    });

    const container = document.querySelector(".products");
    matched.forEach(card => container.prepend(card));
}

/* SAVE SEARCH */
function saveSearch(term) {
    const searchItem = {
        text: term,
        time: new Date().toLocaleString()
    };

    // Remove duplicates
    searchHistory = searchHistory.filter(item => item.text !== term);

    searchHistory.unshift(searchItem);

    if (searchHistory.length > 10) searchHistory.pop();

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    renderHistory();
}


/* SHOW HISTORY */
function renderHistory() {
    historyBox.innerHTML = "";
    if (searchHistory.length === 0) return;

    searchHistory.forEach(item => {
        const div = document.createElement("div");
        div.textContent = item;
        div.onclick = () => {
            searchInput.value = item;
            filterProducts(item);
            historyBox.style.display = "none";
        };
        historyBox.appendChild(div);
    });
}

/* SHOW ON FOCUS */
searchInput.addEventListener("focus", () => {
    renderHistory();
    if (searchHistory.length > 0) {
        historyBox.style.display = "block";
    }
});

/* HIDE ON CLICK OUTSIDE */
document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) {
        historyBox.style.display = "none";
    }
});

const viewHistoryBtn = document.getElementById("viewHistoryBtn");

if (viewHistoryBtn) {
    viewHistoryBtn.addEventListener("click", () => {
        window.location.href = "history.html";
    });
}

const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const product = {
            name: btn.dataset.name,
            price: btn.dataset.price,
            image: btn.dataset.image,
            description: "High quality sports product. Best for professionals."
        };

        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product.html";
    });
});