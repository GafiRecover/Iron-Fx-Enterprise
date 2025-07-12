// --------- Idiomas ---------
const LANGS = {
  es: {
    "i-header": "Iron Fx Recovery",
    "i-login": "Iniciar Sesión",
    "i-login-btn": "Entrar",
    "i-noaccount": "¿No tienes cuenta?",
    "i-register-link": "Regístrate aquí",
    "i-register": "Registrarse",
    "i-register-btn": "Registrarme",
    "i-haveaccount": "¿Ya tienes cuenta?",
    "i-login-link": "Inicia sesión",
    "i-email": "Correo electrónico",
    "i-pass": "Contraseña",
    "i-name": "Nombre completo",
    "i-trading": "Trading",
    "i-buy": "Comprar",
    "i-sell": "Vender",
    "i-openops": "Operaciones abiertas",
    "i-type": "Tipo",
    "i-price": "Precio",
    "i-amount": "Monto",
    "i-pl": "P/L",
    "i-action": "Acción",
    "i-download": "Descargar Reporte",
    "i-depwith": "Depósito y Retiro",
    "i-deposit": "Depósito",
    "i-withdraw": "Retiro",
    "i-method": "Método de pago",
    "i-country": "País",
    "i-bank": "Banco",
    "i-account": "Cuenta",
    "i-deposit-btn": "Depositar",
    "i-withdraw-btn": "Retirar",
    "i-admin": "Panel Admin",
    "i-admin-panel": "Panel de Administración",
    "i-users": "Usuarios",
    "i-balance": "Saldo",
    "i-status": "Estado",
    "i-download-users": "Descargar Usuarios",
    "i-methods": "Métodos de Pago",
    "i-add": "Agregar",
    "i-approve": "Aprobar",
    "i-reject": "Rechazar",
    "i-closed": "Cerrada"
  },
  en: {
    "i-header": "Iron Fx Recovery",
    "i-login": "Sign In",
    "i-login-btn": "Login",
    "i-noaccount": "Don't have an account?",
    "i-register-link": "Register here",
    "i-register": "Register",
    "i-register-btn": "Register",
    "i-haveaccount": "Already have an account?",
    "i-login-link": "Login",
    "i-email": "Email",
    "i-pass": "Password",
    "i-name": "Full name",
    "i-trading": "Trading",
    "i-buy": "Buy",
    "i-sell": "Sell",
    "i-openops": "Open Operations",
    "i-type": "Type",
    "i-price": "Price",
    "i-amount": "Amount",
    "i-pl": "P/L",
    "i-action": "Action",
    "i-download": "Download Report",
    "i-depwith": "Deposit & Withdraw",
    "i-deposit": "Deposit",
    "i-withdraw": "Withdraw",
    "i-method": "Payment Method",
    "i-country": "Country",
    "i-bank": "Bank",
    "i-account": "Account",
    "i-deposit-btn": "Deposit",
    "i-withdraw-btn": "Withdraw",
    "i-admin": "Admin Panel",
    "i-admin-panel": "Administration Panel",
    "i-users": "Users",
    "i-balance": "Balance",
    "i-status": "Status",
    "i-download-users": "Download Users",
    "i-methods": "Payment Methods",
    "i-add": "Add",
    "i-approve": "Approve",
    "i-reject": "Reject",
    "i-closed": "Closed"
  }
};
let lang = localStorage.getItem("ifx_lang") || (navigator.language.startsWith("es") ? "es" : "en");
function updateLangUI() {
  document.querySelectorAll("[class^='i-']").forEach(el => {
    let key = Array.from(el.classList).find(c=>c.startsWith("i-"));
    if (key && LANGS[lang][key]) el.innerText = LANGS[lang][key];
  });
}
document.getElementById("lang-select").value = lang;
document.getElementById("lang-select").onchange = function() {
  lang = this.value;
  localStorage.setItem("ifx_lang", lang);
  updateLangUI();
  renderAdminUsers();
  renderTradingUI();
};
// --------- Notificaciones ---------
function showNotify(msg,type="info") {
  let el = document.getElementById("notify");
  el.innerText = msg;
  el.style.display = "block";
  el.style.borderColor = type==="success"?"#0f0":type==="error"?"#f00":"#ff0000";
  el.style.color = type==="success"?"#0f0":type==="error"?"#f00":"#fff";
  el.style.opacity = 1;
  setTimeout(()=>{el.style.opacity=0; setTimeout(()=>{el.style.display="none";},500);},2400);
}
// --------- Utilidades y Datos ---------
const ADMIN_USER = "admin@ironfx.com";
const ADMIN_PASS = "admin123";
const DEFAULT_BALANCE = 10000;
function getUsers() {
  try { return JSON.parse(localStorage.getItem("ifx_users") || "[]"); } catch { return []; }
}
function setUsers(users) { localStorage.setItem("ifx_users", JSON.stringify(users)); }
function getSession() { try { return JSON.parse(localStorage.getItem("ifx_session") || "null"); } catch { return null; } }
function setSession(user) { user ? localStorage.setItem("ifx_session", JSON.stringify(user)) : localStorage.removeItem("ifx_session"); }
function getBalance(email) {
  let balances = JSON.parse(localStorage.getItem("ifx_balances") || "{}");
  if (!balances[email]) balances[email] = DEFAULT_BALANCE;
  return balances[email];
}
function setBalance(email, balance) {
  let balances = JSON.parse(localStorage.getItem("ifx_balances") || "{}");
  balances[email] = balance;
  localStorage.setItem("ifx_balances", JSON.stringify(balances));
}
function getOperations(email) {
  let all = JSON.parse(localStorage.getItem("ifx_ops") || "{}");
  return all[email] || [];
}
function setOperations(email, ops) {
  let all = JSON.parse(localStorage.getItem("ifx_ops") || "{}");
  all[email] = ops;
  localStorage.setItem("ifx_ops", JSON.stringify(all));
}
function getMethods() {
  let arr = JSON.parse(localStorage.getItem("ifx_methods") || "[]");
  if(!arr.length) arr = ["Skrill","Neteller","Transferencia Bancaria"];
  return arr;
}
function setMethods(arr) { localStorage.setItem("ifx_methods", JSON.stringify(arr)); }
// --------- Menú lateral ---------
function checkSidebar() {
  const session = getSession();
  if(session) {
    document.getElementById("sidebar").style.display = "flex";
    updateSidebarMenu();
  } else {
    document.getElementById("sidebar").style.display = "none";
  }
}
function updateSidebarMenu() {
  const session = getSession();
  const btnAdmin = document.getElementById('adminPanelBtn');
  document.querySelector('.sidebar-nav [data-section="trading"]').style.display = "block";
  if (session && session.isAdmin) { btnAdmin.style.display = "block"; }
  else { btnAdmin.style.display = "none"; }
}
function showSection(section) {
  for(const sec of ["trading","admin"]) {
    document.getElementById(sec).style.display = (sec===section)?"block":"none";
    const btn=document.querySelector('.sidebar-nav [data-section="'+sec+'"]');
    if(btn) btn.classList.toggle("active",sec===section);
  }
  updateBottomBar(section);
}
// --------- Multi-idioma inicial ---------
updateLangUI();
// --------- Login/Register ---------
document.getElementById("show-register").onclick = function(e){e.preventDefault();showRegister();}
document.getElementById("show-login").onclick = function(e){e.preventDefault();showLogin();}
function showLogin() {
  document.getElementById("register-panel").style.display = "none";
  document.getElementById("login-panel").style.display = "block";
  document.getElementById("content-area").style.justifyContent = "center";
  for(const sec of ["trading","admin"]) document.getElementById(sec).style.display = "none";
  document.getElementById("bottom-bar").style.display = "none";
  checkSidebar();
}
function showRegister() {
  document.getElementById("login-panel").style.display = "none";
  document.getElementById("register-panel").style.display = "block";
  document.getElementById("content-area").style.justifyContent = "center";
}
document.getElementById("form-login").onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim().toLowerCase();
  const pass = document.getElementById("login-password").value;
  const msg = document.getElementById("login-msg");
  msg.textContent = "";
  if(email===ADMIN_USER && pass===ADMIN_PASS){
    setSession({email,isAdmin:true,nombre:"Administrador"});
    document.getElementById("login-panel").style.display="none";
    checkSidebar();
    showSection("admin");
    document.getElementById("content-area").style.justifyContent = "flex-start";
    document.getElementById("bottom-bar").style.display = "none";
    updateLangUI();
    renderAdminUsers();
    return;
  }
  const users = getUsers();
  const user = users.find(u=>u.email===email);
  if(!user){
    msg.textContent = lang==="es"?"Usuario no registrado.":"User not registered.";
    msg.className = "msg error";
    return;
  }
  if(user.password!==pass){
    msg.textContent = lang==="es"?"Contraseña incorrecta.":"Wrong password.";
    msg.className = "msg error";
    return;
  }
  if(user.estado==="rechazado"){
    msg.textContent = lang==="es"?"Registro rechazado. Contacta soporte.":"Registration rejected. Contact support.";
    msg.className = "msg error";
    return;
  }
  if(user.estado!=="aprobado"){
    msg.textContent = lang==="es"?"Tu cuenta aún no ha sido aprobada por el administrador.":"Your account is pending admin approval.";
    msg.className = "msg error";
    return;
  }
  setSession({email: user.email, nombre: user.nombre, isAdmin:false});
  document.getElementById("login-panel").style.display="none";
  checkSidebar();
  showSection("trading");
  document.getElementById("content-area").style.justifyContent = "flex-start";
  document.getElementById("bottom-bar").style.display = "flex";
  updateLangUI();
  renderTradingUI();
};
// Registro
document.getElementById("form-register").onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById("reg-email").value.trim().toLowerCase();
  const password = document.getElementById("reg-password").value;
  const nombre = document.getElementById("reg-nombre").value.trim();
  const msg = document.getElementById("register-msg");
  msg.textContent = "";
  if(!email || !password || !nombre){
    msg.textContent = lang==="es"?"Completa todos los campos.":"Fill in all fields.";
    msg.className = "msg error";
    return;
  }
  if(email===ADMIN_USER){
    msg.textContent = lang==="es"?"No puedes registrar este correo.":"You can't register this email.";
    msg.className = "msg error";
    return;
  }
  let users = getUsers();
  if(users.find(u=>u.email===email)){
    msg.textContent = lang==="es"?"Este correo ya está registrado.":"This email is already registered.";
    msg.className = "msg error";
    return;
  }
  users.push({email, password, nombre, estado:"pendiente"});
  setUsers(users);
  msg.textContent = lang==="es"?"Registro realizado. Espera aprobación del administrador.":"Registered. Wait for admin approval.";
  msg.className = "msg success";
  setTimeout(()=>{showLogin();}, 1600);
};
// --------- Barra inferior móvil ---------
document.getElementById('bottom-tab-trading').onclick = function(){ showTradingForms("trading"); };
document.getElementById('bottom-tab-deposit').onclick = function(){ showTradingForms("deposit"); };
document.getElementById('bottom-tab-withdraw').onclick = function(){ showTradingForms("withdraw"); };
function updateBottomBar(section) {
  const session = getSession();
  if(session && !session.isAdmin) {
    document.getElementById("bottom-bar").style.display = "flex";
    ["bottom-tab-trading","bottom-tab-deposit","bottom-tab-withdraw"].forEach(id=>{
      document.getElementById(id).classList.remove("active");
    });
    if(section==="trading") document.getElementById('bottom-tab-trading').classList.add("active");
    if(section==="deposit") document.getElementById('bottom-tab-deposit').classList.add("active");
    if(section==="withdraw") document.getElementById('bottom-tab-withdraw').classList.add("active");
  } else {
    document.getElementById("bottom-bar").style.display = "none";
  }
}
function showTradingForms(which) {
  document.getElementById('bottom-tab-trading').classList.remove("active");
  document.getElementById('bottom-tab-deposit').classList.remove("active");
  document.getElementById('bottom-tab-withdraw').classList.remove("active");
  if(which==="trading") document.getElementById('bottom-tab-trading').classList.add("active");
  if(which==="deposit") document.getElementById('bottom-tab-deposit').classList.add("active");
  if(which==="withdraw") document.getElementById('bottom-tab-withdraw').classList.add("active");
  document.querySelector('.trading-board').style.display = (which==="trading") ? "block" : "none";
  document.querySelector('.operations-panel').style.display = (which==="trading") ? "block" : "none";
  document.getElementById('form-deposito').parentElement.style.display = (which!=="withdraw") ? "block" : "none";
  document.getElementById('form-deposito').style.display = (which==="deposit") ? "block" : (which==="trading" ? "block" : "none");
  document.getElementById('deposito-msg').style.display = (which==="deposit") ? "block" : (which==="trading" ? "block" : "none");
  document.getElementById('form-retiro').style.display = (which==="withdraw") ? "block" : (which==="trading" ? "block" : "none");
  document.getElementById('retiro-msg').style.display = (which==="withdraw") ? "block" : (which==="trading" ? "block" : "none");
}
// --------- Panel Admin ---------
function renderAdminUsers() {
  const tbody = document.getElementById("admin-users-table").querySelector("tbody");
  const users = getUsers();
  tbody.innerHTML = "";
  users.forEach((u,i) => {
    if (u.email === ADMIN_USER) return;
    let tr = document.createElement("tr");
    tr.className = u.estado==="aprobado"?"approved":(u.estado==="rechazado"?"rejected":"");
    tr.innerHTML = `
      <td>${u.email}</td>
      <td>${u.nombre||"-"}</td>
      <td>
        <input type="number" value="${getBalance(u.email)}" style="max-width:90px;" min="0" data-idx="${i}" class="edit-balance">
        <button class="save-balance" data-idx="${i}"><i class="fa fa-save"></i></button>
      </td>
      <td>${u.estado||"pendiente"}</td>
      <td class="admin-actions">
        ${u.estado==="pendiente"?`
        <button class="approve" data-idx="${i}">${LANGS[lang]["i-approve"]}</button>
        <button class="reject" data-idx="${i}">${LANGS[lang]["i-reject"]}</button>
        `:""}
      </td>`;
    tbody.appendChild(tr);
  });
  document.querySelectorAll('.admin-actions .approve').forEach(btn=>{
    btn.onclick = function(){
      let idx = +btn.dataset.idx;
      let users = getUsers();
      users[idx].estado = "aprobado";
      setUsers(users);
      renderAdminUsers();
      showNotify(lang==="es"?"Usuario aprobado.":"User approved.","success");
    }
  });
  document.querySelectorAll('.admin-actions .reject').forEach(btn=>{
    btn.onclick = function(){
      let idx = +btn.dataset.idx;
      let users = getUsers();
      users[idx].estado = "rechazado";
      setUsers(users);
      renderAdminUsers();
      showNotify(lang==="es"?"Usuario rechazado.":"User rejected.","error");
    }
  });
  document.querySelectorAll('.save-balance').forEach(btn=>{
    btn.onclick = function(){
      let idx = +btn.dataset.idx;
      let input = document.querySelector('.edit-balance[data-idx="'+idx+'"]');
      let users = getUsers();
      setBalance(users[idx].email, Number(input.value));
      showNotify(lang==="es"?"Saldo guardado.":"Balance saved.","success");
      renderAdminUsers();
    }
  });
}
function renderPaymentMethods() {
  let methods = getMethods();
  let ul = document.getElementById('method-list');
  ul.innerHTML = "";
  methods.forEach((m,i)=>{
    let li = document.createElement("li");
    li.innerHTML = `<span>${m}</span> <button onclick="removeMethod(${i})" style="font-size:.95em;padding:2px 9px;background:#900;color:#fff;border:none;border-radius:6px;cursor:pointer;">X</button>`;
    ul.appendChild(li);
  });
  setSelectOptions("dep-method", methods);
  setSelectOptions("ret-method", methods);
}
function setSelectOptions(id, arr) {
  let sel = document.getElementById(id);
  sel.innerHTML = "";
  arr.forEach(m=>{
    let op = document.createElement("option");
    op.value = m; op.innerText = m;
    sel.appendChild(op);
  });
}
window.removeMethod = function(i) {
  let methods = getMethods();
  methods.splice(i,1);
  setMethods(methods);
  renderPaymentMethods();
};
// --------- TradingView Widget ---------
let tvWidget = null;
function loadTradingView() {
  if(window.TradingView && !tvWidget) {
    tvWidget = new TradingView.widget({
      autosize: true,
      symbol: "FX:EURUSD",
      interval: "15",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: lang,
      toolbar_bg: "#f1f3f6",
      container_id: "tvchart",
      studies: [],
      hide_top_toolbar: false,
      hide_legend: false
    });
  }
}
// --------- Trading ---------
let tradingPrice = 1.1000, lastPrice = 1.1000, tradingInterval = null;
function startPriceFluctuation() {
  if(tradingInterval) clearInterval(tradingInterval);
  tradingInterval = setInterval(()=>{
    lastPrice = tradingPrice;
    let delta = (Math.random() - 0.5) * 0.004;
    delta = Math.round(delta * 10000) / 10000;
    tradingPrice = Math.max(1.0900, Math.min(1.1100, tradingPrice + delta));
    renderTradingPrice();
    renderOperations();
  }, 1800);
}
function renderTradingPrice() {
  // Solo si quieres mostrar precio random, aquí sería el spot simulado.
}
function renderTradingUI() {
  const session = getSession();
  if (!session || session.isAdmin) return;
  document.getElementById('simu-balance').textContent = LANGS[lang]["i-balance"]+": $"+getBalance(session.email).toFixed(2);
  renderOperations();
  showTradingForms("trading");
  startPriceFluctuation();
  loadTradingView();
  renderPaymentMethods();
}
function renderOperations() {
  const session = getSession();
  if (!session || session.isAdmin) return;
  const ops = getOperations(session.email);
  const tbody = document.getElementById("operations-table").querySelector("tbody");
  tbody.innerHTML = "";
  ops.forEach((op, idx) => {
    let pnl = op.closed ? op.pnl : (op.type==="buy"
      ? (tradingPrice - op.price) * op.amount * 100
      : (op.price - tradingPrice) * op.amount * 100 );
    let tr = document.createElement("tr");
    tr.className = op.type + (op.closed ? " closed" : "");
    tr.innerHTML = `
      <td>${op.type==="buy" ? '<span style="color:#0f0">'+LANGS[lang]["i-buy"]+'</span>' : '<span style="color:#f00">'+LANGS[lang]["i-sell"]+'</span>'}</td>
      <td>${op.price.toFixed(4)}</td>
      <td>${op.amount}</td>
      <td>${pnl.toFixed(2)}</td>
      <td>
        ${op.closed
          ? `<span style="color:#aaa">${LANGS[lang]["i-closed"]}</span>`
          : `<button style="padding:3px 9px;" onclick="closeOperation(${idx})"><i class="fa-solid fa-xmark"></i> ${LANGS[lang]["i-closed"]}</button>`
        }
      </td>
    `;
    tbody.appendChild(tr);
  });
}
window.closeOperation = function(idx) {
  const session = getSession();
  if (!session || session.isAdmin) return;
  let ops = getOperations(session.email);
  let op = ops[idx];
  let pnl = (op.type==="buy"
      ? (tradingPrice - op.price) * op.amount * 100
      : (op.price - tradingPrice) * op.amount * 100 );
  op.closed = true;
  op.pnl = pnl;
  setOperations(session.email, ops);
  let balance = getBalance(session.email);
  balance += pnl;
  setBalance(session.email, balance);
  renderTradingUI();
  showNotify(lang==="es"?"Operación cerrada":"Trade closed","success");
};
// Comprar/Vender
document.getElementById('btnBuy').onclick = function(){
  const session = getSession();
  if (!session || session.isAdmin) return;
  let amount = Number(document.getElementById('simu-amount').value) || 1;
  let ops = getOperations(session.email);
  ops.push({type: "buy", price: tradingPrice, amount, time: Date.now()});
  setOperations(session.email, ops);
  showNotify(lang==="es"?"Orden de compra ejecutada.":"Buy order placed.","success");
  renderOperations();
};
document.getElementById('btnSell').onclick = function(){
  const session = getSession();
  if (!session || session.isAdmin) return;
  let amount = Number(document.getElementById('simu-amount').value) || 1;
  let ops = getOperations(session.email);
  ops.push({type: "sell", price: tradingPrice, amount, time: Date.now()});
  setOperations(session.email, ops);
  showNotify(lang==="es"?"Orden de venta ejecutada.":"Sell order placed.","success");
  renderOperations();
};
// Depósito
document.getElementById('form-deposito').addEventListener('submit', function(e){
  e.preventDefault();
  const session = getSession();
  if (!session || session.isAdmin) return;
  const pais = document.getElementById('pais-deposito').value;
  const monto = +document.getElementById('monto-deposito').value;
  const msg = document.getElementById('deposito-msg');
  if(!pais || !monto || monto <= 0){
    msg.textContent = lang==="es"?"Completa todos los datos correctamente.":"Fill all fields.";
    msg.className = "msg error";
    return;
  }
  let balance = getBalance(session.email);
  balance += monto;
  setBalance(session.email, balance);
  msg.textContent = lang==="es"?"¡Depósito realizado por USD ":"Deposit done: USD "+monto+"!";
  msg.className = "msg success";
  document.getElementById('form-deposito').reset();
  renderTradingUI();
  showNotify(lang==="es"?"Depósito realizado.":"Deposit successful.","success");
  setTimeout(()=>{msg.textContent="";},1400);
});
// Retiro
document.getElementById('form-retiro').addEventListener('submit', function(e){
  e.preventDefault();
  const session = getSession();
  if (!session || session.isAdmin) return;
  const banco = document.getElementById('banco').value.trim();
  const pais = document.getElementById('pais-retiro').value;
  const cuenta = document.getElementById('cuenta').value.trim();
  const monto = +document.getElementById('monto-retiro').value;
  const msg = document.getElementById('retiro-msg');
  if(!banco || !pais || !cuenta || !monto || monto <= 0){
    msg.textContent = lang==="es"?"Completa todos los datos correctamente.":"Fill all fields.";
    msg.className = "msg error";
    return;
  }
  let balance = getBalance(session.email);
  if (monto > balance) {
    msg.textContent = lang==="es"?"Saldo insuficiente.":"Not enough balance.";
    msg.className = "msg error";
    return;
  }
  balance -= monto;
  setBalance(session.email, balance);
  msg.textContent = lang==="es"?"¡Retiro solicitado por USD ":"Withdraw requested: USD "+monto+"!";
  msg.className = "msg success";
  document.getElementById('form-retiro').reset();
  renderTradingUI();
  showNotify(lang==="es"?"Solicitud de retiro enviada.":"Withdraw requested.","success");
  setTimeout(()=>{msg.textContent="";},1400);
};
// Métodos de pago admin
document.getElementById("form-methods").onsubmit = function(e){
  e.preventDefault();
  let name = document.getElementById("method-name").value.trim();
  if(name){
    let arr = getMethods();
    if(!arr.includes(name)) arr.push(name);
    setMethods(arr);
    renderPaymentMethods();
    document.getElementById("method-name").value = "";
    showNotify(lang==="es"?"Método agregado.":"Method added.","success");
  }
};
// --------- Reportes Descargables ---------
function downloadCSV(data, filename) {
  let csv = Papa.unparse(data);
  var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
  saveAs(blob, filename);
}
document.getElementById("download-ops").onclick = function(){
  const session = getSession();
  if (!session || session.isAdmin) return;
  let ops = getOperations(session.email).map(op=>({
    Tipo: op.type,
    Precio: op.price,
    Monto: op.amount,
    "P/L": op.closed?op.pnl:"",
    Estado: op.closed?"cerrada":"abierta"
  }));
  downloadCSV(ops, "operaciones.csv");
};
document.getElementById("download-users").onclick = function(){
  let users = getUsers().map(u=>({
    Email: u.email, Nombre: u.nombre, Estado: u.estado, Saldo: getBalance(u.email)
  }));
  downloadCSV(users, "usuarios.csv");
};
// --------- Navegación ---------
document.querySelectorAll('.sidebar-nav button[data-section]').forEach(btn=>{
  btn.onclick = function(){
    const sec = btn.getAttribute('data-section');
    showSection(sec);
    if(sec==="admin") {
      renderAdminUsers(); renderPaymentMethods();
    }
    if(sec==="trading") renderTradingUI();
  }
});
// --------- Cerrar sesión ---------
document.getElementById('logout-btn').addEventListener('click', function(){
  setSession(null);
  showLogin();
});
// --------- Carga Inicial ---------
window.onload = function(){
  let session = getSession();
  updateLangUI();
  renderPaymentMethods();
  if(session){
    checkSidebar();
    if(session.isAdmin){
      showSection("admin");
      renderAdminUsers();
      renderPaymentMethods();
      document.getElementById("content-area").style.justifyContent = "flex-start";
      document.getElementById("bottom-bar").style.display = "none";
    } else {
      showSection("trading");
      document.getElementById("content-area").style.justifyContent = "flex-start";
      document.getElementById("bottom-bar").style.display = "flex";
      renderTradingUI();
      renderPaymentMethods();
    }
    document.getElementById("login-panel").style.display = "none";
    document.getElementById("register-panel").style.display = "none";
  } else {
    showLogin();
  }
}