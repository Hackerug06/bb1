// Product data
const products = [
    {
        id: 'bottle-classic',
        name: 'Classic Baby Bottle',
        description: 'Our classic anti-colic baby bottle with a soft silicone nipple for natural feeding.',
        price: 12.99,
        image: 'images/bottle-classic.png',
        gallery: [
            'images/bottle-classic-1.png',
            'images/bottle-classic-2.png',
            'images/bottle-classic-3.png',
            'images/bottle-classic-4.png'
        ],
        category: 'Bottles',
        features: [
            'Anti-colic vent system',
            'BPA-free materials',
            'Soft silicone nipple',
            'Easy to clean',
            'Dishwasher safe'
        ],
        rating: 4,
        reviewCount: 128,
        availability: 'In Stock',
        isBestSeller: true
    },
    {
        id: 'bottle-wide-neck',
        name: 'Wide Neck Baby Bottle',
        description: 'Wide neck bottle designed to mimic breastfeeding for a smooth transition between breast and bottle.',
        price: 14.99,
        image: 'images/bottle-wide.png',
        gallery: [
            'images/bottle-wide-1.png',
            'images/bottle-wide-2.png',
            'images/bottle-wide-3.png'
        ],
        category: 'Bottles',
        features: [
            'Wide neck design',
            'Breast-like nipple shape',
            'Anti-colic system',
            'BPA-free materials',
            'Easy to clean and assemble'
        ],
        rating: 5,
        reviewCount: 94,
        availability: 'In Stock',
        isNew: true,
        isBestSeller: true
    },
    {
        id: 'bottle-glass',
        name: 'Premium Glass Baby Bottle',
        description: 'Eco-friendly glass bottle that\'s free from harmful chemicals and easy to clean.',
        price: 18.99,
        image: 'images/bottle-glass.png',
        gallery: [
            'images/bottle-glass-1.png',
            'images/bottle-glass-2.png'
        ],
        category: 'Bottles',
        features: [
            'Medical-grade glass',
            'Thermal shock resistant',
            'Silicone sleeve for grip',
            'Anti-colic vent system',
            'Dishwasher safe'
        ],
        rating: 4,
        reviewCount: 76,
        availability: 'In Stock'
    },
    {
        id: 'bottle-starter-set',
        name: 'Newborn Starter Set',
        description: 'Complete starter set with everything you need for feeding your newborn.',
        price: 39.99,
        image: 'images/bottle-set.png',
        category: 'Sets',
        features: [
            '3 anti-colic bottles (4oz)',
            '2 anti-colic bottles (8oz)',
            'Bottle brush',
            '6 extra nipples (various flow rates)',
            'Sterilizer box'
        ],
        rating: 5,
        reviewCount: 52,
        availability: 'In Stock',
        isBestSeller: true
    },
    {
        id: 'nipples-slow-flow',
        name: 'Slow Flow Nipples (0-3m)',
        description: 'Slow flow nipples designed for newborns and young babies up to 3 months.',
        price: 8.99,
        image: 'images/nipples-slow.png',
        category: 'Accessories',
        features: [
            'Pack of 3',
            'Slow flow rate',
            'Soft silicone material',
            'Compatible with all BBS bottles',
            'BPA-free'
        ],
        rating: 4,
        reviewCount: 38,
        availability: 'In Stock'
    },
    {
        id: 'nipples-medium-flow',
        name: 'Medium Flow Nipples (3-6m)',
        description: 'Medium flow nipples designed for babies 3-6 months old.',
        price: 8.99,
        image: 'images/nipples-medium.png',
        category: 'Accessories',
        features: [
            'Pack of 3',
            'Medium flow rate',
            'Soft silicone material',
            'Compatible with all BBS bottles',
            'BPA-free'
        ],
        rating: 4,
        reviewCount: 29,
        availability: 'In Stock'
    },
    {
        id: 'bottle-brush',
        name: 'Bottle & Nipple Brush Set',
        description: 'Specially designed brush set for thorough cleaning of bottles and nipples.',
        price: 9.99,
        image: 'images/bottle-brush.png',
        category: 'Accessories',
        features: [
            'Dual-ended design',
            'Soft bristles for bottles',
            'Nipple cleaner',
            'Non-slip handle',
            'Dishwasher safe'
        ],
        rating: 4,
        reviewCount: 45,
        availability: 'In Stock'
    },
    {
        id: 'sterilizer-box',
        name: 'Microwave Sterilizer Box',
        description: 'Quick and easy sterilization for bottles, nipples, and accessories.',
        price: 24.99,
        image: 'images/sterilizer.png',
        category: 'Accessories',
        features: [
            'Sterilizes in 3 minutes',
            'Holds up to 4 bottles',
            'Kills 99.9% of harmful germs',
            'BPA-free materials',
            'Compact design'
        ],
        rating: 5,
        reviewCount: 33,
        availability: 'In Stock',
        isNew: true
    },
    {
        id: 'travel-set',
        name: 'Travel Bottle Set',
        description: 'Convenient travel set for feeding on the go.',
        price: 29.99,
        image: 'images/travel-set.png',
        category: 'Sets',
        features: [
            '2 anti-colic bottles (8oz)',
            'Insulated bottle carrier',
            'Formula dispenser',
            'Cleaning brush',
            'Compact design for travel'
        ],
        rating: 4,
        reviewCount: 27,
        availability: 'In Stock'
    }
];

