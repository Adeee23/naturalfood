// Función de validación del formulario
function validarFormulario(event) {
    let formularioValido = true; // Bandera para indicar si el formulario es válido

    // Obtener los elementos del formulario
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const telefono = document.getElementById('telefono');
    const email = document.getElementById('email');
    const checkboxPrivacidad = document.getElementById('privacidad');

    // Obtener los contenedores de los mensajes de error
    const errorNombre = document.getElementById('errorNombre');
    const errorApellidos = document.getElementById('errorApellidos');
    const errorTelefono = document.getElementById('errorTelefono');
    const errorEmail = document.getElementById('errorEmail');
    const errorPrivacidad = document.getElementById('error');

    // Limpiar mensajes de error previos
    errorNombre.textContent = '';
    errorApellidos.textContent = '';
    errorTelefono.textContent = '';
    errorEmail.textContent = '';
    errorPrivacidad.textContent = '';

    // Validar el campo nombre
    const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ]{1,15}$/; // Expresión regular para nombre válido
    if (nombre.value.trim() === '') {
        errorNombre.textContent = 'El campo nombre no puede estar vacío.';
        formularioValido = false;
    } else if (!regexNombre.test(nombre.value.trim())) {
        errorNombre.textContent = 'El nombre solo puede contener letras y una longitud máxima de 15 caracteres.';
        formularioValido = false;
    }
    // Validar el campo apellidos
    const regexApellidos = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]{1,40}$/; // Expresión regular para apellidos válidos
    if (apellidos.value.trim() === '') {
        errorApellidos.textContent = 'El campo apellidos no puede estar vacío.';
        formularioValido = false;
    } else if (!regexApellidos.test(apellidos.value.trim())) {
        errorApellidos.textContent = 'El apellido solo puede contener letras y una longitud máxima de 40 caracteres.';
        formularioValido = false;
    }
    // Validar el campo teléfono 
    const regexTelefono = /^[0-9]{9}$/; // Expresión regular para teléfono válido
    if (telefono.value.trim() === '') {
        errorTelefono.textContent = 'El campo teléfono no puede estar vacío.';
        formularioValido = false;
    } else if (!regexTelefono.test(telefono.value.trim())) {
        errorTelefono.textContent = 'El teléfono solo puede contener números y una longitud máxima de 9 dígitos.';
        formularioValido = false;
    }
    // Validar el campo email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para email válido
    if (email.value.trim() === '') {
        errorEmail.textContent = 'El email no puede estar vacío.';
        formularioValido = false;
    } else if (!regexEmail.test(email.value.trim())) {
        errorEmail.textContent = 'El email debe cumplir con los estándares de un correo electrónico. Ejemplo: nnnnn_nnn@zzzzz.xxx';
        formularioValido = false;
    }

    // Validar si la casilla de política de privacidad está marcada
    if (!checkboxPrivacidad.checked) {
        errorPrivacidad.textContent = 'Debes aceptar la política de privacidad.';
        formularioValido = false;
    }

    // Si el formulario no es válido, prevenir el envío
    if (!formularioValido) {
        event.preventDefault(); // Evitar el envío del formulario
    }
}

// Función que actualiza el presupuesto final
function calcularPresupuesto() {
    // Obtener el valor del producto seleccionado
    const productoSelect = document.getElementById('producto');
    const productoPrecio = parseFloat(productoSelect.options[productoSelect.selectedIndex].text.split('-')[1].replace('€', '').trim());
  
    // Obtener el plazo seleccionado en días
    const plazoDias = parseInt(document.querySelector('input[name="plazo"]').value);
  
    // Descuento según el plazo
    let descuento = 0;
    if (plazoDias < 15) {
        descuento = 0.20; // 20% de descuento para menos de 15 días
    } else if (plazoDias >= 15 && plazoDias <= 30) {
        descuento = 0.15; // 15% de descuento entre 15 y 30 días
    } else {
        descuento = 0.10; // 10% de descuento para más de 30 días
    }
  
    // Obtener el valor de los extras seleccionados
    let extrasTotal = 0;
    const extras = document.querySelectorAll('input[name="extras"]:checked');
    extras.forEach((extra) => {
        extrasTotal += parseFloat(extra.value); // Sumar el valor de cada extra seleccionado
    });
  
    // Calcular el precio final con el descuento aplicado
    let precioFinal = productoPrecio + extrasTotal;
    precioFinal -= precioFinal * descuento; // Aplicar el descuento
  
    // Mostrar el presupuesto final en la página
    document.getElementById('presupuestoFinal').textContent = `${precioFinal.toFixed(2)}€`;
  }
  
  // Detectar cambios en el formulario
  document.getElementById('producto').addEventListener('change', calcularPresupuesto);
  document.querySelector('input[name="plazo"]').addEventListener('input', calcularPresupuesto);
  document.querySelectorAll('input[name="extras"]').forEach((extra) => {
    extra.addEventListener('change', calcularPresupuesto);
  });
  
  // Llamar a la función al cargar la página para calcular el presupuesto inicial
  window.addEventListener('load', calcularPresupuesto);
  