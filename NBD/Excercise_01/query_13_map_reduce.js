const fs = require('fs');
db = connect('mongodb://localhost/nbd');
var mapJob = function(){   
    return emit("job", this.job)
}

var reduceJob= function(keyJob, valuesJob){
    let uniqueJobs = [];
    valuesJob.forEach(element => {
        if (uniqueJobs.includes(element) == false){
            uniqueJobs.push(element);
        }        
    });

    return uniqueJobs;
}

var mapReduce = db.people.mapReduce(
    mapJob,
    reduceJob,
    {
        out: "map_reduce_job",
    },
);
let output = db.map_reduce_job.find().toArray();
let uniqueJobList = [];
output[0].value.forEach(element => {
    uniqueJobList.push(element);
});
uniqueJobList.sort();
print(uniqueJobList);
let result = {
    uniqueJobList: uniqueJobList,
}
fs.writeFileSync('result_13_map_reduce.json', JSON.stringify(result, null, 4));