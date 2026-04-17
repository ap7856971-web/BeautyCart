let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Item added to cart");
}

function updateCartCount() {
    document.getElementById("cart-count").innerText =
        cart.reduce((sum, item) => sum + item.qty, 0);
}

function loadCart() {
    let cartItems = document.getElementById("cart-items");
    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        cartItems.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>₹${item.price} × ${item.qty}</p>
                <p><b>Item Total:</b> ₹${item.price * item.qty}</p>
                <button onclick="decreaseQty(${index})">-</button>
                <button onclick="increaseQty(${index})">+</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        </div>
        `;
    });

    document.getElementById("total-price").innerText =
        "Grand Total: ₹" + total;
}

function increaseQty(index) {
    cart[index].qty++;
    saveCart();
}

function decreaseQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty--;
    }
    saveCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

updateCartCount();
if (document.getElementById("cart-items")) loadCart();
