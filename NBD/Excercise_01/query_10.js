const fs = require('fs');
db = connect('mongodb://localhost/nbd');
const output = db.people.updateMany(
    {job: 'Editor'},
    {$unset: {email: ""}}
    );
fs.writeFileSync('result_10.json', JSON.stringify(output, null, 4));