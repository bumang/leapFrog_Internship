var pattern = ((item) => {
    for (i = item; i > 0; i--) {
        let result = ``;

        for (var j = 1; j <= i; j++) {
            result = result + `* `;
        }
        console.log(result);
    }
})(10);