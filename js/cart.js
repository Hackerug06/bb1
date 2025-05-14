// Cart functionality
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('bbs-cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartCount();
        } catch (error) {
            console.error('Failed to parse cart from localStorage:', error);
            cart = [];
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('bbs-cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Mock getProductById function (replace with your actual implementation)
function getProductById(productId) {
    // This is a placeholder.  You should replace this with your actual
    // implementation of getProductById, which fetches product data.
    // For example, you might fetch it from a database or an API.
    // The following is just dummy data for demonstration purposes.
    const products = [
        { id: '1', name: 'Product 1', price: 20, image: 'image1.jpg', category: 'Category A' },
        { id: '2', name: 'Product 2', price: 30, image: 'image2.jpg', category: 'Category B' },
        { id: '3', name: 'Product 3', price: 40, image: 'image3.jpg', category: 'Category A' }
    ];

    return products.find(product => product.id === productId);
}

// Add product to cart
function addToCart(productId, quantity) {
    const product = getProductById(productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: quantity
        });
    }
    
    saveCart();
    
    // Show confirmation message
    showAddToCartConfirmation(product.name);
}

// Show add to cart confirmation
function showAddToCartConfirmation(productName) {
    // Create confirmation element
    const confirmation = document.createElement('div');
    confirmation.className = 'cart-confirmation';
    confirmation.innerHTML = `
        <div class="cart-confirmation-content">
            <img src="images/check-circle.svg" alt="Success">
            <p><strong>${productName}</strong> has been added to your cart</p>
            <a href="cart.html" class="btn btn-primary btn-sm">View Cart</a>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .cart-confirmation {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            animation: slideIn 0.3s forwards, slideOut 0.3s forwards 3s;
            transform: translateX(100%);
        }
        
        .cart-confirmation-content {
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .cart-confirmation img {
            width: 24px;
            height: 24px;
        }
        
        .cart-confirmation p {
            margin: 0;
        }
        
        .btn-sm {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            white-space: nowrap;
        }
        
        @keyframes slideIn {
            to {
                transform: translateX(0);
            }
        }
        
        @keyframes slideOut {
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(confirmation);
    
    // Remove after animation completes
    setTimeout(() => {
        document.body.removeChild(confirmation);
    }, 3500);
}

// Update item quantity in cart
function updateCartItemQuantity(productId, quantity) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        if (quantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = quantity;
        }
        
        saveCart();
        renderCart();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        saveCart();
        renderCart();
    }
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

// Calculate cart totals
function calculateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal >= 50 ? 0 : 10;
    const total = subtotal + shipping;
    
    return { subtotal, shipping, total };
}

// Render cart page
function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartContent = document.getElementById('cart-content');
    const cartItems = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const shippingNote = document.getElementById('shipping-note');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartContent) cartContent.style.display = 'none';
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartContent) cartContent.style.display = 'flex';
    
    if (cartItems) {
        let cartItemsHtml = `
            <div class="cart-header">
                <h3>Shopping Cart (${cart.length} items)</h3>
            </div>
        `;
        
        cart.forEach(item => {
            cartItemsHtml += `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <p class="cart-item-category">${item.category}</p>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-controls">
                            <div class="cart-quantity-controls">
                                <button class="cart-quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                                <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="cart-quantity-btn increase-quantity" data-id="${item.id}">+</button>
                            </div>
                            <button class="cart-item-remove" data-id="${item.id}">
                                <img src="images/trash.svg" alt="Remove">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItemsHtml += `
            <div class="cart-footer">
                <button class="btn btn-outline" id="clear-cart-btn">Clear Cart</button>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        
        cartItems.innerHTML = cartItemsHtml;
        
        // Add event listeners
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const currentItem = cart.find(item => item.id === productId);
                if (currentItem) {
                    updateCartItemQuantity(productId, currentItem.quantity - 1);
                }
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const currentItem = cart.find(item => item.id === productId);
                if (currentItem) {
                    updateCartItemQuantity(productId, currentItem.quantity + 1);
                }
            });
        });
        
        document.querySelectorAll('.cart-quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const productId = this.getAttribute('data-id');
                const quantity = parseInt(this.value);
                if (!isNaN(quantity) && quantity >= 1) {
                    updateCartItemQuantity(productId, quantity);
                }
            });
        });
        
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                removeFromCart(productId);
            });
        });
        
        document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    }
    
    // Update summary
    const { subtotal, shipping, total } = calculateCartTotals();
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    
    if (shippingNote) {
        shippingNote.textContent = shipping === 0 
            ? 'Free shipping applied' 
            : 'Free shipping on orders over $50';
    }
    
    // Setup checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            handleCheckout();
        });
    }
}

// Handle checkout via WhatsApp
function handleCheckout() {
    const phoneNumber = '+256783468608';
    
    // Create message with cart items
    let message = 'Hello, I would like to order the following items:\n\n';
    
    cart.forEach(item => {
        message += `${item.name} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    const { subtotal, shipping, total } = calculateCartTotals();
    
    message += `\nSubtotal: $${subtotal.toFixed(2)}`;
    message += `\nShipping: ${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}`;
    message += `\nTotal: $${total.toFixed(2)}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    renderCart();
});
