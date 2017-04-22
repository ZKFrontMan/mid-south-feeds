var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Dealer Model
 * =============
 */

var Dealer = new keystone.List('Dealer', { map: { name: 'storeName' } });

Dealer.add({
	storeName: { type: String, required: true, initial: true },
	email: { type: Types.Email, initial: true },
	phone: { type: String, initial: true },
    website: { type: Types.Url, intial: true },
    address: { type: Types.Location, initial: true },
	contacts: { type: Types.Relationship, ref: 'User', many: true },
	createdAt: { type: Date, default: Date.now },
});

Dealer.defaultSort = 'storeName';
Dealer.defaultColumns = 'storeName, address, phone, contacts';
Dealer.register();
