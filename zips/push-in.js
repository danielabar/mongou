use zips;
db.zip.aggregate([
	{
		"$group":
			{
				"_id":"$city", 
				"postal_codes":{"$push":"$_id"}
			}
	},
	{ $sort : { _id : 1, postal_codes : 1 } }
])