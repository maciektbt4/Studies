const fs = require('fs');
db = connect('mongodb://localhost/nbd');

var output = db.people.aggregate(
    {$match: { "sex": "Female", "nationality": "Poland" }},
    {$project: {_id: 0, "credit.currency": 1, "credit.balance": 1,}},
    {$unwind: {path: "$credit"}},    
    {$addFields: {
         convertedBalance : { $toDouble: "$credit.balance"},
    }},
    {$group: {
        _id: "$credit.currency",  
        avgBalance: {$avg: "$convertedBalance"},       
        sumerizedBalance: {$sum: "$convertedBalance"},        
    }},
    {$project: {
        currency: "$_id",
        avgBalance: {$round: ["$avgBalance", 2]},
        sumerizedBalance: {$round: ["$sumerizedBalance", 2]},
    }},
    {$project: {_id: 0, currency: 1, avgBalance: 1, sumerizedBalance: 1 }},
    {$sort : {currency: 1}},
    ).toArray();
fs.writeFileSync('wynik_15.json', JSON.stringify(output, null, 4));