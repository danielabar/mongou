var _ = require('underscore');

module.exports = {

	filterLowestHomework : function(scores) {
		var otherScores = _.filter(scores, function(val){return val.type !== 'homework'});
    var homeworkScores = _.where(scores, { type: 'homework' });
    var scoresLowestHomeworkDropped = _.rest(_.sortBy(homeworkScores, function(val){return val.score;}));
    var scoresTogether = otherScores.concat(scoresLowestHomeworkDropped);
    return scoresTogether
	}

};