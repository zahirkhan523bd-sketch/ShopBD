// WhatsApp Support: replace this with your WhatsApp number in international format, digits only.
// Example Bangladesh: 8801XXXXXXXXX (do not include +, spaces or dashes)
const WHATSAPP_SUPPORT_NUMBER = "8801XXXXXXXXX";

const seedProducts = [
 {id:1,name:"Sonic Pro Wireless Headphone",category:"Audio",price:2490,old:3200,tag:"BEST SELLER",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"},
 {id:2,name:"Smart Watch Series X",category:"Wearables",price:3890,old:4500,tag:"NEW",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"},
 {id:3,name:"Compact Bluetooth Speaker",category:"Audio",price:1790,old:2200,tag:"-১৮%",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80"},
 {id:4,name:"Wireless Earbuds Lite",category:"Audio",price:2190,old:2690,tag:"POPULAR",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=80"},
 {id:5,name:"Everyday Smartphone",category:"Mobile",price:18990,old:20990,tag:"HOT DEAL",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80"},
 {id:6,name:"Minimal Smart Watch",category:"Wearables",price:3290,old:3990,tag:"-১৭%",image:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=80"},
 {id:7,name:"Mechanical Keyboard",category:"Accessories",price:4250,old:4900,tag:"GAMING",image:"https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=700&q=80"},
 {id:8,name:"Premium Mobile Accessory",category:"Accessories",price:990,old:1250,tag:"VALUE",image:"https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&w=700&q=80"}
];
let products = JSON.parse(localStorage.getItem("shopbd-products") || "null") || seedProducts;
let cart = JSON.parse(localStorage.getItem("shopbd-cart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("shopbd-wishlist") || "[]");
let activeFilter = "All";
const grid = document.getElementById("productGrid");
const money = n => "৳ " + n.toLocaleString("en-BD");
function renderProducts(){
 const term = document.getElementById("searchInput").value.trim().toLowerCase();
 const shown = products.filter(p => (activeFilter==="All" || p.category===activeFilter) && (p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)));
 grid.innerHTML = shown.map(p=>`<article class="product-card"><div class="product-image"><span class="tag">${p.tag}</span><button class="heart ${wishlist.includes(p.id)?"saved":""}" data-wish="${p.id}" aria-label="Wishlist">${wishlist.includes(p.id)?"♥":"♡"}</button><img src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><div class="price-row"><div><span class="price">${money(p.price)}</span><span class="old-price">${money(p.old)}</span></div><button class="add-btn" data-add="${p.id}" aria-label="কার্টে যোগ করুন">＋</button></div></div></article>`).join("");
 document.getElementById("emptyState").hidden = shown.length>0;
}
function saveCart(){localStorage.setItem("shopbd-cart",JSON.stringify(cart));renderCart()}
function renderCart(){
 const count=cart.reduce((s,i)=>s+i.qty,0);
 document.getElementById("cartCount").textContent=count;
 const items=cart.map(i=>({...products.find(p=>p.id===i.id),qty:i.qty})).filter(p=>p.id);
 document.getElementById("cartItems").innerHTML=items.length?items.map(p=>`<div class="cart-line"><img src="${p.image}" alt=""><div class="cart-line-info"><b>${p.name}</b><small>${money(p.price)}</small><div class="qty-controls"><button data-qty="${p.id}" data-change="-1">−</button><span>${p.qty}</span><button data-qty="${p.id}" data-change="1">＋</button></div></div><b>${money(p.price*p.qty)}</b></div>`).join(""):'<p class="cart-empty">আপনার কার্ট এখনো খালি।</p>';
 document.getElementById("cartSubtotal").textContent=money(items.reduce((s,p)=>s+p.price*p.qty,0));
}
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),1900)}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("backdrop").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("backdrop").classList.remove("show")}
grid.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]"); const wish=e.target.closest("[data-wish]");
 if(add){const id=Number(add.dataset.add),product=products.find(p=>p.id===id),found=cart.find(i=>i.id===id);if(product && product.stock!==undefined && (found?.qty||0)>=product.stock){toast("দুঃখিত, পর্যাপ্ত স্টক নেই");return;}found?found.qty++:cart.push({id,qty:1});saveCart();toast("পণ্যটি কার্টে যোগ হয়েছে");}
 if(wish){const id=Number(wish.dataset.wish);wishlist=wishlist.includes(id)?wishlist.filter(x=>x!==id):[...wishlist,id];localStorage.setItem("shopbd-wishlist",JSON.stringify(wishlist));renderProducts();toast(wishlist.includes(id)?"পছন্দের তালিকায় যোগ হয়েছে":"তালিকা থেকে সরানো হয়েছে");}
});
document.getElementById("cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-qty]");if(!b)return;const id=Number(b.dataset.qty),item=cart.find(i=>i.id===id);item.qty+=Number(b.dataset.change);if(item.qty<=0)cart=cart.filter(i=>i.id!==id);saveCart()});
document.getElementById("cartToggle").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
document.getElementById("backdrop").addEventListener("click",closeCart);
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("searchForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("products").scrollIntoView({behavior:"smooth"})});
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeFilter=b.dataset.filter;renderProducts()}));
document.querySelectorAll(".category-card").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));renderProducts();document.getElementById("products").scrollIntoView({behavior:"smooth"})}));
document.getElementById("wishlistToggle").addEventListener("click",()=>{activeFilter="All";document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter==="All"));grid.innerHTML=products.filter(p=>wishlist.includes(p.id)).map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt=""></div><div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><div class="price-row"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}">＋</button></div></div></article>`).join("");document.getElementById("emptyState").hidden=wishlist.length>0;document.getElementById("products").scrollIntoView({behavior:"smooth"});});
document.getElementById("checkoutBtn").addEventListener("click",()=>toast("চেকআউট ফিচার পরবর্তী ধাপে তৈরি করব"));
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();toast("ধন্যবাদ! সাবস্ক্রিপশন ডেমো সম্পন্ন হয়েছে।");e.target.reset()});
renderProducts();renderCart();
// Floating WhatsApp customer support button
const whatsappSupport = document.getElementById("whatsappSupport");
if (whatsappSupport) {
  whatsappSupport.addEventListener("click", (event) => {
    event.preventDefault();
    const number = WHATSAPP_SUPPORT_NUMBER.replace(/\D/g, "");
    if (!number || number === "8801XXXXXXXXX") {
      toast("WhatsApp নম্বর সেট করতে script.js-এর WHATSAPP_SUPPORT_NUMBER পরিবর্তন করুন");
      return;
    }
    const message = encodeURIComponent("হ্যালো ShopBD, আমি আপনার পণ্য সম্পর্কে জানতে চাই।");
    window.open(`https://wa.me/${number}?text=${message}`, "_blank", "noopener,noreferrer");
  });
}
