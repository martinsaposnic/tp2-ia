function seleccionarPadreRanking(valoresAptitud) {
    // Ordenar la población y sus valores de aptitud
    let indices = Array.from(valoresAptitud.keys());
    indices.sort((a, b) => valoresAptitud[a] - valoresAptitud[b]);
    // console.log(indices);
    // console.log(valoresAptitud);

    // Seleccionar un índice basado en su ranking
    let r = 1 - Math.random() * 0.5; //Elijo solo con la primera mitad
    for (let i = 0; i < indices.length; i++) {
        if (r < (i + 1) / indices.length) {
            console.log("Seleccionado: " + indices[i])
            return indices[i];
        }
    }
    return indices[indices.length - 1];
}

function seleccionarPadreRuleta(valoresAptitud) {
    // Calcular la suma total de los valores de aptitud
    let sumaTotal = valoresAptitud.reduce((a, b) => a + b, 0);

    // Seleccionar un índice basado en la suma acumulada de los valores de aptitud
    let r = Math.random() * sumaTotal;
    let sumaAcumulada = 0;
    for (let i = 0; i < valoresAptitud.length; i++) {
        sumaAcumulada += valoresAptitud[i];
        if (r < sumaAcumulada) {
            return i;
        }
    }
    return valoresAptitud.length - 1;
}

function seleccionarPadreNumeroEsperado(valoresAptitud) {
    // Calcular la media de los valores de aptitud
    let media = valoresAptitud.reduce((a, b) => a + b, 0) / valoresAptitud.length;

    // Seleccionar un índice basado en el número esperado de cada individuo
    for (let i = 0; i < valoresAptitud.length; i++) {
        if (Math.random() < valoresAptitud[i] / media) {
            return i;
        }
    }
    return Math.floor(Math.random() * valoresAptitud.length);
}

function seleccionarPadreTorneo(valoresAptitud) {
    let tamanoTorneo = 2;
    let torneo = [];
    for (let i = 0; i < tamanoTorneo; i++) {
        let indiceAleatorio = Math.floor(Math.random() * poblacion.length);
        torneo.push({cromosoma: poblacion[indiceAleatorio], aptitud: valoresAptitud[indiceAleatorio]});
    }
    // Elige el cromosoma con la mayor aptitud del torneo
    let ganador = torneo.reduce((prev, curr) => prev.aptitud > curr.aptitud ? prev : curr);
    return poblacion.indexOf(ganador.cromosoma);
}