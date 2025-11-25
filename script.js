// Sample products data
const products = [
    { id: 1, name: "Wireless Headphones", price: 2999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" },
    { id: 2, name: "Smart Watch", price: 15999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" },
    { id: 3, name: "Laptop Stand", price: 1499, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop" },
    { id: 4, name: "USB-C Cable", price: 599, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop" },
    { id: 5, name: "Bluetooth Speaker", price: 2399, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop" },
    { id: 6, name: "Phone Case", price: 749, image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop" }
];

let cart = [];

// DOM elements
const productsContainer = document.getElementById('products');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartUI();
    
    // Event listeners
    document.querySelector('.cart').addEventListener('click', openCart);
    document.querySelector('.close').addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', checkout);
    
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCart();
    });
});

function displayProducts() {
    productsContainer.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">₹${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    displayCartItems();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
            displayCartItems();
        }
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = `₹${totalPrice.toFixed(0)}`;
    totalElement.textContent = `Total: ₹${totalPrice.toFixed(0)}`;
}

function openCart() {
    displayCartItems();
    cartModal.style.display = 'block';
}

function closeCart() {
    cartModal.style.display = 'none';
}

function displayCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                ₹${item.price} x ${item.quantity}
            </div>
            <div>
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span style="margin: 0 10px;">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 3px;">Remove</button>
            </div>
        </div>
    `).join('');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Total: ₹${total.toFixed(0)}`);
    
    cart = [];
    updateCartUI();
    closeCart();
}