if not exist C:\data\db\rs1 mkdir C:\data\db\rs1
if not exist C:\data\db\rs2 mkdir C:\data\db\rs2
if not exist C:\data\db\rs3 mkdir C:\data\db\rs3

start mongod --port 30001 --replSet m101 --logpath "1.log" --smallfiles --oplogSize 64 --dbpath C:\data\db\rs1
start mongod --port 30002 --replSet m101 --logpath "2.log" --smallfiles --oplogSize 64 --dbpath C:\data\db\rs2
start mongod --port 30003 --replSet m101 --logpath "3.log" --smallfiles --oplogSize 64 --dbpath C:\data\db\rs3

mongo --port 30001 < init_replica_win.js
