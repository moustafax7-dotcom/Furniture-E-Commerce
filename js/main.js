const cartItems = [
    { id: 1, price: 28.88, qty: 1 },
    { id: 2, price: 8.00, qty: 1 }
];

function changeQty(itemId, amount) {
    const item = cartItems.find(i => i.id === itemId);
    item.qty += amount;
    if (item.qty < 1) item.qty = 1;

    document.getElementById('qty' + itemId).value = item.qty;
    updateCartSummary();
}

function updateCartSummary() {
    document.getElementById('cartCount').textContent = cartItems.length;

    let subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
        subtotal += cartItems[i].price * cartItems[i].qty;
    }
    document.getElementById('cartSubtotal').textContent = '$' + subtotal.toFixed(2);
}

function toggleCartDropdown(e) {
    e.preventDefault();
    document.getElementById('cartDropdown').classList.toggle('d-none');
}

fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
        document.getElementById('cartToggle').addEventListener('click', toggleCartDropdown);
        updateCartSummary();
    });

fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });