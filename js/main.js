// ============================================================
// قاعدة بيانات المنتجات - المصدر الوحيد للحقيقة لكل المنتجات
// أي صفحة (products.html, product-details.html, cart.html)
// بتقرا من هنا بدل ما تكتب بياناتها بشكل منفصل
// ============================================================
const PRODUCTS = [
    { id: 1, name: 'C Side Table', price: 10.9, oldPrice: 23.21, image: 'images/image25.png', rating: 4.8, reviews: 102 },
    { id: 2, name: 'Marigold Sofa', price: 199.9, oldPrice: 249.9, image: 'images/image4.png', rating: 4.8, reviews: 102 },
    { id: 3, name: 'Copper Chandelier', price: 18.9, oldPrice: null, image: 'images/image8.png', rating: 4.8, reviews: 102 },
    { id: 4, name: 'Dining chairs', price: 18.9, oldPrice: 23.21, image: 'images/image21.png', rating: 4.8, reviews: 102 },
    { id: 5, name: 'Side Table', price: 18.9, oldPrice: 23.21, image: 'images/image15.png', rating: 4.8, reviews: 102 },
    { id: 6, name: 'Wall Lamp', price: 8.9, oldPrice: 10.21, image: 'images/image26.png', rating: 4.8, reviews: 102 },
    { id: 7, name: 'Cushion Cactus', price: 7.0, oldPrice: null, image: 'images/image10.png', rating: 4.8, reviews: 102 },
    { id: 8, name: 'Studio Chair', price: 18.9, oldPrice: 23.21, image: 'images/image20.png', rating: 4.8, reviews: 102 },
    { id: 9, name: 'Studio Chair', price: 23.9, oldPrice: null, image: 'images/image19.png', rating: 4.8, reviews: 102 },
    { id: 10, name: 'Wood Coaster', price: 2.9, oldPrice: 4.21, image: 'images/image18.png', rating: 4.8, reviews: 102 },
    { id: 11, name: 'TV Cabinet', price: 120.0, oldPrice: 160.0, image: 'images/image22.png', rating: 4.8, reviews: 102 },
    { id: 12, name: 'Studio Chair', price: 18.9, oldPrice: 23.21, image: 'images/image16.png', rating: 4.8, reviews: 102 },
    { id: 13, name: 'High Chair', price: 10.9, oldPrice: 23.21, image: 'images/image14.png', rating: 4.8, reviews: 102 },
    { id: 14, name: 'Classic Sofa', price: 199.9, oldPrice: 249.9, image: 'images/image13.png', rating: 4.8, reviews: 102 },
    { id: 15, name: 'Standing Lamp', price: 8.99, oldPrice: 12.21, image: 'images/image23.png', rating: 4.8, reviews: 102 },
    { id: 16, name: 'Warm Hexagon Lamp', price: 2.12, oldPrice: 5.21, image: 'images/image18.png', rating: 4.8, reviews: 102 },
    { id: 17, name: 'Side Table', price: 18.9, oldPrice: 23.21, image: 'images/image16.png', rating: 4.8, reviews: 102 },
    { id: 18, name: 'Studio Chair', price: 18.9, oldPrice: 23.21, image: 'images/image7.png', rating: 4.8, reviews: 102 },
    { id: 19, name: 'Net Chair', price: 18.9, oldPrice: 23.21, image: 'images/image2.png', rating: 4.8, reviews: 102 },
    { id: 20, name: 'Hanging Shelf', price: 18.9, oldPrice: 23.21, image: 'images/image3.png', rating: 4.8, reviews: 102 },
    { id: 21, name: 'Marmer Cabinet', price: 18.9, oldPrice: 23.21, image: 'images/image15.png', rating: 4.8, reviews: 102 },
    { id: 22, name: 'Wooden Table', price: 15.9, oldPrice: null, image: 'images/image20.png', rating: 4.8, reviews: 102 },
    { id: 23, name: 'Small Cabinet', price: 18.9, oldPrice: 23.21, image: 'images/image13.png', rating: 4.8, reviews: 102 },
    { id: 24, name: 'Wooden Table', price: 18.9, oldPrice: 23.21, image: 'images/image21.png', rating: 4.8, reviews: 102 },
];

