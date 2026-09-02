document.addEventListener('DOMContentLoaded', () => {
    const creditRadio = document.getElementById('creditCardRadio');
    const paypalRadio = document.getElementById('paypalRadio');
    const ccForm = document.getElementById('credit-card-form');
    const ccInput = document.getElementById('cardNumber');
    const paymentForm = document.getElementById('payment-form');
    const btnPlaceOrder = document.getElementById('btn-place-order');

    if (creditRadio && paypalRadio && ccForm) {
        const toggleForm = () => {
            ccForm.style.display = creditRadio.checked ? 'flex' : 'none';
            const inputs = ccForm.querySelectorAll('input, select');
            inputs.forEach(input => input.required = creditRadio.checked);
        };
        creditRadio.addEventListener('change', toggleForm);
        paypalRadio.addEventListener('change', toggleForm);
        toggleForm();
    }

    if (ccInput) {
        ccInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
        });
    }

    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'review.html';
        });
    }

    if (btnPlaceOrder) {
        btnPlaceOrder.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Order Placed Successfully!');
            window.location.href = 'payment.html';
        });
    }
});

fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });


fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });