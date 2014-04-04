var constants = require('../constants');

exports.setHeaders = function(url, data) {
    return {
        url: url,
        body: data,
        method: 'POST',
        json: true
    };
};
