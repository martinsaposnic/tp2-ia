function mutar(cromosoma, valoresAptitud) {
    let cromosomaMutado = [...cromosoma]; // Crear una copia del cromosoma original

    if (tipoMutacion === 'simple') {
        if (Math.random() > 0.5) {
            // Mutación simple: incrementar o decrementar cada gen en 1
            cromosomaMutado[Math.floor(Math.random() * 2)] += Math.floor(Math.random() * 2) ? 1 : -1;
        }

    } else if (tipoMutacion === 'adaptive_temp_asc') {
        // Mutación adaptativa por temperatura ascendente: incrementar cada gen en función de la generación actual
        const porcentajeDeCompletado = generation / maximoGeneraciones;
        if (Math.random() < porcentajeDeCompletado) {
            cromosomaMutado[Math.floor(Math.random() * 2)] += Math.floor(Math.random() * 2) ? 1 : -1;
        }
        // cromosomaMutado[i] += Math.floor(Math.random() * (maximoGeneraciones / 10));

    } else if (tipoMutacion === 'adaptive_temp_desc') {
        // Mutación adaptativa por temperatura descendente: decrementar cada gen en función de la generación actual
        const porcentajeDeCompletado = generation / maximoGeneraciones;
        if (Math.random() > porcentajeDeCompletado) {
            cromosomaMutado[Math.floor(Math.random() * 2)] += Math.floor(Math.random() * 2) ? 1 : -1;
        }
    }

    return cromosomaMutado;
}

function cruce(padre1, padre2) {
    // Crear un nuevo cromosoma a partir de dos padres
    let hijo = [padre1[0], padre2[1]];
    return hijo;
}