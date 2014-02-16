use zips;
db.zip.aggregate([
	{$group:
		{
			_id:"$state",
			total_population:{$sum:"$pop"}
		}
	}
])