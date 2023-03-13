const fs = require('fs');
var my_datas = require('./ja.json')
db = connect('mongodb://localhost/nbd');
const output = db.people.insertOne(my_datas);
var my_id = output.insertedId
var its_me = db.people.findOne({_id: my_id})
print(its_me)
fs.writeFileSync('wynik_06.json', JSON.stringify(output, null, 4));
fs.writeFileSync('wynik_06_inserted_datas.json', JSON.stringify(its_me, null, 4));