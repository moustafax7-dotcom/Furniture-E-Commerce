// بيانات المنتجات اللي في الكارت
const cartItems = [
    { id: 1, price: 28.88, qty: 1 },
    { id: 2, price: 8.00, qty: 1 }
];

// تغيير كمية منتج معين
function changeQty(itemId, amount) {
    const item = cartItems.find(i => i.id === itemId);
    item.qty += amount;
    if (item.qty < 1) item.qty = 1;

    document.getElementById('qty' + itemId).value = item.qty;
    updateCartSummary();
}

// تحديث العدد والسعر الإجمالي
function updateCartSummary() {
    document.getElementById('cartCount').textContent = cartItems.length;

    let subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
        subtotal += cartItems[i].price * cartItems[i].qty;
    }
    document.getElementById('cartSubtotal').textContent = '$' + subtotal.toFixed(2);
}

// فتح وقفل الكارت
function toggleCartDropdown(e) {
    e.preventDefault();
    document.getElementById('cartDropdown').classList.toggle('d-none');
}

document.getElementById('cartToggle').addEventListener('click', toggleCartDropdown);
updateCartSummary();