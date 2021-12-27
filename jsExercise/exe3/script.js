var fruits = [
    { id: 1, name: `Banana`, color: `yellow` },
    { id: 2, name: `Apple`, color: `Red` }
]
const searchByName = (array, value) => {
    let result = '';
    array.filter((item) => {
        if (item.name.toUpperCase() === value.toUpperCase()) {
            result = item;

        }
        return result;
    });
    console.log(result);
}

searchByName(fruits, `apple`);