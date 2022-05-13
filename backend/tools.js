/**
 * TOOLS
 *
 * for (let i=0; i<=array.length-1;i++ ){//list array
 */

/**
 * Fonction permettant ...
 * const arrayToReduce =[
 *  {tabX :["var01","var02"], varX : 4}
 *  {tabX :["var01","var03"], varX : 2}
 *  {tabX:["var01","var04"], varX : 5}
 * ]
 */
function reduceArrayTab(arrayNew, arrayToReduce, tabX, varX) {
    const arrayNew = arrayToReduce.reduce((res, { tabX, varX }) => {
        tabX.forEach((tab) => {
            if (!res[tab]) res[tab] = 0;
            res[tab] += varX;
        });
        return res;
    }, {});
    console.log(arrayNew);
}

/**
 * Fonction permettant ...
 * const arrayToReduce =[
 *  {colors : "grey", kanapId : "7776", kanapName : "Kanap Name1", quantity : "2"},
 *  {colors : "pink", kanapId : "7778", kanapName : "Kanap Name2", quantity : "3"},
 * {colors : "grey", kanapId : "7779", kanapName : "Kanap Name3", quantity : "1"},
 * {colors : "pink", kanapId : "7770", kanapName : "Kanap Name4", quantity : "10"}
 * ]
 */
function reduceArray(arrayNew, arrayToReduce, tabX, varX) {
    const arrayNew = arrayToReduce.reduce((res, { tabX, varX }) => {
        tabX.forEach((tab) => {
            if (!res[tab]) res[tab] = 0;
            res[tab] += varX;
        });
        return res;
    }, {});
    console.log(arrayNew);
}

/**
 * Fonction permettant ...
 * const objToReduce = {id : "01", name :"name01", color : "color01"}
 * voir parseFloat() // string
 */
function reduceObjet(objNew, objToReduce) {
    const objNew = Object.keys(objToReduce).reduce((total, key) => {
        return total + objToReduce[key];
    }, 0);
    console.log(objNew);
}

/**
 * Fonction permettant de modifier la valeur d'un tableau
 * ex si même couleur
 */
function updateArray(array, index, newValue) {
    array[index] = newValue;
}

function updateArray02(array, index, newValue) {
    array[index].quantity = newValue;
}

//
function showArray(array) {
    console.log('**** Show Cart *****');
    array.forEach(function (item, index, array) {
        console.log(item, index);
    });
    console.log('*********');
}

//
function showArrayOf(array) {
    for (const element of array) {
        console.log(element);
    }
}

//
function showObj(objet) {
    //
    const indexes = Object.keys(objet);
    const valeurs = Object.values(objet);
    const indexesValeurs = Object.entries(objet);
    //
    console.log('****OBJECT*****');
    //  console.log(indexes);
    //  console.log(valeurs);
    //  console.log(indexesValeurs);

    for (let [index, valeur] of indexesValeurs) {
        console.log(`${index} : ${valeur}`);
    }
    console.log('****//OBJ*****');
}

/**
 * Fonction permettant ...
 */

/**
 * Fonction permettant ...
 */
function decoConsole(car, nbCar) {
    var car1 = car;
    var lineCar = '';
    for (var i = 0; i < nbCar; i++) {
        lineCar += car;
    }
    console.log(lineCar);
}
//var car="@";
decoConsole(' -', 20);

//
function calculSomme(nombre) {
    var resultat = 0;
    for (var i = 1; i <= nombre; i++) {
        resultat += i; // resultat = resultat + nombre
    }
    return resultat;
}
