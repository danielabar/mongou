use zips;
db.zip.aggregate([
	{$project: {_id:1, state:1, city:1, pop:1} },
	{$match: {$or:[{state:"CA"},{state:"NY"}]} },
	{$match: {pop:{$gt:25000}} },
	{$group: 
		{
			_id: {state: "$state", city: "$city"}, 
			sum_pop_state_city:{$sum:"$pop"} 
		} 
	},
	{$group:
		{_id: "$_id.state", avg_pop: {$avg:"$sum_pop_state_city"} }
	},
	{$group:
		{_id: null, avg_pop_together: {$avg:"$avg_pop"} }
	}
]);