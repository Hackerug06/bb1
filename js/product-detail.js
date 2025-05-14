// Import necessary functions (assuming they are in a separate module)
import { getProductById, generateStarRating, addToCart, getReviewsByProductId, getRelatedProducts, generateProductCard } from './utils.js';

// Product detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }
    
    const product = getProductById(productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
    // Render product details
    renderProductDetail(product);
    
    // Render product reviews
    renderProductReviews(productId);
    
    // Render related products
    renderRelatedProducts(productId, product.category);
});

// Function to render product detail
function renderProductDetail(product) {
    const productDetailContainer = document.getElementById('product-detail-container');
    if (!productDetailContainer) return;
    
    let galleryHtml = '';
    if (product.gallery && product.gallery.length > 0) {
        galleryHtml = `
            <div class="product-thumbnails">
                ${product.gallery.map((image, index) => `
                    <div class="product-thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                        <img src="${image}" alt="${product.name} view ${index + 1}">
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    const productHtml = `
        <div class="product-detail-content">
            <div class="product-gallery">
                <div class="product-main-image">
                    <img src="${product.image}" alt="${product.name}" id="main-product-image">
                </div>
                ${galleryHtml}
            </div>
            <div class="product-info">
                <h1 class="product-title">${product.name}</h1>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span>(${product.reviewCount} reviews)</span>
                </div>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-description">
                    <p>${product.description}</p>
                </div>
                
                ${product.features ? `
                    <div class="product-features">
                        <h3>Features</h3>
                        <ul>
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="product-availability ${product.availability === 'In Stock' ? 'in-stock' : 'out-of-stock'}">
                    <img src="images/${product.availability === 'In Stock' ? 'check-circle.svg' : 'x-circle.svg'}" alt="${product.availability}">
                    <span>${product.availability}</span>
                </div>
                
                <div class="product-quantity">
                    <span class="quantity-label">Quantity:</span>
                    <div class="quantity-controls">
                        <button class="quantity-btn" id="decrease-quantity">-</button>
                        <input type="number" id="quantity-input" class="quantity-input" value="1" min="1">
                        <button class="quantity-btn" id="increase-quantity">+</button>
                    </div>
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-primary" id="add-to-cart-btn">
                        <img src="images/cart-icon-white.svg" alt="Cart" style="width: 20px; height: 20px; margin-right: 8px;">
                        Add to Cart
                    </button>
                    <a href="products.html" class="btn btn-outline">Back to Products</a>
                </div>
                
                <div class="shipping-info">
                    <h3>Shipping Information</h3>
                    <p>Free shipping on orders over $50. Delivery within 3-5 business days.</p>
                    
                    <h3>Return Policy</h3>
                    <p>30-day money-back guarantee. See our return policy for details.</p>
                </div>
            </div>
        </div>
    `;
    
    productDetailContainer.innerHTML = productHtml;
    
    // Add event listeners
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image');
            mainImage.src = imageUrl;
            
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    const quantityInput = document.getElementById('quantity-input');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    decreaseBtn.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
    });
    
    quantityInput.addEventListener('change', function() {
        let quantity = parseInt(this.value);
        if (isNaN(quantity) || quantity < 1) {
            this.value = 1;
        }
    });
    
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        if (!isNaN(quantity) && quantity >= 1) {
            addToCart(product.id, quantity);
        }
    });
}

// Function to render product reviews
function renderProductReviews(productId) {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer) return;
    
    const productReviews = getReviewsByProductId(productId);
    
    if (productReviews.length === 0) {
        reviewsContainer.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review this product!</p>';
        return;
    }
    
    let reviewsHtml = '<div class="reviews-grid">';
    
    productReviews.forEach(review => {
        reviewsHtml += `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <p class="review-date">${review.date}</p>
                    </div>
                    <div class="review-rating">
                        ${generateStarRating(review.rating)}
                    </div>
                </div>
                <h3 class="review-title">${review.title}</h3>
                <p>${review.comment}</p>
                ${review.images ? `
                    <div class="review-images">
                        ${review.images.map((image, index) => `
                            <div class="review-image">
                                <img src="${image}" alt="Review image ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    });
    
    reviewsHtml += '</div>';
    reviewsContainer.innerHTML = reviewsHtml;
}

// Function to render related products
function renderRelatedProducts(currentProductId, category) {
    const relatedProductsContainer = document.getElementById('related-products-container');
    if (!relatedProductsContainer) return;
    
    const relatedProducts = getRelatedProducts(currentProductId, category);
    
    if (relatedProducts.length === 0) {
        document.querySelector('.related-products').style.display = 'none';
        return;
    }
    
    let relatedProductsHtml = '';
    
    relatedProducts.forEach(product => {
        relatedProductsHtml += generateProductCard(product);
    });
    
    relatedProductsContainer.innerHTML = relatedProductsHtml;
    
    // Add event listeners to the buttons
    document.querySelectorAll('.view-product-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
    
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId, 1);
        });
    });
}
