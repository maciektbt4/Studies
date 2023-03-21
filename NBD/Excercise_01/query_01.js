const fs = require('fs');
db = connect('mongodb://localhost/nbd');
const output = db.people.findOne();
fs.writeFileSync('result_01.json', JSON.stringify(output, null, 4));