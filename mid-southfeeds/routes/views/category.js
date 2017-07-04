var keystone = require('keystone');
var ProductCategory = keystone.list('ProductCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = req.params.category;
    locals.category = {};
    
    view.on('init', function (next) {
        ProductCategory.model.findOne({ name: locals.section })
                             .populate('categories')
                             .exec(function (err, category) {
                                 locals.category = category;
                                 console.log(category);
                                 next(err);
                             });
    });

	// Render the view
	view.render('category')
};