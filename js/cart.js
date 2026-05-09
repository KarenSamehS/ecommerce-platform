const logoutBtn = document.getElementById("logoutBtn");
const shopBtn = document.getElementById("shopBtn");

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        storageRemove('session');
        window.location.href = 'login.html';
    });
}

if (shopBtn) {
    shopBtn.addEventListener('click', () => {
        window.location.href = 'products.html';
    });
}

function displayCart() {
    const cart = storageGet('cart') || [];
    const container = document.getElementById("cart-container");
    container.innerHTML = '';

    if (cart.length === 0) {
        // Empty cart
        const empty = document.createElement('div');
        empty.id = 'emptyCart';
        empty.innerHTML = `
            <p>Your cart is empty</p>
            <button onclick="window.location.href='products.html'">Go Shopping</button>
        `;
        container.appendChild(empty);
        return;
    }

    // Build cart table
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Remove</th>
        </tr>
    `;

    let total = 0;

    cart.forEach(function(item) {
        const subtotal = item.price * item.qty;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>
                <button onclick="decreaseQty(${item.id})">-</button>
                <span>${item.qty}</span>
                <button onclick="increaseQty(${item.id})">+</button>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </td>
        `;
        table.appendChild(row);
    });

    container.appendChild(table);

    // Total row
    const totalDiv = document.createElement('div');
    totalDiv.id = 'cartTotal';
    totalDiv.innerHTML = `
        <p>Total: <strong>$${total.toFixed(2)}</strong></p>
        <button onclick="checkout()">Checkout</button>
    `;
    container.appendChild(totalDiv);
}

// ========================
// CART ACTIONS
// ========================
function increaseQty(id) {
    const cart = storageGet('cart') || [];
    const item = cart.find(function(i) { return i.id === id; });
    if (item) {
        item.qty += 1;
        storageSet('cart', cart);
        displayCart();
    }
}

function decreaseQty(id) {
    const cart = storageGet('cart') || [];
    const item = cart.find(function(i) { return i.id === id; });
    if (item) {
        if (item.qty === 1) {
            // Remove item if qty reaches 0
            removeFromCart(id);
        } else {
            item.qty -= 1;
            storageSet('cart', cart);
            displayCart();
        }
    }
}

function removeFromCart(id) {
    const cart = storageGet('cart') || [];
    const updated = cart.filter(function(i) { return i.id !== id; });
    storageSet('cart', updated);
    displayCart();
}

function checkout() {
    const session = storageGet('session');
    if (!session) {
        window.location.href = 'login.html';
        return;
    }

    const cart = storageGet('cart') || [];
    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    const total = cart.reduce(function(sum, item) {
        return sum + (item.price * item.qty);
    }, 0);

    const order = {
        id: Date.now(),
        userId: session.id,
        username: session.firstname,
        items: cart,
        total: total.toFixed(2),
        status: 'pending',
        date: new Date().toLocaleDateString()
    };

    storageAppend('orders', order);
    storageRemove('cart');

    alert("Order placed successfully!");
    window.location.href = 'orders.html';
}

// ========================
// RUN ON PAGE LOAD
// ========================
displayCart();

