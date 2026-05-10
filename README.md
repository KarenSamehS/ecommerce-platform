# E-Commerce Platform

A fully client-side e-commerce prototype built with vanilla JavaScript, HTML, and CSS.

---

## How to Run

1. Clone the repository
2. Open the project folder in VS Code
3. Right click `index.html` and select **Open with Live Server**
4. The app runs at `http://127.0.0.1:5500`

No installations, no terminal commands, no dependencies needed.

---

## Demo Data

On the landing page click **Load Demo Data** to populate the app with sample users, products, and orders.

| Role  | Email           | Password   |
|-------|-----------------|------------|
| Admin | admin@test.com  | Admin_123  |
| User  | john@test.com   | John_123   |
| User  | sara@test.com   | Sara_123   |

---

## Features

### Authentication
- User registration with validation
- Login with session persistence via localStorage
- Role-based access (admin / user)
- Page guards — unauthenticated users redirected to login

### Product Management (Admin)
- Add, edit, delete products
- Fields: name, price, description, category, stock
- Duplicate name prevention

### Product Browsing (Users)
- Browse all products as cards
- Search by name
- Filter by category

### Cart
- Add products to cart
- Increase / decrease quantity
- Remove items
- Dynamic total calculation
- Checkout creates an order

### Orders
- Users see their own order history
- Admins see all orders from all users
- Admins can update order status (pending / shipped / delivered)
- Status badges with color coding

### Admin Dashboard
- KPI cards: total revenue, orders, users, products
- Recent orders table (last 5)
- Revenue over time line chart
- Orders by status doughnut chart
- Export all orders as CSV

---

## Project Structure
ecommerce-platform/
├── index.html
├── login.html
├── register.html
├── products.html
├── cart.html
├── orders.html
├── admin/
│   ├── dashboard.html
│   ├── products.html
│   └── orders.html
├── css/
│   └── styles.css
└── js/
├── storage.js
├── auth.js
├── products.js
├── cart.js
├── orders.js
├── dashboard.js
└── seeds.js

---

## Known Limitations & Security Notes

- **Passwords are stored in plain text in localStorage** — this is not safe for production. In a real app passwords would be hashed server-side and never stored in the browser.
- **localStorage is not secure storage** — any JavaScript on the page can read it. This project is a prototype only.
- **No real backend** — all data lives in the browser and is lost if localStorage is cleared.
- **No real authentication** — session is just an object in localStorage that can be manually edited. A real app would use server-side sessions or JWT tokens.
- **Single browser only** — data does not sync across devices or browsers.

---

## Technologies Used

- JavaScript (ES6+)
- HTML5
- CSS3
- Chart.js (dashboard charts)
- localStorage (data persistence)
- Live Server (local development)