var expect = require('chai').expect;
var fixture = require('../ScoreHelper');
var _ = require('underscore');

describe('Score Helper', function() {

	it('Filters out lowest homework score', function() {
		var scores = [
	    {
	      "type" : "exam",
	      "score" : 47
	    },
	    {
	      "type" : "quiz",
	      "score" : 10
	    },
	    {
	      "type" : "homework",
	      "score" : 20
	    },
	    {
	      "type" : "homework",
	      "score" : 39
	    }
		];
		var result = fixture.filterLowestHomework(scores);
		expect(result).to.have.length(3);
		expect(_.where(result, {"type" : "exam"})[0].score).to.equal(47);
		expect(_.where(result, {"type" : "quiz"})[0].score).to.equal(10);
		expect(_.where(result, {"type" : "homework"})[0].score).to.equal(39);
	});

});