use zips;
db.zip.aggregate([
	{$group: 
		{
			_id:"$city",
			zip_codes:{$addToSet:"$_id"}
		}
	}
])