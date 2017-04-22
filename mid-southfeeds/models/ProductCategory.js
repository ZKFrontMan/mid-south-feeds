var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ProductCategory Model
 * =============
 */

var ProductCategory = new keystone.List('ProductCategory');

ProductCategory.add({
	name: { type: String },
	isVisible: { type: Types.Boolean },
	description: { type: Types.Html, wysiwyg: true },
	categories: { type: Types.Relationship, ref: 'ProductCategory', many: true }
});

ProductCategory.defaultColumns = 'name, categories';
ProductCategory.register();