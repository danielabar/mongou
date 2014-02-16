/* Calculate the class with the best average student performance:
	1. Calculate an average for each student in each class of all non-quiz assessments
	2. Averaging those numbers to get a class average 
*/

db.grades.aggregate([
	
	/* unwind scores */
	{$unwind: "$scores"},
	
	/* match on scores.type in exam, homework */
	{$match: {$or:[{'scores.type':"exam"},{'scores.type':"homework"}]} },
	
	/* group by class, student; avg the score */
	{$group: 
		{
			_id: {"class":"$class_id", "student":"$student_id"}, 
			avg_step1:{$avg:"$scores.score"} 
		} 
	},
	
	/* group by class, avg the avg from above */
	{$group: 
		{
			_id: "$_id.class", 
			avg_step2:{$avg:"$avg_step1"} 
		} 
	},
	
	/* sort by descending avg */
	{$sort: {avg_step2:-1} },
	
	/* limit, just to keep the shell interaction sane */
	{$limit:3}
])