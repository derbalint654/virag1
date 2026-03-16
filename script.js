/* ══════════════════════════════════════════
   PHOTO SETUP GUIDE
   ─────────────────────────────────────────
   Create a folder called "images" next to
   your index.html, then add photos with
   these exact filenames:

   SINGLE FLOWERS:
     images/red-rose.jpg
     images/pink-rose.jpg
     images/white-daisy.jpg
     images/sunflower.jpg
     images/lavender-tulip.jpg
     images/pink-tulip.jpg
     images/peach-daisy.jpg
     images/purple-rose.jpg

   BOUQUETS:
     images/bouquet-garden-dreams.jpg
     images/bouquet-sunshine-bunch.jpg
     images/bouquet-spring-romance.jpg
     images/bouquet-grand.jpg

   Square photos (1:1) look best. Min 600×600px.
══════════════════════════════════════════ */

/* ══════════════════════════════════════════
   CURRENCY — HUF
══════════════════════════════════════════ */
function fmtHUF(n) {
  return n.toLocaleString('hu-HU') + ' Ft';
}

/* ══════════════════════════════════════════
   PRODUCT & BOUQUET DATA
══════════════════════════════════════════ */
const products = [
  { id:1, name:'Klasszikus Piros Rózsa', img:'images/red-rose.jpg',      category:'rose',      price:2300, desc:'Időtlen piros rózsánk, tökéletes spirális virággá csavarva, hosszú zöld szárral. Romantikussá tesz minden helyiséget.', bg:'#fde8f0' },
  { id:2, name:'Rózsaszín Rózsa',        img:'images/pink-rose.jpg',      category:'rose',      price:2300, desc:'Puha halvány rózsaszín szirmok gyengéd csavarással. Finom szépség, tökéletes születésnapra vagy csak úgy.', bg:'#fde8f0' },
  { id:3, name:'Fehér Százszorszép',     img:'images/white-daisy.jpg',    category:'daisy',     price:2300, desc:'Vidám fehér szirmok bolyhos sárga közepes. A klasszikus kerti százszorszép, örökre megörökítve zsenílliában.', bg:'#fffde8' },
  { id:4, name:'Napraforgó',             img:'images/sunflower.jpg',      category:'sunflower', price:2300, desc:'Merész, napsütéses virág aranyszirmokkal és gazdag barna közepes. Garantáltan feldobja bármely helyiséget.', bg:'#fff8e1', isNew:true },
  { id:5, name:'Klasszikus Tulipán',     img:'images/lavender-tulip.jpg', category:'tulip',     price:2300, desc:'Elegáns tulipán forma álomszerű levendula színben. Tökéletes tavaszi témájú ajándékokhoz.', bg:'#f3e8ff' },
  { id:6, name:'Rózsaszín Tulipán',      img:'images/pink-tulip.jpg',     category:'tulip',     price:2300, desc:'Tavaszi halvány rózsaszín, mindig divatos. Kecses tulipán, amely tökéletesen illik a rózsák mellé.', bg:'#fde8f0', isNew:true },
  { id:7, name:'Barack Százszorszép',    img:'images/peach-daisy.jpg',    category:'daisy',     price:2300, desc:'Meleg barackos-narancsos százszorszép puha közepes. Gyönyörű meleg tónusok, amelyek kiegészítik bármely dekorációt.', bg:'#fff3e0' },
  { id:8, name:'Lilla Rózsa',            img:'images/purple-rose.jpg',    category:'rose',      price:2300, desc:'Legszembetűnőbb alkotásunk! Rózsaszín, sárga, menta és levendula sokszínű kanyargó egy lenyűgöző rózsában.', bg:'#e8f8f5', isNew:true },
];

