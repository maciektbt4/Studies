#!/bin/bash
rm result_*
mongosh -f query_00.js
mongoimport --file ./exercise2.json --db nbd --collection people --jsonArray

for i in {1..10}
do 
    if [ $i -ge 10 ]
    then
        chmod +x query_$i.js
        mongosh -f query_$i.js
    else 
        chmod +x query_0$i.js
        mongosh -f query_0$i.js
    fi
done

for i in {11..15}
do 
    chmod +x query_$i\_aggregate.js
    mongosh -f query_$i\_aggregate.js
    chmod +x query_$i\_map_reduce.js
    mongosh -f query_$i\_map_reduce.js
done

zip -r NBD_solution ./*
mv ./NBD_solution.zip /mnt/hgfs/shared_folder/NBD_ZAD1/