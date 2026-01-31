const product = JSON.parse(localStorage.getItem("selectedProduct"));

if (!product) {
    alert("No product selected");
    window.location.href = "index.html";
}

document.getElementById("productImage").src = product.image;
document.getElementById("productName").textContent = product.name;
document.getElementById("productPrice").textContent = product.price;
document.getElementById("productDesc").textContent = product.description;

// Add dynamic specifications based on product
const brandElement = document.getElementById("productBrand");
const categoryElement = document.getElementById("productCategory");

if (product.name.includes("Cricket")) {
    categoryElement.textContent = "Cricket Equipment";
    brandElement.textContent = "SG / SS";
} else if (product.name.includes("Football")) {
    categoryElement.textContent = "Football Equipment";
    brandElement.textContent = "Nike / Adidas";
} else if (product.name.includes("Badminton") || product.name.includes("Racket")) {
    categoryElement.textContent = "Racquet Sports";
    brandElement.textContent = "Yonex / Li-Ning";
} else {
    categoryElement.textContent = "Sports Equipment";
    brandElement.textContent = "Sports Gear Pro";
}