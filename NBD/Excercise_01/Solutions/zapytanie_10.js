const fs = require('fs');
db = connect('mongodb://localhost/nbd');
const output = db.people.updateMany(
    {job: 'Editor'},
    {$unset: {email: ""}}
    );
fs.writeFileSync('wynik_10.json', JSON.stringify(output, null, 4));