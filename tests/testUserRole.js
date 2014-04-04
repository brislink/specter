var helpers = require('../helpers');
var mock = require('./mockContributors.js');

exports.testAdminRole = function(test) {
	var contributor = helpers.getContributor.getRoleFromSecret('dont#fail@', mock.contributors);
	var admin = {
		admins: [{
			"name": "Akshat Jiwan Sharma",
			'secret': 'hey'
		}]
	};
	var justAdmin = helpers.getContributor.getRoleFromSecret('hey', admin);
	test.equal(contributor.role, 'admin');
	test.equal(contributor.details.name, 'Akshat Jiwan Sharma');
	test.equal(justAdmin.role, 'admin');
	test.equal(justAdmin.details.name, 'Akshat Jiwan Sharma');
	test.done();
};

exports.testUserRole = function(test) {
	var contributor = helpers.getContributor.getRoleFromSecret('get@creative#', mock.contributors);
	var user = {
		users: [{
			"name": "Akshat Jiwan Sharma",
			'secret': 'hey'
		}]
	};
	var justUser = helpers.getContributor.getRoleFromSecret('hey', user);
	test.equal(contributor.role, 'user');
	test.equal(contributor.details.name, 'Not an admin');
	test.equal(justUser.role, 'user');
	test.equal(justUser.details.name, 'Akshat Jiwan Sharma');
	test.done();
};

exports.testGuestRole = function(test) {
	var contributor = helpers.getContributor.getRoleFromSecret('by!invitation&', mock.contributors);
	var guest = {
		guests: [{
			"name": "Akshat Jiwan Sharma",
			'secret': 'hey'
		}]
	};
	var justGuest = helpers.getContributor.getRoleFromSecret('hey', guest);
	test.equal(contributor.role, 'guest');
	test.equal(contributor.details.name, 'A guest');
	test.equal(justGuest.role, 'guest');
	test.equal(justGuest.details.name, 'Akshat Jiwan Sharma');
	test.done();
};
