function cosasQueHagoSoloSiEsPositivo(H, P, aptitud) {
    // Simula la entrega de perlas
    let perlas = [];
    let perlasRestantes = P;
    let hijasSinPerlas = 0;

    for (let i = 1; i <= H; i++) {
        let perlasAEntregar = i;
        let perlasADar = (perlasRestantes - perlasAEntregar) / 7;
        if (!Number.isInteger(perlasADar)) {
            aptitud -= 40;
        }
        perlasAEntregar = perlasRestantes < 7 ? perlasRestantes : i + Math.floor(perlasADar);

        if (perlasAEntregar <= 0) {
            hijasSinPerlas += 1; // Si no hay perlas para entregar a una hija, incrementa el contador
        }
        perlas.push(perlasAEntregar);
        perlasRestantes -= perlasAEntregar;
    }

    //Ajusta la aptitud con base en la cantidad de perlas sin repartir
    aptitud -= perlasRestantes * 30;

    // Verifica si todas las hijas recibieron la misma cantidad de perlas
    if (perlas.every((val, i, arr) => val === arr[0])) {
        aptitud += 100;
    } else {
        let perlasEsperadas = P / H;
        let diff = perlas.map(x => Math.abs(x - perlasEsperadas));
        let sumaDiff = diff.reduce((a, b) => a + b, 0);
        aptitud -= sumaDiff * 2;
    }

    //Ajusta la aptitud con base en la cantidad de hijas sin perlas
    aptitud -= hijasSinPerlas * 30;

    // Verifica si la suma de todas las perlas recibidas es igual a la cantidad total de perlas
    let sumaPerlasRecibidas = perlas.reduce((a, b) => a + b, 0);
    if (sumaPerlasRecibidas === P) {
        aptitud += 40;
    } else {
        aptitud -= Math.abs(sumaPerlasRecibidas - P) * 3;
    }

    // Verifica si tiene una unica hija
    aptitud -= H == 1 ? 50 : 0;
    //if (H==7 && P==36 && aptitud==160) debugger;
    return aptitud;
}
function calcularAptitud(cromosoma) {
    let H = cromosoma[0];  // Número de hijas
    let P = cromosoma[1];  // Número total de perlas
    let aptitud = 0;

    // Verifica si H y P son números enteros y positivos
    if (Number.isInteger(H) && Number.isInteger(P) && H > 0 && P > 0) {
        aptitud += 20;
        aptitud = cosasQueHagoSoloSiEsPositivo(H, P, aptitud);
    } else if ((Number.isInteger(H) && H > 0) || (Number.isInteger(P) && P > 0)) {
        aptitud -= 100;
    } else {
        aptitud -= 1000;
    }
    return aptitud;
}