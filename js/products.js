// ========================
// USER PRODUCTS PAGE
// ========================
const searchInput = document.getElementById("searchInput");
const searchProductBtn = document.getElementById("searchProductBtn");
const categoryFilter = document.getElementById("categoryFilter");
const cartBtn = document.getElementById("cartBtn");
const logoutBtn = document.getElementById("logoutBtn");

if (categoryFilter) {
    categoryFilter.addEventListener('change', searchAndFilter);
}

// Display products as cards for users
function displayProductCards(productList) {
    const container = document.getElementById("products-container");
    container.innerHTML = '';

    if (productList.length === 0) {
        const p = document.createElement('p');
        p.innerText = 'No products found';
        p.setAttribute("style", "text-align:center; color:cadetblue;");
        container.appendChild(p);
        return;
    }

    productList.forEach(function(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="category">${product.category}</p>
            <p class="price">$${product.price}</p>
            <p class="stock">In Stock: ${product.stock}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}

// Populate category dropdown from existing products
function loadCategories() {
    if (!categoryFilter) return;
    const products = storageGet('products') || [];
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(function(cat) {
        const option = document.createElement('option');
        option.value = cat;
        option.innerText = cat;
        categoryFilter.appendChild(option);
    });
}

// Search and filter logic
function searchAndFilter() {
    const products = storageGet('products') || [];
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : '';

    const filtered = products.filter(function(product) {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    displayProductCards(filtered);
}

if (searchProductBtn) {
    searchProductBtn.addEventListener('click', searchAndFilter);
}

if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        storageRemove('session');
        window.location.href = 'login.html';
    });
}

// addToCart will be built in the cart phase
function addToCart(id) {
    alert('Cart coming soon!');
}


const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productDescriptionInput = document.getElementById("productDescription");
const productCategoryInput = document.getElementById("productCategory");
const productStockInput = document.getElementById("productStock");
const addProductBtn = document.getElementById("addProductBtn");

function displayProducts() {
    const products = storageGet('products') || [];
    const container = document.getElementById("products-container");

    // Clear whatever is currently shown
    container.innerHTML = '';

    if (products.length === 0) {
        const p = document.createElement('p');
        p.innerText = 'No products to show';
        p.setAttribute("style", "color:blue");
        container.appendChild(p);

    } else {
        // Create a table
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
            </tr>
        `;

        // Loop through each product and add a row
        products.forEach(function(product) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.description}</td>
                <td>${product.category}</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick="editProduct(${product.id})">Edit</button>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            `;
            table.appendChild(row);
        });

        container.appendChild(table);
    }
}



function handleAddProduct() {
    const productName = productNameInput.value.trim();
    const productPrice = productPriceInput.value.trim();
    const productDescription = productDescriptionInput.value.trim();
    const productCategory = productCategoryInput.value.trim();
    const productStock = productStockInput.value.trim();

    const products = storageGet('products') || [];

    const nameExists = products.find(function(p) {
        return p.name.toLowerCase() === productName.toLowerCase();
    });

    if (productName === '' || productPrice === '' || productDescription === '' || productCategory === '' || productStock === '') {
        alert("Please fill in all fields");
    } else if (nameExists) {
        alert("A product with this name already exists");
    } else {
        const newProduct = {
            id: Date.now(),
            name: productName,
            price: productPrice,
            description: productDescription,
            category: productCategory,
            stock: productStock
        };

        storageAppend('products', newProduct);

        productNameInput.value = '';
        productPriceInput.value = '';
        productDescriptionInput.value = '';
        productCategoryInput.value = '';
        productStockInput.value = '';

        displayProducts();
    }
}

if (addProductBtn) {
    addProductBtn.addEventListener('click', handleAddProduct);
}

function deleteProduct(id) {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (confirmed) {
        storageDelete('products', id);
        displayProducts();
    }
}

// ========================
// EDIT PRODUCT
// ========================
function editProduct(id) {
    const products = storageGet('products') || [];
    const product = products.find(function(p) {
        return p.id === id;
    });

    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    productDescriptionInput.value = product.description;
    productCategoryInput.value = product.category;
    productStockInput.value = product.stock;

    addProductBtn.innerText = 'Save Changes';

    // Remove the add listener so it doesnt fire alongside onclick
    addProductBtn.removeEventListener('click', handleAddProduct);

    addProductBtn.onclick = function() {
        const updatedName = productNameInput.value.trim();
        const products = storageGet('products') || [];

        const nameExists = products.find(function(p) {
            return p.name.toLowerCase() === updatedName.toLowerCase() && p.id !== id;
        });

        if (nameExists) {
            alert("A product with this name already exists");
            return;
        }

        storageUpdate('products', id, {
            name: updatedName,
            price: productPriceInput.value.trim(),
            description: productDescriptionInput.value.trim(),
            category: productCategoryInput.value.trim(),
            stock: productStockInput.value.trim()
        });

        // Reset everything back to add mode
        addProductBtn.innerText = 'Add';
        addProductBtn.onclick = null;

        // Restore the add listener
        addProductBtn.addEventListener('click', handleAddProduct);

        productNameInput.value = '';
        productPriceInput.value = '';
        productDescriptionInput.value = '';
        productCategoryInput.value = '';
        productStockInput.value = '';

        displayProducts();
    };
}


// RUN ON PAGE LOAD
// Check which page we are on and run the right function
if (addProductBtn) {
    // We are on admin/products.html
    displayProducts();
}

if (searchInput) {
    // We are on products.html
    loadCategories();
    searchAndFilter();
}