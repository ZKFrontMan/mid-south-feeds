var keystone = require('keystone');
var ProductCategory = keystone.list('ProductCategory');
var Product = keystone.list('Product');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = req.params.category;
    locals.productKey = req.params.product;
    locals.product = {};
    
    view.on('init', function (next) {
        Product.model.findOne({ key: locals.productKey })
                     .populate('categories')
                     .exec(function (err, product) {
                        locals.product = product;
                        next(err);
                     });
    });

	// Render the view
	view.render('product')
};