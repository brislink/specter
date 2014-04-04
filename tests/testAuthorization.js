var helpers = require('../helpers');
var mock = require('./mockContributors.js');

exports.testAuthorization = function(test) {
	var admin = helpers.getContributor.getRoleFromSecret('dont#fail@', mock.contributors);
	var user = helpers.getContributor.getRoleFromSecret('get@creative#', mock.contributors);
	var guest = helpers.getContributor.getRoleFromSecret('by!invitation&', mock.contributors);

	test.ok(helpers.authorization.isUserAuthorized(admin, 'Akshat Jiwan Sharma'));
	test.ok(helpers.authorization.isUserAuthorized(user, 'Not an admin'));
	test.ok(helpers.authorization.isUserAuthorized(guest, 'A guest'));
	test.ok(helpers.authorization.isUserAuthorized(admin, 'hello'));
	test.equal(helpers.authorization.isUserAuthorized(guest, 'Akshat Jiwan Sharma'), false);
	test.done();
};
