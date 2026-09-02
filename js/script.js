// <----------------------------------index------------------------------------>
let categories = document.querySelectorAll(".category-menu li");
let products = document.querySelectorAll(".product-item");

for (let i = 0; i < categories.length; i++)
     {
       categories[i].onclick = function () {

        let filter = categories[i].getAttribute("data-filter");

        for (let j = 0; j < categories.length; j++) {

            categories[j].classList.remove("active-category");
        }

        categories[i].classList.add("active-category");

        for (let j = 0; j < products.length; j++) {
            let productCategory = products[j].getAttribute("data-category");

            if (filter == "all" || filter == productCategory) {
                products[j].style.display = "block";
            }

            else {
                products[j].style.display = "none";
            }
        }
    };
}


// <----------------------------------index------------------------------------>

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