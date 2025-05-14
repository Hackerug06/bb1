// Sample product data
const products = [
    {
        id: 1,
        name: "Classic Baby Bottle",
        description: "Our signature anti-colic baby bottle with soft silicone nipple.",
        price: 12.99,
        image: "product1.jpg",
        category: "bottles",
        rating: 4.8,
        reviews: 124,
        features: [
            "Anti-colic vent system",
            "BPA-free materials",
            "Soft silicone nipple",
            "Easy to clean",
            "Dishwasher safe"
        ]
    },
    {
        id: 2,
        name: "Wide-Neck Baby Bottle",
        description: "Wide-neck design for easy filling and cleaning, perfect for formula feeding.",
        price: 14.99,
        image: "product2.jpg",
        category: "bottles",
        rating: 4.7,
        reviews: 98,
        features: [
            "Wide neck for easy filling",
            "Anti-colic vent system",
            "BPA-free materials",
            "Ergonomic design",
            "Dishwasher safe"
        ]
    },
    {
        id: 3,
        name: "Glass Baby Bottle",
        description: "Eco-friendly glass bottle with protective silicone sleeve.",
        price: 18.99,
        image: "product3.jpg",
        category: "bottles",
        rating: 4.9,
        reviews: 76,
        features: [
            "Premium borosilicate glass",
            "Protective silicone sleeve",
            "Anti-colic vent system",
            "Thermal shock resistant",
            "Dishwasher safe"
        ]
    },
    {
        id: 4,
        name: "Slow Flow Nipples (0-3m)",
        description: "Slow flow silicone nipples ideal for newborns and young babies.",
        price: 8.99,
        image: "product4.jpg",
        category: "nipples",
        rating: 4.6,
        reviews: 65,
        features: [
            "Slow flow rate",
            "Soft silicone material",
            "Compatible with all BBS bottles",
            "BPA-free",
            "Pack of 2"
        ]
    },
    {
        id: 5,
        name: "Medium Flow Nipples (3-6m)",
        description: "Medium flow silicone nipples for growing babies.",
        price: 8.99,
        image: "product5.jpg",
        category: "nipples",
        rating: 4.7,
        reviews: 52,
        features: [
            "Medium flow rate",
            "Soft silicone material",
            "Compatible with all BBS bottles",
            "BPA-free",
            "Pack of 2"
        ]
    },
    {
        id: 6,
        name: "Bottle Cleaning Brush Set",
        description: "Complete set of brushes for thorough bottle cleaning.",
        price: 9.99,
        image: "product6.jpg",
        category: "accessories",
        rating: 4.5,
        reviews: 43,
        features: [
            "Includes nipple brush",
            "Flexible design reaches all areas",
            "Durable bristles",
            "Hygienic materials",
            "Dishwasher safe"
        ]
    },
    {
        id: 7,
        name: "Bottle Sterilizer",
        description: "Electric steam sterilizer for baby bottles and accessories.",
        price: 39.99,
        image: "product7.jpg",
        category: "accessories",
        rating: 4.8,
        reviews: 87,
        features: [
            "Sterilizes in 6 minutes",
            "Fits up to 6 bottles",
            "Kills 99.9% of harmful germs",
            "Auto shut-off",
            "BPA-free materials"
        ]
    },
    {
        id: 8,
        name: "Insulated Bottle Bag",
        description: "Keeps bottles warm or cool for hours while on the go.",
        price: 16.99,
        image: "product8.jpg",
        category: "accessories",
        rating: 4.6,
        reviews: 38,
        features: [
            "Holds up to 2 bottles",
            "Maintains temperature for 4+ hours",
            "Easy-clean lining",
            "Adjustable strap",
            "Multiple color options"
        ]
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Initialize cart modal
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCartBtn = cartModal.querySelector('.close');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openCartModal();
    });
    
    closeCartBtn.addEventListener('click', closeCartModal);
    
    continueShoppingBtn.addEventListener('click', closeCartModal);
    
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some products before checkout.');
            return;
        }
        
        // Create WhatsApp message with cart items
        let message = "Hello, I would like to order the following items:\n\n";
        
        cart.forEach(item => {
            message += `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        
        message += `\nTotal: $${calculateTotal().toFixed(2)}`;
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp with the message
        window.open(`https://wa.me/256783468608?text=${encodedMessage}`, '_blank');
        
        // Clear cart after checkout
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        closeCartModal();
    });

    // Initialize product display
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        displayFeaturedProducts();
        initializeTestimonialSlider();
    }
    
    if (window.location.pathname.includes('products.html')) {
        displayAllProducts();
        initializeProductFilters();
        initializeProductModal();
    }
    
    // Initialize contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});

