var helpers = require('../helpers');

exports.testParameters = function(test){
	
	test.equal(helpers.pagination.getPaginationParameters(0,0),0);
	test.equal(helpers.pagination.getPaginationParameters(3,11),20)
	test.done();
	
}