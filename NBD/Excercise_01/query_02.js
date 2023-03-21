const fs = require('fs');
db = connect('mongodb://localhost/nbd');
const output = db.people.findOne({sex: "Female", nationality: 'China'});
fs.writeFileSync('result_02.json', JSON.stringify(output, null, 4));