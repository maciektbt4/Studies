const fs = require('fs');
db = connect('mongodb://localhost/nbd');
const output = db.people.updateMany(
    {"location.city": 'Moscow'}, 
    {$set:{"location.city": "Moskwa"}}
    );
fs.writeFileSync('result_08.json', JSON.stringify(output, null, 4));