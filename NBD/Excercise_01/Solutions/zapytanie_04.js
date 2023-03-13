const fs = require('fs');
db = connect('mongodb://localhost/nbd');
const output = db.people.find({weight: {$gte: '68', $lt: '71.5'}}).toArray();
fs.writeFileSync('wynik_04.json', JSON.stringify(output, null, 4));