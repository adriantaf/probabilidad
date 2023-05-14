'use strict';

function crearTabla(datos, titulo) {
	const plantilla = document.getElementById('plantilla').content;
	let clonPlantilla = plantilla.cloneNode(true);
	let fragmento = document.createDocumentFragment();
	let idSeccion = Date.now();

	// Variables necesarias
	let datosOrdenados = datos.sort();
	let n = datos.length;
	let datoMasBajo = Math.min(...datos);
	let datoMasAlto = Math.max(...datos);
	let rango = datoMasAlto - datoMasBajo;
	let numeroDeClases = Math.ceil(Math.sqrt(n));
	let anchoDeClase = Math.ceil(rango / numeroDeClases);
	let clases = [];
	let xi = [];
	let fi = [];
	let fixi = [];
	let media = 0;
	let xiMenosMediaAlCuadrado = [];
	let fiPorXiMenosMediaAlCuadrado = [];
	let desviacionEstandar = 0;
	let mediaMenosDesviacionEstandar;
	let mediaMasDesviacionEstandar;

	// Variables para sacar las clases
	let x = datoMasBajo;
	let i = 0;

	// Genera las clases
	while(!(x >= datoMasAlto+1)) {
		clases[i] = [x, x + anchoDeClase - 1];

		x = x + anchoDeClase;
		i++;
	}

	// Genera las xi (marcas de clase)
	clases.forEach(el => {
		xi.push( (el[0] + el[1]) / 2);
	});

	// Da un valor default a cada espacio del array fi
	for (let i = 0; i < clases.length; i++) {
		fi[i] = 0;
	}

	// Genera la fi (frecuencia)
	datos.forEach(el => {
		for (let i = 0; i < clases.length; i++) {
			if (el >= clases[i][0] && el <= clases[i][1]) {
				fi[i] = fi[i] + 1;
			}
		}
	});

	// Genera la fixi
	xi.forEach((el, i) => {
		fixi[i] = el * fi[i];
	});
	
	// Genera la media
	fixi.forEach(el => {
		media+= el;
	});
	media = media / n;

	// Genera la (xi - media) al cuadrado
	xi.forEach((el, i) => {
		xiMenosMediaAlCuadrado[i] = Math.pow(el - media, 2);
	});

	// Genera la fi(xi - media) al cuadrado
	xiMenosMediaAlCuadrado.forEach((el, i) => {
		fiPorXiMenosMediaAlCuadrado[i] = fi[i] * el;
	});

	// Genera la desviacion estandar
	fiPorXiMenosMediaAlCuadrado.forEach(el => {
		desviacionEstandar += el;
	});
	desviacionEstandar = Math.sqrt(desviacionEstandar / n);

	// Datos para la grafica
	mediaMenosDesviacionEstandar = media - desviacionEstandar;
	mediaMasDesviacionEstandar = media + desviacionEstandar;

	// Genarar salida
	clases.forEach((el, i) => {
		let tr = document.createElement('tr');
		let tdClases = document.createElement('td');
		let tdXi = document.createElement('td');
		let tdFi = document.createElement('td');
		let tdFiXi = document.createElement('td');
		let tdXiMenosMediaAlCuadrado = document.createElement('td');
		let tdFiPorXiMenosMediaAlCuadrado = document.createElement('td');

		tdClases.innerText = `${el[0]}-${el[1]}`;
		tdXi.innerText = xi[i];
		tdFi.innerText = fi[i];
		tdFiXi.innerText = fixi[i];
		tdXiMenosMediaAlCuadrado.innerText = xiMenosMediaAlCuadrado[i].toFixed(2);
		tdFiPorXiMenosMediaAlCuadrado.innerText = fiPorXiMenosMediaAlCuadrado[i].toFixed(2);

		tdClases.classList.add('clases');
		
		tr.appendChild(tdClases);
		tr.appendChild(tdXi);
		tr.appendChild(tdFi);
		tr.appendChild(tdFiXi);
		tr.appendChild(tdXiMenosMediaAlCuadrado);
		tr.appendChild(tdFiPorXiMenosMediaAlCuadrado);

		clonPlantilla.getElementById('tbody-tabla').appendChild(tr);
	});

	// Poner el titulo de la seccion
	clonPlantilla.getElementById('titulo').innerText = titulo;
	// Poner los datos que simulan las operaciones
	clonPlantilla.getElementById('rango').innerText = `${datoMasAlto} - ${datoMasBajo} = ${rango}`;
	clonPlantilla.getElementById('clases').innerText = `√${n} = ${Math.sqrt(n).toFixed(2)} = ${numeroDeClases}`;
	clonPlantilla.getElementById('anchoClase').innerText = `${rango}/${numeroDeClases} = ${anchoDeClase}`;
	// Mostrar la media y la desviacion estandar
	clonPlantilla.getElementById('media').innerText = media.toFixed(2);
	clonPlantilla.getElementById('desviacionEstandar').innerText = desviacionEstandar.toFixed(2);
	// Mostrar los datos para la comparacion en la grafica
	clonPlantilla.getElementById('dg-media-menos-s').innerText = `${mediaMenosDesviacionEstandar.toFixed(2)}`;
	clonPlantilla.getElementById('dg-media').innerText = `${media.toFixed(2)}`;
	clonPlantilla.getElementById('dg-media-mas-s').innerText = `${mediaMasDesviacionEstandar.toFixed(2)}`;
	// Agregar ids unicos para la seccion y para el grafico
	clonPlantilla.getElementById('seccion').setAttribute('id', `tabla-${idSeccion}`);
	clonPlantilla.getElementById('grafica').setAttribute('id', `grafica-${idSeccion}`);
	// dg-media-menos-s

	// Mostrar todo en el dom
	fragmento.appendChild(clonPlantilla);
	document.body.appendChild(fragmento);

	// Crear las graficas
	generarGrafica(document.getElementById(`grafica-${idSeccion}`), titulo, xi, fi);
}

crearTabla(datosIMC, '1) IMC');
crearTabla(datosPresionArterial, '2) Presion Arterial');
crearTabla(datosColesterol, '3) Colesterol');
crearTabla(datosTrigliceridos, '4) Trigliceridos');
