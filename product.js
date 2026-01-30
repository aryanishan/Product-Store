const product = JSON.parse(localStorage.getItem("selectedProduct"));

if (!product) {
    alert("No product selected");
    window.location.href = "index.html";
}

document.getElementById("productImage").src = product.image;
document.getElementById("productName").textContent = product.name;
document.getElementById("productPrice").textContent = product.price;
document.getElementById("productDesc").textContent = product.description;
