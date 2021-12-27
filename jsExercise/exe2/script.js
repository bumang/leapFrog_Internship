const ob1 = {
    NAME: `Umanga Bhattarai`,
    ADDRESS: `Gaurighat,Kathmandu`,
    EMAIL: `umangabhattarai11@gmail.com`,
    INTEREST: [`Coding`, `Football`, `Music`, `Travel`, `Art`, `Games`],
    EDUCATION: [{ Name: `ABC School of Schoolery`, Date: 2000 }, { Name: `BCD School of Trickery`, Date: 2006 }]
};

ob1.EDUCATION.forEach(item => console.log(`Name: ${item.Name}, Date: ${item.Date}`));