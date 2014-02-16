use zips;
db.zip.aggregate([
	{$group: 
		{
			_id:"$state",
			average_pop:{$avg:"$pop"}
		}
	}
])