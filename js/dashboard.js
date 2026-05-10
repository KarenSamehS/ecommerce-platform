// ========================
// NAVIGATION
// ========================
const logoutBtn = document.getElementById("logoutBtn");
const productsBtn = document.getElementById("productsBtn");
const ordersBtn = document.getElementById("ordersBtn");
const exportBtn = document.getElementById("exportBtn");

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        storageRemove('session');
        window.location.href = '../login.html';
    });
}

if (productsBtn) {
    productsBtn.addEventListener('click', () => {
        window.location.href = 'products.html';
    });
}

if (ordersBtn) {
    ordersBtn.addEventListener('click', () => {
        window.location.href = 'orders.html';
    });
}

// ========================
// KPI CARDS
// ========================
function loadKPIs() {
    const orders = storageGet('orders') || [];
    const users = storageGet('users') || [];
    const products = storageGet('products') || [];

    // Total revenue
    const revenue = orders.reduce(function(sum, order) {
        return sum + parseFloat(order.total);
    }, 0);

    document.getElementById('totalRevenue').innerText = '$' + revenue.toFixed(2);
    document.getElementById('totalOrders').innerText = orders.length;
    document.getElementById('totalUsers').innerText = users.length;
    document.getElementById('totalProducts').innerText = products.length;
}

// ========================
// RECENT ORDERS (last 5)
// ========================
function loadRecentOrders() {
    const orders = storageGet('orders') || [];
    const container = document.getElementById('recentOrders-container');

    container.innerHTML = '';

    if (orders.length === 0) {
        container.innerHTML = '<p style="color:cadetblue;">No orders yet</p>';
        return;
    }

    // Get last 5 orders
    const recent = orders.slice(-5).reverse();

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
        </tr>
    `;

    recent.forEach(function(order) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${order.id}</td>
            <td>${order.username}</td>
            <td>$${order.total}</td>
            <td>${order.date}</td>
            <td><span class="order-status status-${order.status}">${order.status}</span></td>
        `;
        table.appendChild(row);
    });

    container.appendChild(table);
}

// ========================
// CHARTS
// ========================
function loadCharts() {
    const orders = storageGet('orders') || [];

    // --- Revenue Over Time (line chart) ---
    // Group revenue by date
    const revenueByDate = {};
    orders.forEach(function(order) {
        if (revenueByDate[order.date]) {
            revenueByDate[order.date] += parseFloat(order.total);
        } else {
            revenueByDate[order.date] = parseFloat(order.total);
        }
    });

    const revenueLabels = Object.keys(revenueByDate);
    const revenueData = Object.values(revenueByDate);

    new Chart(document.getElementById('revenueChart'), {
        type: 'line',
        data: {
            labels: revenueLabels.length > 0 ? revenueLabels : ['No data'],
            datasets: [{
                label: 'Revenue ($)',
                data: revenueData.length > 0 ? revenueData : [0],
                borderColor: 'cadetblue',
                backgroundColor: 'rgba(95,158,160,0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });

    // --- Orders by Status (doughnut chart) ---
    const pending = orders.filter(function(o) { return o.status === 'pending'; }).length;
    const shipped = orders.filter(function(o) { return o.status === 'shipped'; }).length;
    const delivered = orders.filter(function(o) { return o.status === 'delivered'; }).length;

    new Chart(document.getElementById('statusChart'), {
        type: 'doughnut',
        data: {
            labels: ['Pending', 'Shipped', 'Delivered'],
            datasets: [{
                data: [pending, shipped, delivered],
                backgroundColor: ['#fff3cd', '#cce5ff', '#d4edda'],
                borderColor: ['#856404', '#004085', '#155724'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// ========================
// CSV EXPORT
// ========================
function exportCSV() {
    const orders = storageGet('orders') || [];

    if (orders.length === 0) {
        alert('No orders to export');
        return;
    }

    let csv = 'Order ID,Customer,Total,Date,Status\n';

    orders.forEach(function(order) {
        csv += `${order.id},${order.username},${order.total},${order.date},${order.status}\n`;
    });

    // Create a download link and click it
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    URL.revokeObjectURL(url);
}

if (exportBtn) {
    exportBtn.addEventListener('click', exportCSV);
}

// ========================
// RUN ON PAGE LOAD
// ========================
loadKPIs();
loadRecentOrders();
loadCharts();