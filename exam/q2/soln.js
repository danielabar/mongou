use enron;
db.messages.aggregate([	
	{$project: {_id:0, 'headers.From':1, 'headers.To':1 } },
	{$unwind: "$headers.To"},	
	{$group: 
		{
			_id: {"From": "$headers.From"},
			uniqueTo:{$addToSet:"$headers.To"}
		}
	},		
	{$unwind: "$uniqueTo"},	
	{$group: 
		{
			_id: {"From" : "$_id.From", "curTo" : "$uniqueTo"}, 
			count: { $sum: 1 } 
		} 
	},	
	{$sort:{count:-1}},	
	{$match: {"_id.From": "andrew.fastow@enron.com"}},
	
	/* {$limit:20} */
]);
