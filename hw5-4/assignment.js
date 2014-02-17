/* calculate the sum total of people who are living in a zip code where the city starts with a digit */
db.zips.aggregate([
	
	/* match first city char to be digit, use regex */
	{$match: {city: {$regex: "^[0-9]"} } },
	
	/* group null and sum pop*/
	{$group: {_id: null, sum_pop: {$sum:"$pop"} } }
])