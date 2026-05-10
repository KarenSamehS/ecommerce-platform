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
function displayOrders() {
    const session = storageGet('session');
    const allOrders = storageGet('orders') || [];
    const container = document.getElementById("orders-container");

    if (!container) return;

    container.innerHTML = '';
    // Show only this user's orders
    const userOrders = allOrders.filter(function(order) {
        return order.userId === session.id;
    });

    if (userOrders.length === 0) {
        const empty = document.createElement('div');
        empty.id = 'emptyOrders';
        empty.innerHTML = `
            <p>You have no orders yet</p>
            <button onclick="window.location.href='products.html'">Start Shopping</button>
        `;
        container.appendChild(empty);
        return;
    }

    // Loop through each order
    userOrders.forEach(function(order) {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-card';

        // Build items list inside the order
        let itemsHTML = '';
        order.items.forEach(function(item) {
            itemsHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.qty}</td>
                    <td>$${(item.price * item.qty).toFixed(2)}</td>
                </tr>
            `;
        });

        orderDiv.innerHTML = `
            <div class="order-header">
                <span>Order #${order.id}</span>
                <span>Date: ${order.date}</span>
                <span class="order-status status-${order.status}">${order.status}</span>
            </div>
            <table>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
                ${itemsHTML}
            </table>
            <div class="order-total">
                Total: <strong>$${order.total}</strong>
            </div>
        `;

        container.appendChild(orderDiv);
    });
}


const dashboardBtn = document.getElementById("dashboardBtn");

if (dashboardBtn) {
    dashboardBtn.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
}

function displayAllOrders() {
    const allOrders = storageGet('orders') || [];
    const container = document.getElementById("orders-container");

    if (!container) return;

    // Check we are on admin orders page
    if (!dashboardBtn) return;

    container.innerHTML = '';

    if (allOrders.length === 0) {
        const p = document.createElement('p');
        p.innerText = 'No orders yet';
        p.setAttribute('style', 'text-align:center; color:cadetblue;');
        container.appendChild(p);
        return;
    }

    allOrders.forEach(function(order) {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-card';

        let itemsHTML = '';
        order.items.forEach(function(item) {
            itemsHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.qty}</td>
                    <td>$${(item.price * item.qty).toFixed(2)}</td>
                </tr>
            `;
        });

        orderDiv.innerHTML = `
            <div class="order-header">
                <span>Order #${order.id}</span>
                <span>Customer: ${order.username}</span>
                <span>Date: ${order.date}</span>
                <span class="order-status status-${order.status}">${order.status}</span>
            </div>
            <table>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
                ${itemsHTML}
            </table>
            <div class="order-total">
                Total: <strong>$${order.total}</strong>
            </div>
            <div class="order-actions">
                <label>Update Status:</label>
                <select onchange="updateOrderStatus(${order.id}, this.value)">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                </select>
            </div>
        `;

        container.appendChild(orderDiv);
    });
}

function updateOrderStatus(id, newStatus) {
    storageUpdate('orders', id, { status: newStatus });
    displayAllOrders();
}

// Run admin orders if on admin page
if (dashboardBtn) {
    displayAllOrders();
} else {
    displayOrders();
}