const fs = require('fs');
db = connect('mongodb://localhost/nbd');
var mapBalance = function(){
    this.credit.forEach(element => {
        return emit(element.currency, parseFloat(element.balance));
    });        
}

var reduceBalance= function(keyCurrency, valuesBalance){
    let balance = 0.0;
    valuesBalance.forEach(element => {
        balance += element;
    });

    let result =  {
        avgBalance: Math.round(balance / valuesBalance.length * 100) / 100,
        sumerizedBalance: Math.round(balance * 100) / 100,        
    };

    return result;
}

var mapReduce = db.people.mapReduce(
    mapBalance,
    reduceBalance,
    {
        out: "map_reduce_balances",
        query: { "sex": "Female", "nationality": "Poland" },
    },
);
var output = db.map_reduce_balances.find().toArray();
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
fs.writeFileSync('result_15_map_reduce.json', JSON.stringify(output, null, 4));