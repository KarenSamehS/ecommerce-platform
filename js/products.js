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




if(addProductBtn){
	addProductBtn.addEventListener('click',()=>{
		 productName = productNameInput.value.trim();
		 productPrice = productPriceInput.value.trim();
		 productDescription = productDescriptionInput.value.trim();
		 productCategory = productCategoryInput.value.trim();
		 productStock = productStockInput.value.trim();


		const products = storageGet('products') || [];

		// Check if product name already exists
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

            // Clear the form
            productNameInput.value = '';
            productPriceInput.value = '';
            productDescriptionInput.value = '';
            productCategoryInput.value = '';
            productStockInput.value = '';

            // Refresh the table
            displayProducts();
        }
    });
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

    // Fill the form with the product's current data
    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    productDescriptionInput.value = product.description;
    productCategoryInput.value = product.category;
    productStockInput.value = product.stock;

    // Change the button to say "Save Changes"
    addProductBtn.innerText = 'Save Changes';

    // When they click Save Changes, update the product
    addProductBtn.onclick = function() {
        storageUpdate('products', id, {
            name: productNameInput.value.trim(),
            price: productPriceInput.value.trim(),
            description: productDescriptionInput.value.trim(),
            category: productCategoryInput.value.trim(),
            stock: productStockInput.value.trim()
        });

        // Reset button back to Add
        addProductBtn.innerText = 'Add';
        addProductBtn.onclick = null;

        // Clear the form
        productNameInput.value = '';
        productPriceInput.value = '';
        productDescriptionInput.value = '';
        productCategoryInput.value = '';
        productStockInput.value = '';

        // Refresh the table
        displayProducts();
    };
}

// ========================
// RUN ON PAGE LOAD
// ========================
displayProducts();