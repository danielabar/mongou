// Populate sample data
db.coll.insert({ "a" : 1, "b" : ["pink", "green", "blue"]});

// Find one document in our collection
var doc = db.coll.findOne();

// Print the result
printjson(doc);