const bouquets = [
  { id:101, name:'Álom Kert',       img:'images/bouquet-garden-dreams.jpg',  bg:'#fde8f0', price:9200,  desc:'Rózsák és százszorszépek lágy, romantikus keveréke pasztell tónusokban. Kraft papírba csomagolva szatén szalaggal. Tökéletes születésnapra vagy évfordulóra.', colors:['#f4a7b9','#fdd5b1','#d6b8e8'], stems:'7 szál' },
  { id:102, name:'A Nap Csokor',    img:'images/bouquet-sunshine-bunch.jpg', bg:'#fff8e1', price:11500, desc:'Merész napraforgók és vidám százszorszépek tele energiával. Sárga szalaggal kötve és selyempapírba csomagolva. Garantáltan mosolyt csal az arcukra.', colors:['#fce570','#b5e2d8','#c8e6a0'], stems:'9 szál' },
  { id:103, name:'Tavasz Románc',   img:'images/bouquet-spring-romance.jpg', bg:'#f3e8ff', price:13800, desc:'Finom tulipánok és cseresznyevirágok áramló elrendezésben, levendula csomagolásban. Ideális esküvőkre, évfordulókra és különleges pillanatokra.', colors:['#d6b8e8','#f4a7b9','#e07a95'], stems:'10 szál' },
  { id:104, name:'A "Nagy" Csokor', img:'images/bouquet-grand.jpg',          bg:'#e8f7f4', price:19500, desc:'Legimpozánsabb összeállításunk: 15+ szál minden virágból, tele színekkel. Luxus ajándékdobozban. Igazi különlegesség.', colors:['#f4a7b9','#fce570','#b5e2d8','#d6b8e8'], stems:'15+ szál' },
];

/* ══════════════════════════════════════════
   PHOTO HELPER
══════════════════════════════════════════ */
function photoHTML(src, alt, cssClass) {
  cssClass = cssClass || '';
  return '<img src="'+src+'" alt="'+alt+'" class="item-photo '+cssClass+'" '+
    'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
    '<div class="photo-placeholder" style="display:none">' +
      '<div class="placeholder-inner">' +
        '<span class="placeholder-icon">📷</span>' +
        '<span class="placeholder-label">'+alt+'</span>' +
        '<span class="placeholder-hint">'+src+'</span>' +
      '</div>' +
    '</div>';
}

/* ══════════════════════════════════════════
   AUTH — localStorage-based accounts
══════════════════════════════════════════ */
var currentUser = null; // { name, email, orders:[] }

function getUsers() {
  try { return JSON.parse(localStorage.getItem('tb_users') || '{}'); } catch(e) { return {}; }
}
function saveUsers(users) {
  localStorage.setItem('tb_users', JSON.stringify(users));
}
function loadSession() {
  try {
    var s = localStorage.getItem('tb_session');
    if (s) currentUser = JSON.parse(s);
  } catch(e) {}
}
function saveSession() {
  if (currentUser) localStorage.setItem('tb_session', JSON.stringify(currentUser));
  else localStorage.removeItem('tb_session');
}
function refreshCurrentUser() {
  if (!currentUser) return;
  var users = getUsers();
  if (users[currentUser.email]) currentUser = users[currentUser.email];
}

