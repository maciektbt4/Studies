const fs = require('fs');
db = connect('mongodb://localhost/nbd');

var mapHeightWeight = function(){
    let key = this.nationality;
    let value = {
        height: parseFloat(this.height),
        weight: parseFloat(this.weight),
    }
    
    return emit(key, value);
}

var reduceBMI= function(keyNationality, valuesHeightWeight){
    let sum = 0.0;
    let averageBMI = 0.0;
    let BMI = [];    
   
    valuesHeightWeight.forEach(element => {
        BMI.push(element.weight / Math.pow(element.height / 100.0 , 2));
    });

    BMI.sort();

    BMI.forEach(element => {
        sum += element;
    });
    averageBMI = sum / BMI.length;

    let result = {
        avgBMI: Math.round(averageBMI * 100) / 100,
        minBMI: Math.round(BMI[0] * 100) / 100,
        maxBMI: Math.round(BMI[BMI.length-1] * 100) / 100,
    }
    return result;
}

var mapReduce = db.people.mapReduce(
    mapHeightWeight,
    reduceBMI,
    {
        out: "map_reduce_BMI",
    },
);
var output = db.map_reduce_BMI.find().toArray();
print(output);
// sort by _id
output.sort((a, b) => {
    if (a._id < b._id) {
      return -1;
    }
    if (a._id > b._id) {
      return 1;
    }
  
    // _id must be equal
    return 0;
  });
fs.writeFileSync('result_14_map_reduce.json', JSON.stringify(output, null, 4));