// Reviews data
const reviews = [
    {
        id: 'review-1',
        productId: 'bottle-classic',
        name: 'Sarah M.',
        date: 'May 10, 2023',
        rating: 5,
        title: 'Best bottle we\'ve tried!',
        comment: 'After trying several different bottles, this is the only one my baby would take. The anti-colic feature really works and has helped reduce my baby\'s discomfort after feeding. Highly recommend!'
    },
    {
        id: 'review-2',
        productId: 'bottle-classic',
        name: 'James K.',
        date: 'April 22, 2023',
        rating: 4,
        title: 'Great quality',
        comment: 'These bottles are well-made and easy to clean. The only reason I\'m giving 4 stars instead of 5 is that the measurements on the side can be a bit hard to read.'
    },
    {
        id: 'review-3',
        productId: 'bottle-classic',
        name: 'Emily T.',
        date: 'March 15, 2023',
        rating: 5,
        title: 'Perfect for my twins',
        comment: 'I have twins and these bottles have been a lifesaver. Easy to clean, no leaks, and both babies took to them right away. Will definitely be ordering more!'
    },
    {
        id: 'review-4',
        productId: 'bottle-wide-neck',
        name: 'Michael P.',
        date: 'May 5, 2023',
        rating: 5,
        title: 'Great for breastfed babies',
        comment: 'My wife is breastfeeding but I wanted to be able to feed our daughter too. These bottles made the transition between breast and bottle seamless. No nipple confusion at all!'
    },
    {
        id: 'review-5',
        productId: 'bottle-wide-neck',
        name: 'Lisa R.',
        date: 'April 18, 2023',
        rating: 5,
        title: 'Worth every penny',
        comment: 'A bit more expensive than some other bottles, but absolutely worth it. The wide neck makes it so easy to clean and the anti-colic system really works. My baby has had much less gas since switching to these.'
    },
    {
        id: 'review-6',
        productId: 'bottle-glass',
        name: 'David W.',
        date: 'May 12, 2023',
        rating: 4,
        title: 'Eco-friendly choice',
        comment: 'Love that these are glass instead of plastic. They\'re surprisingly durable and the silicone sleeve provides good grip. Only giving 4 stars because they\'re a bit heavy for my little one to hold herself.'
    },
    {
        id: 'review-7',
        productId: 'bottle-starter-set',
        name: 'Jennifer L.',
        date: 'March 30, 2023',
        rating: 5,
        title: 'Perfect registry item',
        comment: 'I received this as a baby shower gift and it\'s been the most useful item by far. Has everything you need and the quality is excellent. Would make a great gift for any new parent!'
    }
];

// Function to generate star rating HTML
function generateStarRating(rating) {
    let starsHtml = '';
    for (let i = 1; i &lt;= 5; i++) {
        if (i &lt;= rating) {
            starsHtml += '<img src="images/star.svg" alt="Star">';
        } else {
            starsHtml += '<img src="images/star-empty.svg" alt="Empty Star">';
        }
    }
    return starsHtml;
}

// Function to generate product card HTML
function generateProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.isNew ? '<span class="product-badge">NEW</span>' : ''}
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span>(${product.reviewCount})</span>
                </div>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="btn btn-outline view-product-btn" data-id="${product.id}">Details</button>
                    <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
                        <img src="images/cart-icon-white.svg" alt="Cart" style="width: 16px; height: 16px; margin-right: 5px;">
                        Add
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Function to load best sellers on home page
function loadBestSellers() {
    const bestSellersContainer = document.getElementById('best-sellers-container');
    if (!bestSellersContainer) return;

    const bestSellers = products.filter(product => product.isBestSeller);
    let bestSellersHtml = '';

    bestSellers.forEach(product => {
        bestSellersHtml += generateProductCard(product);
    });

    bestSellersContainer.innerHTML = bestSellersHtml;

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

// Function to load all products on products page
function loadAllProducts() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    let productsHtml = '';

    products.forEach(product => {
        productsHtml += generateProductCard(product);
    });

    productsContainer.innerHTML = productsHtml;

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

    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                const productCards = document.querySelectorAll('.product-card');
                productCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Function to get product by ID
function getProductById(productId) {
    return products.find(product => product.id === productId);
}

// Function to get reviews by product ID
function getReviewsByProductId(productId) {
    return reviews.filter(review => review.productId === productId);
}

// Function to get related products by category
function getRelatedProducts(currentProductId, category) {
    return products.filter(product => product.category === category && product.id !== currentProductId).slice(0, 3);
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadBestSellers();
    loadAllProducts();
});
