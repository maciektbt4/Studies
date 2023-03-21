const fs = require('fs');
db = connect('mongodb://localhost/nbd');
const output = db.people.find(
    {birth_date:{$gte: '2001-01-01'}}, 
    {_id: 0 , first_name: 1, last_name: 1, location: {city: 1}}
    ).toArray();
fs.writeFileSync('result_05.json', JSON.stringify(output, null, 4));