// Cart functions
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function openCartModal() {
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    
    // Clear previous items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalAmount.textContent = '$0.00';
    } else {
        // Add cart items
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Add event listeners to quantity buttons
        const decreaseButtons = cartItemsContainer.querySelectorAll('.decrease');
        const increaseButtons = cartItemsContainer.querySelectorAll('.increase');
        const removeButtons = cartItemsContainer.querySelectorAll('.cart-item-remove');
        
        decreaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                updateCartItemQuantity(id, -1);
            });
        });
        
        increaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                updateCartItemQuantity(id, 1);
            });
        });
        
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                removeCartItem(id);
            });
        });
        
        // Update total
        totalAmount.textContent = `$${calculateTotal().toFixed(2)}`;
    }
    
    cartModal.style.display = 'block';
}

function closeCartModal() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartItemQuantity(id, change) {
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        openCartModal(); // Refresh the cart modal
    }
}

function removeCartItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    openCartModal(); // Refresh the cart modal
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show confirmation
    alert(`${product.name} added to cart!`);
}

// Product display functions
function displayFeaturedProducts() {
    const featuredProductsContainer = document.querySelector('.featured-products .product-grid');
    
    if (featuredProductsContainer) {
        // Display only 4 featured products
        const featuredProducts = products.slice(0, 4);
        
        featuredProducts.forEach(product => {
            const productElement = createProductElement(product);
            featuredProductsContainer.appendChild(productElement);
        });
    }
}

function displayAllProducts() {
    const productsContainer = document.getElementById('products-container');
    
    if (productsContainer) {
        products.forEach(product => {
            const productElement = createProductElement(product);
            productsContainer.appendChild(productElement);
        });
    }
}

function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product-card';
    productElement.setAttribute('data-category', product.category);
    
    // Generate stars based on rating
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(product.rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= product.rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    productElement.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-rating">
                ${stars}
                <span>(${product.reviews})</span>
            </div>
            <div class="product-actions">
                <button class="btn primary-btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                <button class="btn secondary-btn view-details" data-id="${product.id}">Details</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const addToCartBtn = productElement.querySelector('.add-to-cart');
    const viewDetailsBtn = productElement.querySelector('.view-details');
    
    addToCartBtn.addEventListener('click', function() {
        addToCart(product);
    });
    
    viewDetailsBtn.addEventListener('click', function() {
        openProductModal(product);
    });
    
    return productElement;
}

// Product filters
function initializeProductFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    
    if (categoryFilter && sortBy) {
        categoryFilter.addEventListener('change', filterProducts);
        sortBy.addEventListener('change', filterProducts);
    }
}

function filterProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    const productsContainer = document.getElementById('products-container');
    
    if (!categoryFilter || !sortBy || !productsContainer) return;
    
    const category = categoryFilter.value;
    const sort = sortBy.value;
    
    // Clear container
    productsContainer.innerHTML = '';
    
    // Filter products by category
    let filteredProducts = [...products];
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Sort products
    switch (sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // 'featured' - no sorting needed
            break;
    }
    
    // Display filtered and sorted products
    filteredProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
}

// Product modal
function initializeProductModal() {
    const productModal = document.getElementById('product-modal');
    const closeBtn = productModal.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        productModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    });
}

function openProductModal(product) {
    const productModal = document.getElementById('product-modal');
    const productDetailContent = document.getElementById('product-detail-content');
    
    // Generate stars based on rating
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(product.rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= product.rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    // Generate features list
    let featuresList = '';
    product.features.forEach(feature => {
        featuresList += `<li><i class="fas fa-check"></i> ${feature}</li>`;
    });
    
    productDetailContent.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h2 class="product-detail-title">${product.name}</h2>
                <div class="product-detail-price">$${product.price.toFixed(2)}</div>
                <div class="product-detail-rating">
                    ${stars}
                    <span>${product.rating.toFixed(1)} (${product.reviews} reviews)</span>
                </div>
                <div class="product-detail-description">
                    <p>${product.description}</p>
                </div>
                <div class="product-detail-features">
                    <h3>Features</h3>
                    <ul>
                        ${featuresList}
                    </ul>
                </div>
                <div class="product-detail-quantity">
                    <label for="quantity">Quantity:</label>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-modal">-</button>
                        <span class="quantity-value" id="modal-quantity">1</span>
                        <button class="quantity-btn increase-modal">+</button>
                    </div>
                </div>
                <div class="product-detail-actions">
                    <button class="btn primary-btn add-to-cart-modal" data-id="${product.id}">Add to Cart</button>
                    <button class="btn secondary-btn continue-shopping-modal">Continue Shopping</button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    const decreaseBtn = productDetailContent.querySelector('.decrease-modal');
    const increaseBtn = productDetailContent.querySelector('.increase-modal');
    const quantityValue = productDetailContent.querySelector('#modal-quantity');
    const addToCartBtn = productDetailContent.querySelector('.add-to-cart-modal');
    const continueShoppingBtn = productDetailContent.querySelector('.continue-shopping-modal');
    
    let quantity = 1;
    
    decreaseBtn.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        quantity++;
        quantityValue.textContent = quantity;
    });
    
    addToCartBtn.addEventListener('click', function() {
        // Add to cart with specified quantity
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show confirmation
        alert(`${quantity} ${product.
