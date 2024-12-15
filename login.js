// Seleccionar los elementos del formulario
const username = document.querySelector("#user");
const password = document.querySelector("#password");
const iniciarSesion = document.querySelector(".submit");

const usuario = '123456789';  // Cambiar a tipo string
const contraseña = '123456789';  // Cambiar a tipo string

// Escuchar el evento 'click' en el botón de inicio de sesión
iniciarSesion.addEventListener('click', (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Validar que los campos no estén vacíos
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    
    if (usernameValue === "" || passwordValue === "") {
        alert("Por favor, completa los campos");
        return; // Salir de la función si hay campos vacíos
    }

    // Validación de credenciales
    if (passwordValue === '123456789' && usernameValue === '123456789') {
        window.location.href = "form.html";
    } else {
        alert("Credenciales incorrectas");
    }
});
