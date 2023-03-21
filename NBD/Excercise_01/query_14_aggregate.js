const fs = require('fs');
db = connect('mongodb://localhost/nbd');

var output = db.people.aggregate(
    {$match: {}},
    {$project: {_id: 0, nationality: 1, height: 1, weight: 1,}},
    {$addFields: {
        convertedHeight: { $toDouble: "$height" },
        convertedWeight: { $toDouble: "$weight" },
    }},
    {$addFields: {
        BMIDivider: { $pow: [ {$divide: [ "$convertedHeight", 100 ]}, 2] },
    }},
    {$addFields: {
        BMI: {$divide: [ "$convertedWeight", "$BMIDivider" ]},
    }},
    {$group: {
        _id: "$nationality",
        avgBMI: {$avg: "$BMI"},
        minBMI: {$min: "$BMI"},
        maxBMI: {$max: "$BMI"},
    }},   
    {$project: {
        nationality: "$_id",
        avgBMI: {$round: ["$avgBMI",2],},
        minBMI: {$round: ["$minBMI",2],},
        maxBMI: {$round: ["$maxBMI",2],},
    }},
    {$project: {_id: 0, nationality: 1, avgBMI: 1, minBMI: 1, maxBMI: 1, }},
    {$sort : {nationality: 1}},
    ).toArray();

fs.writeFileSync('result_14_aggregate.json', JSON.stringify(output, null, 4));