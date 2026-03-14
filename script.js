/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const products = [
  { id:1,  name:'Klasszikus Piros Rózsa',  emoji:'🌹', category:'rose',      price:4.50, desc:'Our timeless red rose, twisted into a perfect spiral bloom with a long green stem. Makes any room feel romantic.',      bg:'#fde8f0' },
  { id:2,  name:'Rózsaszín Rózsa',         emoji:'🌸', category:'rose',      price:4.50, desc:'Soft blush pink petals with a gentle curl. A delicate beauty perfect for birthdays or just because.',                  bg:'#fde8f0' },
  { id:3,  name:'Fehér Százszorszép',       emoji:'🌼', category:'daisy',     price:3.50, desc:'Cheerful white petals with a fluffy yellow centre. The classic garden daisy, forever captured in pipe cleaner form.',   bg:'#fffde8' },
  { id:4,  name:'Napraforgó',         emoji:'🌻', category:'sunflower', price:5.00, desc:'A bold, sunny bloom with golden petals and a rich brown centre. Guaranteed to brighten any space instantly.',            bg:'#fff8e1', isNew:true },
  { id:5,  name:'Klasszikus Tulipán',    emoji:'🌷', category:'tulip',     price:4.00, desc:'Elegant tulip shape in a soft dreamy lavender. Perfect for spring-themed gifts and pastel arrangements.',               bg:'#f3e8ff' },
  { id:6,  name:'Rózsaszín Tulipán',        emoji:'🌷', category:'tulip',     price:4.00, desc:'Spring-fresh pastel pink, always in style. A graceful tulip that pairs beautifully with roses.',                        bg:'#fde8f0', isNew:true },
  { id:7,  name:'Barack Százszorszép',       emoji:'🌸', category:'daisy',     price:3.50, desc:'A warm peachy-orange daisy with a soft centre. Beautifully warm tones that complement any decor.',                      bg:'#fff3e0' },
  { id:8,  name:'Lilla Rózsa',      emoji:'🌹', category:'rose',      price:6.00, desc:'Our most showstopping creation! Multi-coloured swirls of pink, yellow, mint and lavender in one stunning rose.',        bg:'#e8f8f5', isNew:true },
];

const bouquets = [
  { id:101, name:'Álom Kert',     emojis:['🌹','🌼','🌸'], bg:'#fde8f0', price:18.00, desc:'A soft, romantic mix of roses and daisies in pastel tones. Comes wrapped in kraft paper with a satin ribbon. Perfect for birthdays or anniversaries.',  colors:['#f4a7b9','#fdd5b1','#d6b8e8'], stems:'7 stems' },
  { id:102, name:'A Nap Csokor',    emojis:['🌻','🌼','🌿'], bg:'#fff8e1', price:22.00, desc:'Bold sunflowers and cheerful daisies bursting with energy. Tied with a yellow ribbon and wrapped in tissue paper. Guaranteed to make someone smile.',    colors:['#fce570','#b5e2d8','#c8e6a0'], stems:'9 stems' },
  { id:103, name:'Tavasz Románc',    emojis:['🌷','🌸','🌺'], bg:'#f3e8ff', price:24.00, desc:'Delicate tulips and cherry blossoms in a flowing arrangement. Finished in a lavender wrap. Ideal for weddings, anniversaries, and special moments.',     colors:['#d6b8e8','#f4a7b9','#e07a95'], stems:'10 stems' },
  { id:104, name:'A "Nagy" Csokor', emojis:['💐','🌹','🌻'], bg:'#e8f7f4', price:38.00, desc:'Our most impressive arrangement: 15+ stems of every flower we make, bursting with colour. Packed in a luxury gift box. A true statement piece.',       colors:['#f4a7b9','#fce570','#b5e2d8','#d6b8e8'], stems:'15+ stems' },
];

/* ══════════════════════════════════════════
   CART STATE
══════════════════════════════════════════ */
let cart = [];

