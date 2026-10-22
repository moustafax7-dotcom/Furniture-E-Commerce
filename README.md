# Emmable — Furniture E-Commerce 🛋️

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font%20Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)

## Project Overview

**Emmable** is a responsive furniture e-commerce website built with **HTML, CSS, JavaScript, Bootstrap, and Font Awesome**.

The project focuses on creating a realistic frontend shopping experience, from browsing and filtering products to managing a persistent shopping cart and completing a multi-step checkout flow.

## Website Preview

![Emmable Furniture E-Commerce](furniture-readme-screens/home.png)

**Live Demo:** https://furniture-e-commerce-sand.vercel.app/

---

## Key Features

- Responsive design for mobile, tablet, and desktop
- Sticky navigation header
- Dynamic product listing and product details
- Product search, category filtering, price filtering, and sorting
- Shopping cart with `localStorage` persistence
- Add, remove, increase, and decrease product quantities
- Dynamic cart counter and order totals
- Multi-step checkout flow with validation
- Empty-cart protection
- Toast notifications for cart actions
- SEO-friendly page metadata

---

## Screenshots

### Home Page

![Home Page](furniture-readme-screens/home.png)

### Products Page

![Products Page](furniture-readme-screens/products.png)

### Shopping Cart

![Shopping Cart](furniture-readme-screens/cart.png)

---

## Validation

Run `node tests/storefront.test.cjs` for cart, category, and checkout regression checks.

Browser layout, keyboard interaction, and performance measurements still need verification. The automated checks do not establish full browser or accessibility coverage.

This is a frontend demo. Checkout stores a demo order summary in the current browser session; it does not process payments, send email, or create server-side orders. Shipping form values are kept in session storage and cleared after checkout. Do not enter real personal information.

---

## Run Locally

Clone the repository:

`git clone https://github.com/moustafax7-dotcom/Furniture-E-Commerce.git`

Open the project folder:

`cd Furniture-E-Commerce`

Then open `index.html` in your browser.

---

## About

**Moustafa Mahmoud**

Frontend Developer focused on building responsive and interactive web experiences with **HTML, CSS, JavaScript, Bootstrap, and React**.

### Project Links

- 🌐 [Live Demo](https://furniture-e-commerce-sand.vercel.app/)

## Credits

The original project credits Designspace for the visual design. Existing product imagery is retained from the original repository.
