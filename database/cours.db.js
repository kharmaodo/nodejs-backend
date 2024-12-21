const {v4:uuidv4} =require('uuid');
// Fake Database
const cours =[
    {
        "id":uuidv4(),
        "cours":"Developpement Web",
        "duration":"36h",
    },
    {
        "id":uuidv4(),
        "cours":"Machine Learning",
        "duration":"30h",
    },
    {
        "id":uuidv4(),
        "cours":"Big Data",
        "duration":"36h",
    },
    ];

module.exports = { cours}