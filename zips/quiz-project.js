use zips;
db.zip.aggregate([
	{$project:
		{
			_id:0,
			'city': {$toLower:"$city"},
			'pop':1,
			'state':1,
			'zip': "$_id"
		}
	}
])