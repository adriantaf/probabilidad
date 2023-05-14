'use strict';

const ctx = document.getElementById('myChart');
Chart.defaults.font.size = 16;

/**
 * @param {htmlElement} canvas - Elemento canvas
 * @param {string} titulo - Titulo del grafico
 * @param {array} keys - El nombre de las barras
 * @param {array} values - EL valor de las barras
 */
function generarGrafica(canvas, titulo, keys, values) {
	new Chart(canvas, {
		type: 'bar',
		data: {
			labels: keys,
			datasets: [{
				label: titulo,
				data: values,
				borderWidth: 1,
				borderColor: '#222436',
				backgroundColor: '#65BAD2',
				color: '#000',
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
				}
			},
		}
	});
}
