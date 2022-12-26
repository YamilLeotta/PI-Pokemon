module.exports = {
    orderBy: (arr, by) => { // arr = array de objetos ; by = "PropiedadA" (ascendente) o "PropiedadD" (descendente)
        if (!by) return arr;
        let prop = by.slice(0, by.length - 1);
        let order = (by.slice(by.length - 1) === 'A') ? 1 : -1;

        if (!prop || !arr || !order) throw new Error('Error on arguments')

        return [...arr].sort((a, b) => (a[prop] > b[prop]) ? order : -order);
    }
}
