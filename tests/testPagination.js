var helpers = require('../helpers');

exports.testFromParameter = function(test) {
	test.equal(helpers.pagination.getFromParameter(0, 0), 0);
	test.equal(helpers.pagination.getFromParameter(3, 11), 20);
	test.done();
};

exports.testPreviousPage = function(test) {
	test.equal(helpers.pagination.hasPrevButton(0), false);
	test.equal(helpers.pagination.hasPrevButton(1), 0);
	test.equal(helpers.pagination.hasPrevButton(3), 2);
	test.done();
};

exports.testNextPage = function(test) {
	test.equal(helpers.pagination.hasNextButton(0, 11, 11), 2);
	test.equal(helpers.pagination.hasNextButton(2, 11, 11), 3);
	test.equal(helpers.pagination.hasNextButton(2, 10, 11), false);
	test.done();
};

exports.testFirstPage = function(test) {
	test.equal(helpers.pagination.isFirstPage(1), true);
	test.equal(helpers.pagination.isFirstPage(2), false);
	test.equal(helpers.pagination.isFirstPage(false), false);
	test.done();
};
