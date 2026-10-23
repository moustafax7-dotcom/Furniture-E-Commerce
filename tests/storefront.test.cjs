const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto').webcrypto;
function storage() { const values = new Map(); return {getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,String(v)),removeItem:k=>values.delete(k)}; }
const nodes = {};
const context = vm.createContext({
    localStorage: storage(), sessionStorage: storage(), URLSearchParams, crypto,
    window: {location: {pathname:'/index.html',search:'',href:'',replace(){}},addEventListener(){}},
    document: {getElementById:id=>nodes[id]||null,querySelectorAll:()=>[],addEventListener(){}},
    alert() {}, console
});
vm.runInContext(fs.readFileSync('js/main.js','utf8'),context);
vm.runInContext('showCartToast = () => {};',context);
const run = code => vm.runInContext(code, context);
assert.equal(run("PRODUCTS.filter(p => productMatchesCategory(p,'chairs')).length"),9);
assert.equal(run("PRODUCTS.filter(p => productMatchesCategory(p,'chair')).length"),9);
run('addToCart(1, 2); addToCart(1, 3);');
assert.equal(run('getCart()[0].qty'),5);
assert.equal(run('getCartSubtotal()'),54.5);
run('addToCart(999,1); addToCart(2,-1); addToCart(2,1.5)');
assert.equal(run('getCart().length'),1);
run('addToCart(1, 200)'); assert.equal(run('getCart()[0].qty'),99);
run('changeQty(1,-200)'); assert.equal(run('getCart()[0].qty'),1);
context.localStorage.setItem('emmable_cart','invalid'); assert.equal(run('getCart().length'),0);
context.localStorage.setItem('emmable_cart',JSON.stringify([{id:999,qty:1},{id:1,qty:1.5},{id:2,qty:2}]));
assert.equal(run('getCart().length'),1);
context.window.location.search='?category=chair&sort=price-desc';
assert.equal(run('getFilteredProducts().every(p => p.category === "chair")'),true);
assert.equal(run('getFilteredProducts().every((p,i,a) => !i || a[i-1].price >= p.price)'),true);
context.sessionStorage.setItem('emmable_shipping',JSON.stringify({email:'test@example.com',fname:'Test',lname:'Shopper',country:'Egypt',address:'Sample',city:'Cairo',province:'Cairo',zip:'12345',phone:'0000000000'}));
run('goToSuccessPage()');
assert.equal(run('getCart().length'),0);
const order=JSON.parse(context.sessionStorage.getItem('emmable_order'));
assert.equal(order.total,413.8); assert.equal(order.items[0].qty,2);
assert.equal(context.sessionStorage.getItem('emmable_shipping'),null);
assert.equal(context.window.location.href,'order-success.html');
run('addToCart(1,1)');
context.sessionStorage.setItem('emmable_shipping','{}');
assert.equal(run('getShippingDetails()'),null);
context.sessionStorage.setItem('emmable_shipping',JSON.stringify({email:'test@example.com',fname:'Test',lname:'Shopper',country:'Egypt',address:'Sample',city:'Cairo',province:'Cairo',zip:'12345',phone:'0000000000'}));
nodes.savedOrder={textContent:''};
context.sessionStorage.setItem('emmable_order',JSON.stringify({items:null,total:'invalid'}));
run('initCheckout()');
assert.match(nodes.savedOrder.textContent,/No saved demo order/);
context.sessionStorage.setItem=()=>{throw Error('quota');};
run('goToSuccessPage()');assert.equal(run('getCart().length'),1);
for (const product of run('PRODUCTS')) assert.ok(fs.existsSync(product.image),product.image);
console.log('Passed: category aliases, cart validation, quantity limits, totals, filtering, sorting, demo order persistence, failed-storage recovery, image paths.');

run("var refreshed = []; renderCartDropdown = () => refreshed.push('badge'); renderShoppingCart = () => refreshed.push('cart'); updateOrderSummary = () => refreshed.push('summary'); renderReviewItems = () => refreshed.push('review');");
run('changeQty(1,1)');
assert.equal(run('refreshed.join(",")'),'badge,cart,summary,review');
run('refreshed = []; removeFromCart(1)');
assert.equal(run('refreshed.join(",")'),'badge,cart,summary,review');
console.log('Passed: malformed checkout recovery and synchronized cart views.');
