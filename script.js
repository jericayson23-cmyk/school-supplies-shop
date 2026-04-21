let users = JSON.parse(localStorage.getItem("users")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [
    {name:"Notebook", price:50, img:"notebook.jpg"},
    {name:"Backpack", price:500, img:"backpack.jpg"},
    {name:"Ballpen", price:10, img:"ballpen.webp"}
];

let currentUser = null;

/* ================= REGISTER ================= */
function register() {
    let u = document.getElementById("username").value.trim();
    let p = document.getElementById("password").value.trim();

    if(!u || !p){
        alert("Fill all fields!");
        return;
    }

    let exist = users.find(x => x.u === u);
    if(exist){
        alert("Username already exists!");
        return;
    }

    users.push({u,p});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");
}

/* ================= LOGIN ================= */
function login() {
    let u = document.getElementById("username").value.trim();
    let p = document.getElementById("password").value.trim();

    let found = users.find(x => x.u === u && x.p === p);

    if(found){
        currentUser = u;

        document.getElementById("authBox").style.display = "none";
        document.getElementById("app").style.display = "block";
        document.getElementById("user").innerText = u;

        renderProducts();
        renderCart();
    } else {
        alert("Invalid username or password!");
    }
}

/* ================= LOGOUT ================= */
function logout(){
    currentUser = null;
    location.reload();
}

/* ================= PRODUCTS ================= */
function renderProducts(){
    let box = document.querySelector(".products");
    box.innerHTML = "";

    products.forEach((p,i)=>{
        box.innerHTML += `
        <div class="product">
            <img src="${p.img}" onerror="this.src='https://via.placeholder.com/150'">
            <h3>${p.name}</h3>
            <p>₱${p.price}</p>
            <button onclick="addToCart(${i})">Add to Cart</button>
        </div>`;
    });
}

/* ================= ADD PRODUCT ================= */
function addProduct(){
    let name = document.getElementById("pname").value.trim();
    let price = parseInt(document.getElementById("pprice").value);
    let img = document.getElementById("pimg").value.trim();

    if(!name || !price || !img){
        alert("Fill all product fields!");
        return;
    }

    products.push({name,price,img});
    localStorage.setItem("products", JSON.stringify(products));

    renderProducts();

    // clear input
    document.getElementById("pname").value = "";
    document.getElementById("pprice").value = "";
    document.getElementById("pimg").value = "";
}

/* ================= CART ================= */
function addToCart(i){
    cart.push(products[i]);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function renderCart(){
    let list = document.getElementById("cartList");
    list.innerHTML = "";
    let total = 0;

    cart.forEach((c,index)=>{
        list.innerHTML += `
        <li>
            ${c.name} - ₱${c.price}
            <button onclick="removeFromCart(${index})">❌</button>
        </li>`;
        total += c.price;
    });

    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("total").innerText = total;
}

/* ================= REMOVE ITEM ================= */
function removeFromCart(index){
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

/* ================= CHECKOUT ================= */
function checkout(){
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    alert("Order placed successfully!");

    cart = [];
    localStorage.removeItem("cart");
    renderCart();
}
