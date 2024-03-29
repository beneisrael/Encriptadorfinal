function encriptar() {
  var texto = document.getElementById('inputText').value;
  if (/[^a-z\s]/.test(texto)) {
    alert('Por favor, ingresa el texto solo con letras minúsculas y sin caracteres especiales.');
    return;
  }
  var textoEncriptado = texto.replace(/e/g, 'enter')
                             .replace(/o/g, 'over')
                             .replace(/i/g, 'imes')
                             .replace(/a/g, 'ai')
                             .replace(/u/g, 'ufat');
  document.getElementById('outputText').value = textoEncriptado;
}

function desencriptar() {
  var textoEncriptado = document.getElementById('inputText').value;
  if (/[^a-z\s]/.test(textoEncriptado))
    {
      alert('Por favor, ingresa el texto encripado sólo con letras minúsculas y sin acentos');
      return;
    }
  var textoDesencriptado = textoEncriptado.replace(/ufat/g, 'u')
                                           .replace(/ai/g, 'a')
                                           .replace(/imes/g, 'i')
                                           .replace(/over/g, 'o')
                                           .replace(/enter/g, 'e');
  document.getElementById('outputText').value = textoDesencriptado;
}

/*function copiarTexto() {
  var textoEncriptado = document.getElementById('outputText');
  textoEncriptado.select();
  textoEncriptado.setSelectionRange(0, 99999); /* Para dispositivos móviles //
  document.execCommand('copy');
  alert('Texto copiado: ' + textoEncriptado.value);
  // Borrar el texto de ambos cuadros de texto después de copiar
  document.getElementById('inputText').value = '';
  document.getElementById('outputText').value = '';
}*/
function copiarTexto() {
  var textoEncriptado = document.getElementById('outputText');
  navigator.clipboard.writeText(textoEncriptado.value).then(function() {
    alert('Texto copiado: ' + textoEncriptado.value);
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
  })
  .catch(function(error) {
    alert('Error al copiar el texto: ' + error);
  });
}