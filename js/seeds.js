// ========================
// SEED DATA
// ========================
function loadSeedData() {
    const seedUsers = [
        {
            id: 1000,
            firstname: 'Admin',
            lastname: 'User',
            email: 'admin@test.com',
            password: 'Admin_123',
            role: 'admin'
        },
        {
            id: 1001,
            firstname: 'John',
            lastname: 'Doe',
            email: 'john@test.com',
            password: 'John_123',
            role: 'user'
        },
        {
            id: 1002,
            firstname: 'Sara',
            lastname: 'Smith',
            email: 'sara@test.com',
            password: 'Sara_123',
            role: 'user'
        }
    ];

    const seedProducts = [
        {
            id: 2000,
            name: 'iPhone 15',
            price: '999',
            description: 'Latest Apple smartphone',
            category: 'Electronics',
            stock: '50'
        },
        {
            id: 2001,
            name: 'Nike Air Max',
            price: '120',
            description: 'Comfortable running shoes',
            category: 'Fashion',
            stock: '30'
        },
        {
            id: 2002,
            name: 'Samsung TV 55"',
            price: '799',
            description: '4K Smart TV',
            category: 'Electronics',
            stock: '15'
        },
        {
            id: 2003,
            name: 'Coffee Maker',
            price: '49',
            description: 'Brew perfect coffee every morning',
            category: 'Home',
            stock: '40'
        },
        {
            id: 2004,
            name: 'Leather Wallet',
            price: '35',
            description: 'Slim genuine leather wallet',
            category: 'Fashion',
            stock: '100'
        },
        {
            id: 2005,
            name: 'Yoga Mat',
            price: '25',
            description: 'Non-slip exercise mat',
            category: 'Sports',
            stock: '60'
        }
    ];

    const seedOrders = [
        {
            id: 3000,
            userId: 1001,
            username: 'John',
            items: [
                { id: 2000, name: 'iPhone 15', price: 999, qty: 1 },
                { id: 2003, name: 'Coffee Maker', price: 49, qty: 2 }
            ],
            total: '1097.00',
            status: 'delivered',
            date: '1/5/2025'
        },
        {
            id: 3001,
            userId: 1002,
            username: 'Sara',
            items: [
                { id: 2001, name: 'Nike Air Max', price: 120, qty: 1 }
            ],
            total: '120.00',
            status: 'shipped',
            date: '2/5/2025'
        },
        {
            id: 3002,
            userId: 1001,
            username: 'John',
            items: [
                { id: 2005, name: 'Yoga Mat', price: 25, qty: 3 }
            ],
            total: '75.00',
            status: 'pending',
            date: '3/5/2025'
        }
    ];

    // Only load if data doesn't already exist
    if (!storageGet('users')) storageSet('users', seedUsers);
    if (!storageGet('products')) storageSet('products', seedProducts);
    if (!storageGet('orders')) storageSet('orders', seedOrders);

    alert('Demo data loaded! \n\nAdmin: admin@test.com / Admin_123 \nUser: john@test.com / John_123');
}