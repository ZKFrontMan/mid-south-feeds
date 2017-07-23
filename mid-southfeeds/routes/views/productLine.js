var keystone = require('keystone');
var async = require('async');
var ProductCategory = keystone.list('ProductCategory');
var Product = keystone.list('Product');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = req.params.category;
    locals.category = {};
    locals.subsection = decodeURI(req.params.subcategory);
    locals.subcategory = {};
    locals.productLines = [];
    locals.products = [];

    var getProducts = function (category, index, next) {
        Product.model.find({ categories: category.id }, 'name key')
                    .exec(function (err, products) {
                        locals.productLines[index].products = products;
                        next(err);
                    });
    }

    view.on('init', function (next) {
        ProductCategory.model.findOne({ name: locals.section }, 'name categories')
                             .populate('categories')
                             .exec(function (err, category) {
                                 locals.category = category;
                                 next(err);
                             });
    })
    
    view.on('init', function (next) {
        ProductCategory.model.findOne({ name: locals.subsection }, 'name description')
                             .exec(function (err, subcategory) {
                                 locals.subcategory = subcategory;
                                 next(err);
                             });
    });

    view.on('init', function (next) {
        ProductCategory.model.find({ categories: locals.subcategory.id }, 'name bagImage')
                             .where('isVisible', false)
                             .exec(function (err, productLines) {
                                 locals.productLines = productLines;
                                 next(err);
                             });
    });

    view.on('init', function (next) {
        if (locals.productLines.length) {
            async.eachOf(locals.productLines, getProducts, next);
        } else {
            Product.model.find({ categories: locals.subcategory.id }, 'name key bagImage description')
                         .exec(function (err, products) {
                             locals.products = products;
                             next(err);
                         });
        }
    });

	// Render the view
	view.render('productLine')
};