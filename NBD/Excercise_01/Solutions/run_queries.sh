#!/bin/bash
rm wynik_*
mongosh -f zapytanie_00.js
mongoimport --file ./cwiczenia2.json --db nbd --collection people --jsonArray

for i in {1..15}
do 
    if [ $i -ge 10 ]
    then
        chmod +x zapytanie_$i.js
        mongosh -f zapytanie_$i.js
    else
        chmod +x zapytanie_0$i.js
        mongosh -f zapytanie_0$i.js
    fi
done

zip -r NBD_rozwiazanie ./*
mv ./NBD_rozwiazanie.zip /mnt/hgfs/shared_folder/NBD_ZAD1/