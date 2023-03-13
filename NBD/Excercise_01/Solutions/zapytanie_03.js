const fs = require('fs');
db = connect('mongodb://localhost/nbd');
const output = db.people.find({sex: "Male", nationality: 'Germany'}).toArray();
fs.writeFileSync('wynik_03.json', JSON.stringify(output, null, 4));