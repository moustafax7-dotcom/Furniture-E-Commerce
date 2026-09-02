function changeQty(num, action) {
  var qtyBox = document.getElementById("qty" + num);
  var qty = parseInt(qtyBox.innerHTML);
  if (action == "plus") {
    qty = qty + 1;
  }
  if (action == "minus" && qty > 1) {
    qty = qty - 1;
  }
  qtyBox.innerHTML = qty;
  calculateTotal();
}

function removeItem(num) {
  var row = document.getElementById("item" + num);
  row.parentNode.removeChild(row);
  calculateTotal();
}

function calculateTotal() {
  var total = 0;

  var row1 = document.getElementById("item1");
  if (row1 != null) {
    total = total + parseFloat(document.getElementById("price1").innerHTML) * parseInt(document.getElementById("qty1").innerHTML);
  }
  var row2 = document.getElementById("item2");
  if (row2 != null) {
    total = total + parseFloat(document.getElementById("price2").innerHTML) * parseInt(document.getElementById("qty2").innerHTML);
  }
  var row3 = document.getElementById("item3");
  if (row3 != null) {
    total = total + parseFloat(document.getElementById("price3").innerHTML) * parseInt(document.getElementById("qty3").innerHTML);
  }

  document.getElementById("total").innerHTML = total.toFixed(2);
}

function checkForm(event) {
  event.preventDefault();
  var form = document.getElementById("shipForm");
  if (form.checkValidity() == false) {
    form.classList.add("was-validated");
  } else {
    window.location.href = "success.html";
  }
}