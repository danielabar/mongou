use blog;
db.posts.aggregate([	
	{$project: {_id:0, title:1, comments:1} },
	{$unwind: "$comments"},
	{$group: {_id:"$comments.author", count_comments:{$sum:1}} },
	{$sort: {count_comments:-1} },
	{$limit: 5}
])