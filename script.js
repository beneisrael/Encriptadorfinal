// === ELEMENTOS SEPARADOS ===
const writingEffect = document.getElementById('writingEffect');
const statusMessage = document.getElementById('statusMessage');
const inputText = document.getElementById('inputText');
const btnEncriptar = document.getElementById('btnEncriptar');
const btnDesencriptar = document.getElementById('btnDesencriptar');
const copyBtn = document.getElementById('copyBtn');
let dotsInterval;

// Función para resetear botones a estado original
function resetearBotones() {
  btnEncriptar.textContent = 'Encriptar';
  btnEncriptar.className = 'btn-encriptar';
  btnDesencriptar.textContent = 'Desencriptar';
  btnDesencriptar.className = 'btn-desencriptar';
}

// Función para detener el efecto de escritura
function detenerEfectoEscritura() {
  clearInterval(dotsInterval);
  writingEffect.innerHTML = '';
}

// === EFECTO "ESCRIBIENDO" CON RELOJ GIRATORIO A LA DERECHA ===
inputText.addEventListener('input', () => {
  detenerEfectoEscritura();
  let dots = 0;
  statusMessage.textContent = '';
  
  // Resetear botones a estado original cuando se escribe
  resetearBotones();
  
  if(inputText.value.length > 0){
    dotsInterval = setInterval(() => {
      dots = (dots + 1) % 4;
      // Crear el contenido con los puntos primero y el reloj giratorio a la derecha
      writingEffect.innerHTML = `
        <span>Escribiendo${'.'.repeat(dots)}</span>
        <span class="clock-icon">⏳</span>
      `;
    }, 500);
  } else {
    writingEffect.innerHTML = '';
  }
});

// === FUNCIONES DE ENCRIPTAR Y DESENCRIPTAR ===
function encriptar() {
  const texto = inputText.value;
  if (/[^a-z\s]/.test(texto)) {
    statusMessage.textContent = 'Ups 😅 solo letras minúsculas y sin caracteres especiales';
    detenerEfectoEscritura();
    return;
  }
  const textoEncriptado = texto.replace(/e/g, 'enter')
                               .replace(/o/g, 'over')
                               .replace(/i/g, 'imes')
                               .replace(/a/g, 'ai')
                               .replace(/u/g, 'ufat');
  const outputText = document.getElementById('outputText');
  outputText.value = textoEncriptado;
  if(textoEncriptado.length > 0){
    outputText.style.backgroundImage = 'none';
  }
  
  // Cambiar estado del botón encriptar
  btnEncriptar.textContent = 'Encriptado';
  btnEncriptar.className = 'btn-copiado';
  
  // Resetear botón desencriptar
  btnDesencriptar.textContent = 'Desencriptar';
  btnDesencriptar.className = 'btn-desencriptar';
  
  detenerEfectoEscritura();
  statusMessage.textContent = '✅ Texto encriptado correctamente';
  
  // Volver a estado original después de 2 segundos
  setTimeout(resetearBotones, 2000);
}

function desencriptar() {
  const textoEncriptado = inputText.value;
  if (/[^a-z\s]/.test(textoEncriptado)) {
    statusMessage.textContent = 'Ups 😅 solo letras minúsculas y sin caracteres especiales';
    detenerEfectoEscritura();
    return;
  }
  const textoDesencriptado = textoEncriptado.replace(/ufat/g,'u')
                                           .replace(/ai/g,'a')
                                           .replace(/imes/g,'i')
                                           .replace(/over/g,'o')
                                           .replace(/enter/g,'e');
  const outputText = document.getElementById('outputText');
  outputText.value = textoDesencriptado;
  if(textoDesencriptado.length > 0){
    outputText.style.backgroundImage = 'none';
  }
  
  // Cambiar estado del botón desencriptar
  btnDesencriptar.textContent = 'Desencriptado';
  btnDesencriptar.className = 'btn-copiado';
  
  // Resetear botón encriptar
  btnEncriptar.textContent = 'Encriptar';
  btnEncriptar.className = 'btn-encriptar';
  
  detenerEfectoEscritura();
  statusMessage.textContent = '✅ Texto desencriptado correctamente';
  
  // Volver a estado original después de 2 segundos
  setTimeout(resetearBotones, 2000);
}

// === FUNCION COPIAR Y BORRAR ===
function copiarYborrar() {
  const outputText = document.getElementById('outputText');
  if(outputText.value.length === 0) return;

  navigator.clipboard.writeText(outputText.value).then(() => {
    copyBtn.textContent = '¡Copiado!';
    copyBtn.classList.add('copiado');
    statusMessage.textContent = '✅ Texto copiado al portapapeles';
    
    // DETENER EL EFECTO DE ESCRITURA AL COPIAR Y BORRAR
    detenerEfectoEscritura();
    
    setTimeout(() => {
      copyBtn.textContent = 'Copiar y borrar';
      copyBtn.classList.remove('copiado');
      statusMessage.textContent = '';
    }, 2000);

    // Limpiar campos
    inputText.value = '';
    outputText.value = '';
    outputText.style.backgroundImage = "url('muneco.png')";
    
    // Resetear botones después de copiar y borrar
    resetearBotones();
  }).catch(err => {
    statusMessage.textContent = 'Error al copiar: ' + err;
    detenerEfectoEscritura();
  });
}
