/* Entradas */
const dia = document.getElementById('dia');
const mes = document.getElementById('mes');
const anio = document.getElementById('anio');

/* Boton */
const btn = document.getElementById('calcular');

/* Salida */
const labor = document.getElementById('laborable');

/* Da formato a caracteres de longitud de 2 */
function formato(numero) {
  if (numero.length===1){
    return '0'+numero;
  }else if(numero.length>2 && numero[0] === '0'){
    return formato(numero.substring(1));
  }
  return numero;
}
/* Da formato a caracteres de longitud de 4 */
function formato4(numero) {
  if (numero.length<4){
    return formato4('0'+numero);
  }else if(numero.length>4 && numero[0] === '0'){
    return formato4(numero.substring(1));
  }
  return numero;
}

/* Listener del boton */
btn.addEventListener('click', ()=>{
  /* Expresiones Regulares */
  const dregex = /^[0][123456789]$|^[12]\d$|^[3][01]$/g;
  const mregex = /^[0][123456789]$|^[1][012]$/g
  const aregex = /^\d{4}$/g
  /* Captura del contenido de los contenedores */
  const d = formato(dia.value); // regex /^[0][123456789]$|^[12]\d$|^[3][01]$/g
  const m = formato(mes.value); // regex /^[0][123456789]$|^[1][012]$/g
  const a = formato4(anio.value); // regex /^\d{4}$/g
  /* Banderas para la correcta asignacion de la fecha */
  let dvalido = false;
  let mvalido = false;
  let avalido = false;

  /* Validadores de los datos con la expresion regular */
  if(d.match(dregex))dvalido=true;
  if(m.match(mregex))mvalido=true;
  if(a.match(aregex))avalido=true;
  /* Si los datos son correctos asignar fecha*/
  if(dvalido&&mvalido&&avalido){
    const fecha = new Date(`${m}/${d}/${a}`);
    /* Captura en numero el dia de la semana de tal fecha */
    switch(fecha.getDay()){
      case 0:
        labor.value = 'Domingo, fin de semana';
        break;
      case 1:
        labor.value = 'Lunes, día labrorable';
        break;
      case 2:
        labor.value = 'Martes, día labrorable';
        break;
      case 3:
        labor.value = 'Miércoles, día labrorable';
        break;
      case 4:
        labor.value = 'Jueves, día labrorable';
        break;
      case 5:
        labor.value = 'Viernes, día labrorable';
        break;
      case 6:
        labor.value = 'Sabado, fin de semana';
        break;
    }
  }else{
    /* En caso de haber errores mostrar en que parte fue el error */
    if(!dvalido)alert("Día esta incorrecto");
    else if(!mvalido)alert("Mes esta incorrecto");
    else alert("Año esta incorrecto");
  }
})
