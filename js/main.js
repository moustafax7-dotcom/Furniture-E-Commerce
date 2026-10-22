const PRODUCTS = [
    { id: 1, category: 'table', name: 'Console Table', price: 10.9, oldPrice: 23.21, image: 'images/image25.png' },
    { id: 2, category: 'sofa', name: 'Marigold Sofa', price: 199.9, oldPrice: 249.9, image: 'images/image7.png' },
    { id: 3, category: 'lighting', name: 'Copper Pendant', price: 18.9, oldPrice: null, image: 'images/image18.png' },
    { id: 4, category: 'chair', name: 'Dining Chair', price: 18.9, oldPrice: 23.21, image: 'images/image21.png' },
    { id: 5, category: 'table', name: 'Round Side Table', price: 18.9, oldPrice: 23.21, image: 'images/image14.png' },
    { id: 6, category: 'lighting', name: 'Wall Lamp', price: 8.9, oldPrice: 10.21, image: 'images/image23.png' },
    { id: 7, category: 'chair', name: 'Sculptural Lounge Chair', price: 7.0, oldPrice: null, image: 'images/image10.png' },
    { id: 8, category: 'chair', name: 'Studio Chair', price: 18.9, oldPrice: 23.21, image: 'images/image20.png' },
    { id: 9, category: 'chair', name: 'Upholstered Chair', price: 23.9, oldPrice: null, image: 'images/image19.png' },
    { id: 10, category: 'lighting', name: 'Minimal Table Lamp', price: 2.9, oldPrice: 4.21, image: 'images/image17.png' },
    { id: 11, category: 'cabinet', name: 'TV Cabinet', price: 120.0, oldPrice: 160.0, image: 'images/image22.png' },
    { id: 12, category: 'cabinet', name: 'Drawer Cabinet', price: 18.9, oldPrice: 23.21, image: 'images/image16.png' },
    { id: 13, category: 'table', name: 'Dining Set', price: 10.9, oldPrice: 23.21, image: 'images/image2.png' },
    { id: 14, category: 'chair', name: 'Cream Lounge Chair', price: 199.9, oldPrice: 249.9, image: 'images/image4.png' },
    { id: 15, category: 'lighting', name: 'Geometric Pendant', price: 8.99, oldPrice: 12.21, image: 'images/image26.png' },
    { id: 16, category: 'decor', name: 'Wooden Shelf', price: 2.12, oldPrice: 5.21, image: 'images/image15.png' },
    { id: 17, category: 'cabinet', name: 'Decorative Sideboard', price: 18.9, oldPrice: 23.21, image: 'images/image24.png' },
    { id: 18, category: 'chair', name: 'Wood Frame Chair', price: 18.9, oldPrice: 23.21, image: 'images/image6.png' },
    { id: 19, category: 'chair', name: 'Wire Lounge Chair', price: 18.9, oldPrice: 23.21, image: 'images/image12.png' },
    { id: 20, category: 'table', name: 'Low Coffee Table', price: 18.9, oldPrice: 23.21, image: 'images/image3.png' },
    { id: 21, category: 'cabinet', name: 'Storage Cabinet', price: 18.9, oldPrice: 23.21, image: 'images/image13.png' },
    { id: 22, category: 'bed', name: 'Bed Frame', price: 15.9, oldPrice: null, image: 'images/image1.png' },
    { id: 23, category: 'chair', name: 'Accent Chair', price: 18.9, oldPrice: 23.21, image: 'images/image9.png' },
    { id: 24, category: 'chair', name: 'Curved Lounge Chair', price: 18.9, oldPrice: 23.21, image: 'images/image5.png' },
];

function getCart() {
    try {
        const stored = localStorage.getItem('emmable_cart');
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(item => item && PRODUCTS.some(p => p.id === item.id) && Number.isInteger(item.qty) && item.qty > 0 && item.qty <= 99);
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem('emmable_cart', JSON.stringify(cart));
    } catch (error) {
        alert('Your browser could not save the cart. Please enable site storage and try again.');
        throw error;
    }
}

