const fs = require('fs');
db = connect('mongodb://localhost/nbd');
const output = db.people.updateMany(
    {first_name: 'Antonio'},
    {$set: {hobby: "pingpong"}}
    );
fs.writeFileSync('wynik_09.json', JSON.stringify(output, null, 4));

