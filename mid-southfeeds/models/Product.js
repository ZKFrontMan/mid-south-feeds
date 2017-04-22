var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Model
 * =============
 */

var Product = new keystone.List('Product', { drilldown: 'categories' });

var storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: 'uploads',
		publicPath: '/public/images/product/',
	}
});

Product.add({
	name: { type: String, required: true, initial: true },
    key: { type: Types.Key, required: true, initial: true },
	description: { type: Types.Textarea },
    benefits: { type: Types.Html, wysiwyg: true },
    guaranteedAnalysis: { type: Types.Html, wysiwyg: true, default: '<table style="width:100%"><tbody><tr><td style="text-align:left;"></td><td style="text-align:right;">&nbsp;</td></tr></tbody></table>' },
    ingredientList: { type: Types.Textarea },
    feedingDirections: { type: Types.Html, wysiwyg: true },
    productImage: { type: Types.File, storage: storage },
	categories: { type: Types.Relationship, ref: 'ProductCategory', many: true }
});

Product.defaultColumns = 'name, categories';
Product.register();