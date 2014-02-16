use zips;
db.zip.aggregate([
	{
		"$group":
			{
				"_id":"$state", 
				"pop":{"$max":"$pop"}
			}
	}
])