function cartTotal()     { return cart.reduce(function(s,i){ return s + i.price * i.qty; }, 0); }
function cartItemCount() { return cart.reduce(function(s,i){ return s + i.qty; }, 0); }

function addToCart(id, isBouquet) {
  var item = isBouquet ? bouquets.find(function(b){ return b.id===id; }) : products.find(function(p){ return p.id===id; });
  if (!item) return;
  var emoji = isBouquet ? item.emojis[0] : item.emoji;
  var existing = cart.find(function(c){ return c.id===id; });
  if (existing) { existing.qty++; }
  else { cart.push({ id:id, name:item.name, emoji:emoji, price:item.price, qty:1 }); }
  updateCartUI();
  showToast('🌸 "' + item.name + '" hozzáadva a kosárhoz!');
}

function removeFromCart(id) {
  cart = cart.filter(function(c){ return c.id !== id; });
  updateCartUI();
  renderCartItems();
}

function changeQty(id, delta) {
  var item = cart.find(function(c){ return c.id===id; });
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { updateCartUI(); renderCartItems(); }
}

function updateCartUI() {
  var count = cartItemCount();
  var badge = document.getElementById('cartCount');
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

/* ══════════════════════════════════════════
   RENDER PRODUCTS
══════════════════════════════════════════ */
function renderProducts(filter) {
  filter = filter || 'all';
  var grid = document.getElementById('productsGrid');
  var filtered = filter === 'all' ? products : products.filter(function(p){ return p.category===filter; });
  grid.innerHTML = filtered.map(function(p) {
    return '<div class="product-card" onclick="openModal('+p.id+',false)">' +
      '<div class="product-img" style="background:'+p.bg+'">' +
        '<span>'+p.emoji+'</span><div class="shine"></div>' +
        (p.isNew ? '<span class="badge-new">New</span>' : '') +
      '</div>' +
      '<div class="product-body">' +
        '<h3>'+p.name+'</h3>' +
        '<p class="desc">'+p.desc.substring(0,62)+'…</p>' +
        '<div class="product-footer">' +
          '<span class="price">€'+p.price.toFixed(2)+'</span>' +
          '<div class="card-actions">' +
            '<button class="view-btn" onclick="event.stopPropagation();openModal('+p.id+',false)">View</button>' +
            '<button class="add-btn" onclick="event.stopPropagation();addToCart('+p.id+',false)">+</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function renderBouquets() {
  var grid = document.getElementById('bouquetGrid');
  grid.innerHTML = bouquets.map(function(b) {
    var dots = b.colors.map(function(c){ return '<div class="color-dot" style="background:'+c+'"></div>'; }).join('');
    return '<div class="bouquet-card" onclick="openModal('+b.id+',true)">' +
      '<div class="bouquet-top" style="background:'+b.bg+'">'+b.emojis.join('')+'</div>' +
      '<div class="bouquet-body">' +
        '<h3>'+b.name+'</h3>' +
        '<p>'+b.desc.substring(0,70)+'…</p>' +
        '<div class="bouquet-footer">' +
          '<div><span class="bouquet-price">€'+b.price.toFixed(2)+'</span> <span class="stems-badge">'+b.stems+'</span></div>' +
          '<div style="display:flex;align-items:center;gap:.6rem">' +
            '<div class="bouquet-colors">'+dots+'</div>' +
            '<button class="add-btn" onclick="event.stopPropagation();addToCart('+b.id+',true)">+</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* ══════════════════════════════════════════
   PRODUCT MODAL
══════════════════════════════════════════ */
function openModal(id, isBouquet) {
  var item = isBouquet ? bouquets.find(function(b){ return b.id===id; }) : products.find(function(p){ return p.id===id; });
  if (!item) return;
  var emoji = isBouquet ? item.emojis.join('') : item.emoji;
  document.getElementById('modalImg').style.background = item.bg;
  document.getElementById('modalEmoji').textContent = emoji;
  document.getElementById('modalName').textContent = item.name;
  document.getElementById('modalDesc').textContent = item.desc;
  document.getElementById('modalPrice').textContent = '€' + item.price.toFixed(2);
  var meta = '';
  if (isBouquet) meta = '<span class="stems-badge">'+item.stems+'</span>';
  else if (item.isNew) meta = '<span class="badge-new" style="position:static">New</span>';
  document.getElementById('modalMeta').innerHTML = meta;
  document.getElementById('modalAddBtn').onclick = function() {
    addToCart(id, isBouquet); closeModal(); openCart();
  };
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════
   CART DRAWER
══════════════════════════════════════════ */
function openCart() {
  renderCartItems();
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function renderCartItems() {
  var container = document.getElementById('cartItems');
  var footer    = document.getElementById('cartFooter');
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty</p><small>Add some flowers to get started!</small></div>';
    footer.style.display = 'none'; return;
  }
  footer.style.display = 'block';
  container.innerHTML = cart.map(function(item) {
    return '<div class="cart-item">' +
      '<div class="cart-item-emoji">'+item.emoji+'</div>' +
      '<div class="cart-item-info">' +
        '<div class="cart-item-name">'+item.name+'</div>' +
        '<div class="cart-item-price">€'+item.price.toFixed(2)+' each</div>' +
      '</div>' +
      '<div class="cart-item-controls">' +
        '<button class="qty-btn" onclick="changeQty('+item.id+',-1)">−</button>' +
        '<span class="qty-num">'+item.qty+'</span>' +
        '<button class="qty-btn" onclick="changeQty('+item.id+',1)">+</button>' +
        '<button class="remove-btn" onclick="removeFromCart('+item.id+')">🗑</button>' +
      '</div>' +
      '<div class="cart-item-subtotal">€'+(item.price*item.qty).toFixed(2)+'</div>' +
    '</div>';
  }).join('');
  document.getElementById('cartTotalAmt').textContent = '€' + cartTotal().toFixed(2);
}

/* ══════════════════════════════════════════
   CHECKOUT — 4 real steps + success
   1: Contact  2: Delivery  3: Payment  4: Review  → success
══════════════════════════════════════════ */
function goToCheckout() {
  if (cart.length === 0) { showToast('Your cart is empty!'); return; }
  closeCart();
  renderCheckoutSummary();
  document.getElementById('checkoutModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  showCheckoutStep(1);
}
function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.body.style.overflow = '';
}
function showCheckoutStep(n) {
  document.querySelectorAll('.co-step-panel').forEach(function(p){ p.classList.remove('active'); });
  document.getElementById('coStep'+n).classList.add('active');
  document.querySelectorAll('.co-step-dot').forEach(function(d,i){
    d.classList.toggle('done',    i+1 < n);
    d.classList.toggle('current', i+1 === n);
  });
}
function renderCheckoutSummary() {
  var el = document.getElementById('coOrderSummary');
  el.innerHTML = cart.map(function(item){
    return '<div class="co-summary-row"><span>'+item.emoji+' '+item.name+' × '+item.qty+'</span><span>€'+(item.price*item.qty).toFixed(2)+'</span></div>';
  }).join('') +
  '<div class="co-summary-divider"></div>' +
  '<div class="co-summary-row co-summary-total"><span>Total</span><span>€'+cartTotal().toFixed(2)+'</span></div>';
}

/* Step 1 — Contact */
function validateStep1() {
  var fields = ['coName','coEmail','coPhone'];
  var ok = true;
  fields.forEach(function(id){
    var el = document.getElementById(id);
    if (!el.value.trim()) { el.classList.add('error'); ok = false; }
    else el.classList.remove('error');
  });
  // basic email check
  var emailEl = document.getElementById('coEmail');
  if (emailEl.value && !emailEl.value.includes('@')) { emailEl.classList.add('error'); ok = false; }
  if (!ok) { showToast('Please fill in all required fields correctly.'); return; }
  showCheckoutStep(2);
}

/* Step 2 — Delivery */
function validateStep2() {
  var fields = ['coAddress','coCity','coPostal','coCountry'];
  var ok = true;
  fields.forEach(function(id){
    var el = document.getElementById(id);
    if (!el.value.trim()) { el.classList.add('error'); ok = false; }
    else el.classList.remove('error');
  });
  if (!ok) { showToast('Please fill in your delivery address.'); return; }
  showCheckoutStep(3);
}

/* Step 3 — Payment */
function validateStep3() {
  var cardNum  = document.getElementById('coCardNum').value.replace(/\s/g,'');
  var cardName = document.getElementById('coCardName').value.trim();
  var cardExp  = document.getElementById('coCardExp').value.trim();
  var cardCvc  = document.getElementById('coCardCvc').value.trim();
  var ok = true;

  var numEl = document.getElementById('coCardNum');
  if (!cardNum || cardNum.length < 13) { numEl.classList.add('error'); ok = false; } else numEl.classList.remove('error');

  var nameEl = document.getElementById('coCardName');
  if (!cardName) { nameEl.classList.add('error'); ok = false; } else nameEl.classList.remove('error');

  var expEl = document.getElementById('coCardExp');
  if (!cardExp || !/^\d{2}\/\d{2}$/.test(cardExp)) { expEl.classList.add('error'); ok = false; } else expEl.classList.remove('error');

  var cvcEl = document.getElementById('coCardCvc');
  if (!cardCvc || cardCvc.length < 3) { cvcEl.classList.add('error'); ok = false; } else cvcEl.classList.remove('error');

  if (!ok) { showToast('Kérlek nézd meg a kártya adataid.'); return; }

  // populate review
  document.getElementById('coReviewName').textContent    = document.getElementById('coName').value;
  document.getElementById('coReviewEmail').textContent   = document.getElementById('coEmail').value;
  document.getElementById('coReviewAddress').textContent =
    document.getElementById('coAddress').value + ', ' +
    document.getElementById('coCity').value + ', ' +
    document.getElementById('coPostal').value + ', ' +
    document.getElementById('coCountry').value;
  var masked = '**** **** **** ' + cardNum.slice(-4);
  document.getElementById('coReviewCard').textContent    = masked + '  (' + cardName + ')';
  document.getElementById('coReviewTotal').textContent   = '€' + cartTotal().toFixed(2);
  showCheckoutStep(4);
}

/* Step 4 — Place order */
function placeOrder() {
  // simulate processing
  var btn = document.querySelector('#coStep4 .co-place-btn');
  btn.textContent = 'Processing…';
  btn.disabled = true;
  setTimeout(function(){
    showCheckoutStep(5);
    cart = [];
    updateCartUI();
  }, 1800);
}

/* Card number live formatting */
function formatCardNum(el) {
  var val = el.value.replace(/\D/g,'').substring(0,16);
  el.value = val.replace(/(.{4})/g,'$1 ').trim();
}
function formatExpiry(el) {
  var val = el.value.replace(/\D/g,'').substring(0,4);
  if (val.length >= 3) val = val.substring(0,2) + '/' + val.substring(2);
  el.value = val;
}

/* Card type icon */
function detectCard(el) {
  var val = el.value.replace(/\s/g,'');
  var icon = document.getElementById('cardTypeIcon');
  if (/^4/.test(val))        icon.textContent = '💳 Visa';
  else if (/^5[1-5]/.test(val)) icon.textContent = '💳 Mastercard';
  else if (/^3[47]/.test(val))  icon.textContent = '💳 Amex';
  else                       icon.textContent = '💳';
}

/* ══════════════════════════════════════════
   CUSTOM ORDER — validated + Formspree
══════════════════════════════════════════ */
// ⚠️  SETUP INSTRUCTIONS:
//  1. Go to https://formspree.io and sign up for a FREE account
//  2. Create a new form — Formspree will give you a form ID like "xpzgkrjw"
//  3. Replace YOUR_FORMSPREE_ID below with your actual ID
//  4. Formspree will email every submission straight to your inbox!
var FORMSPREE_ID = 'xaqpbker';

function submitCustomOrder() {
  // ── Validation ──
  var nameEl   = document.getElementById('customName');
  var emailEl  = document.getElementById('customEmail');
  var typeEl   = document.getElementById('customType');
  var msgEl    = document.getElementById('customMessage');
  var ok = true;

  [nameEl, emailEl, typeEl, msgEl].forEach(function(el){
    if (!el.value.trim()) { el.classList.add('error'); ok = false; }
    else el.classList.remove('error');
  });
  if (emailEl.value && !emailEl.value.includes('@')) { emailEl.classList.add('error'); ok = false; }

  // get selected colors
  var selectedColors = [];
  document.querySelectorAll('.color-pick.selected').forEach(function(el){
    selectedColors.push(el.getAttribute('title'));
  });

  if (!ok) { showToast('⚠️ Please fill in all required fields.'); return; }

  // ── Build payload ──
  var payload = {
    name:        nameEl.value.trim(),
    email:       emailEl.value.trim(),
    arrangement: typeEl.value,
    occasion:    document.getElementById('customOccasion').value,
    colors:      selectedColors.length > 0 ? selectedColors.join(', ') : 'No preference',
    message:     msgEl.value.trim()
  };

  // ── Send via Formspree ──
  var btn = document.getElementById('customSubmitBtn');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  if (FORMSPREE_ID === 'YOUR_FORMSPREE_ID') {
    // Demo mode — just simulate success so you can test the site
    setTimeout(function(){
      btn.textContent = 'Send My Custom Request 🌸';
      btn.disabled = false;
      showCustomSuccess(payload.name);
    }, 1200);
    return;
  }

  fetch('https://formspree.io/f/' + FORMSPREE_ID, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(res){ return res.json(); })
  .then(function(data){
    btn.textContent = 'Send My Custom Request 🌸';
    btn.disabled = false;
    if (data.ok) {
      showCustomSuccess(payload.name);
      // reset form
      nameEl.value=''; emailEl.value=''; msgEl.value='';
      document.querySelectorAll('.color-pick.selected').forEach(function(el){ el.classList.remove('selected'); });
    } else {
      showToast('Something went wrong. Please try again!');
    }
  })
  .catch(function(){
    btn.textContent = 'Send My Custom Request 🌸';
    btn.disabled = false;
    showToast('Could not send. Please check your connection.');
  });
}

function showCustomSuccess(name) {
  document.getElementById('customSuccessName').textContent = name || 'there';
  document.getElementById('customForm').style.display = 'none';
  document.getElementById('customSuccess').style.display = 'flex';
}
function resetCustomForm() {
  document.getElementById('customForm').style.display = 'block';
  document.getElementById('customSuccess').style.display = 'none';
}

/* ══════════════════════════════════════════
   FILTER / COLOR TOGGLE / TOAST / INIT
══════════════════════════════════════════ */
function filterProducts(cat, btn) {
  document.querySelectorAll('.pill').forEach(function(p){ p.classList.remove('active'); });
  btn.classList.add('active');
  renderProducts(cat);
}
function toggleColor(el) { el.classList.toggle('selected'); }

var toastTimer;
function showToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  renderProducts();
  renderBouquets();
  updateCartUI();
  document.getElementById('productModal').addEventListener('click', function(e){ if(e.target===e.currentTarget) closeModal(); });
  document.getElementById('checkoutModal').addEventListener('click', function(e){ if(e.target===e.currentTarget) closeCheckout(); });
});
