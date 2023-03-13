const fs = require('fs');
db = connect('mongodb://localhost/nbd');

var output = db.people.aggregate(
    {$match: {}},
    {$project: {sex: 1, height: 1, weight: 1}},
    {$addFields: {
        convertedHeight: { $toDouble: "$height" },
        convertedWeight: { $toDouble: "$weight" },
    }},
    {$group: {
        _id: "$sex",
        avgHeight: {$avg: "$convertedHeight"},
        avgWeight: {$avg: "$convertedWeight"},
    }},
    {$project: {
        sex: "$_id",
        avgHeight: {$round: ["$avgHeight", 2]},
        avgWeight: {$round: ["$avgWeight", 2]},
    }},
    {$project: {_id: 0, sex: 1, avgHeight: 1, avgWeight: 1 }},
    {$sort : { sex:1}},
    ).toArray();
fs.writeFileSync('wynik_11.json', JSON.stringify(output, null, 4));
