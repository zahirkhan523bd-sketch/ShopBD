const seedProducts=[
{id:1,name:"Sonic Pro Wireless Headphone",category:"Audio",sku:"AUD-001",price:2490,old:3200,stock:14,tag:"BEST SELLER",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"},
{id:2,name:"Smart Watch Series X",category:"Wearables",sku:"WRB-002",price:3890,old:4500,stock:4,tag:"NEW",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"},
{id:3,name:"Compact Bluetooth Speaker",category:"Audio",sku:"AUD-003",price:1790,old:2200,stock:22,tag:"-১৮%",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80"},
{id:4,name:"Wireless Earbuds Lite",category:"Audio",sku:"AUD-004",price:2190,old:2690,stock:3,tag:"POPULAR",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80"},
{id:5,name:"Everyday Smartphone",category:"Mobile",sku:"MOB-005",price:18990,old:20990,stock:8,tag:"HOT DEAL",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"},
{id:6,name:"Minimal Smart Watch",category:"Wearables",sku:"WRB-006",price:3290,old:3990,stock:0,tag:"-১৭%",image:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80"},
{id:7,name:"Mechanical Keyboard",category:"Accessories",sku:"ACC-007",price:4250,old:4900,stock:16,tag:"GAMING",image:"https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=80"}
];
const seedOrders=[
{id:"SB-1048",customer:"Rahim Ahmed",product:"Sonic Pro Wireless Headphone",qty:1,date:"2025-05-18",total:2490,status:"Pending"},
{id:"SB-1047",customer:"Nusrat Jahan",product:"Smart Watch Series X",qty:1,date:"2025-05-17",total:3890,status:"Confirmed"},
{id:"SB-1046",customer:"Tanvir Hasan",product:"Wireless Earbuds Lite",qty:2,date:"2025-05-16",total:4380,status:"Shipped"},
{id:"SB-1045",customer:"Sadia Islam",product:"Everyday Smartphone",qty:1,date:"2025-05-15",total:18990,status:"Delivered"},
{id:"SB-1044",customer:"Fahim Khan",product:"Compact Bluetooth Speaker",qty:1,date:"2025-05-14",total:1790,status:"Cancelled"}
];
let products=JSON.parse(localStorage.getItem("shopbd-products")||"null")||seedProducts;
let orders=JSON.parse(localStorage.getItem("shopbd-orders")||"null")||seedOrders;
const $=id=>document.getElementById(id), money=n=>"৳ "+Number(n||0).toLocaleString("en-BD");
function saveProducts(){localStorage.setItem("shopbd-products",JSON.stringify(products));}
function saveOrders(){localStorage.setItem("shopbd-orders",JSON.stringify(orders));}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1800)}
function showView(name){document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id==="view-"+name));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===name));const titles={overview:"ড্যাশবোর্ড",products:"পণ্য ম্যানেজমেন্ট",orders:"অর্ডার ম্যানেজমেন্ট",inventory:"স্টক ম্যানেজমেন্ট"};$("pageTitle").textContent=titles[name];$("sidebar").classList.remove("open");renderAll()}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.go)));
$("menuBtn").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
function renderOverview(){
 $("statSales").textContent=money(orders.filter(o=>o.status!=="Cancelled").reduce((s,o)=>s+Number(o.total),0));
 $("statOrders").textContent=orders.length.toLocaleString("en-BD");$("statProducts").textContent=products.length.toLocaleString("en-BD");$("statLow").textContent=products.filter(p=>p.stock<=5).length.toLocaleString("en-BD");
 $("recentOrders").innerHTML=orders.slice().sort((a,b)=>b.id.localeCompare(a.id)).slice(0,5).map(o=>`<tr><td><strong>${o.id}</strong></td><td>${o.customer}</td><td>${o.date}</td><td><strong>${money(o.total)}</strong></td><td><span class="status ${o.status}">${statusBn(o.status)}</span></td></tr>`).join("")||'<tr><td colspan="5" class="empty-row">এখনো কোনো অর্ডার নেই</td></tr>';
 const low=products.filter(p=>p.stock<=5);$("lowStockList").innerHTML=low.length?low.map(p=>`<div class="low-item"><img class="low-thumb" src="${p.image}" alt=""><div><b>${p.name}</b><small>${p.sku}</small></div><strong>${p.stock===0?"Out of stock":p.stock+" pcs"}</strong></div>`).join(""):'<p class="empty-row">সব পণ্যের স্টক পর্যাপ্ত আছে ✓</p>';
}
function statusBn(s){return({Pending:"অপেক্ষমাণ",Confirmed:"কনফার্মড",Shipped:"পাঠানো হয়েছে",Delivered:"ডেলিভার্ড",Cancelled:"বাতিল"})[s]||s}
function renderProducts(){
 const term=$("productSearch").value.toLowerCase();const list=products.filter(p=>(p.name+" "+p.sku).toLowerCase().includes(term));$("productCount").textContent=list.length+"টি পণ্য";
 $("productsTable").innerHTML=list.map(p=>`<tr><td><div class="product-cell"><img src="${p.image}" alt=""><div><b>${p.name}</b><small>${p.sku}</small></div></div></td><td>${p.category}</td><td><strong>${money(p.price)}</strong>${p.old?`<br><small style="color:#aaa;text-decoration:line-through">${money(p.old)}</small>`:""}</td><td><span class="status ${p.stock<=5?"Pending":"Delivered"}">${p.stock} pcs</span></td><td><button class="action-btn" data-edit="${p.id}">এডিট</button><button class="action-btn delete" data-delete="${p.id}">ডিলিট</button></td></tr>`).join("")||'<tr><td colspan="5" class="empty-row">কোনো পণ্য পাওয়া যায়নি</td></tr>';
}
function renderOrders(){
 const filter=$("orderFilter").value;const list=orders.filter(o=>filter==="All"||o.status===filter);
 $("ordersTable").innerHTML=list.map(o=>`<tr><td><strong>${o.id}</strong></td><td>${o.customer}</td><td>${o.product}${o.qty>1?" × "+o.qty:""}</td><td>${o.date}</td><td><strong>${money(o.total)}</strong></td><td><span class="status ${o.status}">${statusBn(o.status)}</span></td><td><select class="status-select" data-order="${o.id}" aria-label="অর্ডার স্ট্যাটাস">${["Pending","Confirmed","Shipped","Delivered","Cancelled"].map(s=>`<option ${o.status===s?"selected":""} value="${s}">${statusBn(s)}</option>`).join("")}</select></td></tr>`).join("")||'<tr><td colspan="7" class="empty-row">এই ফিল্টারে কোনো অর্ডার নেই</td></tr>';
}
function renderInventory(){
 $("inventoryTable").innerHTML=products.map(p=>`<tr><td><div class="product-cell"><img src="${p.image}" alt=""><div><b>${p.name}</b><small>${p.category}</small></div></div></td><td>${p.sku}</td><td><strong>${p.stock}</strong> pcs</td><td><span class="status ${p.stock===0?"Cancelled":p.stock<=5?"Pending":"Delivered"}">${p.stock===0?"স্টক শেষ":p.stock<=5?"কম স্টক":"পর্যাপ্ত"}</span></td><td><input class="stock-input" type="number" min="0" value="${p.stock}" data-stock="${p.id}"> <button class="action-btn" data-save-stock="${p.id}">সেভ</button></td></tr>`).join("")||'<tr><td colspan="5" class="empty-row">কোনো পণ্য নেই</td></tr>';
}
function renderAll(){renderOverview();renderProducts();renderOrders();renderInventory()}
function openModal(p=null){
 $("productForm").reset();$("editId").value=p?p.id:"";$("modalTitle").textContent=p?"পণ্য সম্পাদনা করুন":"নতুন পণ্য যোগ করুন";
 if(p){$("pName").value=p.name;$("pCategory").value=p.category;$("pSku").value=p.sku;$("pPrice").value=p.price;$("pOld").value=p.old||"";$("pStock").value=p.stock;$("pTag").value=p.tag||"";$("pImage").value=p.image||"";}
 $("productModal").classList.add("show");
}
function closeModal(){$("productModal").classList.remove("show")}
$("addProductBtn").addEventListener("click",()=>openModal());
$("closeModal").addEventListener("click",closeModal);$("cancelModal").addEventListener("click",closeModal);
$("productModal").addEventListener("click",e=>{if(e.target===$("productModal"))closeModal()});
$("productForm").addEventListener("submit",e=>{
 e.preventDefault();const id=$("editId").value?Number($("editId").value):Date.now();
 const item={id,name:$("pName").value.trim(),category:$("pCategory").value,sku:$("pSku").value.trim(),price:Number($("pPrice").value),old:Number($("pOld").value)||0,stock:Number($("pStock").value),tag:$("pTag").value.trim()||"NEW",image:$("pImage").value.trim()||"https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=500&q=80"};
 const idx=products.findIndex(p=>p.id===id);if(idx>=0)products[idx]=item;else products.unshift(item);saveProducts();closeModal();renderAll();toast(idx>=0?"পণ্যের তথ্য আপডেট হয়েছে":"নতুন পণ্য যোগ হয়েছে");
});
$("productsTable").addEventListener("click",e=>{
 const edit=e.target.closest("[data-edit]"),del=e.target.closest("[data-delete]");
 if(edit){const p=products.find(x=>x.id===Number(edit.dataset.edit));if(p)openModal(p)}
 if(del){const id=Number(del.dataset.delete);if(confirm("এই পণ্যটি মুছে ফেলতে চান?")){products=products.filter(p=>p.id!==id);saveProducts();renderAll();toast("পণ্য মুছে ফেলা হয়েছে")}}
});
$("productSearch").addEventListener("input",renderProducts);
$("orderFilter").addEventListener("change",renderOrders);
$("ordersTable").addEventListener("change",e=>{const sel=e.target.closest("[data-order]");if(!sel)return;const order=orders.find(o=>o.id===sel.dataset.order);if(order){order.status=sel.value;saveOrders();renderAll();toast("অর্ডারের স্ট্যাটাস আপডেট হয়েছে")}});
$("inventoryTable").addEventListener("click",e=>{const btn=e.target.closest("[data-save-stock]");if(!btn)return;const id=Number(btn.dataset.saveStock),input=document.querySelector(`[data-stock="${id}"]`),p=products.find(x=>x.id===id);if(p&&input){p.stock=Math.max(0,Number(input.value)||0);saveProducts();renderAll();toast("স্টক আপডেট হয়েছে")}});
renderAll();