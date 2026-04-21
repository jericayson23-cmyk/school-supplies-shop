let cart = 0;

function addToCart() {
    cart++;
    document.getElementById("cart-count").innerText = cart;
    alert("Item added to cart!");
}