# Emmable — Furniture E-Commerce 🛋️

## 📝 Project Overview

**Emmable** is a responsive furniture e-commerce website built with **HTML, CSS, JavaScript, Bootstrap, and Font Awesome**.

The project focuses on building a realistic frontend shopping experience — from browsing and filtering products to managing a persistent shopping cart and completing a multi-step checkout flow.

## 📸 Website Preview

![Emmable Furniture E-Commerce](screenshots/home.png)

**Live Demo:** https://furniture-e-commerce-sand.vercel.app/

---

## ✨ Key Features

- Responsive layout for mobile, tablet, and desktop
- Sticky navigation header
- Dynamic product listing and product details
- Product search
- Category and price filtering
- Sorting by price and name
- Empty-results handling with clear filters
- Shopping cart powered by `localStorage`
- Add, remove, increase, and decrease quantities
- Persistent cart across page refreshes
- Dynamic cart counter and mini-cart
- Multi-step checkout flow
- Form validation
- Empty-cart checkout protection
- Consistent order totals across checkout steps
- Toast notifications for cart actions
- SEO-friendly metadata
- Accessible form controls and icon buttons

---

## 🛠️ Tech Stack

- **HTML5** — Structure and semantic markup
- **CSS3** — Custom styling
- **JavaScript (Vanilla)** — Interactivity and application logic
- **Bootstrap 5** — Responsive layout and UI components
- **Font Awesome** — Icons
- **LocalStorage** — Client-side cart persistence

No frameworks, backend, or build tools are required.

---

## 🛒 Shopping Flow

Home  
↓  
Products  
↓  
Product Details  
↓  
Add to Cart  
↓  
Shopping Cart  
↓  
Shipping  
↓  
Payment  
↓  
Review  
↓  
Order Success

The cart is managed on the client side using `localStorage`, so products and quantities remain available after refreshing the page.

After completing the checkout flow, the cart is cleared automatically.

---

## 📸 Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Products Page

![Products Page](screenshots/products.png)

### Product Details

![Product Details](screenshots/product-details.png)

### Shopping Cart

![Shopping Cart](screenshots/cart.png)

---

## 🔍 Quality & Testing

The project went through multiple development and QA passes covering:

- Complete navigation and page flow
- Product search, filtering, and sorting
- Cart functionality and persistence
- Invalid and corrupted cart data handling
- Product ID edge cases
- Checkout validation and empty-cart protection
- Responsive testing across multiple breakpoints
- Accessibility checks
- Asset and dependency integrity
- SEO metadata
- Browser regression testing across all 8 pages

The final regression covered:

**8 pages × 5 responsive breakpoints**

with **0 console errors, 0 failed requests, and 0 broken images**.

---

## 📱 Responsive Design

The interface was tested at:

- 360px
- 390px
- 768px
- 1200px
- 1440px

Bootstrap's responsive grid and utility classes are used alongside custom CSS where needed.

---

## 🚀 Run Locally

Clone the repository:

`git clone https://github.com/moustafax7-dotcom/Furniture-E-Commerce.git`

Open the project folder:

`cd Furniture-E-Commerce`

Then open `index.html` in your browser.

No backend or build setup is required.

---

## 👨‍💻 About

**Moustafa Mahmoud**

Frontend Developer focused on building responsive and interactive web experiences with **HTML, CSS, JavaScript, Bootstrap, and React**.

### Project Links

- 🌐 [Live Demo](https://furniture-e-commerce-sand.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/moustafaweb)
