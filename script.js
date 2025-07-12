document.addEventListener("DOMContentLoaded", function(){
  // Login
  document.getElementById('form-login').addEventListener('submit', async function(e){
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const msg = document.getElementById('login-msg');
    if(!email || !password){
      msg.textContent = "Por favor llena todos los campos.";
      msg.className = "msg error";
      return;
    }
    setTimeout(function(){
      msg.textContent = "¡Ingreso exitoso! Bienvenido.";
      msg.className = "msg success";
      document.getElementById('login').style.display = "none";
      document.getElementById('main-nav').style.display = "flex";
      document.getElementById('trading').style.display = "block";
      document.getElementById('deposito').style.display = "block";
      document.getElementById('retiro').style.display = "block";
    }, 700);
  });

  // Depósito
  document.getElementById('form-deposito').addEventListener('submit', async function(e){
    e.preventDefault();
    const pais = document.getElementById('pais-deposito').value;
    const monto = document.getElementById('monto-deposito').value;
    const msg = document.getElementById('deposito-msg');
    if(!pais || !monto || monto <= 0){
      msg.textContent = "Completa todos los datos correctamente.";
      msg.className = "msg error";
      return;
    }
    msg.textContent = `¡Depósito realizado por USD ${monto}!`;
    msg.className = "msg success";
    this.reset();
  });

  // Retiro
  document.getElementById('form-retiro').addEventListener('submit', async function(e){
    e.preventDefault();
    const banco = document.getElementById('banco').value.trim();
    const pais = document.getElementById('pais-retiro').value;
    const cuenta = document.getElementById('cuenta').value.trim();
    const monto = document.getElementById('monto-retiro').value;
    const msg = document.getElementById('retiro-msg');
    if(!banco || !pais || !cuenta || !monto || monto <= 0){
      msg.textContent = "Completa todos los datos correctamente.";
      msg.className = "msg error";
      return;
    }
    msg.textContent = `¡Retiro solicitado por USD ${monto}!`;
    msg.className = "msg success";
    this.reset();
  });

  // Cerrar sesión
  document.getElementById('logout-btn').addEventListener('click', function(){
    // Ocultar módulos y barra de navegación
    document.getElementById('main-nav').style.display = "none";
    document.getElementById('trading').style.display = "none";
    document.getElementById('deposito').style.display = "none";
    document.getElementById('retiro').style.display = "none";
    document.getElementById('login').style.display = "block";
    // Limpiar mensajes
    document.getElementById('login-msg').textContent = "";
    document.getElementById('deposito-msg').textContent = "";
    document.getElementById('retiro-msg').textContent = "";
    // Limpiar campos
    document.getElementById('form-login').reset();
    document.getElementById('form-deposito').reset();
    document.getElementById('form-retiro').reset();
  });
});