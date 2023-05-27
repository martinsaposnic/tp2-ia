function mutar(cromosoma) {
    let cromosomaMutado = [...cromosoma]; // Crear una copia del cromosoma original
    if (Math.random() > 0.5) { 
        if (tipoMutacion === 'simple') {
            // Mutación simple: incrementar o decrementar cada gen en 1
            cromosomaMutado[Math.floor(Math.random() * 2)] += Math.floor(Math.random() * 2) ? 1 : -1;
        } else if (tipoMutacion === 'adaptive_convergence') {
            // Mutación adaptativa por convergencia: incrementar el último gen en función de la generación actual
            cromosomaMutado[cromosomaMutado.length - 1] += Math.floor(Math.random() * (maximoGeneraciones / 10));
        } else if (tipoMutacion === 'adaptive_temp_asc') {
            // Mutación adaptativa por temperatura ascendente: incrementar cada gen en función de la generación actual
            for (let i = 0; i < cromosomaMutado.length; i++) {
                cromosomaMutado[i] += Math.floor(Math.random() * (maximoGeneraciones / 10));
            }
        } else if (tipoMutacion === 'adaptive_temp_desc') {
            // Mutación adaptativa por temperatura descendente: decrementar cada gen en función de la generación actual
            for (let i = 0; i < cromosomaMutado.length; i++) {
                cromosomaMutado[i] -= Math.floor(Math.random() * (maximoGeneraciones / 10));
            }
        }
    }
    return cromosomaMutado;
}

function cruce(padre1, padre2) {
    // Crear un nuevo cromosoma a partir de dos padres
    let hijo = [padre1[0], padre2[1]];
    return hijo;
}