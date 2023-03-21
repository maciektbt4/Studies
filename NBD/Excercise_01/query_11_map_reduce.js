const fs = require('fs');
db = connect('mongodb://localhost/nbd');
var mapHeightWeight = function(){
    let key = this.sex;
    let value = {
        height: parseFloat(this.height),
        weight: parseFloat(this.weight),
    }
    
    return emit(key, value);
}

var reduceHeightWeight= function(keySex, valuesHeightWeight){
    let sumHeight = 0.0;
    let sumWeight = 0.0;
    valuesHeightWeight.forEach(element => {
        sumHeight += element.height;
        sumWeight += element.weight;
    });

    let result = {
        heightAverage: Math.round(sumHeight / valuesHeightWeight.length * 100) / 100,
        weightAverage: Math.round(sumWeight / valuesHeightWeight.length * 100) / 100,
    }

    return result;
}

var mapReduce = db.people.mapReduce(
    mapHeightWeight,
    reduceHeightWeight,
    {
        out: "map_reduce_avg_height_weight",
    },
);
var output = db.map_reduce_avg_height_weight.find().toArray();
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
fs.writeFileSync('result_11_map_reduce.json', JSON.stringify(output, null, 4));