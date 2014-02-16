use zips;
db.zip.aggregate([{$sort:{state:-1, city:-1}}])