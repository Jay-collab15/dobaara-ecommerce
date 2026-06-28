//---DATA---

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProduct = null;
const products = [
    { id: 1, name: 'Denim Jacket', category: 'Jackets', size: 'M', condition: 'Like new', price: 450, emoji: '👕', badge: 'hot' },
    { id: 2, name: 'Floral Dress', category: 'Dresses', size: 'S', condition: 'Like new', price: 320, emoji: '👗', badge: 'new' },
    { id: 3, name: 'Winter Coat', category: 'Jackets', size: 'L', condition: 'Good', price: 680, emoji: '🧥', badge: '' },
    { id: 4, name: 'Blue Jeans', category: 'Bottoms', size: '30', condition: 'Good', price: 350, emoji: '👖', badge: 'new' },
    { id: 5, name: 'Silk Scarf', category: 'Accessories', size: 'Free', condition: 'Like new', price: 150, emoji: '🧣', badge: '' },
    { id: 6, name: 'Bucket Hat', category: 'Accessories', size: 'Free', condition: 'Good', price: 120, emoji: '👒', badge: '' },
    { id: 7, name: 'White Kurta', category: 'Tops', size: 'M', condition: 'Like new', price: 280, emoji: '👘', badge: 'new' },
    { id: 8, name: 'Oversized Hoodie', category: 'Tops', size: 'L', condition: 'Good', price: 260, emoji: '🥻', badge: '' },
];

function renderProduct(containerId, items, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const list = limit ? items.slice(0, limit) : items;
    container.innerHTML = list.map(p => `
        <div class="prod-card" onclick="openProduct(${p.id})">
        <div class="prod-img">
        ${p.emoji}
        ${p.badge ? `<span class="prod-badge badge-${p.badge}">${p.badge === 'hot' ? '🔥 Hot' : '✨ New'}</span>` : ''}
          </div>
        <div class="prod-info">
          <div class="prod-name">${p.name}</div>
          <div class="prod-meta">Size ${p.size} · ${p.condition}</div>
          <div class="prod-bottom">
            <span class="prod-price">₹${p.price}</span>
            <button class="prod-cart-button" onclick="event.stopPropagation();addToCart(${p.id})">+</button>
          </div>
        </div>
      </div>
    `).join('');
}


//---__INIT__--

renderProduct('home-prod', products, 4)
renderProduct('shop-prod', products)


//---PRODUCT DETAIL PAGE---

function thumbActive(tab) {
    document.querySelectorAll('.pdp-thumb').forEach(a => a.classList.remove('active'));
    tab.classList.add('active');
}


function openProduct(id) {
    localStorage.setItem("productId", id);
    window.location.href = "prod_detail.html";
}

function loadProductDetails() {
    const id = Number(localStorage.getItem("productId"));
    const currentProduct = products.find(p => p.id === id);
    if (!currentProduct) return;
    document.getElementById("pdp-name").textContent = currentProduct.name;
    document.getElementById("pdp-price").textContent = "₹" + currentProduct.price;
    document.getElementById("pdp-category").textContent = currentProduct.category;
    document.getElementById("pdp-size").textContent = "Size " + currentProduct.size;
    document.getElementById("pdp-condition").textContent = currentProduct.condition;
    document.getElementById("pdp-main-img").textContent = currentProduct.emoji;
}

if (document.getElementById("pdp-name")) {
    loadProductDetails();
}


//---RESPONSIVE NAV BAR---

function Sidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function Hidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}


//---RESPONSIVE FILTER BAR---

function Filterbar() {
    const filterlist = document.querySelector('.filter-list')
    filterlist.style.display = 'block'
}
function Hidefilter() {
    const filterlist = document.querySelector('.filter-list')
    filterlist.style.display = 'none'
}


//---FILTER CHIPS---

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('chip')) {
        e.target.closest('.filter-chips').querySelectorAll('.chip').forEach(c =>
            c.classList.remove('active'));
        e.target.classList.add('active')
    }
});


//---CART---

function addToCart(id){
    const p=products.find(x=>x.id===id);
    if(!p) return;
    const existing=cart.find(x=>x.id===id);
    if(existing) existing.qty++;
    else cart.push({...p,qty:1});
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    showToast('🛒'+p.name+'added to cart!');
}
function updateCartBadge() {
    const total = cart.reduce((a, c) => a + c.qty, 0);
    const badge = document.getElementById("cart-count");
    if (badge)badge.textContent = total;
}


//---SIGNUP PAGE---

function switchTab(tab, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const role = document.getElementById('signup-role');
    if (role) role.style.display = tab === 'signup' ? 'block' : 'none';
}
function selectRole(el) {
    document.querySelectorAll('.child-box').forEach(r => r.classList.remove('active'));
    el.classList.add('active');
}
function welcome() {
    showToast('Welcome to Dabaara!')
    setTimeout(() => window.location.href = "index.html", 800);
}


//---Toast---

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2600);
}


//---__---

updateCartBadge();