// ============================================================
// نظام السلة - بيستخدم localStorage عشان تفضل السلة موجودة
// حتى لو المستخدم قفل المتصفح أو انتقل بين الصفحات
// ============================================================

function getCart() {
    const stored = localStorage.getItem('emmable_cart');
    if (!stored) return [];
    try {
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(item => item && typeof item.id === 'number' && Number.isFinite(item.qty) && item.qty > 0);
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('emmable_cart', JSON.stringify(cart));
}

function addToCart(productId, qty) {
    qty = qty || 1;
    let cart = getCart();
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: productId, qty: qty });
    }

    saveCart(cart);
    renderCartDropdown();
    showCartToast('Added to cart');
}

function getCartSubtotal() {
    const cart = getCart();
    let subtotal = 0;
    cart.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (product) subtotal += product.price * item.qty;
    });
    return subtotal;
}

function showCartToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'position-fixed bottom-0 end-0 p-3';
        container.style.zIndex = '2000';
        document.body.appendChild(container);
    }

    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-white bg-dark border-0';
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    container.appendChild(toastEl);

    if (typeof bootstrap !== 'undefined') {
        const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
        toast.show();
        toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    } else {
        setTimeout(() => toastEl.remove(), 2000);
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCartDropdown();
    showCartToast('Item removed from cart');
}

function changeQty(productId, amount) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += amount;
    if (item.qty < 1) item.qty = 1;

    saveCart(cart);
    renderCartDropdown();
}

// بيرسم محتوى الكارت دروب داون من جديد كل مرة، بناء على بيانات localStorage
function renderCartDropdown() {
    const container = document.getElementById('cartItemsContainer');
    const countEl = document.getElementById('cartCount');
    const subtotalEl = document.getElementById('cartSubtotal');

    if (!container) return; // الصفحة دي مفيهاش كارت دروب داون، منكملش

    const cart = getCart();
    countEl.textContent = cart.length;

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-muted small text-center py-3">Your cart is empty</p>';
        subtotalEl.textContent = '$0.00';
        return;
    }

    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (!product) return;

        const lineTotal = product.price * item.qty;
        subtotal += lineTotal;

        html += `
            <div class="d-flex gap-3 mb-3 pb-3 border-bottom">
                <img src="${product.image}" class="rounded-3 cart-item-img" alt="${product.name}">
                <div class="flex-grow-1">
                    <p class="mb-1 small fw-semibold">${product.name}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="input-group input-group-sm quantity-box">
                            <button class="btn btn-outline-secondary" type="button" onclick="changeQty(${product.id}, -1)" aria-label="Decrease quantity" ${item.qty <= 1 ? 'disabled' : ''}>-</button>
                            <input type="text" class="form-control text-center" value="${item.qty}" readonly aria-label="Quantity">
                            <button class="btn btn-outline-secondary" type="button" onclick="changeQty(${product.id}, 1)" aria-label="Increase quantity">+</button>
                        </div>
                        <span class="fw-bold">$${lineTotal.toFixed(2)}</span>
                    </div>
                </div>
                <button class="btn btn-link text-danger p-0 align-self-start" onclick="removeFromCart(${product.id})" title="Remove" aria-label="Remove item">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
    subtotalEl.textContent = '$' + subtotal.toFixed(2);
}

function toggleCartDropdown(e) {
    e.preventDefault();
    document.getElementById('cartDropdown').classList.toggle('d-none');
}

const cartToggleBtn = document.getElementById('cartToggle');
if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', toggleCartDropdown);
    renderCartDropdown();
}


// ============================================================
// كود script.js (فلترة المنتجات في الصفحة الرئيسية - index.html)
// ============================================================
let categories = document.querySelectorAll(".category-menu li");

for (let i = 0; i < categories.length; i++) {
    categories[i].onclick = function () {
        let filter = categories[i].getAttribute("data-filter");

        for (let j = 0; j < categories.length; j++) {
            categories[j].classList.remove("active-category");
        }
        categories[i].classList.add("active-category");

        // بنقرا .product-item وقت الدوسة نفسها مش وقت تحميل الصفحة،
        // عشان الكروت بقت بتتبني ديناميكيًا بعد كده (renderHomeNewProducts)
        let productItems = document.querySelectorAll(".product-item");
        for (let j = 0; j < productItems.length; j++) {
            let productCategory = productItems[j].getAttribute("data-category");
            if (filter == "all" || filter == productCategory) {
                productItems[j].style.display = "block";
            } else {
                productItems[j].style.display = "none";
            }
        }
    };
}


// ============================================================
// كود صفحة السلة الكاملة (shopping.html) - بيقرا من نفس localStorage
// ============================================================
function removeCartRow(productId) {
    removeFromCart(productId);
    renderShoppingCart();
}

function changeCartRowQty(productId, action) {
    const amount = action === 'plus' ? 1 : -1;
    changeQty(productId, amount);
    renderShoppingCart();
}

function renderShoppingCart() {
    const list = document.getElementById('cartItemsList');
    if (!list) return; // مش في صفحة السلة

    const cart = getCart();
    const emptyState = document.getElementById('emptyCartState');
    const totalRow = document.getElementById('cartTotalRow');
    const continueBtn = document.getElementById('continueToShippingBtn');

    if (cart.length === 0) {
        list.innerHTML = '';
        emptyState.classList.remove('d-none');
        totalRow.classList.add('d-none');
        continueBtn.classList.add('d-none');
        return;
    }

    emptyState.classList.add('d-none');
    totalRow.classList.remove('d-none');
    continueBtn.classList.remove('d-none');

    let html = '';
    cart.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (!product) return;

        html += `
            <div id="item${product.id}" class="d-flex justify-content-between align-items-center border-bottom py-3">
                <div class="d-flex align-items-center">
                    <img src="${product.image}" class="item-photo me-3" alt="${product.name}">
                    <div>
                        <p class="fw-bold mb-1">${product.name}</p>
                        <p class="fw-bold mb-1">$<span id="price${product.id}">${product.price.toFixed(2)}</span></p>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-outline-secondary qty-btn" onclick="changeCartRowQty(${product.id}, 'minus')" aria-label="Decrease quantity" ${item.qty <= 1 ? 'disabled' : ''}>-</button>
                            <span id="qty${product.id}" class="mx-2">${item.qty}</span>
                            <button class="btn btn-outline-secondary qty-btn" onclick="changeCartRowQty(${product.id}, 'plus')" aria-label="Increase quantity">+</button>
                        </div>
                    </div>
                </div>
                <button class="trash-btn" onclick="removeCartRow(${product.id})" aria-label="Remove item" title="Remove item"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;
    });

    list.innerHTML = html;
    document.getElementById('total').textContent = getCartSubtotal().toFixed(2);
}

