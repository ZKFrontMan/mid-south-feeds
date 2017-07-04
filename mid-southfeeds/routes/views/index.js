var keystone = require('keystone');
var ProductCategory = keystone.list('ProductCategory');

var transform2D = function (arr, count) {
	var result = [];
	var input = arr.slice(0);
	while (input[0]) {
		result.push(input.splice(0, count));
	}
	return result;
}

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.categories = [];

	view.on('init', function (next) {
        ProductCategory.model.find({}, 'name label description categories')
                             .populate('categories')
							 .where('isVisible', true)
                             .exec(function (err, categories) {
                                 locals.categories = transform2D(categories, 4);
                                 next(err);
                             });
    });

	// Render the view
	view.render('index');
};
