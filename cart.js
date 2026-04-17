// =======================
// LOAD CART
// =======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const subtotalBox = document.getElementById("subtotal");
const totalBox = document.getElementById("total");


// =======================
// LOAD CART ITEMS
// =======================
function loadCart() {

  cart = JSON.parse(localStorage.getItem("cart")) || []; // 🔥 sync

  cartItems.innerHTML = "";

  let subtotal = 0;

  if (cart.length === 0) {

    cartItems.innerHTML = ""; // ❌ yaha text nahi dalna
    subtotalBox.innerText = 0;
    totalBox.innerText = 0;

    checkCartStatus(); // 🔥 important
    return;
  }

  cart.forEach((item, index) => {

    const qty = Number(item.quantity || 1);
    const price = Number(item.price);

    const itemTotal = price * qty;

    subtotal += itemTotal;

    cartItems.innerHTML += `

      <div class="cart-card">

        <img src="${item.image}" class="cart-img">

        <div class="cart-info">

          <h3>${item.name}</h3>

          <p>₹${price} × ${qty}</p>

          <div class="qty-box">

            <button onclick="changeQty(${index},-1)">−</button>

            <span>${qty}</span>

            <button onclick="changeQty(${index},1)">+</button>

            <button class="remove" onclick="removeItem(${index})">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
            </button>

          </div>

        </div>

        <div class="price">₹${itemTotal}</div>

      </div>

    `;
  });

  subtotalBox.innerText = subtotal;
  totalBox.innerText = subtotal;

  checkCartStatus(); // 🔥 important
}


// =======================
// CHANGE QUANTITY
// =======================
function changeQty(index, change) {

  cart[index].quantity = Number(cart[index].quantity || 1);

  cart[index].quantity += change;

  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}


// =======================
// REMOVE ITEM
// =======================
function removeItem(index) {

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart(); // 🔥 UI refresh
}


// =======================
// CHECK CART STATUS
// =======================
function checkCartStatus() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let emptyMessage = document.getElementById("text-center");
  let cartItems = document.getElementById("cartItems");
  let orderSummary = document.getElementById("orderSummary");

  if (!emptyMessage || !cartItems || !orderSummary) return;

  if (cart.length === 0) {
    emptyMessage.style.display = "block";
    cartItems.style.display = "none";
    orderSummary.style.display = "none";
  } else {
    emptyMessage.style.display = "none";
    cartItems.style.display = "block";
    orderSummary.style.display = "block";
  }
}


// =======================
// CONTINUE SHOPPING
// =======================
function continueShopping() {
  window.location.href = "index.html";
}


// =======================
// CHECKOUT
// =======================
function proceedToCheckout() {
  window.location.href = "Proceed to Checkout.html";
}


// =======================
// PAGE LOAD
// =======================
loadCart();
checkCartStatus();