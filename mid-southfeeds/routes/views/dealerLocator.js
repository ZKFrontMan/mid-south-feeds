var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'dealer-locator';

	// Render the view
	view.render('dealer-locator');
};