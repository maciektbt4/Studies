const fs = require('fs');
db = connect('mongodb://localhost/nbd');
const output = db.people.deleteMany({height: {$gt: '190.0'}});
fs.writeFileSync('wynik_07.json', JSON.stringify(output, null, 4));