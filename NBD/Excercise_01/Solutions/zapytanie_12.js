const fs = require('fs');
db = connect('mongodb://localhost/nbd');

var output = db.people.aggregate(
    {$match: {}},
    {$project: {_id: 0, "credit.currency": 1, "credit.balance": 1,}},
    {$unwind: {path: "$credit"}},    
    {$addFields: {
         convertedBalance : { $toDouble: "$credit.balance"},
    }},
    {$group: {
        _id: "$credit.currency",        
        sumerizeBalance: {$sum: "$convertedBalance"},        
    }},
    {$project: {
        currency: "$_id",
        balance: {$round: ["$sumerizeBalance", 2]},
    }},
    {$project: {_id: 0, currency: 1, balance: 1 }},
    {$sort : {currency: 1}},
    ).toArray();
fs.writeFileSync('wynik_12.json', JSON.stringify(output, null, 4));