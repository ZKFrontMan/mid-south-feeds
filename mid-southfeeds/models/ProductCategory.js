var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ProductCategory Model
 * =============
 */

var ProductCategory = new keystone.List('ProductCategory');

var storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: 'public/images/uploads',
		publicPath: '/public/images/uploads/',
	}
});

ProductCategory.add({
	name: { type: String },
	isVisible: { type: Types.Boolean },
	description: { type: Types.Html, wysiwyg: true },
	categories: { type: Types.Relationship, ref: 'ProductCategory', many: true },
	label: { type: String },
	bagImage: { type: Types.File, storage: storage }
});

ProductCategory.defaultColumns = 'name, categories';
ProductCategory.register();