renderShoppingCart();


// ============================================================
// صفحة تفاصيل المنتج (product-details.html) - بتقرا id من الرابط
// ============================================================
function getRelatedProducts(currentId, count, offset) {
    offset = offset || 0;
    const others = PRODUCTS.filter(p => p.id !== currentId);
    const result = [];
    for (let i = 0; i < count && i < others.length; i++) {
        result.push(others[(i + offset) % others.length]);
    }
    return result;
}

function renderProductCardsInto(containerId, products, withAddToCart) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    products.forEach(product => {
        const oldPriceHtml = product.oldPrice
            ? `<span class="text-muted text-decoration-line-through small">$${product.oldPrice.toFixed(2)}</span>`
            : '';
        const addToCartBtn = withAddToCart
            ? `<button class="btn btn-dark btn-sm w-100 mt-2 rounded-pill" onclick="addToCart(${product.id}, 1)"><i class="fa-solid fa-cart-plus me-1"></i> Add to Cart</button>`
            : '';
        html += `
            <div class="col-6 col-md-3">
                <a href="product-details.html?id=${product.id}" class="text-decoration-none text-dark">
                    <img src="${product.image}" class="img-fluid rounded-3 mb-3" alt="${product.name}" loading="lazy">
                    <p class="mb-1 fw-semibold">${product.name}</p>
                    <p class="small text-warning mb-1">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                        <span class="text-dark">${product.rating} (${product.reviews} reviews)</span>
                    </p>
                    <p class="mb-0"><span class="fw-bold">$${product.price.toFixed(2)}</span> ${oldPriceHtml}</p>
                </a>
                ${addToCartBtn}
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderProductDetailsPage() {
    const root = document.getElementById('productDetailsRoot');
    if (!root) return; // مش في صفحة تفاصيل المنتج

    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id')) || PRODUCTS[0].id;
    const product = PRODUCTS.find(p => p.id === productId);

    if (!product) {
        root.innerHTML = `
            <div class="text-center py-5">
                <i class="fa-solid fa-box-open fs-1 text-muted mb-3"></i>
                <h4 class="fw-bold mb-2">Product not found</h4>
                <p class="text-muted mb-4">The product you're looking for doesn't exist or may have been removed.</p>
                <a href="products.html" class="btn btn-primary rounded-pill px-4">Back to Products</a>
            </div>
        `;
        return;
    }

    document.getElementById('breadcrumbProductName').textContent = product.name;
    document.getElementById('detailImage').src = product.image;
    document.getElementById('detailImage').alt = product.name;
    document.getElementById('detailName').textContent = product.name;
    document.title = product.name + ' | Emmable';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', product.name + ' — $' + product.price.toFixed(2) + ' at Emmable.');
    document.getElementById('detailPrice').textContent = '$' + product.price.toFixed(2);

    const oldPriceEl = document.getElementById('detailOldPrice');
    if (product.oldPrice) {
        oldPriceEl.textContent = '$' + product.oldPrice.toFixed(2);
        oldPriceEl.classList.remove('d-none');
    } else {
        oldPriceEl.classList.add('d-none');
    }

    document.getElementById('detailAddToCartBtn').setAttribute('data-product-id', product.id);

    renderProductCardsInto('goodMatchingList', getRelatedProducts(product.id, 4, 0));
    renderProductCardsInto('relatedProductsList', getRelatedProducts(product.id, 4, 4));
}

function changeDetailQty(amount) {
    const input = document.getElementById('detailQtyInput');
    let qty = parseInt(input.value) || 1;
    qty += amount;
    if (qty < 1) qty = 1;
    input.value = qty;

    document.getElementById('detailQtyMinus').disabled = (qty === 1);
}

function addDetailProductToCart() {
    const btn = document.getElementById('detailAddToCartBtn');
    const productId = parseInt(btn.getAttribute('data-product-id'));
    const qty = parseInt(document.getElementById('detailQtyInput').value) || 1;
    addToCart(productId, qty);
}

renderProductDetailsPage();


// ============================================================
// منع تخطي خطوات الـ checkout بدون منتجات في السلة
// ============================================================
function guardCheckoutStep() {
    const checkoutMain = document.getElementById('checkout-main-content');
    if (!checkoutMain) return; // مش في صفحة checkout

    if (getCart().length === 0) {
        window.location.href = 'shopping.html';
    }
}

guardCheckoutStep();


// ============================================================
// Products Experience: فلترة، بحث، ترتيب (products.html)
// ============================================================

// كلمات مرادفة لكل فئة، لأن أسماء المنتجات مبتطابقش أسماء الفئات دايمًا حرفيًا
const CATEGORY_SYNONYMS = {
    'sofa recliner': ['sofa'],
    'furnitures': ['table', 'sofa', 'cabinet'],
    'furniture': ['table', 'sofa', 'cabinet'],
    'decor': ['cushion', 'coaster', 'shelf'],
    'lighting': ['lamp', 'chandelier']
};

function productMatchesCategory(product, category) {
    if (!category) return true;
    const name = product.name.toLowerCase();
    const cat = category.toLowerCase();

    if (name.includes(cat)) return true;

    const synonyms = CATEGORY_SYNONYMS[cat] || [];
    return synonyms.some(keyword => name.includes(keyword));
}

function getFilteredProducts() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || '';
    const search = (params.get('search') || '').toLowerCase().trim();
    const maxPrice = parseFloat(params.get('maxPrice'));
    const sort = params.get('sort') || '';

    let result = PRODUCTS.filter(p => productMatchesCategory(p, category));

    if (search) {
        result = result.filter(p => p.name.toLowerCase().includes(search));
    }

    if (!isNaN(maxPrice)) {
        result = result.filter(p => p.price <= maxPrice);
    }

    if (sort === 'price-asc') {
        result = result.slice().sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
        result = result.slice().sort((a, b) => b.price - a.price);
    } else if (sort === 'name-asc') {
        result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
        result = result.slice().sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
}

function renderProductsPage() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return; // مش في products.html

    const filtered = getFilteredProducts();
    const emptyState = document.getElementById('productsEmptyState');
    const pagination = document.getElementById('productsPagination');
    const countLabel = document.getElementById('productsCount');

    const params = new URLSearchParams(window.location.search);
    const hasFilters = params.get('category') || params.get('search') || params.get('maxPrice') || params.get('sort');

    if (filtered.length === 0) {
        grid.classList.add('d-none');
        emptyState.classList.remove('d-none');
        if (pagination) pagination.classList.add('d-none');
    } else {
        grid.classList.remove('d-none');
        emptyState.classList.add('d-none');
        renderProductCardsInto('productsGrid', filtered, true);
        if (pagination) pagination.classList.toggle('d-none', !!hasFilters);
    }

    if (countLabel) {
        countLabel.textContent = filtered.length + (filtered.length === 1 ? ' product' : ' products');
    }

    const sortLabel = document.getElementById('sortLabel');
    if (sortLabel) {
        const sortNames = {
            'price-asc': 'Price: Low to High',
            'price-desc': 'Price: High to Low',
            'name-asc': 'Name: A to Z',
            'name-desc': 'Name: Z to A'
        };
        sortLabel.textContent = 'Sort by: ' + (sortNames[params.get('sort')] || 'Populer');
    }
}

function applySort(sortValue) {
    const params = new URLSearchParams(window.location.search);
    if (sortValue) {
        params.set('sort', sortValue);
    } else {
        params.delete('sort');
    }
    window.location.search = params.toString();
}

function applyPriceFilter() {
    const value = document.getElementById('priceRange').value;
    const params = new URLSearchParams(window.location.search);
    params.set('maxPrice', value);
    window.location.search = params.toString();
}

function clearAllFilters() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    // الفلاتر بتتمسح، بس الفئة اللي جاية من هوم بيدج (لو موجودة) بتفضل زي ما هي
    window.location.href = 'products.html' + (category ? '?category=' + encodeURIComponent(category) : '');
}

function performSiteSearch() {
    const input = document.getElementById('siteSearchInput');
    const value = input.value.trim();
    if (!value) return;

    if (window.location.pathname.endsWith('products.html')) {
        const params = new URLSearchParams(window.location.search);
        params.set('search', value);
        window.location.search = params.toString();
    } else {
        window.location.href = 'products.html?search=' + encodeURIComponent(value);
    }
}

function initProductsPageControls() {
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        const params = new URLSearchParams(window.location.search);
        const maxPrice = params.get('maxPrice');
        if (maxPrice) priceRange.value = maxPrice;

        const priceLabel = document.getElementById('priceRangeLabel');
        const updateLabel = () => {
            if (priceLabel) priceLabel.textContent = 'Up to $' + parseFloat(priceRange.value).toFixed(2);
        };
        updateLabel();
        priceRange.addEventListener('input', updateLabel);
    }

    const searchInput = document.getElementById('siteSearchInput');
    if (searchInput) {
        const params = new URLSearchParams(window.location.search);
        const currentSearch = params.get('search');
        if (currentSearch) searchInput.value = currentSearch;

        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') performSiteSearch();
        });
    }
}

renderProductsPage();
initProductsPageControls();


// ============================================================
// New Products (index.html) - نفس PRODUCTS بدل بيانات منفصلة
// ============================================================
function renderHomeNewProducts() {
    const grid = document.getElementById('homeNewProductsGrid');
    if (!grid) return; // مش في index.html

    // اختيار يدوي لـ 6 منتجات حقيقية موزعة على الفئات الأربعة الموجودة في التصميم
    const featured = [
        { id: 2, category: 'furniture' },
        { id: 8, category: 'chairs' },
        { id: 7, category: 'decor' },
        { id: 6, category: 'lighting' },
        { id: 11, category: 'furniture' },
        { id: 16, category: 'lighting' }
    ];

    let html = '';
    featured.forEach(entry => {
        const product = PRODUCTS.find(p => p.id === entry.id);
        if (!product) return;

        const oldPriceHtml = product.oldPrice
            ? `<del class="small text-secondary">$${product.oldPrice.toFixed(2)}</del>`
            : '';

        html += `
            <div class="col-lg-4 col-md-6 product-item" data-category="${entry.category}">
                <a href="product-details.html?id=${product.id}" class="text-decoration-none text-dark">
                    <div class="product-card text-center">
                        <img src="${product.image}" class="w-100 rounded-3 object-fit-cover" alt="${product.name}" loading="lazy">
                        <h5 class="fw-bold mt-3">${product.name}</h5>
                        <div class="rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <span class="text-dark ms-2">${product.rating} (${product.reviews} reviews)</span>
                        </div>
                        <p class="fw-bold mt-2 mb-0">$${product.price.toFixed(2)} ${oldPriceHtml}</p>
                    </div>
                </a>
            </div>
        `;
    });

    grid.innerHTML = html;
}

renderHomeNewProducts();


// ============================================================
// ملخص الطلب في صفحات الدفع والمراجعة (payment.html / review.html)
// ============================================================
function updateOrderSummary() {
    const subtotalEl = document.getElementById('summarySubtotal');
    if (!subtotalEl) return; // مفيش Order Summary في الصفحة دي

    const subtotal = getCartSubtotal();
    const shipping = 14;
    subtotalEl.textContent = '$' + subtotal.toFixed(2);
    document.getElementById('summaryTotal').textContent = '$' + (subtotal + shipping).toFixed(2);
}

function renderReviewItems() {
    const list = document.getElementById('reviewItemsList');
    if (!list) return; // مش في صفحة المراجعة

    const cart = getCart();
    let html = '';

    cart.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (!product) return;

        html += `
            <div class="d-flex align-items-center p-4 border-bottom">
                <img src="${product.image}" class="checkout-item-thumb rounded me-4" alt="${product.name}">
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between">
                        <h6 class="fw-bold mb-1">${product.name}</h6>
                        <span class="fw-bold">$${(product.price * item.qty).toFixed(2)}</span>
                    </div>
                    <p class="text-muted small mb-0">Qty: ${item.qty}</p>
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}

updateOrderSummary();
renderReviewItems();


function checkForm(event) {
    event.preventDefault();
    const form = document.getElementById("shipForm");
    if (form.checkValidity() == false) {
        form.classList.add("was-validated");
    } else {
        window.location.href = "payment.html";
    }
}


// ============================================================
// كود صفحات الدفع والمراجعة (payment.html / review.html)
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    var creditCardRadio = document.getElementById("creditCardRadio");
    var paypalRadio = document.getElementById("paypalRadio");
    var paymentForm = document.getElementById("payment-form");
    var placeOrderBtn = document.getElementById("btn-place-order");
    var cardNumberInput = document.getElementById("cardNumber");

    if (cardNumberInput != null) {
        cardNumberInput.addEventListener("input", formatCardNumber);
    }
    if (creditCardRadio != null && paypalRadio != null) {
        creditCardRadio.addEventListener("click", toggleCreditCardForm);
        paypalRadio.addEventListener("click", toggleCreditCardForm);
    }
    if (paymentForm != null) {
        paymentForm.addEventListener("submit", goToReviewPage);
    }
    if (placeOrderBtn != null) {
        placeOrderBtn.addEventListener("click", goToSuccessPage);
    }
});

function toggleCreditCardForm() {
    var creditCardRadio = document.getElementById("creditCardRadio");
    var creditCardForm = document.getElementById("creditCardForm");
    creditCardForm.style.display = creditCardRadio.checked ? "flex" : "none";
}

function goToReviewPage(event) {
    event.preventDefault();
    var paymentForm = document.getElementById("payment-form");
    if (paymentForm.checkValidity() == true) {
        window.location.href = "review.html";
    } else {
        paymentForm.reportValidity();
    }
}

function goToSuccessPage() {
    localStorage.removeItem('emmable_cart');
    window.location.href = "order-success.html";
}

function formatCardNumber(event) {
    var value = event.target.value.replace(/\D/g, "");
    value = value.substring(0, 16);
    var formattedValue = "";
    for (var i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 == 0) formattedValue += " ";
        formattedValue += value[i];
    }
    event.target.value = formattedValue;
}
