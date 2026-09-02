document.addEventListener("DOMContentLoaded", function () {
    var creditCardRadio = document.getElementById("creditCardRadio");
    var paypalRadio = document.getElementById("paypalRadio");
    var paymentForm = document.getElementById("payment-form");
    var placeOrderBtn = document.getElementById("btn-place-order");
 
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
    window.location.href = "success.html";
}