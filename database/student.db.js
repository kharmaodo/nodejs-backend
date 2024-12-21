const {v4:uuidv4} =require('uuid');
// Fake Database
const students = [
    {
        "id":uuidv4(),
        "nom":"Thiam",
        "prenom":"Serigne Modou",
        "email":"grandthiame@gmail.com",
        "telephone":"77440560",
    },
    {
        "id":uuidv4(),
        "nom":"Coly",
        "prenom":"Malick",
        "email":"malickcoly342@gmail.com",
        "telephone":"784059330",
    },
    {
        "id":uuidv4(),
        "nom":"TINE",
        "prenom":"Abdoussalam",
        "email":"abdoussalamtine4@gmail.com",
        "telephone":"785457598",
    },
    ];

module.exports = { students}