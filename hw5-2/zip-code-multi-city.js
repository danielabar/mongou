use zips;
db.zip.aggregate([
	/*{$match: {$or:[{state:"CA"},{state:"NY"}]} },*/
	/*{$match: {pop:{$gt:25000}} },*/
	{$group: 
		{
			_id: {zip: "$_id"} ,
			count: {$sum:1}
		}
	},
	{$match: {count: {$gt: 1} } }
])