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

    if (creditCardRadio.checked == true) {
        creditCardForm.style.display = "flex";
    } else {
        creditCardForm.style.display = "none";
    }
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
    window.location.href = "order-success.html";
}

function formatCardNumber(event) {
    var value = event.target.value.replace(/\D/g, "");
    value = value.substring(0, 16);
    var formattedValue = "";
    for (var i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 == 0) {
            formattedValue += " ";
        }
        formattedValue += value[i];
    }
    event.target.value = formattedValue;
}