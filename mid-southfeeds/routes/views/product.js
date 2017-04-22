var keystone = require('keystone');
var ProductCategory = keystone.list('ProductCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = req.params.category;
    locals.productCategory = {};
    locals.productSubcategories = [];
    
    view.on('init', function (next) {
        ProductCategory.model.findOne({ name: locals.section })
                             .populate('categories')
                             .exec(function (err, category) {
                                 locals.productCategory = category;
                                 console.log(category);
                                 next(err);
                                //  ProductCategory.model.find({ $or: [{ name: 'Equine' }, { categories: category._id }] })
                                //                       .limit(5)
                                //                       .exec(function (err, categories) {
                                //                           locals.productSubcategories = categories;
                                //                           console.log(categories);
                                                          
                                //                       });
                                 
                             });
    });

    

	// Render the view
	view.render('productCategory')
};