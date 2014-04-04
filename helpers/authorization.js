exports.isUserAuthorized = function(contributor, name) {
	return contributor ? contributor.role === 'admin' || contributor.details.name === name : false;
};