/* open / close auth modal */
function openAuth(tab) {
  tab = tab || 'login';
  switchAuthTab(tab);
  clearAuthErrors();
  document.getElementById('authModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeAuth() {
  document.getElementById('authModal').classList.remove('open');
  document.body.style.overflow = '';
}
function switchAuthTab(tab) {
  document.getElementById('loginPanel').style.display  = tab==='login'    ? 'flex' : 'none';
  document.getElementById('registerPanel').style.display = tab==='register' ? 'flex' : 'none';
  document.querySelectorAll('.auth-tab').forEach(function(t){
    t.classList.toggle('active', t.dataset.tab === tab);
  });
}
function clearAuthErrors() {
  document.querySelectorAll('.auth-error').forEach(function(e){ e.textContent=''; });
  document.querySelectorAll('.auth-input').forEach(function(i){ i.classList.remove('error'); });
}

/* REGISTER */
function doRegister() {
  var name  = document.getElementById('regName').value.trim();
  var email = document.getElementById('regEmail').value.trim().toLowerCase();
  var pass  = document.getElementById('regPass').value;
  var pass2 = document.getElementById('regPass2').value;
  var err   = document.getElementById('regError');
  err.textContent = '';

  if (!name || !email || !pass || !pass2) { err.textContent = 'Minden mező kitöltése kötelező.'; return; }
  if (!email.includes('@')) { err.textContent = 'Érvénytelen email cím.'; return; }
  if (pass.length < 6) { err.textContent = 'A jelszónak legalább 6 karakter kell legyen.'; return; }
  if (pass !== pass2) { err.textContent = 'A két jelszó nem egyezik.'; return; }

  var users = getUsers();
  if (users[email]) { err.textContent = 'Ez az email cím már regisztrálva van.'; return; }

  var user = { name:name, email:email, pass:pass, orders:[], createdAt: new Date().toLocaleDateString('hu-HU') };
  users[email] = user;
  saveUsers(users);
  currentUser = user;
  saveSession();
  closeAuth();
  updateNavForUser();
  showToast('🌸 Üdvözlünk, ' + name + '!');

  // clear fields
  ['regName','regEmail','regPass','regPass2'].forEach(function(id){ document.getElementById(id).value=''; });
}

/* LOGIN */
function doLogin() {
  var email = document.getElementById('loginEmail').value.trim().toLowerCase();
  var pass  = document.getElementById('loginPass').value;
  var err   = document.getElementById('loginError');
  err.textContent = '';

  if (!email || !pass) { err.textContent = 'Kérlek add meg az email címed és jelszavad.'; return; }

  var users = getUsers();
  if (!users[email] || users[email].pass !== pass) {
    err.textContent = 'Hibás email cím vagy jelszó.'; return;
  }

  currentUser = users[email];
  saveSession();
  closeAuth();
  updateNavForUser();
  showToast('🌸 Üdvözlünk vissza, ' + currentUser.name + '!');
  ['loginEmail','loginPass'].forEach(function(id){ document.getElementById(id).value=''; });
}

/* LOGOUT */
function doLogout() {
  currentUser = null;
  saveSession();
  updateNavForUser();
  closeProfile();
  showToast('Sikeresen kijelentkeztél.');
}

/* Update nav button */
function updateNavForUser() {
  var btn = document.getElementById('authNavBtn');
  if (currentUser) {
    btn.innerHTML = '<span class="nav-avatar">' + currentUser.name.charAt(0).toUpperCase() + '</span>' + currentUser.name.split(' ')[0];
    btn.onclick = openProfile;
  } else {
    btn.innerHTML = '👤 Bejelentkezés';
    btn.onclick = function(){ openAuth('login'); };
  }
}

/* ── PROFILE MODAL ── */
function openProfile() {
  if (!currentUser) { openAuth('login'); return; }
  refreshCurrentUser();
  var avatarEl = document.getElementById('profileAvatarBig');
  if (avatarEl) avatarEl.textContent = currentUser.name.charAt(0).toUpperCase();
  document.getElementById('profileName').textContent  = currentUser.name;
  document.getElementById('profileEmail').textContent = currentUser.email;
  document.getElementById('profileSince').textContent = 'Regisztrált: ' + (currentUser.createdAt || '');
  renderOrderHistory();
  document.getElementById('profileModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeProfile() {
  document.getElementById('profileModal').classList.remove('open');
  document.body.style.overflow = '';
}
function renderOrderHistory() {
  var el = document.getElementById('orderHistory');
  if (!currentUser.orders || currentUser.orders.length === 0) {
    el.innerHTML = '<p class="no-orders">Még nincsenek rendeléseid. <a href="#shop" onclick="closeProfile()">Nézz körül!</a></p>';
    return;
  }
  el.innerHTML = currentUser.orders.slice().reverse().map(function(order){
    var itemsHTML = order.items.map(function(i){
      return '<span class="order-item-pill">'+i.name+' ×'+i.qty+'</span>';
    }).join('');
    return '<div class="order-card">' +
      '<div class="order-card-header">' +
        '<span class="order-id">#'+order.id+'</span>' +
        '<span class="order-date">'+order.date+'</span>' +
        '<span class="order-total">'+fmtHUF(order.total)+'</span>' +
      '</div>' +
      '<div class="order-items">'+itemsHTML+'</div>' +
    '</div>';
  }).join('');
}

/* save order to user profile */
function saveOrderToProfile(orderItems, total) {
  if (!currentUser) return;
  var users = getUsers();
  var user  = users[currentUser.email];
  if (!user) return;
  var order = {
    id:   Date.now().toString(36).toUpperCase(),
    date: new Date().toLocaleDateString('hu-HU'),
    items: orderItems.map(function(i){ return { name:i.name, qty:i.qty }; }),
    total: total
  };
  user.orders = user.orders || [];
  user.orders.push(order);
  users[currentUser.email] = user;
  saveUsers(users);
  currentUser = user;
  saveSession();
}

/* ══════════════════════════════════════════
   CART STATE
══════════════════════════════════════════ */
var cart = [];

function cartTotal()     { return cart.reduce(function(s,i){ return s+i.price*i.qty; },0); }
function cartItemCount() { return cart.reduce(function(s,i){ return s+i.qty; },0); }

function addToCart(id, isBouquet) {
  var item = isBouquet ? bouquets.find(function(b){ return b.id===id; }) : products.find(function(p){ return p.id===id; });
  if (!item) return;
  var existing = cart.find(function(c){ return c.id===id; });
  if (existing) { existing.qty++; }
  else { cart.push({ id:id, name:item.name, img:item.img, price:item.price, qty:1 }); }
  updateCartUI();
  showToast('🌸 "'+item.name+'" hozzáadva a kosárhoz!');
}
function removeFromCart(id) {
  cart = cart.filter(function(c){ return c.id!==id; });
  updateCartUI(); renderCartItems();
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
  var filtered = filter==='all' ? products : products.filter(function(p){ return p.category===filter; });
  grid.innerHTML = filtered.map(function(p) {
    return '<div class="product-card" onclick="openModal('+p.id+',false)">' +
      '<div class="product-img-wrap" style="background:'+p.bg+'">' +
        photoHTML(p.img,p.name) +
        (p.isNew?'<span class="badge-new">Új</span>':'') +
      '</div>' +
      '<div class="product-body">' +
        '<h3>'+p.name+'</h3>' +
        '<p class="desc">'+p.desc.substring(0,62)+'…</p>' +
        '<div class="product-footer">' +
          '<span class="price">'+fmtHUF(p.price)+'</span>' +
          '<div class="card-actions">' +
            '<button class="view-btn" onclick="event.stopPropagation();openModal('+p.id+',false)">Megnézem</button>' +
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
      '<div class="bouquet-img-wrap" style="background:'+b.bg+'">' +
        photoHTML(b.img,b.name) +
      '</div>' +
      '<div class="bouquet-body">' +
        '<h3>'+b.name+'</h3>' +
        '<p>'+b.desc.substring(0,70)+'…</p>' +
        '<div class="bouquet-footer">' +
          '<div><span class="bouquet-price">'+fmtHUF(b.price)+'</span> <span class="stems-badge">'+b.stems+'</span></div>' +
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
  var imgWrap = document.getElementById('modalImgWrap');
  imgWrap.style.background = item.bg;
  imgWrap.innerHTML = photoHTML(item.img, item.name, 'modal-photo') +
    '<button class="modal-close" onclick="closeModal()">✕</button>';
  document.getElementById('modalName').textContent  = item.name;
  document.getElementById('modalDesc').textContent  = item.desc;
  document.getElementById('modalPrice').textContent = fmtHUF(item.price);
  var meta = '';
  if (isBouquet) meta = '<span class="stems-badge">'+item.stems+'</span>';
  else if (item.isNew) meta = '<span class="badge-new" style="position:static">Új</span>';
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
    container.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>A kosarad üres</p><small>Adj hozzá néhány virágot!</small></div>';
    footer.style.display = 'none'; return;
  }
  footer.style.display = 'block';
  container.innerHTML = cart.map(function(item) {
    return '<div class="cart-item">' +
      '<div class="cart-item-img-wrap">' +
        '<img src="'+item.img+'" alt="'+item.name+'" class="cart-item-photo" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<div class="cart-item-photo-placeholder" style="display:none">🌸</div>' +
      '</div>' +
      '<div class="cart-item-info">' +
        '<div class="cart-item-name">'+item.name+'</div>' +
        '<div class="cart-item-price">'+fmtHUF(item.price)+' / db</div>' +
      '</div>' +
      '<div class="cart-item-controls">' +
        '<button class="qty-btn" onclick="changeQty('+item.id+',-1)">−</button>' +
        '<span class="qty-num">'+item.qty+'</span>' +
        '<button class="qty-btn" onclick="changeQty('+item.id+',1)">+</button>' +
        '<button class="remove-btn" onclick="removeFromCart('+item.id+')">🗑</button>' +
      '</div>' +
      '<div class="cart-item-subtotal">'+fmtHUF(item.price*item.qty)+'</div>' +
    '</div>';
  }).join('');
  document.getElementById('cartTotalAmt').textContent = fmtHUF(cartTotal());
}

/* ══════════════════════════════════════════
   CHECKOUT
══════════════════════════════════════════ */
function goToCheckout() {
  if (cart.length === 0) { showToast('A kosarad üres!'); return; }
  // Pre-fill contact fields if logged in
  if (currentUser) {
    document.getElementById('coName').value  = currentUser.name;
    document.getElementById('coEmail').value = currentUser.email;
  }
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
    return '<div class="co-summary-row">' +
      '<span style="display:flex;align-items:center;gap:.5rem">' +
        '<img src="'+item.img+'" alt="'+item.name+'" class="co-summary-thumb" onerror="this.style.display=\'none\'">' +
        item.name+' × '+item.qty +
      '</span>' +
      '<span>'+fmtHUF(item.price*item.qty)+'</span>' +
    '</div>';
  }).join('') +
  '<div class="co-summary-divider"></div>' +
  '<div class="co-summary-row co-summary-total"><span>Összesen</span><span>'+fmtHUF(cartTotal())+'</span></div>';
}

function validateStep1() {
  var fields = ['coName','coEmail','coPhone'];
  var ok = true;
  fields.forEach(function(id){
    var el = document.getElementById(id);
    if (!el.value.trim()) { el.classList.add('error'); ok=false; } else el.classList.remove('error');
  });
  if (document.getElementById('coEmail').value && !document.getElementById('coEmail').value.includes('@')) {
    document.getElementById('coEmail').classList.add('error'); ok=false;
  }
  if (!ok) { showToast('Kérlek töltsd ki az összes kötelező mezőt.'); return; }
  showCheckoutStep(2);
}
function validateStep2() {
  var fields = ['coAddress','coCity','coPostal','coCountry'];
  var ok = true;
  fields.forEach(function(id){
    var el = document.getElementById(id);
    if (!el.value.trim()) { el.classList.add('error'); ok=false; } else el.classList.remove('error');
  });
  if (!ok) { showToast('Kérlek add meg a szállítási címet.'); return; }
  showCheckoutStep(3);
}
function validateStep3() {
  var cardNum  = document.getElementById('coCardNum').value.replace(/\s/g,'');
  var cardName = document.getElementById('coCardName').value.trim();
  var cardExp  = document.getElementById('coCardExp').value.trim();
  var cardCvc  = document.getElementById('coCardCvc').value.trim();
  var ok = true;
  var numEl = document.getElementById('coCardNum');
  if (!cardNum||cardNum.length<13){numEl.classList.add('error');ok=false;}else numEl.classList.remove('error');
  var nameEl=document.getElementById('coCardName');
  if (!cardName){nameEl.classList.add('error');ok=false;}else nameEl.classList.remove('error');
  var expEl=document.getElementById('coCardExp');
  if (!cardExp||!/^\d{2}\/\d{2}$/.test(cardExp)){expEl.classList.add('error');ok=false;}else expEl.classList.remove('error');
  var cvcEl=document.getElementById('coCardCvc');
  if (!cardCvc||cardCvc.length<3){cvcEl.classList.add('error');ok=false;}else cvcEl.classList.remove('error');
  if (!ok) { showToast('Kérlek nézd meg a kártya adataid.'); return; }
  document.getElementById('coReviewName').textContent    = document.getElementById('coName').value;
  document.getElementById('coReviewEmail').textContent   = document.getElementById('coEmail').value;
  document.getElementById('coReviewAddress').textContent =
    document.getElementById('coAddress').value+', '+document.getElementById('coCity').value+', '+
    document.getElementById('coPostal').value+', '+document.getElementById('coCountry').value;
  document.getElementById('coReviewCard').textContent    = '**** **** **** '+cardNum.slice(-4)+'  ('+cardName+')';
  document.getElementById('coReviewTotal').textContent   = fmtHUF(cartTotal());
  showCheckoutStep(4);
}
function placeOrder() {
  var btn = document.querySelector('#coStep4 .co-place-btn');
  btn.textContent = 'Feldolgozás…';
  btn.disabled = true;
  var orderItems = cart.slice();
  var total = cartTotal();
  setTimeout(function(){
    saveOrderToProfile(orderItems, total);
    showCheckoutStep(5);
    cart = [];
    updateCartUI();
    btn.textContent = '🌸 Rendelést leadni';
    btn.disabled = false;
  }, 1800);
}
function formatCardNum(el) {
  var val = el.value.replace(/\D/g,'').substring(0,16);
  el.value = val.replace(/(.{4})/g,'$1 ').trim();
}
function formatExpiry(el) {
  var val = el.value.replace(/\D/g,'').substring(0,4);
  if (val.length>=3) val=val.substring(0,2)+'/'+val.substring(2);
  el.value = val;
}
function detectCard(el) {
  var val = el.value.replace(/\s/g,'');
  var icon = document.getElementById('cardTypeIcon');
  if (/^4/.test(val))           icon.textContent='💳 Visa';
  else if (/^5[1-5]/.test(val)) icon.textContent='💳 Mastercard';
  else if (/^3[47]/.test(val))  icon.textContent='💳 Amex';
  else                          icon.textContent='💳';
}

/* ══════════════════════════════════════════
   CUSTOM ORDER
══════════════════════════════════════════ */
var FORMSPREE_ID = 'xaqpbker';

function submitCustomOrder() {
  var nameEl  = document.getElementById('customName');
  var emailEl = document.getElementById('customEmail');
  var typeEl  = document.getElementById('customType');
  var msgEl   = document.getElementById('customMessage');
  var ok = true;
  [nameEl,emailEl,typeEl,msgEl].forEach(function(el){
    if (!el.value.trim()){el.classList.add('error');ok=false;}else el.classList.remove('error');
  });
  if (emailEl.value && !emailEl.value.includes('@')){ emailEl.classList.add('error'); ok=false; }
  var selectedColors=[];
  document.querySelectorAll('.color-pick.selected').forEach(function(el){ selectedColors.push(el.getAttribute('title')); });
  if (!ok){ showToast('⚠️ Kérlek töltsd ki az összes kötelező mezőt.'); return; }
  var payload={name:nameEl.value.trim(),email:emailEl.value.trim(),arrangement:typeEl.value,
    occasion:document.getElementById('customOccasion').value,
    colors:selectedColors.length>0?selectedColors.join(', '):'Nincs preferencia',
    message:msgEl.value.trim()};
  var btn=document.getElementById('customSubmitBtn');
  btn.textContent='Küldés…'; btn.disabled=true;
  if (FORMSPREE_ID==='YOUR_FORMSPREE_ID') {
    setTimeout(function(){ btn.textContent='Egyedi rendelés küldése 🌸'; btn.disabled=false; showCustomSuccess(payload.name); },1200);
    return;
  }
  fetch('https://formspree.io/f/'+FORMSPREE_ID,{
    method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)
  }).then(function(r){return r.json();}).then(function(data){
    btn.textContent='Egyedi rendelés küldése 🌸'; btn.disabled=false;
    if(data.ok){showCustomSuccess(payload.name);nameEl.value='';emailEl.value='';msgEl.value='';
      document.querySelectorAll('.color-pick.selected').forEach(function(el){el.classList.remove('selected');});
    } else showToast('Valami hiba történt. Próbáld újra!');
  }).catch(function(){ btn.textContent='Egyedi rendelés küldése 🌸'; btn.disabled=false; showToast('Nem sikerült elküldeni.'); });
}
function showCustomSuccess(name) {
  document.getElementById('customSuccessName').textContent = name||'ott';
  document.getElementById('customForm').style.display='none';
  document.getElementById('customSuccess').style.display='flex';
}
function resetCustomForm() {
  document.getElementById('customForm').style.display='block';
  document.getElementById('customSuccess').style.display='none';
}

/* ══════════════════════════════════════════
   FILTER / COLOR / TOAST / INIT
══════════════════════════════════════════ */
function filterProducts(cat,btn) {
  document.querySelectorAll('.pill').forEach(function(p){p.classList.remove('active');});
  btn.classList.add('active'); renderProducts(cat);
}
function toggleColor(el){ el.classList.toggle('selected'); }

var toastTimer;
function showToast(msg) {
  var t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(function(){t.classList.remove('show');},3000);
}

document.addEventListener('DOMContentLoaded', function() {
  loadSession();
  renderProducts();
  renderBouquets();
  updateCartUI();
  updateNavForUser();
  document.getElementById('productModal').addEventListener('click',function(e){if(e.target===e.currentTarget)closeModal();});
  document.getElementById('checkoutModal').addEventListener('click',function(e){if(e.target===e.currentTarget)closeCheckout();});
  document.getElementById('authModal').addEventListener('click',function(e){if(e.target===e.currentTarget)closeAuth();});
  document.getElementById('profileModal').addEventListener('click',function(e){if(e.target===e.currentTarget)closeProfile();});
});
