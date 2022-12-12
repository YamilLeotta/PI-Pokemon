module.exports = {
    ordenar: (arr, criterio) => { // arr = array de objetos ; criterio = "PropiedadA" (ascendente) o "PropiedadD" (descendente)
        let prop = criterio.slice(0, criterio.length - 1);
        let orden = (criterio.slice(criterio.length - 1) === 'A') ? 1 : -1;

        return arr.sort((a, b) => (a[prop] > b[prop]) ? orden : -orden);
    }
}
