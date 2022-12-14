module.exports = {
    orderBy: (arr, by) => { // arr = array de objetos ; by = "PropiedadA" (ascendente) o "PropiedadD" (descendente)
        let prop = by.slice(0, by.length - 1);
        let orden = (by.slice(by.length - 1) === 'A') ? 1 : -1;

        return arr.sort((a, b) => (a[prop] > b[prop]) ? orden : -orden);
    }
}
