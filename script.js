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
    // Integración con backend ejemplo (reemplaza la URL y método según tu API)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, password})
      });
      const data = await res.json();
      if(res.ok && data.success){
        msg.textContent = "¡Ingreso exitoso! Bienvenido.";
        msg.className = "msg success";
        this.reset();
      } else {
        msg.textContent = data.message || "Error al ingresar.";
        msg.className = "msg error";
      }
    } catch (err) {
      msg.textContent = "No se pudo conectar con el servidor.";
      msg.className = "msg error";
    }
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
    // Integración con backend ejemplo
    try {
      const res = await fetch('/api/deposito', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({pais, monto})
      });
      const data = await res.json();
      if(res.ok && data.success){
        msg.textContent = `¡Depósito realizado por USD ${monto}!`;
        msg.className = "msg success";
        this.reset();
      } else {
        msg.textContent = data.message || "Error en el depósito.";
        msg.className = "msg error";
      }
    } catch (err) {
      msg.textContent = "No se pudo conectar con el servidor.";
      msg.className = "msg error";
    }
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
    // Integración con backend ejemplo
    try {
      const res = await fetch('/api/retiro', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({banco, pais, cuenta, monto})
      });
      const data = await res.json();
      if(res.ok && data.success){
        msg.textContent = `¡Retiro solicitado por USD ${monto}!`;
        msg.className = "msg success";
        this.reset();
      } else {
        msg.textContent = data.message || "Error en el retiro.";
        msg.className = "msg error";
      }
    } catch (err) {
      msg.textContent = "No se pudo conectar con el servidor.";
      msg.className = "msg error";
    }
  });
});