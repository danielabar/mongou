use zips;
db.zip.aggregate([
	{$match:
		{
			pop:{$gt:100000}
		}
	}
])