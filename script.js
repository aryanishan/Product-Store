const products = [
    {
        name: "Cricket Stumps",
        price: "799",
        image: "stump.jpg",
        description: "Professional cricket stumps"
    },
    {
        name: "Wicket Keeping Gloves",
        price: "1,299",
        image: "sports-wicket-keeping-gloves-073.jpg",
        description: "Premium wicket keeping gloves"
    },
    {
        name: "Badminton Racket",
        price: "2,499",
        image: "yonex-badminton-racket.jpg",
        description: "Yonex professional badminton racket"
    },
    {
        name: "Football",
        price: "999",
        image: "fifa-mini-size-2-ball.jpg",
        description: "FIFA approved football"
    },
    {
        name: "Cricket Ball",
        price: "199",
        image: "360_F_1610220961_P7Ul9J4h8ltJpkA242NOHuoabe270G5I.jpg",
        description: "Professional cricket ball"
    },
    {
        name: "Cricket Bat",
        price: "1,899",
        image: "317VTY6RngL.jpg",
        description: "Premium English willow cricket bat"
    },
    {
        name: "Hockey Stick",
        price: "699",
        image: "hockey-stick-1543322442-4422079.jpeg",
        description: "Professional hockey stick"
    },
    {
        name: "Cricket Helmet",
        price: "699",
        image: "DSC_1350-copy-1-scaled.webp",
        description: "Safety certified cricket helmet"
    },
    {
        name: "Tennis Racket",
        price: "3,299",
        image: "stump.jpg",
        description: "Professional tennis racket"
    },
    {
        name: "Basketball",
        price: "899",
        image: "sports-wicket-keeping-gloves-073.jpg",
        description: "Professional basketball"
    },
    {
        name: "Volleyball",
        price: "799",
        image: "yonex-badminton-racket.jpg",
        description: "Competition volleyball"
    },
    {
        name: "Table Tennis Set",
        price: "1,499",
        image: "fifa-mini-size-2-ball.jpg",
        description: "Complete table tennis set"
    }
];

// DOM Elements
const productsContainer = document.getElementById("productsContainer");
const paginationContainer = document.getElementById("pagination");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const historyBox = document.getElementById("searchHistory");
const viewHistoryBtn = document.getElementById("viewHistoryBtn");

// Configuration
const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let currentProducts = [...products];
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupPagination();
    setupEventListeners();
});

function renderProducts() {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageProducts = currentProducts.slice(start, end);

    productsContainer.innerHTML = '';

    if (pageProducts.length === 0) {
        productsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <h3>No products found</h3>
                <p>Try a different search term</p>
            </div>
        `;
        return;
    }

    pageProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-name', product.name.toLowerCase());

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button type="button" class="add-to-cart" 
                data-name="${product.name}"
                data-price="${product.price}"
                data-image="${product.image}"
                data-description="${product.description}">
                View Details
            </button>
        `;

        productsContainer.appendChild(productCard);
    });

    // Add event listeners to new buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = {
                name: e.target.dataset.name,
                price: e.target.dataset.price,
                image: e.target.dataset.image,
                description: e.target.dataset.description
            };
            localStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "product.html";
        });
    });
}

function setupPagination() {
    const totalPages = Math.ceil(currentProducts.length / ITEMS_PER_PAGE);
    
    // Update page info
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Clear existing page buttons (except prev/next)
    const pageButtons = paginationContainer.querySelectorAll('button:not(#prevBtn):not(#nextBtn)');
    pageButtons.forEach(btn => btn.remove());
    
    // Add page number buttons
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Add page number buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderProducts();
            setupPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Insert before next button
        nextBtn.parentNode.insertBefore(pageBtn, nextBtn);
    }
}

function setupEventListeners() {
    // Search button
    searchBtn.addEventListener('click', performSearch);
    
    // Search on Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // View History button
    if (viewHistoryBtn) {
        viewHistoryBtn.addEventListener('click', () => {
            window.location.href = "history.html";
        });
    }
    
    // Pagination buttons
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
            setupPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(currentProducts.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
            setupPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // Search history dropdown
    searchInput.addEventListener('focus', () => {
        renderHistoryDropdown();
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            historyBox.style.display = 'none';
        }
    });
}

function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm) {
        // Save to history
        saveSearch(searchTerm);
        
        // Filter products
        currentProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        
        // Reset to first page
        currentPage = 1;
        
        // Render filtered results
        renderProducts();
        setupPagination();
    } else {
        // Show all products if search is empty
        currentProducts = [...products];
        currentPage = 1;
        renderProducts();
        setupPagination();
    }
}

function saveSearch(term) {
    const searchItem = {
        text: term,
        time: new Date().toLocaleString()
    };

    // Remove duplicates
    searchHistory = searchHistory.filter(item => item.text !== term);
    searchHistory.unshift(searchItem);

    // Keep only last 10 searches
    if (searchHistory.length > 10) {
        searchHistory.pop();
    }

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

function renderHistoryDropdown() {
    historyBox.innerHTML = '';
    
    if (searchHistory.length === 0) {
        historyBox.style.display = 'none';
        return;
    }
    
    searchHistory.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item.text;
        div.addEventListener('click', () => {
            searchInput.value = item.text;
            performSearch();
            historyBox.style.display = 'none';
        });
        historyBox.appendChild(div);
    });
    
    historyBox.style.display = 'block';
}