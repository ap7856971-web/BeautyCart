// ===============================
// LOAD CART FROM LOCALSTORAGE
// ===============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// UPDATE CART COUNT (HEADER)
// ===============================
function updateCartCount() {

    let cartCount = document.getElementById("cart-count");
    if (!cartCount) return;

    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    let totalQty = cartData.reduce((sum, item) => {
        return sum + (item.qty || 1);
    }, 0);

    cartCount.innerText = totalQty;
}


// ===============================
// ADD TO CART
// ===============================
function addToCart(name, price, image) {

    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    alert("Product Added to Cart ✅ ");

    price = Number(price);

    let item = cartData.find(p => p.name === name);

    if (item) {
        item.qty += 1;
    } else {
        cartData.push({
            name: name,
            price: price,
            qty: 1,
            image: image
        });
    }

    localStorage.setItem("cart", JSON.stringify(cartData));

    updateCartCount();

    // auto update (if on cart page)
    if (typeof loadCart === "function") loadCart();
    if (typeof checkCartStatus === "function") checkCartStatus();
}


// ===============================
// SAVE CART
// ===============================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}


// ===============================
// LOAD CART PAGE
// ===============================
function loadCart() {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    let container = document.getElementById("cartItems"); // ✅ FIXED ID
    let totalBox = document.getElementById("total");

    if (!container || !totalBox) return;

    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.qty;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ₹${item.price} × ${item.qty}<br>
                    Item Total: ₹${itemTotal}
                </div>

                <div class="qty">
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <button onclick="changeQty(${index}, 1)">+</button>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    totalBox.innerText = total;

    checkCartStatus(); // 🔥 important
}


// ===============================
// CHANGE QUANTITY
// ===============================
function changeQty(index, change) {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    loadCart();
}


// ===============================
// REMOVE ITEM
// ===============================
function removeItem(index) {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    saveCart();
    loadCart();
}


// ===============================
// CHECK CART STATUS (EMPTY / FULL)
// ===============================
function checkCartStatus() {

    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    let emptyMessage = document.getElementById("emptyCartMessage");
    let cartItems = document.getElementById("cartItems"); // ✅ FIXED ID
    let orderSummary = document.getElementById("orderSummary");

    if (!emptyMessage || !cartItems || !orderSummary) return;

    if (cartData.length === 0) {
        emptyMessage.style.display = "block";
        cartItems.style.display = "none";
        orderSummary.style.display = "none";
    } else {
        emptyMessage.style.display = "none";
        cartItems.style.display = "block";
        orderSummary.style.display = "block";
    }
}


// ===============================
// CONTINUE SHOPPING
// ===============================
function continueShopping() {
    window.location.href = "index.html";
}


// ===============================
// INITIAL LOAD
// ===============================
updateCartCount();
loadCart();
checkCartStatus();