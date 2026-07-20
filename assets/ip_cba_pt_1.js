function cargarJSONP(url, callbackName) {
  // Crear un nombre único para la función que va a recibir los datos
  const name = callbackName || 'jsonp_callback_' + Math.round(100000 * Math.random());
  
  // Le avisamos globalmente al navegador qué hacer cuando el servidor responda
  window[name] = function(data) {
    console.log("Datos recibidos por JSONP:", data);
    
    // --- ACÁ ADENTRO MANEJÁS LOS DATOS DE LA VISITA ---
    // Ej: si querés hacer algo con la IP o el contador
    
    // Limpieza: borramos el script y la función para no ensuciar la memoria
    document.body.removeChild(script);
    delete window[name];
  };

  // Crear la etiqueta <script> dinámicamente
  const script = document.createElement('script');
  
  // Armamos la URL inyectándole el parámetro callback que espera el servidor PHP
  // Si la url ya tiene un '?', usamos '&', si no, usamos '?'
  const separador = url.indexOf('?') >= 0 ? '&' : '?';
  script.src = `${url}${separador}callback=${name}`;
  
  // Al meter el script al cuerpo del HTML, el navegador lo ejecuta y saltea el CORS
  document.body.appendChild(script);
}

// --- EJECUCIÓN ---
// Llamamos a la función apuntando a tu script de coinmonitor
cargarJSONP("https://plu.coinmonitor.site/ip_cba_pt.php");