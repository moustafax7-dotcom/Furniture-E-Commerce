document.addEventListener('DOMContentLoaded', function() {
    function populateDateDropdowns() {
        const monthSelect = document.getElementById('expMonth');
        const yearSelect = document.getElementById('expYear');

        if (monthSelect && yearSelect) {
            monthSelect.innerHTML = '<option value="" selected disabled>Month</option>';
            const months = [
                {val: "01", name: "January"}, {val: "02", name: "February"}, 
                {val: "03", name: "March"}, {val: "04", name: "April"}, 
                {val: "05", name: "May"}, {val: "06", name: "June"}, 
                {val: "07", name: "July"}, {val: "08", name: "August"}, 
                {val: "09", name: "September"}, {val: "10", name: "October"}, 
                {val: "11", name: "November"}, {val: "12", name: "December"}
            ];
            months.forEach(m => {
                monthSelect.innerHTML += `<option value="${m.val}">${m.name}</option>`;
            });

            yearSelect.innerHTML = '<option value="" selected disabled>Year</option>';
            const currentYear = new Date().getFullYear();
            for (let i = 0; i < 10; i++) {
                const yr = currentYear + i;
                yearSelect.innerHTML += `<option value="${yr}">${yr}</option>`;
            }
        }
    }

    populateDateDropdowns();

    function calculateSummary(subtotalElementId, taxElementId, shippingElementId, totalElementId) {
        const cartItems = JSON.parse(localStorage.getItem('cartData')) || [];
        const shippingInfo = JSON.parse(localStorage.getItem('shippingData')) || { cost: 0 };
        
        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.price * item.qty;
        });
        
        const tax = 0.00;
        const shipping = cartItems.length > 0 ? shippingInfo.cost : 0;
        const total = cartItems.length > 0 ? (subtotal + tax + shipping) : 0;

        const subEl = document.getElementById(subtotalElementId);
        if (subEl) {
            subEl.innerText = `$${subtotal.toFixed(2)}`;
            document.getElementById(taxElementId).innerText = `$${tax.toFixed(2)}`;
            document.getElementById(shippingElementId).innerText = `$${shipping.toFixed(2)}`;
            document.getElementById(totalElementId).innerText = `$${total.toFixed(2)}`;
        }
    }

    calculateSummary('summary-subtotal', 'summary-tax', 'summary-shipping', 'summary-total');
    calculateSummary('review-subtotal', 'review-tax', 'review-shipping', 'review-total');

    const creditRadio = document.getElementById('creditCardRadio');
    const paypalRadio = document.getElementById('paypalRadio');
    const creditCardForm = document.getElementById('credit-card-form');

    function togglePaymentForm() {
        if (creditRadio && paypalRadio && creditCardForm) {
            if (creditRadio.checked) {
                creditCardForm.style.display = 'flex';
            } else {
                creditCardForm.style.display = 'none';
            }
        }
    }

    if (creditRadio && paypalRadio) {
        creditRadio.addEventListener('change', togglePaymentForm);
        paypalRadio.addEventListener('change', togglePaymentForm);
        togglePaymentForm();
    }

    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            e.target.value = formattedValue;
        });
    }

    const btnNext = document.getElementById('btn-next');
    if (btnNext) {
        btnNext.addEventListener('click', function(e) {
            e.preventDefault();

            let capturedPayment = {};

            if (creditRadio.checked) {
                const cardNum = cardNumberInput.value.replace(/\s/g, '');
                const cardName = document.getElementById('cardName').value.trim();
                const month = document.getElementById('expMonth').value;
                const year = document.getElementById('expYear').value;
                const ccv = document.getElementById('ccv').value.trim();

                if (cardNum.length < 15 || !cardName || !month || !year || ccv.length < 3) {
                    alert('Please fill out all credit card fields correctly.');
                    return;
                }

                let cardType = 'Visa';
                if (cardNum.startsWith('5')) {
                    cardType = 'Mastercard';
                } else if (cardNum.startsWith('3')) {
                    cardType = 'Amex';
                }

                capturedPayment = {
                    type: cardType,
                    last4: cardNum.slice(-4)
                };
            } else {
                capturedPayment = {
                    type: 'Paypal',
                    last4: ''
                };
            }

            localStorage.setItem('paymentData', JSON.stringify(capturedPayment));
            window.location.href = 'review.html';
        });
    }

    const reviewProductList = document.getElementById('dynamic-product-list');
    if (reviewProductList) {
        const cartItems = JSON.parse(localStorage.getItem('cartData')) || [];
        reviewProductList.innerHTML = '';

        if (cartItems.length === 0) {
            reviewProductList.innerHTML = `<div class="p-4 text-center text-muted">No items in cart.</div>`;
        } else {
            cartItems.forEach(item => {
                reviewProductList.innerHTML += `
                    <div class="d-flex align-items-center p-4 border-bottom">
                        <div class="bg-light rounded me-4 d-flex justify-content-center align-items-center" style="width: 80px; height: 80px;">
                            <i class="fa-solid fa-image text-muted fs-3"></i>
                        </div>
                        <div class="flex-grow-1">
                            <div class="d-flex justify-content-between">
                                <h6 class="fw-bold mb-1">${item.name}</h6>
                                <span class="fw-bold">$${item.price.toFixed(2)}</span>
                            </div>
                            <p class="text-muted small mb-0">Total package weight: ${item.weight}</p>
                            <p class="text-muted small mb-0">Qty: ${item.qty}</p>
                        </div>
                    </div>
                `;
            });
        }

        const paymentData = JSON.parse(localStorage.getItem('paymentData'));
        const paymentMethodEl = document.getElementById('review-payment-method');
        
        if (paymentData) {
            if (paymentData.type === 'Paypal') {
                paymentMethodEl.innerHTML = `Paypal <i class="fa-brands fa-cc-paypal text-primary ms-2 fs-5 align-middle"></i>`;
            } else {
                paymentMethodEl.innerHTML = `${paymentData.type} **${paymentData.last4} <i class="fa-brands fa-cc-visa text-primary ms-2 fs-5 align-middle"></i>`;
            }
        } else {
            paymentMethodEl.innerHTML = `No payment method selected`;
        }

        const shippingData = JSON.parse(localStorage.getItem('shippingData')) || { address: "Not specified", method: "Not specified" };
        document.getElementById('review-shipping-address').innerHTML = shippingData.address;
        document.getElementById('review-delivery-method').innerText = shippingData.method;

        const btnPlaceOrder = document.getElementById('btn-place-order');
        if (btnPlaceOrder) {
            btnPlaceOrder.addEventListener('click', function(ev) {
                ev.preventDefault();
                alert('Order Placed Successfully!');
                localStorage.removeItem('paymentData');
                localStorage.removeItem('cartData');
                localStorage.removeItem('shippingData');
                window.location.href = 'payment.html';
            });
        }
    }
});