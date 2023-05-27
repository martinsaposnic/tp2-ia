function ejecutarAlgoritmoGenetico() {
    tamanoPoblacion = parseInt(document.getElementById("tamanoPoblacion").value);
    maximoGeneraciones = parseInt(document.getElementById("limite").value);
    let seleccionMetodo = document.getElementById("seleccionMetodo").value;
    tipoMutacion = document.getElementById('tipoMutacion').value;
    let criterioParo = document.getElementById('criterioParo').value;
    let valorCriterioParo = document.getElementById('limite').value;

    let seleccionarPadre;
    switch (seleccionMetodo) {
        case 'torneo':
            seleccionarPadre = seleccionarPadreTorneo;
            break;
        case 'ranking':
            seleccionarPadre = seleccionarPadreRanking;
            break;
        case 'ruleta':
            seleccionarPadre = seleccionarPadreRuleta;
            break;
        case 'numeroEsperado':
            seleccionarPadre = seleccionarPadreNumeroEsperado;
            break;
        default:
            seleccionarPadre = seleccionarPadreTorneo;
    }

    let maxAptitudValores = [];
    poblacion = [];
    // Crear una población inicial de soluciones aleatorias
    for (let i = 0; i < tamanoPoblacion; i++) {
        let H = Math.floor(Math.random() * 10) + 1; // De 1 a 10
        let P = Math.floor(Math.random() * 100) + 1; // De 1 a 100
        poblacion.push([H, P]);
    }

    let generation = 0;
    let stopConditionMet = false;
    while (!stopConditionMet) {
        // Calcular la aptitud de cada cromosoma en la población
        let valoresAptitud = poblacion.map(calcularAptitud);


        // Crear una nueva población de cromosomas a partir de los padres seleccionados
        let nuevaPoblacion = [];
        while (nuevaPoblacion.length < tamanoPoblacion) {
            // Seleccionar cromosomas para el cruce basándose en su aptitud
            let padre1 = poblacion[seleccionarPadre(valoresAptitud)];
            let padre2 = poblacion[seleccionarPadre(valoresAptitud)];
            let hijo = cruce(padre1, padre2);
            hijo = mutar(hijo);
            nuevaPoblacion.push(hijo);

            hijo = cruce(padre2, padre1);
            hijo = mutar(hijo);
            nuevaPoblacion.push(hijo);
        }
        poblacion = nuevaPoblacion;
        let maxAptitud = Math.max(...valoresAptitud);
        
        maxAptitudValores.push(maxAptitud);
        if(maxAptitudValores.length > 5 && maxAptitudValores.slice(maxAptitudValores.length-5, maxAptitudValores.length).every((v, a, array) => v === array[0])) debugger;
        // Verificar si se cumple el criterio de paro
        if (criterioParo === 'generaciones' && generation >= valorCriterioParo) {
            stopConditionMet = true;
        } else if (criterioParo === 'fitness' && (maxAptitud >= valorCriterioParo || generation >= 10000)) {
            stopConditionMet = true;
        }

        generation++;
    }

    let valoresAptitud = poblacion.map(calcularAptitud);
    let mejorSolucion = poblacion[valoresAptitud.indexOf(Math.max(...valoresAptitud))];

    // Mostrar la mejor solución
    document.getElementById("solucion").innerHTML = "Mejor solución: H = " + mejorSolucion[0] + ", P = " + mejorSolucion[1] + " - Máximo fitness: " + Math.max(...valoresAptitud);
    mostrarGrafico(maxAptitudValores);
}