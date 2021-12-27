var numbers = [1, 2, 3, 4];


function transform(collection, tranFunc) {
    var result = collection.map((item) => { return item * tranFunc; });
    return result;
}

var output = transform(numbers, 2);
console.log(output);