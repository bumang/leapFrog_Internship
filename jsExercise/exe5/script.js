var arr = [{
    id: 1,
    name: `John`,
}, {
    id: 2,
    name: `Mary`,
}, {
    id: 3,
    name: `Andrew`,
}];

function sortBy(array, key) {
    for (i = 0; i < array.length - 1; i++) {
        for (j = 1; j < array.length; j++) {
            if (array[i][key] > array[j][key]) {
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
}

var sorted = sortBy(arr, `name`);
console.log(sorted);