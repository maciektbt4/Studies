const fs = require('fs');
db = connect('mongodb://localhost/nbd');

var  output = db.people.aggregate(
    {$match: {}},
    {$project: {_id: 0, "job": 1,}},  
    {$group: {
        _id: null,        
        uniqueJobList: {$addToSet: "$job"},        
    }},
    {$project:{_id: 0,
        uniqueJobList:{
            $sortArray: {input: "$uniqueJobList", sortBy: 1}
        }  
    }},
    ).toArray();
fs.writeFileSync('wynik_13.json', JSON.stringify(output, null, 4));