function addToCart(productId, qty) {
    qty = Number(qty ?? 1);
    if (!PRODUCTS.some(p => p.id === productId) || !Number.isInteger(qty) || qty < 1) return;
    let cart = getCart();
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.qty = Math.min(99, existing.qty + qty);
    } else {
        cart.push({ id: productId, qty: Math.min(99, qty) });
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
    return Math.round(subtotal * 100) / 100;
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
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close notification"></button>
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

    item.qty = Math.min(99, item.qty + amount);
    if (item.qty < 1) item.qty = 1;

    saveCart(cart);
    renderCartDropdown();
}
function renderCartDropdown() {
    const container = document.getElementById('cartItemsContainer');
    const countEl = document.getElementById('cartCount');
    const subtotalEl = document.getElementById('cartSubtotal');

    if (!container) return;

    const cart = getCart();
    countEl.textContent = cart.reduce((count, item) => count + item.qty, 0);

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
let categories = document.querySelectorAll(".category-menu li");

for (let i = 0; i < categories.length; i++) {
    categories[i].onclick = function () {
        let filter = categories[i].getAttribute("data-filter");

        for (let j = 0; j < categories.length; j++) {
            categories[j].classList.remove("active-category");
        }
        categories[i].classList.add("active-category");
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
    if (!list) return;

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
                    <p class="small text-muted mb-1">Sample collection</p>
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
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.has('id') ? Number(params.get('id')) : PRODUCTS[0].id;
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
    qty = Math.min(99, qty + amount);
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
function guardCheckoutStep() {
    const checkoutMain = document.getElementById('checkout-main-content');
    if (!checkoutMain) return;

    if (getCart().length === 0) {
        window.location.href = 'shopping.html';
    }
}

guardCheckoutStep();
const CATEGORY_ALIASES = {
    chairs: 'chair', tables: 'table', sofas: 'sofa', 'sofa recliner': 'sofa',
    'tv cabinet': 'cabinet', cabinets: 'cabinet', lamp: 'lighting', cushion: 'decor'
};

function productMatchesCategory(product, category) {
    const key = category.trim().toLowerCase();
    if (!key || key === 'all') return true;
    if (key === 'furniture' || key === 'furnitures') {
        return ['chair', 'table', 'sofa', 'cabinet', 'bed'].includes(product.category);
    }
    return product.category === (CATEGORY_ALIASES[key] || key);
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
    if (!grid) return;

    const filtered = getFilteredProducts();
    const emptyState = document.getElementById('productsEmptyState');
    const pagination = document.getElementById('productsPagination');
    const countLabel = document.getElementById('productsCount');

    const params = new URLSearchParams(window.location.search);

    if (filtered.length === 0) {
        grid.classList.add('d-none');
        emptyState.classList.remove('d-none');
        if (pagination) pagination.classList.add('d-none');
    } else {
        grid.classList.remove('d-none');
        emptyState.classList.add('d-none');
        renderProductCardsInto('productsGrid', filtered, true);
        if (pagination) pagination.classList.add('d-none');
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
        sortLabel.textContent = 'Sort by: ' + (sortNames[params.get('sort')] || 'Featured');
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
    window.location.href = 'products.html';
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
function renderHomeNewProducts() {
    const grid = document.getElementById('homeNewProductsGrid');
    if (!grid) return;
    const featured = [
        { id: 2, category: 'furniture' },
        { id: 8, category: 'chairs' },
        { id: 16, category: 'decor' },
        { id: 6, category: 'lighting' },
        { id: 11, category: 'furniture' },
        { id: 15, category: 'lighting' }
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
                        <p class="small text-muted mb-1">Sample collection</p>
                        <p class="fw-bold mt-2 mb-0">$${product.price.toFixed(2)} ${oldPriceHtml}</p>
                    </div>
                </a>
            </div>
        `;
    });

    grid.innerHTML = html;
}

renderHomeNewProducts();
function updateOrderSummary() {
    const subtotalEl = document.getElementById('summarySubtotal');
    if (!subtotalEl) return;

    const subtotal = getCartSubtotal();
    const shipping = 14;
    subtotalEl.textContent = '$' + subtotal.toFixed(2);
    document.getElementById('summaryTotal').textContent = '$' + (subtotal + shipping).toFixed(2);
}

function renderReviewItems() {
    const list = document.getElementById('reviewItemsList');
    if (!list) return;

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
    for (const input of form.querySelectorAll('input[required]')) input.value = input.value.trim();
    if (form.checkValidity() == false) {
        form.classList.add("was-validated");
    } else {
        const fields = ['email', 'fname', 'lname', 'country', 'address', 'city', 'province', 'zip', 'phone'];
        const shipping = Object.fromEntries(fields.map(id => [id, document.getElementById(id).value.trim()]));
        if (Object.values(shipping).some(value => !value)) return;
        try { sessionStorage.setItem('emmable_shipping', JSON.stringify(shipping)); }
        catch { alert('Enable site storage to continue checkout.'); return; }
        window.location.href = "payment.html";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    var paymentForm = document.getElementById("payment-form");
    var placeOrderBtn = document.getElementById("btn-place-order");

    if (paymentForm != null) {
        paymentForm.addEventListener("submit", goToReviewPage);
    }
    if (placeOrderBtn != null) {
        placeOrderBtn.addEventListener("click", goToSuccessPage);
    }
});

function goToReviewPage(event) {
    event.preventDefault();
    var paymentForm = document.getElementById("payment-form");
    if (paymentForm.checkValidity() == true) {
        try { sessionStorage.setItem('emmable_payment', 'demo'); }
        catch { alert('Enable site storage to continue checkout.'); return; }
        window.location.href = "review.html";
    } else {
        paymentForm.reportValidity();
    }
}

function readSession(key) {
    try { return JSON.parse(sessionStorage.getItem(key)); } catch { return null; }
}

function goToSuccessPage() {
    const cart = getCart();
    const shipping = readSession('emmable_shipping');
    if (!cart.length || !shipping) { window.location.href = 'shopping.html'; return; }
    const order = {
        id: 'EM-' + crypto.randomUUID().slice(0, 8).toUpperCase(),
        date: new Date().toISOString(),
        items: cart.map(item => ({ ...item, name: PRODUCTS.find(p => p.id === item.id).name })),
        total: Number((getCartSubtotal() + 14).toFixed(2))
    };
    try {
        sessionStorage.setItem('emmable_order', JSON.stringify(order));
        localStorage.removeItem('emmable_cart');
        sessionStorage.removeItem('emmable_shipping');
        sessionStorage.removeItem('emmable_payment');
    } catch { alert('Could not save the order. Your cart has not been submitted.'); return; }
    window.location.href = 'order-success.html';
}

function initCheckout() {
    const shipping = readSession('emmable_shipping');
    const path = window.location.pathname;
    if ((path.endsWith('payment.html') || path.endsWith('review.html')) && !shipping) {
        window.location.replace('shipping.html');
        return;
    }
    if (path.endsWith('review.html') && sessionStorage.getItem('emmable_payment') !== 'demo') {
        window.location.replace('payment.html');
        return;
    }
    if (shipping) {
        for (const [id, value] of Object.entries(shipping)) {
            const field = document.getElementById(id);
            if (field) field.value = value;
        }
        const address = document.getElementById('reviewShipping');
        if (address) address.textContent = `${shipping.fname} ${shipping.lname}, ${shipping.address}, ${shipping.city}, ${shipping.province}, ${shipping.country}, ${shipping.zip}`;
    }
    const summary = document.getElementById('savedOrder');
    if (summary) {
        const order = readSession('emmable_order');
        summary.textContent = order
            ? `Demo order ${order.id} — ${order.items.reduce((sum, item) => sum + item.qty, 0)} items — $${order.total.toFixed(2)}`
            : 'No saved demo order in this session. Browse the collection to get started.';
    }
}
initCheckout();

if (cartToggleBtn) {
    cartToggleBtn.setAttribute('aria-expanded', 'false');
    cartToggleBtn.addEventListener('click', () => {
        cartToggleBtn.setAttribute('aria-expanded', String(!document.getElementById('cartDropdown').classList.contains('d-none')));
    });
    const closeCart = () => {
        document.getElementById('cartDropdown').classList.add('d-none');
        cartToggleBtn.setAttribute('aria-expanded', 'false');
    };
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') { closeCart(); cartToggleBtn.focus(); }
    });
    document.addEventListener('click', event => {
        if (!event.target.closest('#cartDropdown') && !event.target.closest('#cartToggle')) closeCart();
    });
}
window.addEventListener('storage', event => {
    if (event.key === 'emmable_cart') {
        renderCartDropdown(); renderShoppingCart(); updateOrderSummary(); renderReviewItems();
    }
});

for (const item of categories) {
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); item.click(); }
    });
}

renderProductCardsInto('featuredProducts', PRODUCTS.slice(0, 4), true);
